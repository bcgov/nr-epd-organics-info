import * as http from 'node:http';
import { AddressInfo } from 'node:net';
import { NestExpressApplication } from '@nestjs/platform-express';
import { bootstrap } from './app';
import { register } from './prom';
import { OMRR_QUERY } from './v1/ams-oracle-connector/omrr-query';
import { OMRR_APP_STATUS_QUERY } from './v1/ams-oracle-connector/omrr-application-status-query';
import { OMRR_AUTHZ_DOCS_QUERY } from './v1/ams-oracle-connector/omrr-authz-docs-query';
import { OmrrData } from './v1/types/omrr-data';
import { OmrrApplicationStatusResponse } from './v1/types/omrr-application-status';
import { OmrrAuthzDocsQueryResponse } from './v1/types/omrr-authz-docs-response';

interface HttpTestResponse {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
}

function httpGet(port: number, path: string): Promise<HttpTestResponse> {
  return new Promise((resolve, reject) => {
    const req = http.get(
      { hostname: '127.0.0.1', port, path },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8'),
          });
        });
      },
    );
    req.on('error', reject);
  });
}

const sampleOmrrRows: OmrrData[] = [
  {
    'Authorization Number': 111479,
    'Authorization Status': 'Active',
    'Authorization Type': 'Permit',
    'Regulated Party': 'RED MEAT COMPOST CO.',
    'Facility Location': '100 Main St, Victoria, BC',
    Latitude: 48.4284,
    Longitude: -123.3656,
    'Effective/Issue Date': new Date('2022-01-15T00:00:00.000Z'),
    'Last Amendment Date': null,
    'Operation Type': 'Compost Production Facility',
    'Material Land Applied': null,
    'Intended Dates of Land Application': null,
    'Waste Discharge Regulation': 'Schedule 2 - Composting Operations',
    'Facility Design Capacity (t/y)': '1000',
    'Type of Compost Produced': 'Class A',
    Manure: true,
    'Yard Waste': false,
    'Food Waste': false,
    Biosolids: false,
    'Domestic Septic Tank Sludge': false,
    'Brewery Waste/Wine Waste': false,
    'Fish Wastes': false,
    'Hatchery Waste': false,
    'Milk Processing Waste': false,
    'Poultry Carcasses': false,
    'Untreated and Unprocessed Wood Residuals': false,
    'Animal Bedding': false,
    Whey: false,
  },
];

const sampleStatusRows: OmrrApplicationStatusResponse[] = [
  {
    'Authorization Number': 111479,
    'Job Tracking Number': 99001,
    'Job Type': 'Authorization Amendment',
    'Authorization Type': 'Permit',
    Status: 'In Review',
    'Received Date': '2024-03-01',
  },
];

const sampleDocRows: OmrrAuthzDocsQueryResponse[] = [
  {
    'Authorization Number': 111479,
    DocumentObjectID: 42,
    Description: 'Permit Document',
    Publiclyviewable: 'Y',
    Filename: 'permit.pdf',
  },
];

describe('Backend HTTP Integration', () => {
  let app: NestExpressApplication;
  let port: number;
  let fetchSpy: jest.SpyInstance;
  const origAppStatusFlag = process.env.OMRR_APP_STATUS_FLAG;
  const origAuthzDocsFlag = process.env.OMRR_AUTHZ_DOCS_FLAG;

  beforeAll(async () => {
    process.env.OMRR_APP_STATUS_FLAG = 'true';
    process.env.OMRR_AUTHZ_DOCS_FLAG = 'true';

    fetchSpy = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (_input, init) => {
        const parsed = JSON.parse(String(init?.body ?? '{}')) as { sql?: string };
        let payload: unknown = [];
        if (parsed.sql === OMRR_QUERY) {
          payload = sampleOmrrRows;
        } else if (parsed.sql === OMRR_APP_STATUS_QUERY) {
          payload = sampleStatusRows;
        } else if (parsed.sql === OMRR_AUTHZ_DOCS_QUERY) {
          payload = sampleDocRows;
        }
        return {
          status: 200,
          json: async () => payload,
        } as Response;
      });

    app = await bootstrap();
    await app.listen(0, '127.0.0.1');
    const address = app.getHttpServer().address() as AddressInfo;
    port = address.port;
  });

  afterAll(async () => {
    fetchSpy?.mockRestore();
    if (origAppStatusFlag === undefined) {
      delete process.env.OMRR_APP_STATUS_FLAG;
    } else {
      process.env.OMRR_APP_STATUS_FLAG = origAppStatusFlag;
    }
    if (origAuthzDocsFlag === undefined) {
      delete process.env.OMRR_AUTHZ_DOCS_FLAG;
    } else {
      process.env.OMRR_AUTHZ_DOCS_FLAG = origAuthzDocsFlag;
    }
    register.clear();
    if (app) {
      await app.close();
    }
  });

  it('serves GET /api with Helmet and CORS headers', async () => {
    const res = await httpGet(port, '/api');

    expect(res.status).toBe(200);
    expect(res.body).toBe('Hello Backend!');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });

  it('serves GET /api/health', async () => {
    const res = await httpGet(port, '/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toBe('ok');
  });

  it('serves Prometheus metrics on GET /api/metrics', async () => {
    const res = await httpGet(port, '/api/metrics');

    expect(res.status).toBe(200);
    expect(res.body).toContain('# HELP');
    expect(res.body).toContain('# TYPE');
  });

  it('serves OMRR data, application status, and documents endpoints', async () => {
    const omrrRes = await httpGet(port, '/api/omrr');
    expect(omrrRes.status).toBe(200);
    const omrrJson = JSON.parse(omrrRes.body) as {
      lastModified: string;
      omrrData: OmrrData[];
    };
    expect(omrrJson.lastModified).toEqual(expect.any(String));
    expect(omrrJson.omrrData).toHaveLength(1);
    expect(omrrJson.omrrData[0]?.['Red Meat Waste']).toBe(true);

    const statusRes = await httpGet(port, '/api/omrr/application-status');
    expect(statusRes.status).toBe(200);
    expect(JSON.parse(statusRes.body)).toEqual(sampleStatusRows);

    const docsRes = await httpGet(port, '/api/omrr/authorization-docs');
    expect(docsRes.status).toBe(200);
    expect(JSON.parse(docsRes.body)).toEqual([
      {
        'Authorization Number': 111479,
        doc_links: [
          {
            DocumentObjectID: 42,
            Description: 'Permit Document',
            Publiclyviewable: 'Y',
            Filename: 'permit.pdf',
          },
        ],
      },
    ]);
  });

  it('generates and serves the OpenAPI specification at GET /docs-json', async () => {
    const res = await httpGet(port, '/docs-json');

    expect(res.status).toBe(200);
    const doc = JSON.parse(res.body) as {
      info?: { title?: string };
      paths?: Record<string, unknown>;
    };
    expect(doc.info?.title).toBe('Organics Info');
    expect(doc.paths).toHaveProperty('/api');
    expect(doc.paths).toHaveProperty('/api/health');
    expect(doc.paths).toHaveProperty('/api/metrics');
    expect(doc.paths).toHaveProperty('/api/omrr');
    expect(doc.paths).toHaveProperty('/api/omrr/application-status');
    expect(doc.paths).toHaveProperty('/api/omrr/authorization-docs');
  });

  it('returns 404 for unknown routes', async () => {
    const res = await httpGet(port, '/api/nonexistent');
    expect(res.status).toBe(404);
  });
});
