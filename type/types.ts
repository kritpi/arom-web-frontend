export type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;  
  color: "pink" | "lightGreen" | "yellow" | "purple" | "red" | "blue" | "orange" | "green" | "brown";
  type: "event";
};

export type Todo = {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  dueDate: Date;
  tag: string //personal, work, etc.
  type: "todo";
};

export type Diary = {
  id: string;
  mood: "Happy" | "So So" | "In Love" | "Sad" | "Silly" | "Anxious" |"Angry"
  // emotion: string[]; // Array of many options like "overwhelm", "anxious", etc.
  title: string;
  description: string;
  date: Date;
  // start: Date;
  // end: Date;
  type: "diary";
};

export type CalendarItem = Event | Todo | Diary;