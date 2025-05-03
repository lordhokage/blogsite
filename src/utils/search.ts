import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Document } from 'flexsearch';
import matter from 'gray-matter';

// Convert fs.readdir to Promise-based
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

// Create a FlexSearch Document instance
const searchIndex = new Document({
  document: {
    id: 'id',
    index: ['title', 'description', 'content'],
    store: ['title', 'description', 'slug', 'category', 'plainContent'],
  },
});

// Function to get all MDX files recursively
async function getAllMdxFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return getAllMdxFiles(res);
      } else if (dirent.name.endsWith('.mdx')) {
        return res;
      } else {
        return [];
      }
    })
  );
  return Array.prototype.concat(...files);
}

// Function to build the search index
export async function buildSearchIndex() {
  // Get all MDX files
  const contentDir = path.join(process.cwd(), 'content');
  const mdxFiles = await getAllMdxFiles(contentDir);

  // Process each file
  let docId = 0;
  const documents = await Promise.all(
    mdxFiles.map(async (filePath) => {
      const fileContent = await readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Get category from directory structure
      const relativePath = path.relative(contentDir, filePath);
      const pathParts = relativePath.split(path.sep);
      const category = pathParts[0];

      // Extract slug from filename
      const fileName = path.basename(filePath, '.mdx');
      const slug = `/${category}/${fileName}`;

      return {
        id: docId++,
        title: data.title || fileName,
        description: data.description || '',
        content: content,
        slug,
        category,
      };
    })
  );

  // Add documents to search index
  documents.forEach((doc) => {
    searchIndex.add(doc);
  });

  return {
    index: searchIndex,
    documents,
  };
}

// Function to perform search
export function searchDocuments(index, query) {
  if (!query) return [];

  // Search across all fields
  const titleResults = index.search(query, { field: 'title', limit: 5 });
  const descriptionResults = index.search(query, {
    field: 'description',
    limit: 5,
  });
  const contentResults = index.search(query, { field: 'content', limit: 5 });

  // Combine and deduplicate results
  const resultIds = new Set();
  const results = [];

  [titleResults, descriptionResults, contentResults].forEach((resultSet) => {
    resultSet.forEach((result) => {
      result.result.forEach((id) => {
        if (!resultIds.has(id)) {
          resultIds.add(id);
          const doc = index.get(id);
          results.push(doc);
        }
      });
    });
  });

  return results;
}
