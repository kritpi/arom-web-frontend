"use client";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/button";
import DisplaDiary from "@/components/display-diary";
import CreateDiary from "@/components/create-diary";
import useDateDiary from "@/api/diary/useDateDiary";

export default function DiaryPage() {
  const [mood, setMood] = useState<string>("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const moodParam = searchParams.get("mood");
    if (moodParam) setMood(moodParam);
  }, []);
  const [date, setDate] = useState<Date>(new Date()); //input date

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <div className="flex flex-col gap-4 w-full px-10 py-5">
      <div className="flex w-fit">
        <p className=" text-5xl font-semibold "> {formattedDate} </p>
      </div>
      <CreateDiary date={date.toISOString().slice(0, 10)} mood={mood} />
    </div>
  );
}
