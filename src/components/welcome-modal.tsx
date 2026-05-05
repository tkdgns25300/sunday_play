"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { WELCOME_CREDITS } from "@/constants/credit";

const STORAGE_KEY = "welcome-modal-dismissed";

export default function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissChecked, setIsDismissChecked] = useState(false);

  useEffect(() => {
    async function check() {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed === new Date().toISOString().slice(0, 10)) return;

      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session) return;

      setIsVisible(true);
    }
    check();
  }, []);

  function close() {
    if (isDismissChecked) {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString().slice(0, 10));
    }
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        className="relative w-full max-w-sm animate-in fade-in zoom-in-95 rounded-2xl border border-border bg-background shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col items-center gap-5 p-8 pt-10">
          <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25">
            <span className="text-3xl font-black text-white">C</span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-xl font-bold">
              가입만 해도{" "}
              <span className="text-amber-500">{WELCOME_CREDITS.toLocaleString()} 크레딧</span>
              {" "}무료!
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              지금 가입하고 게임 진행 자료를
              <br />
              바로 다운로드해보세요.
            </p>
          </div>

          <Link
            href="/login"
            onClick={() => setIsVisible(false)}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98]"
          >
            가입하고 크레딧 받기
          </Link>
        </div>

        <div className="border-t border-border px-8 py-3">
          <label className="flex cursor-pointer items-center justify-center gap-2">
            <div
              className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                isDismissChecked
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input"
              }`}
              onClick={() => setIsDismissChecked(!isDismissChecked)}
            >
              {isDismissChecked && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span
              className="text-xs text-muted-foreground"
              onClick={() => setIsDismissChecked(!isDismissChecked)}
            >
              오늘 하루 보지 않기
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
