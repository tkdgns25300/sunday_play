"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

const PHOTO_COUNT = 25;
const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) => `/images/games/photo-stop/${i + 1}.jpg`);

const SPEED_OPTIONS = [
    { label: "느리게", value: 300 },
    { label: "보통", value: 150 },
    { label: "빠르게", value: 80 },
    { label: "매우 빠르게", value: 40 },
];

export default function PhotoStopGame() {
    const [isOpen, setIsOpen] = useState(false);
    const [phase, setPhase] = useState<"idle" | "running" | "result">("idle");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stoppedSrc, setStoppedSrc] = useState<string | null>(null);
    const [speed, setSpeed] = useState(150);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const handleStart = useCallback(() => {
        setPhase("running");
        setStoppedSrc(null);
        let idx = Math.floor(Math.random() * PHOTOS.length);
        intervalRef.current = setInterval(() => {
            idx = (idx + 1) % PHOTOS.length;
            setCurrentIndex(idx);
        }, speed);
    }, [speed]);

    const handleStop = useCallback(() => {
        stopInterval();
        setStoppedSrc(PHOTOS[currentIndex]);
        setPhase("result");
    }, [currentIndex, stopInterval]);

    const handleNext = useCallback(() => {
        setPhase("idle");
        setStoppedSrc(null);
    }, []);

    const handleClose = useCallback(() => {
        if (phase === "running") return;
        stopInterval();
        setIsOpen(false);
    }, [phase, stopInterval]);

    useEffect(() => {
        return () => stopInterval();
    }, [stopInterval]);

    const displaySrc = phase === "result" && stoppedSrc ? stoppedSrc : PHOTOS[currentIndex];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-left text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            >
                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-bold">사진 스탑 게임하기</p>
                        <p className="text-sm opacity-80">
                            사진을 멈춰 사람이 가장 많은 사진을 찾아보세요
                        </p>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 opacity-60 transition-transform group-hover:translate-x-1">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3"
                    onClick={handleClose}
                >
                    <div
                        className="flex w-full max-w-lg flex-col rounded-3xl bg-background shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-border px-6 py-4">
                            <h3 className="text-lg font-bold">사진 스탑</h3>
                            <button
                                onClick={handleClose}
                                disabled={phase === "running"}
                                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" x2="6" y1="6" y2="18" />
                                    <line x1="6" x2="18" y1="6" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col gap-5 p-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-medium text-muted-foreground">전환 속도</p>
                                <div className="flex flex-wrap gap-2">
                                    {SPEED_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => setSpeed(opt.value)}
                                            disabled={phase === "running"}
                                            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                                                speed === opt.value
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            } disabled:opacity-50`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                                <Image
                                    src={displaySrc}
                                    alt="게임 사진"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 512px) 100vw, 512px"
                                    priority
                                />
                                {phase === "running" && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="rounded-full bg-black/50 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
                                            사진이 넘어가는 중...
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                {phase === "idle" && (
                                    <button
                                        onClick={handleStart}
                                        className="w-full rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
                                    >
                                        시작
                                    </button>
                                )}

                                {phase === "running" && (
                                    <button
                                        onClick={handleStop}
                                        className="w-full rounded-xl bg-red-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
                                    >
                                        STOP
                                    </button>
                                )}

                                {phase === "result" && (
                                    <button
                                        onClick={handleNext}
                                        className="w-full rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
                                    >
                                        다음 도전
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
