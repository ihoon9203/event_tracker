"use client";

import type { Game } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { CheckCircle2, List } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface GameSelectorProps {
  games: Game[];
  selectedGameId: string | null;
  onSelectGame: (id: string | null) => void;
}

export function GameSelector({
  games,
  selectedGameId,
  onSelectGame,
}: GameSelectorProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold mb-3 px-1">Games</h2>
      <ScrollArea className="h-[calc(100vh-200px)] md:h-auto">
        <div className="space-y-2 pr-4">
          <Card
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
              !selectedGameId
                ? "border-primary ring-2 ring-primary/50 shadow-lg"
                : "border-border"
            )}
            onClick={() => onSelectGame(null)}
          >
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <List className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">All Games</span>
              </div>
              {!selectedGameId && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </div>
          </Card>
          {games.map((game) => (
            <Card
              key={game.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-lg hover:border-primary/50",
                selectedGameId === game.id
                  ? "border-primary ring-2 ring-primary/50 shadow-lg"
                  : "border-border"
              )}
              onClick={() => onSelectGame(game.id)}
            >
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <game.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">{game.name}</span>
                </div>
                {selectedGameId === game.id && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
