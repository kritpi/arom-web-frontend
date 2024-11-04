'use client'

import { useState } from 'react';
import TaskSidebar from '@/components/task-sidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
type TagType = 'Personal' | 'Work' | 'Study'

interface Task {
    id: number
    text: string
    completed: boolean
    dueDate: string
    tag: TagType
}

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [dueDateValue, setDueDateValue] = useState("")
    const [dueTimeValue, setDueTimeValue] = useState("")
    const [selectedTag, setSelectedTag] = useState<TagType>('Personal')

    const handleAddTask = () => {
        if (inputValue.trim() && dueDateValue.trim() && dueTimeValue.trim()) {
          const dueDateTime = `${dueDateValue}T${dueTimeValue}`
          setTasks([...tasks, { 
            id: Date.now(), 
            text: inputValue, 
            completed: false, 
            dueDate: dueDateTime, 
            tag: selectedTag 
          }])
          setOpen(false)
          resetForm()
        }
    }
    
    const resetForm = () => {
        setInputValue("")
        setDueDateValue("")
        setDueTimeValue("")
        setSelectedTag('Personal')
    }

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
    }

    return (
        <div className="flex w-full ">
            <div>
                <SidebarProvider defaultOpen={true}>
                    <TaskSidebar />
                </SidebarProvider>
            </div>
            <div className="w-full py-[20px]">
            <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-muted-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Due Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={dueDateValue}
                  onChange={(e) => setDueDateValue(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Due Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={dueTimeValue}
                  onChange={(e) => setDueTimeValue(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tag">Tag</Label>
              <Select value={selectedTag} onValueChange={(value: TagType) => setSelectedTag(value)}>
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
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-8 space-y-8">
        <TaskSection 
            title="Upcoming" 
            tasks={tasks.filter(task => !task.completed)} 
            toggleTaskCompletion={toggleTaskCompletion}
        />
        <TaskSection 
            title="Completed" 
            tasks={tasks.filter(task => task.completed)} 
            toggleTaskCompletion={toggleTaskCompletion}
        />
      </div>
    </div>
            </div>
        </div>
    )}

    function TaskSection({ title, tasks, toggleTaskCompletion }: { 
        title: string; 
        tasks: Task[]; 
        toggleTaskCompletion: (taskId: number) => void 
    }) {
        return (
          <section>
            <h2 className="font-semibold mb-4">{title}</h2>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <TaskItem key={index} task={task} toggleTaskCompletion={toggleTaskCompletion} />
              ))}
            </div>
          </section>
        )
      }
      
function TaskItem({ task, toggleTaskCompletion }: { 
    task: Task; 
    toggleTaskCompletion: (taskId: number) => void 
}) {
    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
                <input 
                    type="checkbox" 
                    className="form-checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTaskCompletion(task.id)}
                />
                <div>
                    <p className={task.completed ? "line-through text-muted-foreground" : ""}>{task.text}</p>
                    <p className="text-sm text-muted-foreground">
                        {new Date(task.dueDate).toLocaleString()}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs">
                    {task.tag}
                </span>
            </div>
        </div>
    )
}
