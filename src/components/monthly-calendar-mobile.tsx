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
} from "date-fns";
import { cn } from "@/lib/utils";
import type { GameEvent, Game } from "@/lib/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";

interface MonthlyCalendarMobileProps {
  currentDate: Date;
  events: GameEvent[];
  games: Game[];
}

export function MonthlyCalendarMobile({ currentDate, events, games }: MonthlyCalendarMobileProps) {
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

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
    <div className="space-y-4">
      {/* Month Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

      {/* Days List */}
      <div className="space-y-3">
        {daysInMonth.map((day) => {
          const eventsOnDay = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <Card key={day.toString()} className="p-4">
              {/* Day Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={cn(
                      "h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium",
                      isToday(day) && "bg-primary text-primary-foreground"
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  <div>
                    <p className="font-medium">{format(day, "EEEE")}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(day, "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                {isToday(day) && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    Today
                  </span>
                )}
              </div>

              {/* Events for this day */}
              <div className="space-y-2">
                {eventsOnDay.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No events scheduled
                  </p>
                ) : (
                  eventsOnDay.map((event) => {
                    const game = games.find(g => g.id === event.gameId);
                    const isStart = isSameDay(day, event.startDate);
                    const isEnd = isSameDay(day, event.endDate);

                    return (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div className="p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {game && (
                                    <game.icon className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <h4 className="font-semibold text-sm">{event.name}</h4>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                          </div>
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
            </Card>
          );
        })}
      </div>
    </div>
  );
} 