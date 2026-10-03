'use client';

import { Component, useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { Group } from 'three';
import { parseChoice, shouldLoadScene, STORAGE_KEY, type ViewChoice } from './policy';
import styles from './SceneBoundary.module.css';

type Settings = { choice: ViewChoice; reduced: boolean; consent: boolean; compact: boolean; saveData: boolean };
export type SceneProps = { model: Group; onReady: () => void; onError: () => void; low: boolean };
type Loaded = { View: ComponentType<SceneProps>; model: Group };
type Status = 'idle' | 'loading' | 'ready' | 'failed' | 'timed-out';

class SceneErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function SceneBoundary() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [attempt, setAttempt] = useState(0);
  const failRef = useRef<() => void>(() => {});
  const readyRef = useRef<() => void>(() => {});

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const compact = matchMedia('(max-width: 1023px), (pointer: coarse)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let choice: ViewChoice = 'auto';
    try { choice = parseChoice(localStorage.getItem(STORAGE_KEY)); } catch { /* Storage is optional. */ }
    // Two paint opportunities keep the optional import behind the HTML/poster.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setSettings({ choice, reduced: motion.matches, consent: false, compact: compact.matches, saveData: !!connection?.saveData }));
    });
    const onMotion = () => setSettings(previous => previous && ({ ...previous, reduced: motion.matches, consent: false }));
    const onCompact = () => setSettings(previous => previous && ({ ...previous, compact: compact.matches }));
    motion.addEventListener('change', onMotion);
    compact.addEventListener('change', onCompact);
    return () => {
      cancelAnimationFrame(first); cancelAnimationFrame(second);
      motion.removeEventListener('change', onMotion); compact.removeEventListener('change', onCompact);
    };
  }, []);

  const eligible = settings ? shouldLoadScene(settings.choice, settings.reduced, settings.consent, settings.compact, settings.saveData) : false;

  useEffect(() => {
    if (!eligible) return;
    let active = true;
    let dispose: (() => void) | undefined;
    const controller = new AbortController();
    const fail = (reason: 'failed' | 'timed-out' = 'failed') => {
      if (!active) return;
      active = false;
      clearTimeout(timeout);
      controller.abort();
      dispose?.();
      setLoaded(null); setStatus(reason);
    };
    const timeout = setTimeout(() => fail('timed-out'), 8000);
    failRef.current = () => fail();
    readyRef.current = () => { if (active) { clearTimeout(timeout); setStatus('ready'); } };
    void Promise.resolve().then(async () => {
      if (!active) return;
      setLoaded(null); setStatus('loading');
      try {
        const scene = await import('./ExperienceCanvas');
        if (!active) return;
        const model = await scene.loadCar(controller.signal);
        if (!active) { scene.disposeCar(model); return; }
        let disposed = false;
        dispose = () => { if (!disposed) { disposed = true; scene.disposeCar(model); } };
        setLoaded({ View: scene.default, model });
      } catch (error) { console.error('Optional garage load failed:', error); fail(); }
    });
    return () => {
      active = false; clearTimeout(timeout); controller.abort(); dispose?.();
      failRef.current = () => {}; readyRef.current = () => {};
    };
  }, [eligible, attempt]);

  const onReady = useCallback(() => readyRef.current(), []);
  const onError = useCallback(() => failRef.current(), []);
  const choose = (choice: 'static' | '3d', consent = false) => {
    if (!settings) return;
    try { localStorage.setItem(STORAGE_KEY, choice); } catch { /* Still works for this visit. */ }
    setLoaded(null); setStatus('idle');
    setSettings({ ...settings, choice, consent });
    setAttempt(value => value + 1);
  };
  const effectiveStatus = eligible ? status : 'idle';
  const failed = effectiveStatus === 'failed' || effectiveStatus === 'timed-out';
  let message = 'Static view. Explore at your own pace.';
  if (settings?.reduced && !settings.consent && settings.choice !== 'static') message = 'Motion is off to match your preference.';
  if (eligible) {
    if (status === 'idle' || status === 'loading') message = 'Preparing 3D view. You can keep exploring.';
    if (status === 'ready') message = '3D view. Scroll to change your perspective.';
    if (status === 'failed') message = '3D view is unavailable. You can still explore the page.';
    if (status === 'timed-out') message = '3D is taking a little longer. The static view is ready.';
  }

  return <div className={styles.frame} data-scene-state={effectiveStatus}>
    <div className={styles.caption}><span><strong>44</strong> / Garage study</span><span>First look · 001</span></div>
    <div className={styles.media}>
      {/* An ordinary image is intentional: this is a pre-optimized static export. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.poster} src="/images/garage-poster.webp" alt="" width="1000" height="1200" fetchPriority="high" />
      {eligible && loaded && <div className={styles.canvas} data-ready={status === 'ready'} aria-hidden="true">
        <SceneErrorBoundary key={attempt} onError={onError}><loaded.View model={loaded.model} low={!!settings?.compact} onReady={onReady} onError={onError} /></SceneErrorBoundary>
      </div>}
    </div>
    <div className={styles.controls}>
      <div className={styles.controlRow}><span className={styles.label}>Your perspective</span><div className={styles.switch} role="group" aria-label="Garage view">
        <button type="button" aria-pressed={!eligible || failed} onClick={() => choose('static')}>Static</button>
        <button type="button" aria-pressed={eligible && !failed} onClick={() => choose('3d')}>3D</button>
      </div></div>
      <p className={styles.status} role="status" aria-live="polite">{message}</p>
      {settings?.reduced && !settings.consent && settings.choice === '3d' && <button className={styles.retry} onClick={() => choose('3d', true)}>Enable motion for this visit</button>}
      {failed && <button className={styles.retry} onClick={() => choose('3d', settings?.consent)}>Try 3D again</button>}
    </div>
    <noscript><p className={styles.noscript}>Static view is active. All page content and navigation work without JavaScript.</p></noscript>
  </div>;
}
