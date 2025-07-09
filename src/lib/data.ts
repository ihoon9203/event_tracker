import {
  Rocket,
  Swords,
  Car,
  Puzzle,
  Trophy,
  Castle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { addDays, subDays } from "date-fns";

export type GameEvent = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
  gameId?: string;
};

export type Game = {
  id: string;
  name: string;
  icon: LucideIcon;
  events: GameEvent[];
};

const today = new Date();
const eventColors = [
  "bg-accent text-accent-foreground",
  "bg-sky-500 text-white",
  "bg-emerald-500 text-white",
  "bg-rose-500 text-white",
];

export const games: Game[] = [
  {
    id: "cosmic-conquest",
    name: "Cosmic Conquest",
    icon: Rocket,
    events: [
      {
        id: "cc1",
        name: "Galaxy Clash",
        startDate: subDays(today, 10),
        endDate: subDays(today, 5),
        color: eventColors[0],
      },
      {
        id: "cc2",
        name: "Alien Invasion",
        startDate: subDays(today, 2),
        endDate: addDays(today, 3),
        color: eventColors[1],
      },
      {
        id: "cc3",
        name: "Nebula Race",
        startDate: addDays(today, 8),
        endDate: addDays(today, 12),
        color: eventColors[2],
      },
      {
        id: "cc4",
        name: "Starfall Festival",
        startDate: addDays(today, 20),
        endDate: addDays(today, 25),
        color: eventColors[3],
      },
    ],
  },
  {
    id: "mystic-legends",
    name: "Mystic Legends",
    icon: Swords,
    events: [
      {
        id: "ml1",
        name: "Dragon's Hoard",
        startDate: subDays(today, 15),
        endDate: subDays(today, 12),
        color: eventColors[0],
      },
      {
        id: "ml2",
        name: "Enchanted Forest",
        startDate: subDays(today, 1),
        endDate: addDays(today, 4),
        color: eventColors[1],
      },
      {
        id: "ml3",
        name: "Trial of Knights",
        startDate: addDays(today, 10),
        endDate: addDays(today, 14),
        color: eventColors[2],
      },
      {
        id: "ml4",
        name: "Sorcerer's Summit",
        startDate: addDays(today, 22),
        endDate: addDays(today, 24),
        color: eventColors[3],
      },
    ],
  },
  {
    id: "speed-demons",
    name: "Speed Demons",
    icon: Car,
    events: [
      {
        id: "sd1",
        name: "City Circuit",
        startDate: subDays(today, 8),
        endDate: subDays(today, 6),
        color: eventColors[0],
      },
      {
        id: "sd2",
        name: "Desert Rally",
        startDate: addDays(today, 1),
        endDate: addDays(today, 5),
        color: eventColors[1],
      },
      {
        id: "sd3",
        name: "Midnight Run",
        startDate: addDays(today, 15),
        endDate: addDays(today, 18),
        color: eventColors[2],
      },
      {
        id: "sd4",
        name: "Championship",
        startDate: addDays(today, 28),
        endDate: addDays(today, 30),
        color: eventColors[3],
      },
    ],
  },
  {
    id: "puzzle-quest",
    name: "Puzzle Quest",
    icon: Puzzle,
    events: [
      {
        id: "pq1",
        name: "Brain Teaser Week",
        startDate: subDays(today, 20),
        endDate: subDays(today, 14),
        color: eventColors[0],
      },
      {
        id: "pq2",
        name: "Logic Challenge",
        startDate: subDays(today, 5),
        endDate: subDays(today, 1),
        color: eventColors[1],
      },
      {
        id: "pq3",
        name: "Riddle Rally",
        startDate: addDays(today, 7),
        endDate: addDays(today, 13),
        color: eventColors[2],
      },
      {
        id: "pq4",
        name: "Mind Marathon",
        startDate: addDays(today, 19),
        endDate: addDays(today, 23),
        color: eventColors[3],
      },
    ],
  },
  {
    id: "sports-champions",
    name: "Sports Champions",
    icon: Trophy,
    events: [
      {
        id: "sc1",
        name: "Summer Games",
        startDate: subDays(today, 3),
        endDate: addDays(today, 3),
        color: eventColors[0],
      },
      {
        id: "sc2",
        name: "Winter League",
        startDate: addDays(today, 6),
        endDate: addDays(today, 9),
        color: eventColors[1],
      },
      {
        id: "sc3",
        name: "World Cup",
        startDate: addDays(today, 16),
        endDate: addDays(today, 21),
        color: eventColors[2],
      },
      {
        id: "sc4",
        name: "All-Star Match",
        startDate: addDays(today, 27),
        endDate: addDays(today, 27),
        color: eventColors[3],
      },
    ],
  },
  {
    id: "fantasy-realms",
    name: "Fantasy Realms",
    icon: Castle,
    events: [
      {
        id: "fr1",
        name: "Royal Tournament",
        startDate: subDays(today, 12),
        endDate: subDays(today, 9),
        color: eventColors[0],
      },
      {
        id: "fr2",
        name: "Mythic Beast Hunt",
        startDate: subDays(today, 4),
        endDate: addDays(today, 1),
        color: eventColors[1],
      },
      {
        id: "fr3",
        name: "Dungeon Delve",
        startDate: addDays(today, 5),
        endDate: addDays(today, 11),
        color: eventColors[2],
      },
      {
        id: "fr4",
        name: "King's Coronation",
        startDate: addDays(today, 24),
        endDate: addDays(today, 26),
        color: eventColors[3],
      },
    ],
  },
];
