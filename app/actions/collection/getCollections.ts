"use server";
import { getParsedValue } from "@/utils/local";
import { createClient } from "@/utils/supabase/server";

export const getCollections = async () => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return getCollectionsViaLocal();
    }

    const { data: collections, error } = await supabase
        .from("todo_collections")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        console.log("Error getting collections", error);
        return getCollectionsViaLocal();
    }

    return collections;
};

export const getCollectionsViaLocal = async () => {
    const collections = getParsedValue("collections");

    return collections;
};
