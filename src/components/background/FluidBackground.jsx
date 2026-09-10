"use client";

import { useEffect, useRef } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function FluidBackground({ theme }) {
  const iframeRef = useRef(null);
  const isTouch = useMediaQuery("(hover: none) and (pointer: coarse)");

  useEffect(() => {
    if (isTouch) return;

    const handlePointerMove = (event) => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        { type: "fluid-pointer", x: event.clientX, y: event.clientY },
        window.location.origin
      );
    };

    const handleAudio = (event) => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        { type: "fluid-audio", intensity: event.detail.intensity },
        window.location.origin
      );
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("fluid-audio", handleAudio);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("fluid-audio", handleAudio);
    };
  }, [isTouch]);

  return (
    <div className="fixed inset-0 z-0">
      {!isTouch ? (
        <iframe
          ref={iframeRef}
          key={theme}
          src={`/fluid/fluid.html?theme=${theme}`}
          title="fluid background"
          className="h-full w-full border-0"
        />
      ) : null}
      <div className="fluid-overlay absolute inset-0" />
    </div>
  );
}
