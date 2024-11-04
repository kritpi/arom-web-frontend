"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type TagType = "Personal" | "Work" | "Study" | "All";

interface Task {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  startDate: string;
  endDate: string;
  tag: Exclude<TagType, "All">;
}

const tagColor = "bg-arom_brown hover:bg-arom_brown";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [startTimeValue, setStartTimeValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [endTimeValue, setEndTimeValue] = useState("");
  const [selectedTag, setSelectedTag] =
    useState<Exclude<TagType, "All">>("Personal");
  const [filterTag, setFilterTag] = useState<TagType>("All");

  const handleAddTask = () => {
    if (
      inputValue.trim() &&
      startDateValue &&
      startTimeValue &&
      endDateValue &&
      endTimeValue
    ) {
      const startDateTime = `${startDateValue}T${startTimeValue}`;
      const endDateTime = `${endDateValue}T${endTimeValue}`;
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: inputValue,
          description: descriptionValue,
          completed: false,
          startDate: startDateTime,
          endDate: endDateTime,
          tag: selectedTag,
        },
      ]);
      setOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setInputValue("");
    setDescriptionValue("");
    setStartDateValue("");
    setStartTimeValue("");
    setEndDateValue("");
    setEndTimeValue("");
    setSelectedTag("Personal");
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(
    (task) => filterTag === "All" || task.tag === filterTag
  );

  return (
    <div className="flex w-full p-5">
      <div className="w-full py-[20px]">
        <div className="p-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-arom_brown text-xl ">Add New Task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="task">Task Name</Label>
                  <Input
                    id="task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter task name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={descriptionValue}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    placeholder="Enter task description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDateValue}
                      onChange={(e) => setStartDateValue(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTimeValue}
                      onChange={(e) => setStartTimeValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDateValue}
                      onChange={(e) => setEndDateValue(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTimeValue}
                      onChange={(e) => setEndTimeValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tag">Tag</Label>
                  <Select
                    value={selectedTag}
                    onValueChange={(value: Exclude<TagType, "All">) =>
                      setSelectedTag(value)
                    }
                  >
                    <SelectTrigger id="tag">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Work">Work</SelectItem>
                      <SelectItem value="Study">Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-arom_brown" onClick={handleAddTask}>Add Task</Button>
              </div>
            </DialogContent>
          </Dialog>

          <TagFilter currentFilter={filterTag} onFilterChange={setFilterTag} />

          <div className="mt-8 space-y-8">
            <TaskSection
              title="Upcoming"
              tasks={filteredTasks.filter((task) => !task.completed)}
              toggleTaskCompletion={toggleTaskCompletion}
            />
            <TaskSection
              title="Completed"
              tasks={filteredTasks.filter((task) => task.completed)}
              toggleTaskCompletion={toggleTaskCompletion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TagFilter({
  currentFilter,
  onFilterChange,
}: {
  currentFilter: TagType;
  onFilterChange: (tag: TagType) => void;
}) {
  const tags: TagType[] = ["All", "Personal", "Work", "Study"];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={currentFilter === tag ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(tag)}
          className={cn(
            "rounded-full",
            currentFilter === tag
              ? `${tagColor} text-white`
              : `text-arom_brown hover:text-arom_brown`
          )}
        >
          {tag}
          {currentFilter === tag && (
            <X
              className="ml-2 h-4 w-4"
              onClick={(e) => {
                e.stopPropagation();
                onFilterChange("All");
              }}
            />
          )}
        </Button>
      ))}
    </div>
  );
}

function TaskSection({
  title,
  tasks,
  toggleTaskCompletion,
}: {
  title: string;
  tasks: Task[];
  toggleTaskCompletion: (taskId: number) => void;
}) {
  return (
    <section>
      <h2 className="font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </div>
    </section>
  );
}

function TaskItem({
  task,
  toggleTaskCompletion,
}: {
  task: Task;
  toggleTaskCompletion: (taskId: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          aria-label={`Mark "${task.text}" as ${
            task.completed ? "incomplete" : "complete"
          }`}
        />
        <div>
          <p
            className={
              task.completed ? "line-through text-muted-foreground" : ""
            }
          >
            {task.text}
          </p>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(task.startDate).toLocaleString()} -{" "}
            {new Date(task.endDate).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <span
          className={cn("text-white rounded-full px-2 py-1 text-xs", tagColor)}
        >
          {task.tag}
        </span>
      </div>
    </div>
  );
}
