"use client";

import { useState, useRef, useCallback } from "react";

type PlayerRecord = {
    name: string;
    elapsed: number;
    diff: number;
    sign: "+" | "-" | "0";
};

const PRESET_OPTIONS = [5, 10, 15, 30];

function getDiffColor(absDiff: number) {
    if (absDiff <= 0.5) return "text-green-600 dark:text-green-400";
    if (absDiff <= 1) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-500";
}

function getDiffBg(absDiff: number) {
    if (absDiff <= 0.5) return "bg-green-50 dark:bg-green-900/20";
    if (absDiff <= 1) return "bg-yellow-50 dark:bg-yellow-900/20";
    return "bg-red-50 dark:bg-red-900/20";
}

function formatDiff(diff: number, sign: "+" | "-" | "0") {
    if (sign === "0") return "0초";
    return `${sign}${diff}초`;
}

export default function TimerGame() {
    const [isOpen, setIsOpen] = useState(false);
    const [target, setTarget] = useState(10);
    const [customInput, setCustomInput] = useState("");
    const [showCustom, setShowCustom] = useState(false);
    const [phase, setPhase] = useState<"idle" | "running" | "result">("idle");
    const [elapsed, setElapsed] = useState(0);
    const [playerName, setPlayerName] = useState("");
    const [records, setRecords] = useState<PlayerRecord[]>([]);
    const startTimeRef = useRef(0);

    const rawDiff = Math.round((elapsed - target) * 100) / 100;
    const absDiff = Math.abs(rawDiff);
    const sign: "+" | "-" | "0" = rawDiff > 0 ? "+" : rawDiff < 0 ? "-" : "0";

    const handleStart = useCallback(() => {
        startTimeRef.current = Date.now();
        setPhase("running");
        setElapsed(0);
    }, []);

    const handleStop = useCallback(() => {
        const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
        setElapsed(Math.round(elapsedSec * 100) / 100);
        setPhase("result");
    }, []);

    const handleSave = useCallback(() => {
        if (!playerName.trim()) return;
        const diff = Math.round(Math.abs(elapsed - target) * 100) / 100;
        const s: "+" | "-" | "0" =
            elapsed > target ? "+" : elapsed < target ? "-" : "0";
        setRecords((prev) =>
            [...prev, { name: playerName.trim(), elapsed, diff, sign: s }].sort(
                (a, b) => a.diff - b.diff
            )
        );
        setPlayerName("");
        setPhase("idle");
    }, [playerName, elapsed, target]);

    const handleReset = useCallback(() => {
        setRecords([]);
        setPhase("idle");
        setElapsed(0);
        setPlayerName("");
    }, []);

    const handleClose = useCallback(() => {
        if (phase === "running") return;
        setIsOpen(false);
    }, [phase]);

    const handleCustomSubmit = useCallback(() => {
        const val = Number(customInput);
        if (val > 0 && val <= 300) {
            setTarget(val);
            setPhase("idle");
            setElapsed(0);
            setShowCustom(false);
            setCustomInput("");
        }
    }, [customInput]);

    const isPreset = PRESET_OPTIONS.includes(target);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-left text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            >
                <div className="relative z-10 flex items-center gap-4">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/20">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-lg font-bold">타이머로 게임하기</p>
                        <p className="text-sm opacity-80">
                            목표 시간에 맞춰 감각으로 도전해보세요
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
                            <h3 className="text-lg font-bold">시간 맞추기</h3>
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

                        <div className="flex flex-col gap-6 p-6">
                            <div className="flex flex-col gap-2">
                                <p className="text-xs font-medium text-muted-foreground">
                                    목표 시간
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    {PRESET_OPTIONS.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => {
                                                setTarget(t);
                                                setShowCustom(false);
                                                setPhase("idle");
                                                setElapsed(0);
                                            }}
                                            disabled={phase === "running"}
                                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                                                target === t && !showCustom
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            } disabled:opacity-50`}
                                        >
                                            {t}초
                                        </button>
                                    ))}
                                    {!showCustom ? (
                                        <button
                                            onClick={() => setShowCustom(true)}
                                            disabled={phase === "running"}
                                            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                                                !isPreset && !showCustom
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                            } disabled:opacity-50`}
                                        >
                                            {!isPreset ? `${target}초` : "직접 입력"}
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="number"
                                                value={customInput}
                                                onChange={(e) => setCustomInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") handleCustomSubmit();
                                                    if (e.key === "Escape") setShowCustom(false);
                                                }}
                                                placeholder="초"
                                                min={1}
                                                max={300}
                                                autoFocus
                                                className="w-20 rounded-full border border-border bg-background px-3 py-2 text-center text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <button
                                                onClick={handleCustomSubmit}
                                                className="rounded-full bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
                                            >
                                                설정
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex min-h-[280px] flex-col items-center justify-center gap-5 rounded-2xl bg-muted/40">
                                {phase === "idle" && (
                                    <>
                                        <p className="text-6xl font-extrabold tracking-tight text-foreground">
                                            {target}<span className="text-3xl font-bold text-muted-foreground">초</span>
                                        </p>
                                        <button
                                            onClick={handleStart}
                                            className="mt-2 rounded-full bg-primary px-12 py-4 text-lg font-bold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:brightness-110 active:scale-95"
                                        >
                                            시작
                                        </button>
                                    </>
                                )}

                                {phase === "running" && (
                                    <>
                                        <div className="flex items-center gap-2.5">
                                            <span className="size-3 animate-pulse rounded-full bg-red-500" />
                                            <p className="text-xl font-bold text-foreground">
                                                타이머 작동 중
                                            </p>
                                        </div>
                                        <p className="text-muted-foreground">
                                            <span className="font-bold text-foreground">{target}초</span>라고 생각되면 스탑!
                                        </p>
                                        <button
                                            onClick={handleStop}
                                            className="mt-2 size-32 rounded-full bg-red-500 text-xl font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-90"
                                        >
                                            STOP
                                        </button>
                                    </>
                                )}

                                {phase === "result" && (
                                    <>
                                        <p className="text-6xl font-extrabold tracking-tight text-foreground">
                                            {elapsed}<span className="text-3xl font-bold text-muted-foreground">초</span>
                                        </p>
                                        <div className={`rounded-full px-5 py-1.5 ${getDiffBg(absDiff)}`}>
                                            <p className={`text-lg font-bold ${getDiffColor(absDiff)}`}>
                                                {formatDiff(absDiff, sign)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <input
                                                type="text"
                                                value={playerName}
                                                onChange={(e) => setPlayerName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") handleSave();
                                                }}
                                                placeholder="이름 입력"
                                                autoFocus
                                                className="w-36 rounded-xl border border-border bg-background px-4 py-3 text-center text-sm font-medium outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <button
                                                onClick={handleSave}
                                                disabled={!playerName.trim()}
                                                className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                                            >
                                                기록
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {records.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold">순위</h4>
                                        <button
                                            onClick={handleReset}
                                            className="rounded-full px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                        >
                                            초기화
                                        </button>
                                    </div>
                                    <div className="flex max-h-52 flex-col gap-1.5 overflow-y-auto">
                                        {records.map((record, index) => (
                                            <div
                                                key={`${record.name}-${index}`}
                                                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm ${
                                                    index === 0
                                                        ? "bg-yellow-50 dark:bg-yellow-900/20"
                                                        : "bg-muted/30"
                                                }`}
                                            >
                                                <span
                                                    className={`w-6 text-center text-base font-bold ${
                                                        index === 0
                                                            ? "text-yellow-500"
                                                            : index === 1
                                                              ? "text-gray-400"
                                                              : index === 2
                                                                ? "text-amber-700 dark:text-amber-600"
                                                                : "text-muted-foreground"
                                                    }`}
                                                >
                                                    {index === 0 ? "\uD83E\uDD47" : index === 1 ? "\uD83E\uDD48" : index === 2 ? "\uD83E\uDD49" : index + 1}
                                                </span>
                                                <span className="flex-1 font-medium">
                                                    {record.name}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {record.elapsed}초
                                                </span>
                                                <span className={`min-w-[4rem] text-right font-bold ${getDiffColor(record.diff)}`}>
                                                    {formatDiff(record.diff, record.sign)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
