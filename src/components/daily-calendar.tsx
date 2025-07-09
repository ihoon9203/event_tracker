"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfMonth,
  addDays,
  subDays,
} from "date-fns";
import { cn } from "@/lib/utils";
import type { GameEvent, Game } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DailyCalendarProps {
  currentDate: Date;
  events: GameEvent[];
  games: Game[];
  onDateChange: (date: Date) => void;
}

export function DailyCalendar({ currentDate, events, games, onDateChange }: DailyCalendarProps) {
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

  const handlePrevDay = () => {
    onDateChange(subDays(currentDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(currentDate, 1));
  };

  const eventsOnDay = getEventsForDay(currentDate);

  return (
    <div className="space-y-4">
      {/* Day Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={handlePrevDay}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <h3 className="text-lg font-semibold">
            {format(currentDate, "EEEE, MMMM d")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {format(currentDate, "yyyy")}
          </p>
        </div>
        <Button variant="outline" size="icon" onClick={handleNextDay}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Today Indicator */}
      <div className="flex items-center justify-center">
        <div className={cn(
          "px-4 py-2 rounded-full text-sm font-medium",
          isToday(currentDate) 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
        )}>
          {isToday(currentDate) ? "Today" : format(currentDate, "EEEE")}
        </div>
      </div>

      {/* Events for the day */}
      <div className="space-y-3">
        {eventsOnDay.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">No events scheduled for this day</p>
          </Card>
        ) : (
          eventsOnDay.map((event) => {
            const game = games.find(g => g.id === event.gameId);
            const isStart = isSameDay(currentDate, event.startDate);
            const isEnd = isSameDay(currentDate, event.endDate);

            return (
              <Popover key={event.id}>
                <PopoverTrigger asChild>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {game && (
                            <game.icon className="h-4 w-4 text-muted-foreground" />
                          )}
                          <h4 className="font-semibold">{event.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>
                            {format(event.startDate, "MMM d")} - {format(event.endDate, "MMM d, yyyy")}
                          </span>
                          {!isStart && !isEnd && (
                            <span className="text-xs bg-muted px-2 py-1 rounded">
                              Ongoing
                            </span>
                          )}
                          {isStart && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Starts
                            </span>
                          )}
                          {isEnd && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Ends
                            </span>
                          )}
                        </div>
                      </div>
                      <div 
                        className={cn(
                          "w-3 h-3 rounded-full ml-2 flex-shrink-0",
                          event.color
                        )}
                      />
                    </div>
                  </Card>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-3">
                    <h4 className="font-semibold">{event.name}</h4>
                    {game && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <game.icon className="h-4 w-4" />
                        <span>{game.name}</span>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Start:</span> {format(event.startDate, "EEEE, MMMM d, yyyy")}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">End:</span> {format(event.endDate, "EEEE, MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })
        )}
      </div>
    </div>
  );
} 