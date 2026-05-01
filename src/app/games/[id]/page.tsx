import { notFound } from "next/navigation";
import { getGameById, getAllGameIds } from "@/lib/games";
import GameDetailGate from "@/components/game-detail-gate";

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
    openGraph: {
      title: `${game.title} — Sunday Play`,
      description: game.description,
      url: `https://sundayplay.life/games/${id}`,
      siteName: "Sunday Play",
      images: [
        {
          url: `https://sundayplay.life${game.thumbnailUrl}`,
          width: 2752,
          height: 1536,
          alt: game.title,
        },
      ],
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} — Sunday Play`,
      description: game.summary,
      images: [`https://sundayplay.life${game.thumbnailUrl}`],
    },
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
      <GameDetailGate game={game} />
    </div>
  );
}
