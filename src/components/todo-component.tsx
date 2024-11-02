import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Todo } from "../../type/types";
import { CheckCircle2, Circle } from "lucide-react";

export const TodoComponent = ({ todo }: { todo: Todo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`h-full w-full rounded-md p-1 text-xs font-medium shadow-sm cursor-pointer flex items-center ${
            todo?.complete == false
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-600"
          }`}
          onClick={() => setIsOpen(true)}
        >
          {todo?.complete == true ? (
            <CheckCircle2 className="mr-1 h-3 w-3" />
          ) : (
            <Circle className="mr-1 h-3 w-3" />
          )}
          {todo?.title}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{todo?.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Description:</span>
            <span className="col-span-3 text-md">{todo?.description}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Date:</span>
            <span className="col-span-3 text-md">
              {todo?.dueDate.toLocaleDateString()}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Status:</span>
            <span
              className={`col-span-3 text-md font-medium ${
                todo?.complete == true ? "text-green-600" : "text-yellow-600"
              } capitalize`}
            >
              {todo?.complete ? "Completed" : "Incomplete"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-md font-medium">Tag:</span>
            <span
              className={`col-span-3 text-md font-medium ${
                todo?.complete == true ? "text-green-600" : "text-yellow-600"
              } capitalize`}
            >
              tag eg.work, life, ...
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
