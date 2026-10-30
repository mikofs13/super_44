'use client';
import { useState } from 'react';
import type { Project } from '@/content/project-schema';
import ProjectPreview from './ProjectPreview';
import { ProjectLinks } from './Projects';
import styles from '@/app/page.module.css';

function ScreenshotShowcase({ project }: { project: Project }) {
  const shots = [project.preview, ...(project.screenshots || [])];
  const [selected, setSelected] = useState(0);
  const shift = (direction: number) => setSelected(value => (value + direction + shots.length) % shots.length);
  const shot = shots[selected];
  return <div className={styles.showcaseMedia} aria-label={`${project.title} screenshots`}>
    <div className={styles.showcaseStrip}>
      <button className={styles.showcaseArrow} type="button" aria-label="Previous screenshot" disabled={shots.length < 2} onClick={() => shift(-1)}>‹</button>
      <div className={styles.showcaseImages}>
        <a key={shot.src} href={`/projects/#project-${project.slug}`} aria-label={`Open ${project.title} details: ${shot.alt}`}><ProjectPreview {...shot} contain/></a>
      </div>
      <button className={styles.showcaseArrow} type="button" aria-label="Next screenshot" disabled={shots.length < 2} onClick={() => shift(1)}>›</button>
    </div>
    <div className={styles.showcaseDots} aria-label="Choose screenshot">{shots.map((shot,index) => <button key={shot.src} type="button" aria-label={`Show screenshot ${index + 1}`} aria-pressed={selected === index} onClick={() => setSelected(index)}/>)}</div>
    <p className={styles.srOnly} role="status">Screenshot {selected + 1} of {shots.length}</p>
  </div>;
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  if (!projects.length) return <p className={styles.note}>Project stories will join the grid as they’re ready.</p>;
  const project = projects[selected];
  const shift = (direction: number) => setSelected(value => (value + direction + projects.length) % projects.length);
  return <div className={styles.showcase}>
    <ScreenshotShowcase key={project.slug} project={project}/>
    <article className={styles.showcaseInfo} aria-labelledby="showcase-title">
      <div className={styles.showcaseHeading}><h2 id="showcase-title"><a href={`/projects/#project-${project.slug}`}>{project.title}</a></h2><ProjectLinks project={project}/></div>
      <p>{project.summary}</p>
      <ul className={styles.chips} aria-label={`${project.title} technologies`}>{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
      <a className="textLink" href={`/projects/#project-${project.slug}`}>Explore the build <span className={styles.srOnly}>for {project.title}</span> ↗</a>
    </article>
    <nav className={styles.showcaseNavigation} aria-label="Choose project">
      <button type="button" aria-label="Previous project" disabled={projects.length < 2} onClick={() => shift(-1)}>‹</button>
      <div className={styles.showcaseDots}>{projects.map((item,index) => <button key={item.slug} type="button" aria-label={`Show project ${item.title}`} aria-pressed={selected === index} onClick={() => setSelected(index)}/>)}</div>
      <button type="button" aria-label="Next project" disabled={projects.length < 2} onClick={() => shift(1)}>›</button>
      <span className={styles.showcaseCount} role="status">{selected + 1} / {projects.length}</span>
    </nav>
    <noscript><ul>{projects.map(item => <li key={item.slug}><a href={`/projects/#project-${item.slug}`}>{item.title}</a></li>)}</ul></noscript>
  </div>;
}
