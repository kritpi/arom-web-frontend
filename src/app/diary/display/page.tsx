"use client";
import { MoodCard } from "@/components/mood-card";
import { Calendar } from "@/components/ui/calendar";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@nextui-org/button";
import useDateDiary from "@/api/diary/useDateDiary";
import useCreateDiary from "@/api/diary/useCreateDiary";
import DisplaDiary from "@/components/display-diary";

export default function DiaryPage() {
  const [date, setDate] = useState<Date>(new Date()); //input date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full px-10 py-10">
      <div className="flex w-fit">
        <MdNavigateBefore
          className="text-5xl text-arom_brown"
          onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button className={"w-fit bg-transparent"}>
              <p className=" text-5xl font-semibold "> {formattedDate} </p>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
            <div className="rounded-md border">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                toDate={new Date()}
              />
            </div>
          </PopoverContent>
        </Popover>
        {date.toDateString() === new Date().toDateString() ? (
          <MdNavigateNext className="text-5xl text-[#F4ECE5]" />
        ) : (
          <MdNavigateNext
            className="text-5xl text-arom_brown"
            onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
          />
        )}
      </div>
      <DisplaDiary date={date.toISOString().slice(0, 10)} />
    </div>
  );
}