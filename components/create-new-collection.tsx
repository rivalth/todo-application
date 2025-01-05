"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, icons } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { iconsForSelector } from "@/utils/iconSelector";
import React from "react";

const formSchema = z.object({
    collection_name: z.string().min(3).max(40),
    collection_color: z.string().min(6).max(9).optional(),
    collection_icon: z.string(),
});

export default function CreateNewCollectionForm() {
    console.log("selector", iconsForSelector);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast({
                title: "Form submitted",
                description: "Your form has been submitted successfully.",
            });
        } catch (error) {
            console.error("Form submission error", error);
            toast({
                title: "Uh oh! Something went wrong",
                description:
                    "There was a problem with your request. Please try again.",
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                <FormField
                    control={form.control}
                    name="collection_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Collection Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="School Todos"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="collection_color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Collection Color</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="#ff4d20"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Input hex code</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="collection_icon"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Select Collection Icon</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                <>
                                                    {field.value}
                                                </>
                                                ) : "Select Icon"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search icon..." />
                                        <CommandList>
                                            <CommandEmpty>
                                                No language found.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {iconsForSelector.map(
                                                    (icon) => (
                                                        <CommandItem
                                                            value={icon.label}
                                                            key={icon.value}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    "collection_icon",
                                                                    icon.value
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    icon.value ===
                                                                        field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {icon.label}
                                                        </CommandItem>
                                                    )
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
