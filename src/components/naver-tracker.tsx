"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackNaverPageView } from "@/lib/analytics";

export default function NaverTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackNaverPageView();
  }, [pathname]);

  return null;
}
