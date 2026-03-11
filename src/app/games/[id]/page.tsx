import { notFound } from "next/navigation";
import { getGameById, getAllGameIds } from "@/lib/games";
import GameDetail from "@/components/game-detail";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllGameIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: GamePageProps) {
  const { id } = await params;
  const game = getGameById(id);

  if (!game) {
    return { title: "게임을 찾을 수 없습니다" };
  }

  return {
    title: `${game.title} — Sunday Play`,
    description: game.summary,
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = getGameById(id);

  if (!game) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <GameDetail game={game} />
    </div>
  );
}
