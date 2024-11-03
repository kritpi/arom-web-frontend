export interface Diary {
    id: string;
    date: string;
    mood: string;
    emotions: string[];
    description: string;
    type: string;
    userId: string;
    }

export interface CreateDiary {
    date: string;
    mood: string;
    emotions: string[];
    description: string;
    userId: string;
    }