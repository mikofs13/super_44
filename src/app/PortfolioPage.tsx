import { projects } from '@/content/projects';
import { profile } from '@/content/profile';
import { ProjectDetails } from '@/components/Projects';
import ProjectShowcase from '@/components/ProjectShowcase';
import AboutProfile, { ActivitiesProfile } from '@/components/AboutProfile';
import { SkillsPanel, CertificatesPanel, ContactPanel } from '@/components/ProfilePanels';
import PortfolioShell from './PortfolioShell';
import type { PortfolioSection } from './portfolio-tabs';

export default function PortfolioPage({ initialView = 'hero' }: { initialView?: PortfolioSection | 'hero' }) {
  return (
    <PortfolioShell
      name={profile.name}
      initialView={initialView}
      projectPanels={projects.map(project => ({
        id: `project-${project.slug}`,
        content: <ProjectDetails project={project}/>,
      }))}
      panels={{
        about: <AboutProfile/>,
        activities: <ActivitiesProfile/>,
        projects: <ProjectShowcase projects={projects}/>,
        skills: <SkillsPanel/>,
        certificates: <CertificatesPanel/>,
        contact: <ContactPanel/>,
      }}
    />
  );
}
