"use client";

import { useState } from "react";
import Calendar, { CalendarEvent, EventType, GameType } from "./calendar";
import EventCardList from "./event_card_list";

const page = () => {
    const events: CalendarEvent[] = [
        { title: "명조 갈브레나 픽업", startDate: 20250904, endDate: 20251012, description: "명조 갈브레나 픽업 일정", eventType: EventType.pickup, gameType: GameType.ww, startTime: "14:00", endTime: "18:00", link: "https://genshin.mihoyo.com/event/honkai4/comingsoon", address: "배포", lat: 37.566535, lng: 126.977969, image:  'https://picsum.photos/200/300'},
        { title: "명조 갈브레나 픽업2", startDate: 20251008, endDate: 20251025, description: "명조 갈브레나 픽업 일정", eventType: EventType.pickup, gameType: GameType.ww, startTime: "14:00", endTime: "18:00", link: "https://genshin.mihoyo.com/event/honkai4/comingsoon", address: "배포", lat: 37.566535, lng: 126.977969, image: 'https://picsum.photos/200/300' },
        { title: "명조 갈브레나 픽업3", startDate: 20251010, endDate: 20251019, description: "명조 갈브레나 픽업 일정", eventType: EventType.pickup, gameType: GameType.ww, startTime: "14:00", endTime: "18:00", link: "https://genshin.mihoyo.com/event/honkai4/comingsoon", address: "배포", lat: 37.566535, lng: 126.977969, image: 'https://picsum.photos/200/300'},
        
    ];
    // 선택한 날짜의 이벤트 상태
    const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

    const handleCellClick = (day: number, dayEvents: CalendarEvent[]) => {
        setSelectedEvents(dayEvents);
    }

    return ( 
        <div className="pageContent">
            <Calendar year={2025} month={10} events={events} onCellClick={handleCellClick} />
            <EventCardList cards={selectedEvents} />
        </div>
    );
}
 
export default page;