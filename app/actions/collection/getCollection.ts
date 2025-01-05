"use server";
import { ActionError, Collection } from "@/lib/types";
import { getParsedValue } from "@/utils/local";
import { createClient } from "@/utils/supabase/server";



export const getCollection = async (id: string): Promise<Collection | ActionError> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {error: true, code: 101, message: "User not found"}; // code 101 means use local storage instead
    }

    const { data: collection, error } = await supabase.from("todo_collections").select("*").eq("id", id).eq("user_id", user.id);

    if (error) {
        console.log("Error getting collection", error);
        return {error: true, code: 101, message: "Error getting collection"}; // code 101 means use local storage instead
    }

    return collection[0] as Collection;
};
