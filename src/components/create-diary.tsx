'use client'
import useCreateDiary from "@/api/diary/useCreateDiary";
import { useState } from "react";
import useDateDiary from "@/api/diary/useDateDiary";
import { Button } from "@nextui-org/button";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MoodCard } from "./mood-card";
import { user } from "@nextui-org/theme";
import { userInfo } from "os";


interface CreateDiaryProps {
    date: string;
    
}


const moodImages: { [key: string]: string } = {
    Angry: require("@/app/img/Angry.png"),
    Anxious: require("@/app/img/Anxious.png"),
    Happy: require("@/app/img/Happy.png"),
    InLove: require("@/app/img/InLove.png"),
    Sad: require("@/app/img/Sad.png"),
    Silly: require("@/app/img/Silly.png"),
    SoSo: require("@/app/img/SoSo.png"),
  };
export default function CreateDiary({date}: CreateDiaryProps) {
    const router = useRouter();
    const mood = "Happy"
    const createDiary = useCreateDiary();
    const [emotions, setEmotions] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    // const moodImage =moodImages[mood]
    const moodImage =moodImages[mood]
    const onSubmit = async () => {
        const diary = {
            date: date,
            mood: mood,
            emotions: emotions,
            description : description,
            userId: ""
        };
        await createDiary.mutateAsync(diary);
        router.push("/diary/1");
      }

    
    return (
        <div className="flex flex-col gap-4 px-10 py-10 w-full">
        <div className="grid grid-cols-3 gap-4 h-full">
          <div className="bg-[#F4ECE5] rounded-md flex justify-center items-center gap-4 p-5">
            <Image src={moodImage} alt="mood" width={200} height={200} />
            <p className="text-2xl font-semibold p-5">{mood}</p>
          </div>
          <div className="bg-[#F4ECE5] col-span-2 p-5 h-full flex flex-col">
            <p className="text-3xl font-medium mb-4">Emotions</p>
            <MoodCard setEmotions={setEmotions}/>
          </div>
        </div>
        <div className="bg-[#F4ECE5] p-10">
          <p className="text-4xl font-medium">Tell me about your day?</p>
          <textarea
            autoFocus
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[380px] w-full border-none bg-[#F4ECE5] py-1 text-base placeholder:text-muted-foreground focus-visible:outline-none rounded-md mt-4"
            placeholder="Type your message here."
          ></textarea>
        </div>
        <Button className="w-full bg-[#F4ECE5] text-arom_brown border border-arom_brown mt-4" onClick={onSubmit}>
          <p className="text-2xl font-semibold">Save</p>
        </Button>
      </div>
    );
  }
  
