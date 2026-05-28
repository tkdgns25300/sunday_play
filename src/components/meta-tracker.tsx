"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPageView } from "@/lib/analytics";

export default function MetaTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackMetaPageView();
  }, [pathname]);

  return null;
}
