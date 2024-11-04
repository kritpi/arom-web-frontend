"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { Task, CreateTask } from "@/interface/Task";
import useCreateTask from "@/api/event/useCreateTask";
import useUserIdTask from "@/api/event/useUserIdTask";
import { useRouter } from "next/navigation";
import { AddTask } from "@/components/create-task";

type TagType = "Personal" | "Work" | "Study" | "All";

const tagColor = "bg-arom_brown hover:bg-arom_brown";

export default function TaskPage() {
  const [filterTag, setFilterTag] = useState<TagType>("All");
  const [userData, setUserData] = useState<any>(null);
  const [isHasToken, setIsHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsHasToken(true);
      setUserData(jwtDecode(token));
    } else {
      setIsHasToken(false);
    }
  }, []);

  const createTask = useCreateTask();
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useUserIdTask(userData?.user_id);
  const router = useRouter();

  const handleAddTask = async (newTask: CreateTask) => {
    try {
      await createTask.mutateAsync(newTask);
      router.push("/task");
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    // Implement the logic to update task completion status
    // This might involve calling an API or updating local state
    console.log(`Toggling completion for task ${taskId}`);
  };

  const filteredTasks = tasks.filter(
    (task: Task) => filterTag === "All" || task.tag === filterTag
  );

  return (
    <div className="flex w-full p-5">
      <div className="w-full py-[20px]">
        <div className="p-4">
          <AddTask onAddTask={handleAddTask} userId={userData?.user_id} />

          <TagFilter currentFilter={filterTag} onFilterChange={setFilterTag} />

          <div className="mt-8 space-y-8">
            <TaskSection
              title="Upcoming"
              tasks={filteredTasks.filter((task: Task) => !task.complete)}
              toggleTaskCompletion={toggleTaskCompletion}
            />
            <TaskSection
              title="Completed"
              tasks={filteredTasks.filter((task: Task) => task.complete)}
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
  toggleTaskCompletion: (taskId: string) => void;
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
  toggleTaskCompletion: (taskId: string) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          className="form-checkbox"
          checked={task.complete}
          onChange={() => toggleTaskCompletion(task.id)}
          aria-label={`Mark "${task.title}" as ${
            task.complete ? "incomplete" : "complete"
          }`}
        />
        <div>
          <p
            className={
              task.complete ? "line-through text-muted-foreground" : ""
            }
          >
            {task.title}
          </p>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(task.start).toLocaleString()} -{" "}
            {new Date(task.end).toLocaleString()}
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
