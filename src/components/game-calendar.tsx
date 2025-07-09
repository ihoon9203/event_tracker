"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { cn } from "@/lib/utils";
import type { GameEvent, Game } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface GameCalendarProps {
  currentDate: Date;
  events: GameEvent[];
  games: Game[];
}

export function GameCalendar({ currentDate, events, games }: GameCalendarProps) {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth),
    end: endOfWeek(lastDayOfMonth),
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getEventsForDay = (day: Date) => {
    return events
      .filter((event) =>
        isWithinInterval(day, {
          start: event.startDate,
          end: event.endDate,
        })
      )
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg shadow-sm border">
      {/* Fixed Header */}
      <div className="grid grid-cols-7 border-b shrink-0">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      {/* Scrollable Calendar Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-7 min-h-full">
          {daysInMonth.map((day, i) => {
            const eventsOnDay = getEventsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <div
                key={day.toString()}
                className={cn(
                  "border-r border-b p-2 flex flex-col gap-1 min-h-[120px]",
                  !isCurrentMonth && "bg-muted/50 text-muted-foreground",
                  (i + 1) % 7 === 0 && "border-r-0"
                )}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    "h-6 w-6 flex items-center justify-center rounded-full text-sm shrink-0",
                    isToday(day) && "bg-primary text-primary-foreground font-bold"
                  )}
                >
                  {format(day, "d")}
                </time>
                <div className="flex-1 space-y-1 overflow-y-auto">
                  {eventsOnDay.map((event) => {
                    const isStart = isSameDay(day, event.startDate);
                    const isEnd = isSameDay(day, event.endDate);
                    const game = games.find(g => g.id === event.gameId);

                    return (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div
                            className={cn(
                              "text-xs p-1 font-medium cursor-pointer transition-transform hover:scale-105",
                              event.color,
                              isStart || i % 7 === 0 ? "rounded-l-md" : "",
                              isEnd || (i + 1) % 7 === 0 ? "rounded-r-md" : "",
                               !isStart && i % 7 !== 0 && "rounded-l-none",
                               !isEnd && (i + 1) % 7 !== 0 && "rounded-r-none",
                               (isStart || i % 7 === 0) && (isEnd || (i + 1) % 7 === 0) && "rounded-md"
                            )}
                          >
                            {(isStart || i % 7 === 0) && (
                              <p className="truncate">{event.name}</p>
                            )}
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-60">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{event.name}</h4>
                            {game && (
                               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                 <game.icon className="h-4 w-4" />
                                 <span>{game.name}</span>
                               </div>
                            )}
                            <p className="text-sm">
                              {format(event.startDate, "MMM d")} - {" "}
                              {format(event.endDate, "MMM d, yyyy")}
                            </p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
