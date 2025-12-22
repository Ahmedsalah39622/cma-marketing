import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'home.json');

async function readContent() {
  try {
    const txt = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(txt);
  } catch (err: any) {
    // If file doesn't exist return empty object
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

async function writeContent(obj: any) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(obj, null, 2), 'utf-8');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const data = await readContent();
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

