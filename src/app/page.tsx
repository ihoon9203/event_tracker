"use client";

import { useState } from "react";
import { games } from "@/lib/data";
import type { Game, GameEvent } from "@/lib/data";
import { GameCalendar } from "@/components/game-calendar";
import { DailyCalendar } from "@/components/daily-calendar";
import { MonthlyCalendarMobile } from "@/components/monthly-calendar-mobile";
import { GameSelector } from "@/components/game-selector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Gamepad2, Menu } from "lucide-react";
import { addMonths, subMonths, format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground font-body">
        {/* Mobile App Bar */}
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">GameTime</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Games</h2>
                <GameSelector
                  games={games}
                  selectedGameId={selectedGameId}
                  onSelectGame={handleSelectGame}
                />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Mobile Calendar View */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <header className="flex items-center justify-between mb-4">
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
            <MonthlyCalendarMobile
              currentDate={currentDate}
              events={displayedEvents}
              games={allGamesWithId}
            />
          </div>
        </main>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground font-body">
      <aside className="w-full md:w-72 lg:w-80 p-2 md:p-6 border-b md:border-r md:border-b-0 shrink-0 bg-card md:bg-transparent">
        <div className="flex items-center gap-3 mb-3 md:mb-8">
          <Gamepad2 className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold text-primary">GameTime</h1>
        </div>
        <GameSelector
          games={games}
          selectedGameId={selectedGameId}
          onSelectGame={handleSelectGame}
        />
      </aside>
      <main className="flex-1 p-2 md:p-6 flex flex-col min-h-0">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4 mb-2 md:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="flex items-center gap-1 md:gap-2">
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
