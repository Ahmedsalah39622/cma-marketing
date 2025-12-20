import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content-home.json');

function getDefaultContent() {
  return {
    hero: { title: 'Main Page', subtitle: 'Welcome to the main page!' },
    about: { heading: 'About Main', description: 'About us content.' },
    services: { heading: 'Services Main', description: 'Services overview.' },
    solutions: { heading: 'Solutions Main', description: 'Solutions overview.' },
    technology: { heading: 'Technology Main', description: 'Technology overview.' },
    contact: { heading: 'Contact Main', description: 'Contact info.' },
  };
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!fs.existsSync(CONTENT_PATH)) {
      fs.writeFileSync(CONTENT_PATH, JSON.stringify(getDefaultContent(), null, 2));
    }
    const data = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const data = req.body;
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2));
    res.status(200).json({ ok: true });
  } else {
    res.status(405).end();
  }
}
