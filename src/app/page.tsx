"use client";

import { TaskItem } from "@/components/taskItem";
import { Button } from "@/components/ui/button";
import { GithubBrandIcon } from "@/utils/icons";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export type Task = {
    id: string;
    value: string;
    completed: boolean;
};

export default function Home() {
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = (e: FormEvent) => {
        "use client";
        e.preventDefault();
        const inputValue = taskInput.trim();
        // clear the input field
        setTaskInput("");
        if (inputValue === "") {
            toast.error("You can't create an empty task");
            return;
        }
        if (inputValue.length > 100) {
            toast.error("Task can't be more than 100 characters");
            return;
        }

        // we cant use the index of the array because if the user deletes a task the index will change and we'll have a bug of duplicated ids
        // however the id will always be unique if we randomly generate it
        const id = "_" + Math.random().toString(36).substr(2, 9);

        const newTask: Task = {
            id,
            value: inputValue,
            completed: false,
        };

        // create the task
        setTasks((prev) => [newTask, ...prev]);

        toast.success("Task created successfully");
    };

    const changeCompilation = (id: string) => {
        "use client";
        setTasks((prev) => {
            return prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            );
        });
        toast.info(
            `Task status changed to ${
                tasks.find((t) => t.id === id)?.completed
                    ? "completed"
                    : "uncompleted"
            }`
        );
    };

    const deleteTask = (id: string) => {
        "use client";
        setTasks(tasks.filter((t) => t.id !== id));
        toast.error("Task deleted");
    };

    const updateTaskValue = (id: string, value: string) => {
        "use client";
        if (value === "") {
            deleteTask(id);
        } else if (value.length > 100) {
            toast.error("Task can't be more than 100 characters");
            return;
        }
        setTasks((prev) => {
            return prev.map((t) => (t.id === id ? { ...t, value } : t));
        });
        toast.info("Task text has been updated");
    };

    useEffect(() => {
        // load the tasks from the local storage
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            setTasks(JSON.parse(tasks));
        }
    }, []);

    useEffect(() => {
        // save the tasks to the local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="flex flex-col justify-between max-w-[475px] mx-auto min-h-screen pt-0 sm:pt-20 p-2 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 justify-start h-full items-center">
                <h1 className="text-4xl font-bold text-center">
                    Managing Your Tasks
                </h1>

                <form
                    onSubmit={createTask}
                    className="flex gap-4 items-center bg-zinc-100 inputShadow rounded-full outline-none focus:outline-orange-400 w-full"
                >
                    <input
                        type="text"
                        className="bg-transparent text-black placeholder:text-zinc-600 w-full h-full pl-4 py-3 outline-none rounded-full"
                        placeholder="Enter your task"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                    />
                    <Button
                        className="mr-2 h-[80%] text-xs relative group bg-zinc-700 text-white px-4 rounded-full"
                        type="submit"
                    >
                        Create Task
                    </Button>
                </form>

                <div className="flex flex-col w-full gap-1">
                    <h2 className="text-2xl font-bold">Tasks</h2>
                    {tasks.length === 0 && (
                        <p className="text-gray-500 min-h-12 h-full w-full text-center justify-center flex items-center">
                            {"You don't have any tasks yet"}
                        </p>
                    )}
                    <ul className="flex flex-col gap-4 mt-4">
                        {tasks.map((task: Task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                changeCompilation={changeCompilation}
                                deleteTask={deleteTask}
                                updateTaskValue={updateTaskValue}
                            />
                        ))}
                    </ul>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://github.com/rivalth/todo-application"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GithubBrandIcon />
                    This Website is Open Source
                </a>
            </footer>
        </div>
    );
}
