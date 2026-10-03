'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { BoxGeometry, CylinderGeometry, Mesh, SRGBColorSpace, Vector3, type Group, type Material } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SceneProps } from './SceneBoundary';
import { sectionProgress } from './policy';

export async function loadCar(signal: AbortSignal): Promise<Group> {
  const response = await fetch('/models/placeholder-car.gltf', { signal });
  if (!response.ok) throw new Error('Car request failed');
  const text = await response.text();
  signal.throwIfAborted();
  const model = await new GLTFLoader().parseAsync(text, '/models/');
  if (signal.aborted) { disposeCar(model.scene); signal.throwIfAborted(); }
  return model.scene;
}

export function disposeCar(model: Group) {
  const geometries = new Set<BoxGeometry>();
  const materials = new Set<Material>();
  model.traverse(object => {
    if (object instanceof Mesh) {
      geometries.add(object.geometry);
      (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
    }
  });
  geometries.forEach(geometry => geometry.dispose());
  materials.forEach(material => material.dispose());
}

// One progress ref, one camera writer. No smoothing, history writes, or scroll interception.
function CameraRig({ onReady, onError }: Pick<SceneProps, 'onReady' | 'onError'>) {
  const { invalidate, gl } = useThree();
  const progress = useRef(0);
  const ready = useRef(false);
  const frameCount = useRef(0);
  const target = useRef(new Vector3());

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = document.getElementById('hero');
    const projects = document.getElementById('projects');
    if (!hero || !projects) return;
    let start = 0, end = 1;
    let refreshFrame = 0;
    const update = () => {
      const next = sectionProgress(window.scrollY, start, end);
      if (next === progress.current) return;
      progress.current = next;
      if (!document.hidden) invalidate();
    };
    const onVisibility = () => { update(); if (!document.hidden) invalidate(); };
    const measure = () => {
      start = hero.getBoundingClientRect().top + window.scrollY - 96;
      end = projects.getBoundingClientRect().top + window.scrollY - 96;
      update();
    };
    const trigger = ScrollTrigger.create({ trigger: hero, start: 'top top', endTrigger: projects, end: 'top top', onUpdate: update, onRefresh: measure });
    const schedule = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => { measure(); trigger.refresh(); });
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.getElementById('main')!);
    const lost = (event: Event) => { event.preventDefault(); onError(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', schedule);
    // Native jump/restore updates even outside the ScrollTrigger's active range.
    window.addEventListener('scroll', update, { passive: true });
    let active = true;
    void document.fonts.ready.then(() => { if (active) schedule(); });
    measure();
    return () => {
      active = false; cancelAnimationFrame(refreshFrame); observer.disconnect(); trigger.kill();
      gl.domElement.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', schedule); window.removeEventListener('scroll', update);
    };
  }, [gl, invalidate, onError]);

  useFrame(({ gl, camera, scene }) => {
    if (document.hidden || gl.getContext().isContextLost()) return;
    const p = progress.current;
    // Meter-scale greybox: the car points +Z. Both shots stay inside the shell.
    camera.position.set(8 + p * 1.5, 4.2 - p * .8, -10 + p * 14);
    target.current.set(-.3 + p * .3, .65, p * 1.4);
    camera.lookAt(target.current);
    try {
      gl.render(scene, camera);
      // Small diagnostics enable deterministic scroll/idle tests without React frame state.
      gl.domElement.dataset.progress = p.toFixed(4);
      gl.domElement.dataset.frames = String(++frameCount.current);
      gl.domElement.dataset.drawCalls = String(gl.info.render.calls);
      gl.domElement.dataset.triangles = String(gl.info.render.triangles);
      if (!ready.current) { ready.current = true; queueMicrotask(onReady); }
    } catch { queueMicrotask(onError); }
  }, 1);
  return null;
}

function Garage() {
  // Shared primitives keep this original greybox small and cheap to draw.
  const box = useMemo(() => new BoxGeometry(1, 1, 1), []);
  const cylinder = useMemo(() => new CylinderGeometry(1, 1, 1, 16), []);
  useEffect(() => () => { box.dispose(); cylinder.dispose(); }, [box, cylinder]);
  return <group>
    <mesh position={[0, -.15, 4]} scale={[24, .3, 32]}><boxGeometry /><meshStandardMaterial color="#55564b" roughness={.94} /></mesh>
    <mesh position={[0, 3, 19]} scale={[24, 6, .3]}><boxGeometry /><meshStandardMaterial color="#42473f" roughness={.85} /></mesh>
    <mesh position={[-12, 3, 4]} scale={[.3, 6, 32]}><boxGeometry /><meshStandardMaterial color="#343b36" roughness={.9} /></mesh>
    {[-9, -3, 3, 9].map(x => <group key={x}>
      <mesh geometry={box} position={[x, 2.25, 18.7]} scale={[5.4, 4.5, .15]}><meshStandardMaterial color="#252e2b" roughness={.8} /></mesh>
      <mesh geometry={box} position={[x, 4.65, 18.4]} scale={[4.5, .08, .12]}><meshBasicMaterial color="#eddab0" /></mesh>
      {[1, 2, 3, 4].map(y => <mesh key={y} geometry={box} position={[x, y, 18.55]} scale={[5.2, .025, .03]}><meshStandardMaterial color="#596158" /></mesh>)}
    </group>)}
    {[-7, 0, 7].map(z => <group key={z}>
      <mesh geometry={box} position={[-11.8, 3, z]} scale={[.45, 6, .5]}><meshStandardMaterial color="#7b7c6c" /></mesh>
      <mesh geometry={box} position={[0, 5.9, z]} scale={[24, .18, .2]}><meshStandardMaterial color="#52584c" /></mesh>
      <mesh geometry={box} position={[1, 5.7, z]} scale={[7, .04, .14]}><meshBasicMaterial color="#f1dfb2" /></mesh>
    </group>)}
    {[-2.1, 2.1].map(x => <mesh key={x} geometry={box} position={[x, .012, 0]} scale={[.05, .012, 7.8]}><meshBasicMaterial color="#d3bd80" /></mesh>)}
    {[-3.9, 3.9].map(z => <mesh key={z} geometry={box} position={[0, .012, z]} scale={[4.25, .012, .05]}><meshBasicMaterial color="#d3bd80" /></mesh>)}
    <mesh geometry={cylinder} position={[0, .008, 0]} scale={[2, .01, 3.8]}><meshBasicMaterial color="#242923" transparent opacity={.5} /></mesh>
    <group position={[-7, 0, 5]}>
      <mesh geometry={box} position={[0, .8, 0]} scale={[3, 1.6, 1.2]}><meshStandardMaterial color="#6c7565" roughness={.7} /></mesh>
      <mesh geometry={box} position={[0, 1.65, 0]} scale={[3.2, .1, 1.4]}><meshStandardMaterial color="#bab5a0" /></mesh>
    </group>
  </group>;
}

export default function ExperienceCanvas({ model, onReady, onError, low }: SceneProps) {
  return <Canvas frameloop="demand" dpr={[1, low ? 1 : 1.25]} camera={{ position: [8, 4.2, -10], fov: 44, near: .1, far: 75 }}
    gl={{ antialias: !low, alpha: false, powerPreference: 'low-power' }}
    onCreated={({ gl }) => { gl.outputColorSpace = SRGBColorSpace; }}
    fallback={<span>3D is unavailable. Use Static view to keep exploring.</span>}>
    <color attach="background" args={['#303b35']} />
    <fog attach="fog" args={['#303b35', 15, 42]} />
    <hemisphereLight args={['#c9dcdb', '#6a5541', 2.4]} />
    <directionalLight position={[4, 7, -4]} color="#ffdfb2" intensity={3.5} />
    <directionalLight position={[-6, 5, 7]} color="#b2cccb" intensity={1.4} />
    <Garage />
    <primitive object={model} dispose={null} />
    <CameraRig onReady={onReady} onError={onError} />
  </Canvas>;
}

