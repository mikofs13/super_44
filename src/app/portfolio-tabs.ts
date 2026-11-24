export const portfolioTabs = [
  { id: 'about', label: 'About', path: 'info' },
  { id: 'activities', label: 'Activities', path: 'activities' },
  { id: 'projects', label: 'Projects', path: 'projects' },
  { id: 'skills', label: 'Skills', path: 'skills' },
  { id: 'certificates', label: 'Certificates', path: 'certificates' },
  { id: 'contact', label: 'Contact', path: 'contact' },
] as const;

export type PortfolioSection = typeof portfolioTabs[number]['id'];

export function sectionHref(path: string) {
  return `/${path}/`;
}
