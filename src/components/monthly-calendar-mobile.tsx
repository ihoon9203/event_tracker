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

  const getEventColor = (colorClass: string) => {
    console.log('Color class:', colorClass); // 디버깅용
    if (colorClass.includes('orange')) return '#f97316';
    if (colorClass.includes('blue')) return '#3b82f6';
    if (colorClass.includes('green')) return '#22c55e';
    if (colorClass.includes('red')) return '#ef4444';
    return '#6b7280'; // default gray
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
                    console.log('Event color:', event.color, 'Event name:', event.name); // 디버깅용

                    return (
                      <Popover key={event.id}>
                        <PopoverTrigger asChild>
                          <div 
                            className={cn(
                              "p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow",
                              event.color
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {game && (
                                    <game.icon className="h-4 w-4" />
                                  )}
                                  <h4 className="font-semibold text-sm">{event.name}</h4>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <span>
                                    {format(event.startDate, "MMM d")} - {format(event.endDate, "MMM d, yyyy")}
                                  </span>
                                  {!isStart && !isEnd && (
                                    <span className="text-xs bg-black/10 px-2 py-1 rounded">
                                      Ongoing
                                    </span>
                                  )}
                                  {isStart && (
                                    <span className="text-xs bg-black/10 px-2 py-1 rounded">
                                      Starts
                                    </span>
                                  )}
                                  {isEnd && (
                                    <span className="text-xs bg-black/10 px-2 py-1 rounded">
                                      Ends
                                    </span>
                                  )}
                                </div>
                              </div>
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