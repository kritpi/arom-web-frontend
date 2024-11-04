'use client'

import { useState } from 'react';
import Task2Sidebar from '@/components/task2-sidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface Tag {
    name: string;
    color: string; 
}

interface Task {
    text: string;
    completed: boolean;
    dueDate: string;
    tags: Tag[]; 
}

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [dueDateValue, setDueDateValue] = useState<string>('');
    const [dueTimeValue, setDueTimeValue] = useState<string>('');
    const [tagInputValue, setTagInputValue] = useState<string>(''); // For the tag input
    const [tagColor, setTagColor] = useState<string>('bg-blue-200'); // Default color
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]); // For selected tags

    const colorOptions = [
        { name: 'Red', value: 'bg-red-200' },
        { name: 'Green', value: 'bg-green-200' },
        { name: 'Blue', value: 'bg-blue-200' },
        { name: 'Yellow', value: 'bg-yellow-200' },
        { name: 'Purple', value: 'bg-purple-200' },
        { name: 'Gray', value: 'bg-gray-200' },
    ];

    const handleAddTask = () => {
        if (inputValue.trim() && dueDateValue.trim() && dueTimeValue.trim()) {
            const dueDateTime = `${dueDateValue}T${dueTimeValue}`;
            setTasks([...tasks, { text: inputValue, completed: false, dueDate: dueDateTime, tags: selectedTags }]);
            setInputValue('');
            setDueDateValue('');
            setDueTimeValue('');
            setSelectedTags([]); 
            setTagInputValue(''); 
            setTagColor('bg-blue-200'); 
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    };

    const handleToggleTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const handleDeleteTask = (index: number) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && tagInputValue.trim()) {
            setSelectedTags([...selectedTags, { name: tagInputValue, color: tagColor }]);
            setTagInputValue('');
            setTagColor('bg-blue-200'); // Reset color to default
        }
    };

    const handleDeleteTag = (index: number) => {
        const newTags = selectedTags.filter((_, i) => i !== index);
        setSelectedTags(newTags);
    };

    const isToday = (dueDate: string) => {
        const today = new Date();
        const taskDate = new Date(dueDate);
        return taskDate.toDateString() === today.toDateString();
    };

    const isNext7Days = (dueDate: string) => {
        const today = new Date();
        const taskDate = new Date(dueDate);
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return taskDate > today && taskDate <= nextWeek;
    };

    const isAfter7Days = (dueDate: string) => {
        const today = new Date();
        const taskDate = new Date(dueDate);
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return taskDate > nextWeek;
    };

    return (
        <div className="flex w-full ">
            <div>
                <SidebarProvider defaultOpen={true}>
                    <Task2Sidebar />
                </SidebarProvider>
            </div>
            <div className="w-full py-[20px]">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    placeholder="+ Add Task"
                    onKeyDown={handleKeyDown}
                    className="w-full p-2 mt-5 ml-6 border rounded-lg" 
                />
                <input 
                    type="date" 
                    value={dueDateValue} 
                    onChange={(e) => setDueDateValue(e.target.value)} 
                    className="w-full p-2 mt-2 ml-6 border rounded-lg"
                />
                <input 
                    type="time" 
                    value={dueTimeValue} 
                    onChange={(e) => setDueTimeValue(e.target.value)} 
                    className="w-full p-2 mt-2 ml-6 border rounded-lg"
                />
                
                {/* Tag Input */}
                <input 
                    type="text" 
                    value={tagInputValue} 
                    onChange={(e) => setTagInputValue(e.target.value)} 
                    placeholder="Add Tag and press Enter" 
                    onKeyDown={handleAddTag}
                    className="w-full p-2 mt-2 ml-6 border rounded-lg" 
                />
                
                {/* Color Selection for Tags */}
                <div className="flex space-x-2 mt-2 ml-6">
                    {colorOptions.map((color) => (
                        <button
                            key={color.value}
                            className={`w-8 h-8 rounded-full ${color.value} border-2 ${tagColor === color.value ? 'border-black' : 'border-transparent'}`}
                            onClick={() => setTagColor(color.value)}
                        />
                    ))}
                </div>
                
                <div className="ml-6 mt-2">
                    {selectedTags.map((tag, index) => (
                        <span key={index} className={`inline-block ${tag.color} rounded-full px-2 py-1 text-xs text-gray-800 mr-1`}>
                            {tag.name}
                            <button onClick={() => handleDeleteTag(index)} className="ml-2 text-gray-600">x</button>
                        </span>
                    ))}
                </div>

                <p className="ml-8 mt-10">Today,</p>
                <ul className="ml-8">
                    {tasks.filter(task => isToday(task.dueDate) && !task.completed).map((task, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => handleToggleTask(index)} 
                                />
                                <span className="ml-3.5">{task.text} (Due: {new Date(task.dueDate).toLocaleString()})</span>
                            </label>
                            <div>
                                {task.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={`inline-block ${tag.color} rounded-full px-2 py-1 text-xs text-gray-800 mr-1`}>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            <button onClick={() => handleDeleteTask(index)} className="text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>
                <hr className="w-full my-3 border-2 border-[#F4ECE5]" />

                <p className="ml-8 mt-10">Next 7 Days,</p>
                <ul className="ml-8">
                    {tasks.filter(task => isNext7Days(task.dueDate) && !task.completed).map((task, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => handleToggleTask(index)} 
                                />
                                <span className="ml-3.5">{task.text} (Due: {new Date(task.dueDate).toLocaleString()})</span>
                            </label>
                            <div>
                                {task.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={`inline-block ${tag.color} rounded-full px-2 py-1 text-xs text-gray-800 mr-1`}>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            <button onClick={() => handleDeleteTask(index)} className="text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>

                <hr className="w-full my-3 border-2 border-[#F4ECE5]" />

                <p className="ml-8 mt-10">After 7 Days,</p>
                <ul className="ml-8">
                    {tasks.filter(task => isAfter7Days(task.dueDate) && !task.completed).map((task, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => handleToggleTask(index)} 
                                />
                                <span className="ml-3.5">{task.text} (Due: {new Date(task.dueDate).toLocaleString()})</span>
                            </label>
                            <div>
                                {task.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={`inline-block ${tag.color} rounded-full px-2 py-1 text-xs text-gray-800 mr-1`}>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            <button onClick={() => handleDeleteTask(index)} className="text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>

                <hr className="w-full my-3 border-2 border-[#F4ECE5]" />

                <p className="ml-8 mt-10">Completed,</p>
                <ul className="ml-8">
                    {tasks.filter(task => task.completed).map((task, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    checked={task.completed} 
                                    onChange={() => handleToggleTask(index)} 
                                />
                                <span className="ml-3.5">{task.text} (Due: {new Date(task.dueDate).toLocaleString()})</span>
                            </label>
                            <div>
                                {task.tags.map((tag, tagIndex) => (
                                    <span key={tagIndex} className={`inline-block ${tag.color} rounded-full px-2 py-1 text-xs text-gray-800 mr-1`}>
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            <button onClick={() => handleDeleteTask(index)} className="text-red-500">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
