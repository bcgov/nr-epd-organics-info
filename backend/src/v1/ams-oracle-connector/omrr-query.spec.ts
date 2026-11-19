import { OmrrData } from '../types/omrr-data';
import { OmrrApplicationStatusResponse } from '../types/omrr-application-status';
import { OmrrAuthzDocsQueryResponse } from '../types/omrr-authz-docs-response';
import { OMRR_QUERY } from './omrr-query';
import { OMRR_APP_STATUS_QUERY } from './omrr-application-status-query';
import { OMRR_AUTHZ_DOCS_QUERY } from './omrr-authz-docs-query';

describe('Omrr Queries', () => {
  it('validates OMRR_QUERY column names against OmrrData', () => {
    const columnNames = getColumnNames(OMRR_QUERY);
    const omrrDataInstance: OmrrData = {
      Manure: false,
      'Untreated and Unprocessed Wood Residuals': false,
      'Domestic Septic Tank Sludge': false,
      'Operation Type': 'Land Application Biosolids',
      Latitude: 49,
      'Yard Waste': false,
      'Fish Wastes': false,
      Whey: false,
      'Animal Bedding': false,
      Biosolids: false,
      'Hatchery Waste': false,
      'Last Amendment Date': null,
      'Intended Dates of Land Application': 'sept 24',
      'Authorization Status': 'Active',
      'Authorization Number': 112247,
      'Waste Discharge Regulation': null,
      'Milk Processing Waste': false,
      'Material Land Applied': 'Class A Biosolids',
      'Poultry Carcasses': false,
      'Authorization Type': 'Notification',
      'Effective/Issue Date': new Date(),
      Longitude: -135,
      'Facility Location': 'test',
      'Type of Compost Produced': null,
      'Facility Design Capacity (t/y)': '50',
      'Brewery Waste/Wine Waste': false,
      'Regulated Party': 'BABAR CAT',
      'Food Waste': false,
    };
    for (const key of Object.keys(omrrDataInstance)) {
      expect(columnNames).toContain(key);
    }
  });

  it('validates OMRR_APP_STATUS_QUERY column names against OmrrApplicationStatusResponse', () => {
    const columnNames = getColumnNames(OMRR_APP_STATUS_QUERY);
    const sampleStatus: OmrrApplicationStatusResponse = {
      'Authorization Number': 108485,
      'Job Tracking Number': 386999,
      'Job Type': 'Authorization Amendment',
      'Authorization Type': 'Permit',
      Status: 'In Review',
      'Received Date': '2019-09-27',
    };
    for (const key of Object.keys(sampleStatus)) {
      expect(columnNames).toContain(key);
    }
  });

  it('validates OMRR_AUTHZ_DOCS_QUERY column names against OmrrAuthzDocsQueryResponse', () => {
    const columnNames = getColumnNames(OMRR_AUTHZ_DOCS_QUERY);
    const sampleDoc: OmrrAuthzDocsQueryResponse = {
      'Authorization Number': 108485,
      DocumentObjectID: 124,
      Description: 'desc',
      Publiclyviewable: 'Y',
      Filename: 'doc.pdf',
    };
    for (const key of Object.keys(sampleDoc)) {
      expect(columnNames).toContain(key);
    }
  });
});

function getColumnNames(query: string): string[] {
  const regex = /"(.*?)"/g;
  let match: RegExpExecArray | null;
  const columnNames: string[] = [];

  while ((match = regex.exec(query)) !== null) {
    columnNames.push(match[1]);
  }

  return columnNames;
}
