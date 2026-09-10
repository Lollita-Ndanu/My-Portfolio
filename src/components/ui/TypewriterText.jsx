"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function TypewriterText({ text, speed = 45, deleteSpeed = 60, holdMs = 7000, gapMs = 300 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;

    let delay;
    if (!deleting && count < text.length) {
      delay = speed;
    } else if (!deleting && count >= text.length) {
      delay = holdMs;
    } else if (deleting && count > 0) {
      delay = deleteSpeed;
    } else {
      delay = gapMs;
    }

    const id = setTimeout(() => {
      if (!deleting && count < text.length) {
        setCount((c) => c + 1);
      } else if (!deleting && count >= text.length) {
        setDeleting(true);
      } else if (deleting && count > 0) {
        setCount((c) => c - 1);
      } else {
        setDeleting(false);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [inView, reduce, count, deleting, speed, deleteSpeed, holdMs, gapMs, text.length]);

  const typed = reduce || !inView ? text : text.slice(0, count);
  const showCaret = !reduce && inView;

  return (
    <span ref={ref}>
      {typed}
      {showCaret ? <span className="typewriter-caret" aria-hidden="true" /> : null}
    </span>
  );
}
