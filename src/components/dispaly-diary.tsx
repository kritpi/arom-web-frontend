'use client'
import useCreateDiary from "@/api/diary/useCreateDiary";
import useDateDiary from "@/api/diary/useDateDiary";
import { Button } from "@nextui-org/button";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import CreateDiary from "./create-diary";

interface DisplayDiaryProps {
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

export default function DisplayDiary({ date }: DisplayDiaryProps) {
  const { data, isLoading, error } = useDateDiary(date);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const router = useRouter();

  // Update selectedEmotions when data.emotions changes
  useEffect(() => {
    if (data?.emotions) {
      setSelectedEmotions(data.emotions);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return<CreateDiary date={date}/>

  }

  const moodImage = data?.mood ? moodImages[data.mood] : "";

  return (
    <div className="flex flex-col gap-4 px-10 py-10 w-full">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-[#F4ECE5] rounded-md flex justify-center items-center gap-4 p-5">
          <Image src={moodImage} alt="mood" width={200} height={200} />
          <p className="text-2xl font-semibold p-5">{data?.mood}</p>
        </div>
        <div className="bg-[#F4ECE5] col-span-2 p-5 h-full flex flex-col">
          <p className="text-3xl font-medium mb-4">Emotions</p>
          <ToggleGroup
            type="multiple"
            className="grid grid-cols-4 gap-x-3 gap-y-2 flex-grow"
          >
            {[
              "Excited",
              "Hopeful",
              "Happy",
              "Sad",
              "Tired",
              "Proud",
              "Anxious",
              "Bored",
              "Relaxed",
              "Refreshed",
              "Lonely",
              "Stressed",
            ].map((mood) => (
              <ToggleGroupItem
                key={mood}
                value={mood}
                disabled={data?false:true}
                className={`font-medium rounded-3xl text-sm ${
                    data? 
                  selectedEmotions.includes(mood)
                    ? "bg-white text-arom_brown"
                    : "bg-[#D9CEC5] text-[#9B826F]"
                    : "data-[state=on]:bg-white data-[state=on]:text-arom_brown"
                }  `
                // hover:bg-[#EFE9E4]
            }
              >
                {mood}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="bg-[#F4ECE5] p-10">
        <p className="text-4xl font-medium">Tell me about your day?</p>
        <p
          className="min-h-[380px] w-full border-none bg-[#F4ECE5] py-1 text-base placeholder:text-muted-foreground focus-visible:outline-none rounded-md mt-4"
        >   {data?.description}</p>
      </div>
      {date.toString() === new Date().toDateString() ? 
      <Button className="w-full bg-[#F4ECE5] text-arom_brown border border-arom_brown mt-4">
        <p className="text-2xl font-semibold">Edit</p>
      </Button>
      :<></>}
    </div>
  );
}
