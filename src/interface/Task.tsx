// type Event struct {
// 	Id          uuid.UUID `json:"id" db:"Event_Id"`
// 	Title       string    `json:"name" db:"Event_Title"`
// 	Description string    `json:"description" db:"Event_Description"`
// 	Start       time.Time `json:"start" db:"Event_Start"`
// 	End         time.Time `json:"end" db:"Event_End"`
// 	Color       string    `json:"color" db:"Event_Color"`
// 	Type        string    `json:"type" db:"Event_Type"`
// 	Completed   bool      `json:"completed" db:"Event_Complete"`
// 	UserId      uuid.UUID `json:"user_id" db:"User_Id"`
// }

export interface Task {
    id: string;
    title: string;
    description: string;
    complete: boolean;
    start: Date;
    end: Date;
    tag: string //personal, work, etc.
    type: "task";
    user_id: string;

}

export interface CreateTask {
    title: string;
    description: string;
    start: Date;
    end: Date;
    tag: string //personal, work, etc.
    user_id: string;
}

export interface UpdateTask {
    completed: boolean;
}
    