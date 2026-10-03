import Link from 'next/link';
export default function NotFound() {
  return <main className="notFound"><p className="eyebrow">404 / Outside the garage</p><h1>This bay is empty.</h1><p>The page you are looking for isn’t here.</p><Link className="button" href="/">Return home</Link><Link className="textLink" href="/#projects">View projects</Link></main>;
}
