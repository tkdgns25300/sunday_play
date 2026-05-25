"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackSignUp } from "@/lib/analytics";

export default function SignupTracker() {
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("welcome") === "1") {
      trackSignUp("google");
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.toString());
    }
  }, [params]);

  return null;
}
