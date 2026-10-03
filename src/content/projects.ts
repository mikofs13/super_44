import { existsSync } from 'node:fs';
import { join } from 'node:path';
import data from './projects.json';
import { validateProjects, type Project } from './project-schema';
validateProjects(data);
const records: Project[] = data;
for (const project of records) {
  for (const image of [project.preview, ...(project.screenshots || [])]) if (!existsSync(join(process.cwd(), 'public', image.src))) {
    throw new Error(`Project ${project.slug}: preview image does not exist at public${image.src}`);
  }
}
export const projects = records;
