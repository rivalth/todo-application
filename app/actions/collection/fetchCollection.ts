"use server";

import { ActionError, Collection } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export const fetchCollection = async (id: string): Promise<Collection | ActionError> => {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return {
            error: true,
            code: 101,
            message: "User not found", // Code 101 indicates fallback to localStorage
        } as ActionError;
    }

    const { data: collections, error } = await supabase
        .from("todo_collections")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id);

    if (error || !collections.length) {
        return {
            error: true,
            code: 102,
            message: "Error fetching collection",
        } as ActionError;
    }

    return collections[0] as Collection;
};
