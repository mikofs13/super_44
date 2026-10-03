import { projects } from '@/content/projects';
import { ProjectCard, ProjectDetails } from '@/components/Projects';
import AboutProfile from '@/components/AboutProfile';
import { SkillsPanel, CertificatesPanel, ContactPanel } from '@/components/ProfilePanels';
import PortfolioShell from './PortfolioShell';
import styles from './page.module.css';
export default function Home({initialView = 'hero'}: {initialView?: string} = {}) {
 return <PortfolioShell initialView={initialView} projectPanels={projects.map(project=>({id:`project-${project.slug}`,title:project.title,content:<ProjectDetails project={project}/>}))} panels={[
  <div key="projects"><p className={styles.kicker}>01 / Selected work</p><h2>In the project bay.</h2><p>A look under the hood of what I’m building.</p>{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}{projects.length===0 && <p className={styles.note}>Project stories will join the grid as they’re ready.</p>}</div>,
  <SkillsPanel key="skills"/>, <AboutProfile key="about"/>, <ContactPanel key="contact"/>, <CertificatesPanel key="certificates"/>
 ]}/>;
}
