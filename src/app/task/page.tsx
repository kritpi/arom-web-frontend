import { TaskSidebar } from "@/components/task-sidebar";

export default function TaskPage() {
    return (
        <div className="flex w-full">
            <div className="w-[200px]">
                <TaskSidebar/>
            </div>
            <div className="w-full">
                <input type="text" placeholder="+ Add Task" className="w-full p-2 mt-5 ml-6 border rounded-lg"/>
                <p className="ml-8 mt-10">Today,</p>
                <hr className="w-full my-3 border-2 border-[#F4ECE5]" />
                <p className="ml-8 mt-10">7 days,</p>
                <hr className="w-full my-3 border-2 border-[#F4ECE5]" />
                <p className="ml-8 mt-10">Completed,</p>
            </div>
        </div>
    );
}
