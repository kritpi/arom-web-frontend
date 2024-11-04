"use client";
import useCreateDiary from "@/api/diary/useCreateDiary";
import useDateDiary from "@/api/diary/useDateDiary";
import { Button } from "@nextui-org/button";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {Divider} from "@nextui-org/divider";
import MoodCardDisplay from "./mood-card-display";

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

  // Set selectedEmotions only when data.emotions changes
  useEffect(() => {
    if (data?.emotions) {
      setSelectedEmotions(data.emotions);
    }
  }, [data?.emotions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (date === new Date().toISOString().slice(0, 10) && error) {
    router.push(`/diary`);
  } else if (error) {
    return (
      <>
        <Divider className="w-full " />
        <div className="w-full text-gray-500 text-center">
          ไม่มีการบันทึกไดอารี่ในวันที่กำหนด
        </div>
      </>
    );
  }

  const moodImage = data?.mood ? moodImages[data.mood] : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F4ECE5] rounded-md flex justify-center items-center gap-6 px-5">
          <Image src={moodImage || ""} alt="mood" width={130} height={100} />
          <p className="text-2xl font-semibold p-5">{data?.mood}</p>
        </div>
        <div className="bg-[#F4ECE5] col-span-2 px-5 py-3 h-full flex flex-col">
          <p className="text-3xl font-medium">Emotions</p>
          <MoodCardDisplay selectedEmotions={selectedEmotions} />
        </div>
      </div>
      <div className="bg-[#F4ECE5] p-10">
        <p className="text-4xl font-medium">Tell me about your day?</p>
        <p className="min-h-[200px] w-full border-none bg-[#F4ECE5] py-1 text-base placeholder:text-muted-foreground focus-visible:outline-none rounded-md mt-4">
          {data?.description}
        </p>
      </div>
      {date === new Date().toISOString().slice(0, 10) && (
        <Button
          className="w-full bg-[#F4ECE5] text-arom_brown border border-arom_brown mt-4"
          onClick={() => {
            router.push(`/diary/create`);
          }}
        >
          <p className="text-2xl font-semibold">Edit</p>
        </Button>
      )}
    </div>
  );
}
