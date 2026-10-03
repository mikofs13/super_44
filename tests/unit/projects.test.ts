import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateProjects } from '../../src/content/project-schema.ts';
const project = {slug:'demo',title:'Example',status:'In development',summary:'Test fixture',description:['Explanation'],stack:['TypeScript'],preview:{src:'/images/projects/demo.webp',alt:'Example interface'},links:{repo:'https://github.com/example/demo',live:'https://example.com'}};
test('project records support repo and live links, or neither',()=>{assert.doesNotThrow(()=>validateProjects([project]));assert.doesNotThrow(()=>validateProjects([{...project,links:{}}]));});
test('reject duplicate routes and unsafe links',()=>{assert.throws(()=>validateProjects([project,project]),/duplicate slug/);for(const url of ['javascript:alert(1)','data:text/html,hello','not a url','']) assert.throws(()=>validateProjects([{...project,links:{live:url}}]));});
test('require descriptions and accessible local previews',()=>{assert.throws(()=>validateProjects([{...project,description:[]}]),/description/);assert.throws(()=>validateProjects([{...project,preview:{src:'/images/../secret.png',alt:'test'}}]),/preview.src/);assert.throws(()=>validateProjects([{...project,preview:{...project.preview,alt:''}}]),/preview.alt/);});

test('screenshot galleries validate optional image records',()=>{assert.doesNotThrow(()=>validateProjects([{...project,screenshots:[{src:'/images/projects/other.webp',alt:'Another view'}]}]));assert.throws(()=>validateProjects([{...project,screenshots:[{src:'https://example.com/image.png',alt:'external'}]}]),/screenshot/);});
