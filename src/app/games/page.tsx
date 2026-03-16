import GameList from "@/components/game-list";

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">게임 찾기</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          대상, 인원, 장소 등 상황에 맞는 게임을 찾아보세요.
        </p>
      </div>
      <GameList />
    </div>
  );
}
