'use client'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

interface MoodCardProps {
  setEmotions : (emotions: string[]) => void

}

export function MoodCard({setEmotions}: MoodCardProps) {
  const [selectEmotions, setSelectedEmotions] = useState<string[]>([])
  const click = (value: string[]) => {
    setEmotions(value)
  }

  return (
    <ToggleGroup type="multiple" variant="outline" className="grid grid-cols-4 gap-x-3 gap-y-2 " onValueChange={(mood) => click(mood)}> 
      {[
        "Excited", "Hopeful", "Happy", "Sad", "Tired", "Proud",
        "Anxious", "Bored", "Relaxed", "Refreshed", "Lonely", "Stressed"
      ].map((mood) => (
        <ToggleGroupItem 
          key={mood} 
          value={mood.toString()}
          className="font-medium rounded-3xl text-sm bg-[#D9CEC5] data-[state=off]:text-[#9B826F] text-arom_brown hover:bg-[#EFE9E4] data-[state=on]:bg-white data-[state=on]:text-arom_brown"
        >
          {mood}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
