"use client";

import { useState } from "react";
import { games } from "@/lib/data";
import type { Game, GameEvent } from "@/lib/data";
import { GameCalendar } from "@/components/game-calendar";
import { GameSelector } from "@/components/game-selector";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Gamepad2 } from "lucide-react";
import { addMonths, subMonths, format } from "date-fns";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedGameId, setSelectedGameId] = useState<string | null>(
    games[0]?.id ?? null
  );

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handleSelectGame = (gameId: string | null) => {
    setSelectedGameId(gameId);
  };

  const displayedEvents: GameEvent[] =
    selectedGameId === null
      ? games.flatMap((game) =>
          game.events.map((event) => ({ ...event, gameId: game.id }))
        )
      : games
          .find((g) => g.id === selectedGameId)
          ?.events.map((event) => ({ ...event, gameId: selectedGameId })) ?? [];
  
  const allGamesWithId = games.map(game => ({...game, events: game.events.map(e => ({...e, gameId: game.id}))}))

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground font-body">
      <aside className="w-full md:w-72 lg:w-80 p-4 md:p-6 border-b md:border-r md:border-b-0 shrink-0 bg-card md:bg-transparent">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">GameTime</h1>
        </div>
        <GameSelector
          games={games}
          selectedGameId={selectedGameId}
          onSelectGame={handleSelectGame}
        />
      </aside>
      <main className="flex-1 p-4 md:p-6 flex flex-col min-h-0">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth} aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth} aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          <GameCalendar
            currentDate={currentDate}
            events={displayedEvents}
            games={allGamesWithId}
          />
        </div>
      </main>
    </div>
  );
}
