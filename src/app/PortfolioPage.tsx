import { projects } from '@/content/projects';
import { ProjectDetails } from '@/components/Projects';
import ProjectShowcase from '@/components/ProjectShowcase';
import AboutProfile from '@/components/AboutProfile';
import { SkillsPanel, CertificatesPanel, ContactPanel } from '@/components/ProfilePanels';
import PortfolioShell from './PortfolioShell';
export default function Home({initialView = 'hero'}: {initialView?: string} = {}) {
 return <PortfolioShell initialView={initialView} projectPanels={projects.map(project=>({id:`project-${project.slug}`,title:project.title,content:<ProjectDetails project={project}/>}))} panels={[
  <ProjectShowcase key="projects" projects={projects}/>,
  <SkillsPanel key="skills"/>, <AboutProfile key="about"/>, <ContactPanel key="contact"/>, <CertificatesPanel key="certificates"/>
 ]}/>;
}
