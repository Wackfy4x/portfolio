import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Adds `.is-visible` to the ref'd element the first time it enters the
 * viewport, then stops observing. Single IntersectionObserver per element,
 * no scroll listeners — cheap, and it never re-triggers.
 */
export function useReveal(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/**
 * Same idea, but calls `onReveal` once instead of toggling a class —
 * used to kick off a count-up animation exactly once.
 */
export function useRevealOnce(onReveal, options) {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      if (!fired.current) { fired.current = true; onReveal(); }
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          onReveal();
          io.unobserve(el);
        }
      },
      { threshold: 0.4, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
