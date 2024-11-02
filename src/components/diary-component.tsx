import { useState } from "react";
import { Diary } from "../../type/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const DiaryComponent = ({ diary }: { diary: Diary }) => {
  const [isOpen, setIsOpen] = useState(false);

  let imageSrc;
  switch (diary?.mood) {
    case "Happy":
      imageSrc = "/images/Happy.png";
      break;
    case "So So":
      imageSrc = "/images/SoSo.png";
      break;
    case "In Love":
      imageSrc = "/images/inLove.png";
      break;
    case "Sad":
      imageSrc = "/images/Sad.png";
      break;
    case "Silly":
      imageSrc = "/images/Silly.png";
      break;
    case "Anxious":
      imageSrc = "/images/Anxious.png";
      break;
    case "Angry":
      imageSrc = "/images/Angry.png";
      break;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Image src={imageSrc} width={100} height={50} alt="Mood Image" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Mood Today</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Mood:</span>
            <span className={`col-span-3 text-md font-medium capitalize`}>
              {diary?.mood}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Description:</span>
            <span className="col-span-3 text-md">{diary?.description}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Date:</span>
            <span className="col-span-3 text-md">
              {diary?.date.toLocaleDateString()}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Emotion:</span>
            <span className="col-span-3 text-md">
              <Badge className="bg-yellow-500 hover:bg-yellow-400">
                Hopeful
              </Badge>
              Hopeful, Sad, Tired ...
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
