"use client";

import { useState } from "react";
import { icons, PlusIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';
import HomeIcon from "@/app/img/Home.png";
import WorkIcon from "@/app/img/Work.png";
import LoveIcon from "@/app/img/Heart.png";
import ListIcon from "@/app/img/List.png";
import TagIcon from "@/app/img/Tag.svg";

export function TaskSidebar() {
    const [lists, setLists] = useState([{name:"list1", color: "#F7CF53"}]);
    const [tags, setTags] = useState([{name:"Tag1", color: "#F1BFB9"}]);
    const [newListName, setNewListName] = useState("");
    const [newTagName, setNewTagName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");

    const initialLists = [
        {name: "Personal", color:"#E2CCBC", icon: HomeIcon},
        {name: "Work", color:"#E2CCBC", icon: WorkIcon},
        {name: "Love", color:"#E2CCBC", icon: LoveIcon},
    ];

    const addListItem = () => {
        if (newListName) {
            setLists([...lists, { name: newListName, color: selectedColor }]);
            setNewListName("");
            setSelectedColor("#F1BFB9");
        }
    };

    const addTagItem = () => {
        if (newTagName) {
            setTags([...tags, { name: newTagName, color: selectedColor }]);
            setNewTagName("");
            setSelectedColor("#F1BFB9");
        }
    };
    
    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };
    

    return (
        <div className="h-screen w-[200px] bg-[#F4ECE5] p-4">
            {/* ส่วน List */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl text-black font-bold">List</h2>
                <Dialog>
                    <DialogTrigger>
                        <div className="border-2 border-black rounded-full p-1 cursor-pointer">
                            <PlusIcon className="text-black w-4 h-4"/>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F4ECE5]">
                        <DialogHeader>
                            <DialogTitle className="flex justify-center text-2xl">Add List</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <input type="text" value={newListName} 
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="Name"
                            className="p-2 my-3 mx-4 border rounded-lg"
                            />
                            <div className="flex fustify-center">
                                <span className="mt-1 mx-5">Color</span>
                                {["#F1BFB9", "#9ECDB0", "#F7CF53", "#6F4293", "#D75A44", "#6795D9", "#FAAA63", "#385F33", "#9B826F"].map(
                                    (color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`w-8 h-8 mx-1 rounded-full border ${
                                        selectedColor === color ? "border-2 border-gray-500" : ""
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                    )
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button onClick={addListItem} className="w-24 px-4 py-2 bg-[#D9CEC5] rounded-full">
                                    Save
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
             </div>

             <ul className="mt-4 mb-6 space-y-2">

                {initialLists.map((item, index) => (
                    <li 
                        key={index} 
                        className="flex items-center p-2 rounded-lg"
                        >
                        <Image 
                            src={item.icon} 
                            alt={`${item.name} icon`} 
                            width={20} 
                            height={20}
                            className="mr-2" 
                        />
                        {item.name}
                    </li>
                ))}

                {lists.map((item, index) => (
                    <li 
                    key={index} 
                    className="flex items-center p-2 rounded-lg"
                    >
                    <Image 
                        src={ListIcon}
                        alt={`List icon`} 
                        width={20} 
                        height={20}
                        className="mr-2" 
                    />
                    {item.name}
                </li>
                ))}
            </ul>

            {/* ส่วนของ Tag */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl text-black font-bold">Tags</h2>
                <Dialog>
                    <DialogTrigger>
                        <div className="border-2 border-black rounded-full p-1 cursor-pointer">
                            <PlusIcon className="text-black w-4 h-4"/>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-[#F4ECE5]">
                        <DialogHeader>
                            <DialogTitle className="flex justify-center text-2xl">Add Tag</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <input type="text" value={newTagName} 
                            onChange={(e) => setNewTagName(e.target.value)}
                            placeholder="Name"
                            className="p-2 my-3 mx-4 border rounded-lg"
                            />
                            <div className="flex fustify-center">
                                <span className="mt-1 mx-5">Color</span>
                                {["#F1BFB9", "#9ECDB0", "#F7CF53", "#6F4293", "#D75A44", "#6795D9", "#FAAA63", "#385F33", "#9B826F"].map(
                                    (color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`w-8 h-8 mx-1 rounded-full border ${
                                        selectedColor === color ? "border-2 border-gray-500" : ""
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                    )
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button onClick={addTagItem} className="w-24 px-4 py-2 bg-[#D9CEC5] rounded-full">
                                    Save
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
             </div>

             <ul className="mt-4 space-y-2">

                {tags.map((item, index) => (
                    <li 
                    key={index} 
                    className="flex items-center p-2 rounded-lg">
                    <div 
                        className="flex items-center justify-center w-7 h-7 mr-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                    >
                        <Image 
                            src={TagIcon}
                            alt={`Tag icon`} 
                            width={20} 
                            height={20}
                        />
                    </div>
                    {item.name}
                </li>
                ))}
            </ul>

        </div>
    );
}