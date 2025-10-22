"use client";

import React from "react";
import styles from "./cardgrid.module.scss";
import { CalendarEvent } from "./calendar";

interface EventCardListProps {
  cards: CalendarEvent[];
}

const EventCardList: React.FC<EventCardListProps> = ({ cards }) => {
    cards.forEach((event) => console.log(event));
  return (
    <main className={styles.pageContent} style={{ minHeight: "200px", width: "1000px" }}>
      {cards.map((event, idx) => (
        <div className={styles.card} key={idx} style={{
            backgroundImage: event.image ? `url(${event.image})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
          <div className={styles.content}>
            <h2 className={styles.title}>{event.title}</h2>
            <p className={styles.copy}>{event.description}</p>
            <p className={styles.copy}>
              {event.startTime} ~ {event.endTime}
            </p>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <button className={styles.btn}>바로가기</button>
            </a>
          </div>
        </div>
      ))}
    </main>
  );
};

export default EventCardList;
