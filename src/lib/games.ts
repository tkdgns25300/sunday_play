import { games } from "@/data/games";

export function getGameById(id: string) {
  return games.find((game) => game.id === id) ?? null;
}

export function getAllGameIds() {
  return games.map((game) => game.id);
}
