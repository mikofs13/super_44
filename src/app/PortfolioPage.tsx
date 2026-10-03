import { projects } from '@/content/projects';
import { ProjectCard, ProjectDetails } from '@/components/Projects';
import PortfolioShell from './PortfolioShell';
import styles from './page.module.css';
export default function Home({initialView = 'hero'}: {initialView?: string} = {}) {
 return <PortfolioShell initialView={initialView} projectPanels={projects.map(project=>({id:`project-${project.slug}`,title:project.title,content:<ProjectDetails project={project}/>}))} panels={[
  <div key="projects"><p className={styles.kicker}>01 / Selected work</p><h2>In the project bay.</h2><p>A look under the hood of what I’m building.</p>{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}{projects.length===0 && <p className={styles.note}>Project stories will join the grid as they’re ready.</p>}</div>,
  <div key="skills"><p className={styles.kicker}>02 / The toolbox</p><h2>Skills &amp; technologies.</h2><ul className={styles.chips} aria-label="Skills and technologies">{['Python', 'JavaScript', 'TypeScript', 'C++', 'React', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker', 'Git', 'GitHub', 'TensorFlow', 'Machine Learning', 'OpenCV', 'Computer Vision', 'ESP32', 'Arduino', 'REST APIs'].map(skill=><li key={skill}>{skill}</li>)}</ul></div>,
  <div key="about"><p className={styles.kicker}>03 / Behind the wheel</p><h2>A world of my own.</h2><p>Super 44 brings the focus of a racing garage to a developer portfolio: a place to explore the work and the thinking behind it.</p><p className={styles.note}>An independent, fictional circuit. No team or championship affiliation. The personal story is still being written; a verified biography will be added here.</p><a className="textLink" href={projects[0] ? `/projects/#project-${projects[0].slug}` : "/projects/"}>Read about this build ↗</a></div>,
  <div key="contact"><p className={styles.kicker}>04 / The next conversation</p><h2>See you in the paddock.</h2><p>Contact details and social links are coming with the complete portfolio.</p><p className={styles.note}>For now, take a closer look at how this little racing world is being built.</p><a className="button" href={projects[0] ? `/projects/#project-${projects[0].slug}` : "/projects/"}>Explore Super 44 ↗</a></div>
 ]}/>;
}

