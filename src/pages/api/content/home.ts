import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'home.json');
const DB_URL = process.env.DATABASE_URL || process.env.NEON_DB_URL;

async function getPgClient() {
  if (!DB_URL) return null;
  // Dynamically import so the code still works when `pg` isn't installed (file fallback)
  const { Client } = await import('pg');
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  return client;
}

async function readContent() {
  try {
    // Prefer DB if DATABASE_URL is provided
    if (DB_URL) {
      const client = await getPgClient();
      if (client) {
        try {
          // Ensure table exists
          await client.query(`CREATE TABLE IF NOT EXISTS home_content (id text PRIMARY KEY, data jsonb)`);
          const r = await client.query(`SELECT data FROM home_content WHERE id = $1`, ['home']);
          if (r.rowCount && r.rows[0] && r.rows[0].data) return r.rows[0].data;
          return {};
        } finally {
          await client.end();
        }
      }
    }

    const txt = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(txt);
  } catch (err: any) {
    // If file doesn't exist return empty object
    if (err && (err as any).code === 'ENOENT') return {};
    throw err;
  }
}

async function writeContent(obj: any) {
  // Prefer DB if configured
  if (DB_URL) {
    const client = await getPgClient();
    if (client) {
      try {
        await client.query(`CREATE TABLE IF NOT EXISTS home_content (id text PRIMARY KEY, data jsonb)`);
        await client.query(
          `INSERT INTO home_content (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`,
          ['home', obj]
        );
        return;
      } finally {
        await client.end();
      }
    }
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(obj, null, 2), 'utf-8');
}

// Create a localized view of the content for the requested language.
// Rules when lang === 'ar':
//  - For each base key (e.g. `title`) if there exists a sibling `title_ar` use that.
//  - Do NOT fall back to English values when Arabic is explicitly requested; instead return null for missing translations.
//  - Recurses into objects and arrays to localize nested structures.
function localizeContent(obj: any, lang?: string): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map((item) => localizeContent(item, lang));

  const result: any = {};
  for (const key of Object.keys(obj)) {
    // skip explicit language keys from being duplicated (we map base keys to the requested language)
    if (key.endsWith('_ar')) continue;

    const val = obj[key];
    const arKey = `${key}_ar`;

    if (lang === 'ar') {
      if (Object.prototype.hasOwnProperty.call(obj, arKey)) {
        const arVal = obj[arKey];
        result[key] = localizeContent(arVal, lang);
      } else if (typeof val === 'object' && val !== null) {
        // Recurse for nested objects/arrays even if no top-level `_ar` exists
        result[key] = localizeContent(val, lang);
      } else {
        // Explicitly return null when the arabic translation is missing
        result[key] = null;
      }
    } else {
      // default language: return the original value, but localize nested structures
      if (typeof val === 'object' && val !== null) result[key] = localizeContent(val, lang);
      else result[key] = val;
    }
  }

  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Prevent any caching or 304 responses from intermediaries; ensure responses are language-specific and fresh.
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const lang = (req.query.lang as string) || undefined;

    if (req.method === 'GET') {
      const data = await readContent();

      if (lang === 'ar') {
        res.setHeader('Content-Language', 'ar');
        const localized = localizeContent(data, 'ar');
        return res.status(200).json(localized);
      }

      // Return full raw content for non-language requests (default behaviour)
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const incoming = req.body || {};
      const current = await readContent();
      // Merge shallowly so admin pages can POST partial section objects
      const merged = { ...(current || {}), ...(incoming || {}) };
      await writeContent(merged);
      return res.status(200).json(merged);
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end('Method Not Allowed');
  } catch (err: any) {
    console.error('API /api/content/home error', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // or higher if needed
    },
  },
};

