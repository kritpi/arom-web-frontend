'use client'

import { useState } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Diary } from "../../type/types"

const moodImages: { [key in Diary['mood']]: string } = {
  "Happy": "/images/Happy.png",
  "So So": "/images/SoSo.png",
  "In Love": "/images/inLove.png",
  "Sad": "/images/Sad.png",
  "Silly": "/images/Silly.png",
  "Anxious": "/images/Anxious.png",
  "Angry": "/images/Angry.png",
}

export function DiaryComponent({ diary }: { diary: Diary }) {
  const [isOpen, setIsOpen] = useState(false)

  const imageSrc = moodImages[diary.mood] || "/images/default.png"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Image 
          src={imageSrc} 
          width={100}
          height={100}           
          alt={`Mood: ${diary.mood}`} 
          className="cursor-pointer"
        />        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Mood Today</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-md font-medium">Mood:</span>
              <span className="col-span-3 text-md font-medium capitalize">
                {diary.mood}
              </span>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-md font-medium">Description:</span>
              <span className="col-span-3 text-md break-words">{diary.description}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-md font-medium">Date:</span>
              <span className="col-span-3 text-md">
                {diary.date.toLocaleDateString()}
              </span>
            </div>
            {/* <div className="grid grid-cols-4 items-start gap-4">
              <span className="text-md font-medium">Emotions:</span>
              <div className="col-span-3 flex flex-wrap gap-2">
                {diary.emotions.map((emotion, index) => (
                  <Badge key={index} className="bg-yellow-500 hover:bg-yellow-400">
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div> */}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}