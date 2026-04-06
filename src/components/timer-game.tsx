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
    if (absDiff <= 0.5) return "text-green-400";
    if (absDiff <= 1) return "text-yellow-400";
    return "text-red-400";
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
                <div className="fixed inset-0 z-50 flex flex-col bg-black">
                    <div className="flex items-center justify-between px-5 py-4">
                        <h3 className="text-lg font-bold text-white">시간 맞추기</h3>
                        <button
                            onClick={handleClose}
                            disabled={phase === "running"}
                            className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" x2="6" y1="6" y2="18" />
                                <line x1="6" x2="18" y1="6" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-5">
                        {phase === "idle" && (
                            <>
                                <p className="text-[80px] font-extrabold leading-none tracking-tight text-white">
                                    {target}<span className="text-4xl text-white/40">초</span>
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="w-full max-w-xs rounded-2xl bg-white py-5 text-xl font-bold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
                                >
                                    시작
                                </button>
                            </>
                        )}

                        {phase === "running" && (
                            <>
                                <div className="flex items-center gap-3">
                                    <span className="size-4 animate-pulse rounded-full bg-red-500" />
                                    <p className="text-2xl font-bold text-white">
                                        타이머 작동 중
                                    </p>
                                </div>
                                <p className="text-lg text-white/60">
                                    <span className="font-bold text-white">{target}초</span>라고 생각되면 스탑!
                                </p>
                                <button
                                    onClick={handleStop}
                                    className="size-40 rounded-full bg-red-500 text-2xl font-bold text-white shadow-xl shadow-red-500/30 transition-transform hover:scale-105 active:scale-90"
                                >
                                    STOP
                                </button>
                            </>
                        )}

                        {phase === "result" && (
                            <>
                                <p className="text-[80px] font-extrabold leading-none tracking-tight text-white">
                                    {elapsed}<span className="text-4xl text-white/40">초</span>
                                </p>
                                <p className={`text-2xl font-bold ${getDiffColor(absDiff)}`}>
                                    {formatDiff(absDiff, sign)}
                                </p>
                                <div className="flex w-full max-w-xs items-center gap-2">
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") handleSave();
                                        }}
                                        placeholder="이름 입력"
                                        autoFocus
                                        className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-medium text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white/30"
                                    />
                                    <button
                                        onClick={handleSave}
                                        disabled={!playerName.trim()}
                                        className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-white/90 disabled:opacity-50"
                                    >
                                        기록
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 px-5 pb-6 pt-2">
                        {records.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold text-white/80">순위</h4>
                                    <button
                                        onClick={handleReset}
                                        className="rounded-full px-3 py-1 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
                                    >
                                        초기화
                                    </button>
                                </div>
                                <div className="flex max-h-40 flex-col gap-1 overflow-y-auto">
                                    {records.map((record, index) => (
                                        <div
                                            key={`${record.name}-${index}`}
                                            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm ${
                                                index === 0 ? "bg-yellow-500/15" : "bg-white/5"
                                            }`}
                                        >
                                            <span className={`w-6 text-center text-base font-bold ${
                                                index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : index === 2 ? "text-amber-600" : "text-white/30"
                                            }`}>
                                                {index === 0 ? "\uD83E\uDD47" : index === 1 ? "\uD83E\uDD48" : index === 2 ? "\uD83E\uDD49" : index + 1}
                                            </span>
                                            <span className="flex-1 font-medium text-white">{record.name}</span>
                                            <span className="text-white/40">{record.elapsed}초</span>
                                            <span className={`min-w-[4rem] text-right font-bold ${getDiffColor(record.diff)}`}>
                                                {formatDiff(record.diff, record.sign)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-2">
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
                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                                        target === t && !showCustom
                                            ? "bg-white text-black"
                                            : "bg-white/15 text-white/70 hover:bg-white/25"
                                    } disabled:opacity-40`}
                                >
                                    {t}초
                                </button>
                            ))}
                            {!showCustom ? (
                                <button
                                    onClick={() => setShowCustom(true)}
                                    disabled={phase === "running"}
                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                                        !isPreset && !showCustom
                                            ? "bg-white text-black"
                                            : "bg-white/15 text-white/70 hover:bg-white/25"
                                    } disabled:opacity-40`}
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
                                        className="w-16 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-center text-xs font-semibold text-white outline-none placeholder:text-white/40"
                                    />
                                    <button
                                        onClick={handleCustomSubmit}
                                        className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black"
                                    >
                                        설정
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
