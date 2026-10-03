import Home from '../PortfolioPage';
export const dynamicParams = false;
export function generateStaticParams(){return ['info','projects','skills','certificates','contact'].map(section=>({section}));}
export default async function SectionPage({params}:{params:Promise<{section:string}>}){const {section}=await params;return <Home initialView={section==='info'?'about':section}/>;}

