'use client';
import { useState } from 'react';
import ProjectPreview from './ProjectPreview';
import styles from '@/app/page.module.css';
export default function ProjectGallery({images}:{images:{src:string;alt:string}[]}){
 const [index,setIndex]=useState(0);
 return <div className={styles.gallery}><ProjectPreview key={images[index].src} {...images[index]}/>{images.length>1&&<nav className={styles.galleryControls} aria-label="Project screenshots"><button aria-label="Previous screenshot" onClick={()=>setIndex((index-1+images.length)%images.length)}>←</button><div>{images.map((image,i)=><button key={image.src} aria-label={`Show screenshot ${i+1}`} aria-pressed={index===i} onClick={()=>setIndex(i)}>●</button>)}</div><button aria-label="Next screenshot" onClick={()=>setIndex((index+1)%images.length)}>→</button></nav>}</div>
}
