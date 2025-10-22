"use client";

import React, { useState } from "react";
import EventTooltip from "./event_tooltip";

export enum GameType {
  genshin,
  starrail,
  zzz,
  ww,
}

export enum EventType {
  pickup,
  collab,
  goods,
  offline,
}

export interface CalendarEvent {
  title: string;
  startDate: number; // day (1~31)
  endDate: number;   // day (1~31)
  link: string;
  gameType: GameType;
  eventType: EventType;
  address: string;
  lat: number;
  lng: number;
  description: string;
  startTime: string;
  endTime: string;
  image: string;
}

interface CalendarProps {
  year: number;
  month: number; // 1~12
  events: CalendarEvent[];
}

interface CalendarProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  onCellClick?: (day: number, events: CalendarEvent[]) => void;
}

const Calendar: React.FC<CalendarProps> = ({ year, month, events, onCellClick }) => {
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 🎨 색상 팔레트
  const colorPalette = [
    "bg-green-500",
    "bg-blue-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];

  const colorMap = new Map<string, string>();
  const eventRowMap = new Map<string, number>();

  // 트랙(Row) 할당용 Map
  const trackAvailability = new Map<number, number>(); // key: YYYYMMDD, value: row

  // 이벤트 정렬: 시작일 ↑, 길이 ↓
  const sortedEvents = [...events].sort((a, b) => {
    if (a.startDate !== b.startDate) return a.startDate - b.startDate;
    return b.endDate - a.endDate;
  });

  sortedEvents.forEach((e) => {
    let assignedRow = 0;
    for (let row = 0; row < 10; row++) {
      let isRowAvailable = true;
      for (let d = e.startDate; d <= e.endDate; d++) {
        if ((trackAvailability.get(d) ?? 0) > row) {
          isRowAvailable = false;
          break;
        }
      }
      if (isRowAvailable) {
        assignedRow = row;
        for (let d = e.startDate; d <= e.endDate; d++) {
          trackAvailability.set(d, row + 1);
        }
        break;
      }
    }
    eventRowMap.set(e.title, assignedRow);
    colorMap.set(e.title, colorPalette[assignedRow % colorPalette.length]);
  });

  const handleDayClick = (day: number | null) => {
    if (!day) return;
    const cellDateNum = currentYear * 10000 + currentMonth * 100 + day;
    const dayEvents = sortedEvents.filter(
      (e) => e.startDate <= cellDateNum && cellDateNum <= e.endDate
    );
    if (onCellClick) onCellClick(cellDateNum, dayEvents);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 월/연도 헤더 */}
      <div className="flex justify-between items-center mb-2">
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={prevMonth}>◀</button>
        <div className="font-semibold text-lg">{currentYear}년 {currentMonth}월</div>
        <button className="px-2 py-1 bg-gray-200 rounded" onClick={nextMonth}>▶</button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((w, i) => (
          <div key={i} className="text-center font-semibold text-gray-700">{w}</div>
        ))}
      </div>

      {/* 날짜 + 이벤트 원 */}
      <div className="grid grid-cols-7 gap-1 mt-1">
        {calendarDays.map((day, idx) => {
          const cellDateNum = day ? currentYear * 10000 + currentMonth * 100 + day : 0;
          const dayEvents = sortedEvents.filter(
            (e) => day && e.startDate <= cellDateNum && cellDateNum <= e.endDate
          );

          return (
            <div
              key={idx}
              className="min-h-[80px] border border-gray-200 p-1 relative flex flex-col cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleDayClick(day)}
            >
              {day && <div className="text-sm font-medium text-gray-700 mb-1">{day}</div>}

              <div className="flex flex-wrap gap-[3px]">
                {dayEvents.map((e, i) => {
                  const color = colorMap.get(e.title)!;
                  return (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${color}`}
                      title={e.title}
                    ></div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
