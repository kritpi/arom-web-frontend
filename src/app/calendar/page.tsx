"use client";

import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { EventComponent } from "@/components/event-component";
import { TodoComponent } from "@/components/todo-component";
import { DiaryComponent } from "@/components/diary-component";
import { Event, Todo, Diary, CalendarItem } from "../../../type/types";

const localizer = momentLocalizer(moment);

const events: Event[] = [
  {
    id: "1",
    title: "Meeting with Team",
    start: new Date("2024-11-16 14:30"),
    end: new Date("2024-11-16 16:00"),
    description: "Discuss project progress",
    color: "green",
    type: "event",
  },
  {
    id: "2",
    title: "Conference Call",
    start: new Date("2024-11-11 10:00"),
    end: new Date("2024-11-12 11:30"),
    description: "Call with international partners",
    color: "red",
    type: "event",
  },
];

const todos: Todo[] = [
  {
    id: "1",
    title: "Prepare Presentation",
    description: "Create slides for the upcoming meeting",
    complete: false,
    dueDate: new Date("2024-11-13"),
    tag: "work",
    type: "todo",
  },
  {
    id: "2",
    title: "Review Documents",
    description: "Go through the project documentation",
    complete: true,
    dueDate: new Date("2024-11-08"),
    tag: "work",
    type: "todo",
  },
];

const diaries: Diary[] = [
  {
    id: "1",
    mood: "Happy",
    title: "Mood of today",
    description: "What a sad day here",
    date: new Date("2024-11-10"),
    type: "diary",
  },
];

const formatItems = (items: any[]): CalendarItem[] => {
  return items.map((item) => ({
    ...item,
    title: item.title || "No Title", // Ensure a title for all items
    start: item.type === "event" ? new Date(item.start) : new Date(item.date),
    end: item.type === "event" ? new Date(item.end) : new Date(item.date),
  }));
};

const CalendarItemWrapper = ({
  event,
}: {
  event: CalendarItem | undefined;
}) => {
  if (!event) return null; // Ensure the event exists

  if (event.type === "event") {
    return <EventComponent event={event} />;
  } else if (event.type === "todo") {
    // return <TodoComponent todo={event} />;
    return <TodoComponent todo={event} />;
  } else if (event.type === "diary") {
    return <DiaryComponent diary={event} />;
  }
  return null;
};

export default function Component() {
  const [view, setView] = useState<(typeof Views)[keyof typeof Views]>(
    Views.MONTH
  );
  const [date, setDate] = useState(new Date());

  console.log(view);

  const allItems = formatItems([...events, ...todos, ...diaries]);
  console.log(allItems);
  return (
    <div className="h-[800px] w-full p-4 font-sans">
      <style jsx global>{`
        .rbc-calendar {
          background-color: #fffcf9;
          border-radius: 0.5rem;
          box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.1),
            0 3px 5px 0 rgba(0, 0, 0, 0.06);
        }
        .rbc-header {
          background-color: #f3f4f6;
          padding: 0.5rem;
          font-weight: 600;
        }

        .rbc-button-link {
          color: #9b826f;
        }
        .rbc-today {
          background-color: #f7cf5350;
        }
        .rbc-event {
          background-color: transparent;
        }
        .rbc-event-content {
          font-size: 0.75rem;
        }
        .rbc-toolbar button {
          color: #4b5563;
          border-radius: 0.35rem;
        }
        .rbc-toolbar button:hover {
          background-color: #6795d950;
        }
        .rbc-toolbar button.rbc-active {
          background-color: #6795d980;
          color: white;
        }
        @media (max-width: 640px) {
          .rbc-toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .rbc-toolbar-label {
            margin: 0.5rem 0;
          }
        }
      `}</style>
      <Calendar
        localizer={localizer}
        events={allItems}
        startAccessor={(event) =>
          event.type === "event"
            ? event.start
            : event.type === "diary"
            ? event.date
            : new Date()
        }
        endAccessor={(event) =>
          event.type === "event"
            ? event.end
            : event.type === "diary"
            ? event.date
            : new Date()
        }
        style={{ height: "100%" }}
        components={{ event: CalendarItemWrapper }}
        views={[Views.MONTH, Views.WEEK]}
        defaultView="month"
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        toolbar={true}
      />
    </div>
  );
}
