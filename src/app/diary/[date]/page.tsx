import { MoodCard } from "@/components/mood-card";

export default function DiaryPage() {
  const date = new Date(); //input date
  const feeling = "In Love"; //input feeling
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return (
    <div className="flex flex-col gap-4 px-10 py-10 w-full">
      <p className=" text-5xl font-semibold "> {formattedDate} </p>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="bg-[#F4ECE5] rounded-md">
          <p className="text-2xl font-semibold p-5"> {feeling} </p>
        </div>
        <div className="bg-[#F4ECE5] col-span-2 p-5">
          <p className="text-3xl font-medium">Emotions</p>
          <MoodCard />
        </div>
      </div>
      <div className="bg-[#F4ECE5] p-10 ">
        <p className="text-4xl font-medium">Tell me about your day?</p>
        <textarea
        autoFocus
          className="flex min-h-[380px] w-full no-border bg-[#F4ECE5] py-2 text-base placeholder:text-muted-foreground 
         focus-visible:outline-none appearance-none rounded-md"
          placeholder="Type your message here."
        ></textarea>
      </div>
    </div>
  );
}
