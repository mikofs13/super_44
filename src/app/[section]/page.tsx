import { notFound } from 'next/navigation';
import PortfolioPage from '../PortfolioPage';
import { portfolioTabs } from '../portfolio-tabs';

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioTabs.map(tab => ({ section: tab.path }));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const tab = portfolioTabs.find(tab => tab.path === section);
  if (!tab) notFound();
  return <PortfolioPage initialView={tab.id}/>;
}
