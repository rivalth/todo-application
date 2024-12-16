import { Task } from "@/app/page";
import { cn } from "@/utils/mergeClassName";
import {  useState } from "react";
import { motion, PanInfo, useMotionValue } from "motion/react";
import { CompleteTaskIcon, TrashIcon } from "@/utils/icons";
export const TaskItem = ({
    task,
    changeCompilation,
    deleteTask,
    updateTaskValue,
}: {
    task: Task;
    changeCompilation: (id: string) => void;
    deleteTask: (id: string) => void;
    updateTaskValue: (id: string, value: string) => void;
}) => {
    const x = useMotionValue(0);
    const [taskActive, setTaskActive] = useState<boolean>(false);
    const [taskDragMission, setTaskDragMission] = useState<
        "none" | "compilation" | "deletion"
    >("none");

    const handleDragEnd = () => {
        if (taskDragMission === "compilation") {
            changeCompilation(task.id);
        }

        if (taskDragMission === "deletion") {
            deleteTask(task.id);
        }

        setTaskActive(false);
        setTaskDragMission("none");
    };

    const handleOnDrag = () => {    
        const value = x.get();
        console.log("value", value);
        if (value > 15) {
            setTaskDragMission("deletion");
        } else if (value < -10) {
            setTaskDragMission("compilation");
        } else {
            setTaskDragMission("none");
        }
    };

    return (
        <li
            key={task.id}
            className="flex items-center justify-between gap-2 relative group"
        >
            <div
                className={cn(
                    "absolute left-16 top-0 h-full flex items-center justify-center gap-2 transition-all duration-200",
                    taskActive && "-left-20"
                )}
            >
                <button className="text-blue-500">
                    <CompleteTaskIcon />
                </button>
            </div>
            <motion.div
                drag="x"
                style={{
                    x,
                }}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                dragMomentum={false}
                onDragStart={() => {
                    setTaskActive(true);
                }}
                onPanEnd={() => {
                    x.set(0);
                }}
                onDragEnd={handleDragEnd}
                onDrag={handleOnDrag}
                whileTap={{
                    cursor: "grabbing",
                    boxShadow: "0px 1px 10px #00000020",
                }}
                className={cn(
                    "flex items-center w-full bg-zinc-50 p-2 rounded-md relative z-[2] cursor-pointer outline outline-zinc-400/20 transition-outline",
                    taskDragMission == "compilation" && "outline-blue-500",
                    taskDragMission == "deletion" && "outline-red-500"
                )}
            >
                <button
                    className="inline-flex items-center mr-1 gap-2 border border-zinc-400 rounded-full w-6 h-6 justify-center cursor-pointer outline-none"
                    onClick={() => changeCompilation(task.id)}
                >
                    {task.completed && (
                        <div className="rounded-full w-4 h-4 bg-black" />
                    )}
                </button>
                <span
                    contentEditable
                    suppressContentEditableWarning={true}
                    ref={(el) => {
                        if (el) {
                            el.innerText = task.value;
                        }
                    }}
                    onBlur={(e) => {
                        const value = e.currentTarget.innerText.trim(); // Avoid leading/trailing spaces
                        if (value !== task.value) {
                            updateTaskValue(task.id, value);
                        }
                    }}
                    className="flex-1 outline-none p-1 rounded transition-all duration-200"
                >
                    {task.value}
                </span>
            </motion.div>
            <div
                className={cn(
                    "absolute right-16 top-0 h-full flex items-center justify-center gap-2 transition-all duration-200",
                    taskActive && "-right-20"
                )}
            >
                <button className="text-red-500">
                    <TrashIcon />
                </button>
            </div>
        </li>
    );
};
