'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '@/app/page.module.css';
export default function ProjectPreview({ src, alt, contain = false }: { src: string; alt: string; contain?: boolean }) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // A cached failure can occur before React attaches its error handler.
    const frame = requestAnimationFrame(() => {
      if (image.current?.complete && image.current.naturalWidth === 0) setFailed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [src]);
  return <div className={styles.preview}>
    {failed ? <p className={styles.previewFallback}>Preview unavailable</p> :
      // Local, build-validated images, exported without an image optimization server.
      // eslint-disable-next-line @next/next/no-img-element
      <img ref={image} src={src} alt={alt} width={800} height={450} style={contain ? { objectFit: 'contain' } : undefined} loading="lazy" onError={() => setFailed(true)} />}
  </div>;
}
