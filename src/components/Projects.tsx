/* eslint-disable @next/next/no-html-link-for-pages -- Native links provide no-JS navigation; the persistent scene intercepts in-app navigation. */
import type { Project } from '@/content/project-schema';
import ProjectPreview from './ProjectPreview';
import styles from '@/app/page.module.css';
export function ProjectLinks({ project }: { project: Project }) {
  return <div className={styles.projectLinks}>
    {project.links.live && <a className="button" href={project.links.live} target="_blank" rel="noopener noreferrer">Live demo <span className={styles.srOnly}>(opens in a new tab)</span> ↗</a>}
    {project.links.repo && <a className="textLink" href={project.links.repo} target="_blank" rel="noopener noreferrer">View repository <span className={styles.srOnly}>(opens in a new tab)</span> ↗</a>}
  </div>;
}
export function ProjectCard({ project }: { project: Project }) {
  return <article className={styles.project}>
    <a href={`/projects/#project-${project.slug}`} aria-label={`Preview ${project.title}`}><ProjectPreview {...project.preview} contain/></a>
    <div><span className={styles.tag}>{project.status}</span><h3>{project.title}</h3><p>{project.summary}</p><ul className={styles.chips} aria-label={`${project.title} technologies`}>{project.stack.map(item=><li key={item}>{item}</li>)}</ul><a className="button" href={`/projects/#project-${project.slug}`}>Explore the build <span className={styles.srOnly}>for {project.title}</span> ↗</a><ProjectLinks project={project}/></div>
  </article>;
}
export function ProjectDetails({ project }: { project: Project }) {
  return <div className={styles.projectDetails}>
    <a className="textLink" href="/projects/">← Back to projects</a>
    <p className={styles.kicker}>{project.status}</p><h2>{project.title}</h2><p>{project.summary}</p>
    {!project.screenshots?.length && <ProjectPreview {...project.preview} contain/>}<ProjectLinks project={project}/>
    <h3>About the project</h3>{project.description.map((paragraph,index)=><p key={index}>{paragraph}</p>)}
    <h3>Built with</h3><ul className={styles.chips}>{project.stack.map(item=><li key={item}>{item}</li>)}</ul>
    {!!project.screenshots?.length && <><h3>Screenshots</h3><div className={styles.projectGallery}>{[project.preview,...project.screenshots].map((shot,index)=><figure key={shot.src}><ProjectPreview {...shot} contain/><figcaption>{index+1} / {shot.alt}</figcaption></figure>)}</div></>}
  </div>;
}
