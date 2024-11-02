import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Event } from "../../type/types";
import { CalendarDays } from "lucide-react";

export const EventComponent = ({ event }: { event: Event }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`h-full w-full rounded-md p-1 text-xs font-medium shadow-sm cursor-pointer flex items-center bg-${event?.color} text-${event?.color}`}
          style={{
            backgroundColor: (() => {
              switch (event?.color) {
                case "pink":
                  return "#F1BFB970";
                case "lightGreen":
                  return "#9ECDB070";
                case "yellow":
                  return "#F7CF5370";
                case "purple":
                  return "#6F429370";
                case "red":
                  return "#D75A4470";
                case "blue":
                  return "#6795D970";
                case "orange":
                  return "#FAAA6370";
                case "green":
                  return "#385F3370";
                case "brown":
                  return "#9B826F70";
              }
            })(),
            color: (() => {
              switch (event?.color) {
                case "pink":
                  return "#8B0000";
                case "lightGreen":
                  return "#006400";
                case "yellow":
                  return "#FFD700";
                case "purple":
                  return "#4B0082";
                case "red":
                  return "#8B0000";
                case "blue":
                  return "#00008B";
                case "orange":
                  return "#FF4500";
                case "green":
                  return "#006400";
                case "brown":
                  return "#8B4513";
                default:
                  return "#000000";
              }
            })(),
          }}
          onClick={() => setIsOpen(true)}
        >
          <CalendarDays className="mr-1 h-3 w-3" />
          {event?.title}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{event?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span
              className={`text-md font-medium text-${event?.color}-600 capitalize`}
            >
              Description:
            </span>
            <span className="col-span-3 text-md">{event?.description}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Start Date:</span>
            <span className="col-span-3 text-md">
              {event?.start.toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">End Date:</span>
            <span className="col-span-3 text-md">
              {event?.end.toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
