import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const FIXTURES_DIR = process.env.FIXTURES_DIR || '/fixtures';
const PORT = Number(process.env.PORT || 9080);

const loadJson = (name) =>
  JSON.parse(readFileSync(`${FIXTURES_DIR}/${name}`, 'utf8'));

const omrrData = loadJson('omrr.json').omrrData;
const appStatusData = loadJson('omrr-application-status.json');
const authzDocsData = loadJson('omrr-authorization-docs.json').flatMap(
  (entry) =>
    (entry.doc_links || []).map((doc) => ({
      'Authorization Number': entry['Authorization Number'],
      ...doc,
    })),
);

const sendJson = (res, status, payload) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
};

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    return sendJson(res, 200, { status: 'ok' });
  }

  if (req.method !== 'POST' || req.url !== '/') {
    return sendJson(res, 404, { error: 'Not found' });
  }

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const { sql = '' } = JSON.parse(body || '{}');
      if (sql.includes('EM_AUTHJOBQUEUES')) {
        return sendJson(res, 200, appStatusData);
      }
      if (sql.includes('Em_Authorizationdocuments')) {
        return sendJson(res, 200, authzDocsData);
      }
      return sendJson(res, 200, omrrData);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Oracle mock listening on port ${PORT}`);
});
