import { useEffect, useRef } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/* One shared scroll/resize listener for every scroll-linked effect: each
   subscriber runs at most once per animation frame, and writes styles
   directly to the DOM so scrolling never triggers a React render. */
const subscribers = new Set();
let frame = 0;

const run = () => {
  frame = 0;
  const vh = window.innerHeight;
  subscribers.forEach(fn => fn(vh));
};
const schedule = () => { if (!frame) frame = requestAnimationFrame(run); };

let listening = false;
const listen = () => {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
};

/**
 * Calls `fn(el, viewportHeight)` whenever the page scrolls or resizes.
 * Skipped entirely under prefers-reduced-motion — the CSS must render the
 * resting state on its own.
 */
export function useScrollFrame(fn) {
  const ref = useRef(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const sub = vh => fnRef.current(el, vh);
    subscribers.add(sub);
    listen();
    schedule();
    return () => { subscribers.delete(sub); };
  }, []);

  return ref;
}

/** Pulls the element a fraction of the way towards the pointer. */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const move = e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const leave = () => { el.style.transform = ''; };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return ref;
}

/** Tilts the element in 3D following the pointer (exposes --rx / --ry). */
export function useTilt(max = 6) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const move = e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${-py * max}deg`);
      el.style.setProperty('--ry', `${px * max}deg`);
      el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
      el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
    };
    const leave = () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [max]);

  return ref;
}
