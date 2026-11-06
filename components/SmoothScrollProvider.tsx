"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      respectReducedMotion: false,
      lerp: 0.06,
      wheelMultiplier: 0.6,
      overscroll: false,
    });

    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
