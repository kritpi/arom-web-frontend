import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function MoodCard() {
  return (
    <ToggleGroup type="multiple" variant="outline" className="grid grid-cols-4 gap-x-3 gap-y-2 "> 
      {[
        "Excited", "Hopeful", "Happy", "Sad", "Tired", "Proud",
        "Anxious", "Bored", "Relaxed", "Refreshed", "Lonely", "Stressed"
      ].map((mood) => (
        <ToggleGroupItem 
          key={mood} 
          value={mood.toLowerCase()}
          className="font-medium rounded-3xl text-sm bg-[#D9CEC5] data-[state=off]:text-[#9B826F] text-arom_brown hover:bg-[#EFE9E4] data-[state=on]:bg-white data-[state=on]:text-arom_brown"
        >
          <p>{mood}</p>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
