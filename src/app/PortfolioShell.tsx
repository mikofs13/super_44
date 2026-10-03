/* eslint-disable @next/next/no-html-link-for-pages -- Native links provide no-JS navigation; the persistent scene intercepts in-app navigation. */
'use client';
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react';
import styles from './page.module.css';
const tabs = [{id:'about',label:'About',href:'/info/'},{id:'projects',label:'Projects',href:'/projects/'},{id:'skills',label:'Skills',href:'/skills/'},{id:'certificates',label:'Certificates',href:'/certificates/'},{id:'contact',label:'Contact',href:'/contact/'}];
const hrefFor = (id: string) => id.startsWith('project-') ? `/projects/#${id}` : tabs.find(tab=>tab.id===id)?.href || '/';
export default function PortfolioShell({ panels, projectPanels, initialView = 'hero' }: { panels: ReactNode[]; projectPanels: { id: string; title: string; content: ReactNode }[]; initialView?: string }) {
  const projectRoutes = projectPanels.map(project=>project.id).join('|');
  const [active,setActive] = useState(initialView);
  const [enhanced,setEnhanced] = useState(false);
  const [motion,setMotion] = useState(false);
  const [visible,setVisible] = useState(true);
  const carRef = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation|null>(null);
  const frame = useRef(0);
  const opened = active!=='hero';
  useEffect(()=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion=()=>{let saved;try{saved=localStorage.getItem('super44.motion.v2')}catch{}setMotion(!reduced.matches&&saved!=='off');if(reduced.matches)animation.current?.cancel()};
    const syncRoute=()=>{const hash=location.hash.slice(1);const routes=projectRoutes.split('|');const path=location.pathname.replace(/\/$/,'');const byPath=tabs.find(tab=>tab.href.replace(/\/$/,'')===path)?.id||'hero';setActive(hash==='build'?(routes[0]||'projects'):routes.includes(hash)||tabs.some(tab=>tab.id===hash)?hash:byPath);};
    const syncVisibility=()=>setVisible(!document.hidden);
    frame.current=requestAnimationFrame(()=>{setEnhanced(true);syncMotion();syncRoute()});
    reduced.addEventListener('change',syncMotion);window.addEventListener('hashchange',syncRoute);window.addEventListener('popstate',syncRoute);document.addEventListener('visibilitychange',syncVisibility);
    return()=>{cancelAnimationFrame(frame.current);animation.current?.cancel();reduced.removeEventListener('change',syncMotion);window.removeEventListener('hashchange',syncRoute);window.removeEventListener('popstate',syncRoute);document.removeEventListener('visibilitychange',syncVisibility)};
  },[projectRoutes]);
  function go(id:string){
    if(id==='build')id=projectPanels[0]?.id||'projects';
    animation.current?.cancel();setActive(id);
    const href=hrefFor(id);if(location.pathname+location.hash!==href)history.pushState(null,'',href);
    cancelAnimationFrame(frame.current);frame.current=requestAnimationFrame(()=>{document.getElementById(id)?.focus({preventScroll:true});document.querySelector('[data-reading-pane]')?.scrollTo(0,0)});
    if(motion&&!matchMedia('(prefers-reduced-motion: reduce)').matches)animation.current=carRef.current?.animate([{transform:'translateX(-28px)'},{transform:'translateX(0)'}],{duration:220,easing:'ease-out'})??null;
  }
  function navigate(event:MouseEvent<HTMLAnchorElement>,id:string){if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;event.preventDefault();go(id)}
  function routeClick(event:MouseEvent<HTMLDivElement>){const link=(event.target as HTMLElement).closest<HTMLAnchorElement>('a');if(!link||link.origin!==location.origin)return;const hash=link.hash.slice(1);const id=projectPanels.some(p=>p.id===hash)?hash:tabs.find(tab=>tab.href===link.pathname)?.id;if(id)navigate(event as unknown as MouseEvent<HTMLAnchorElement>,id)}
  return <div className={styles.app} data-enhanced={enhanced} data-open={opened} data-motion={motion&&visible}>
    <a className="skip" href="#main" onClick={e=>navigate(e,'about')}>Skip to portfolio</a>
    <header className={styles.header}><a className={styles.wordmark} href="/" onClick={e=>navigate(e,'hero')}>SUPER <span>44</span></a><nav aria-label="Main navigation">{tabs.filter(tab=>["projects","about","contact"].includes(tab.id)).map(tab=><a key={tab.id} href={tab.href} onClick={e=>navigate(e,tab.id)}>{tab.label}</a>)}</nav></header>
    <main id="main" tabIndex={-1} className={styles.stage}><div className={styles.world} aria-hidden="true"/>
      <section id="hero" tabIndex={-1} className={styles.hero} hidden={opened} aria-labelledby="hero-title"><div className={styles.heroCopy}><p className={styles.kicker}>A developer’s little corner of the grid</p><h1 id="hero-title">SUPER<span>44</span></h1><h2>Welcome to my circuit.</h2><p>Code. Create. Keep moving.</p><a className="button" href="/info/" onClick={e=>navigate(e,'about')}>Enter pit lane <span aria-hidden="true">→</span></a><div className={styles.shortcuts}><a href="/projects/" onClick={e=>navigate(e,'projects')}>Explore projects</a><span>/</span><a href="/contact/" onClick={e=>navigate(e,'contact')}>Say hello</a></div></div></section>
      <section id="garage" className={styles.garage} hidden={!opened} aria-label="Portfolio window"><div className={styles.window}>
        <div className={styles.titlebar}><span>SUPER44 / PORTFOLIO</span><a href="/" aria-label="Close portfolio, return to circuit" onClick={e=>navigate(e,'hero')}>×</a></div>
        <nav className={styles.tabs} aria-label="Portfolio sections">{[tabs[1],tabs[2],tabs[0],tabs[3],tabs[4]].map(tab=><a key={tab.id} href={tab.href} aria-current={active===tab.id||(active.startsWith('project-')&&tab.id==='projects')?'page':undefined} onClick={e=>navigate(e,tab.id)}>{tab.label}</a>)}</nav>
        <div className={styles.address}><span aria-hidden="true">↳</span> super44{hrefFor(active)}</div>
        <div className={styles.readingPane} data-reading-pane onClick={routeClick}>
          {[{id:'projects',content:panels[0]},{id:'skills',content:panels[1]},{id:'about',content:panels[2]},{id:'contact',content:panels[3]},{id:'certificates',content:<><p className={styles.kicker}>Learning / Evidence</p><h2>Certificates</h2><p className={styles.note}>Verified certificates will be added here. No credentials have been published yet.</p></>},...projectPanels].map(panel=><section id={panel.id} key={panel.id} tabIndex={-1} className={styles.panel} hidden={active!==panel.id}>{panel.content}</section>)}
        </div>
        <div className={styles.status}><span><i/> Garage open</span><span>Built one lap at a time.</span></div>
      </div></section>
      <div className={styles.straight} aria-hidden="true"><div className={styles.trackMarkings}/><div className={styles.carTravel}><div ref={carRef} className={styles.car}><svg viewBox="0 0 220 82" shapeRendering="crispEdges"><ellipse cx="110" cy="73" rx="102" ry="5" fill="#101116" opacity=".6"/><path d="M9 26h10v30H9zM4 22h27v8H4z" fill="#ef334c"/><path d="M22 48h36l23-15h41l17 12 43 6 19 8v9H23z" fill="#da203b"/><path d="M70 41h54l15 11H66z" fill="#f14b5b"/><path d="M96 34v-9h20l7 9z" fill="#f4cf61"/><path d="M104 25h12v7h-12z" fill="#181b25"/><path d="M83 35h43v6H83zM78 31h7v13h-7z" fill="#151923"/><path d="M139 53h44v5h-44z" fill="#f4cf61"/><path d="M176 64h41v7h-41zM204 56h9v15h-9z" fill="#ed384b"/><g className={styles.wheel}><circle cx="48" cy="62" r="17" fill="#11141d"/><circle cx="48" cy="62" r="11" fill="none" stroke="#e9c755" strokeWidth="2"/><path d="M46 53h4v18h-4zM39 60h18v4H39z" fill="#747784"/></g><g className={styles.wheelFront}><circle cx="170" cy="63" r="16" fill="#11141d"/><circle cx="170" cy="63" r="10" fill="none" stroke="#e9c755" strokeWidth="2"/><path d="M168 55h4v16h-4zM162 61h16v4h-16z" fill="#747784"/></g><path d="M98 47v8h7v-8M109 47v8h7v-8" fill="none" stroke="#fff1d2" strokeWidth="3"/></svg></div></div><span className={styles.straightLabel}>SUPER 44 / PIT LANE</span></div>
    </main><footer className={styles.footer}><span>SUPER 44 / FICTIONAL CIRCUIT</span><a href="/info/" onClick={e=>navigate(e,'about')}>About & navigation</a><button type="button" aria-pressed={motion} onClick={()=>{const next=!motion&&!matchMedia('(prefers-reduced-motion: reduce)').matches;setMotion(next);if(!next)animation.current?.cancel();try{localStorage.setItem('super44.motion.v2',next?'on':'off')}catch{}}}>Motion: {motion?'On':'Off'}</button></footer>
  </div>;
}

