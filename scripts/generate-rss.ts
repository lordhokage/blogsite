// scripts/generate-rss.ts
import fs from 'fs';
import path from 'path';
import { generateRssFeed } from '../src/lib/rss';

async function buildRss() {
  const rss = await generateRssFeed();
  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), rss);
  console.log('RSS feed generated!');
}

buildRss();
