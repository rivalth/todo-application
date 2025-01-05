import { InfoIcon } from "lucide-react";
import { getCollections } from "../../actions/collection/getCollections";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateNewCollectionForm from "@/components/create-new-collection";

export default async function CreateNewCollection() {
    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                    <InfoIcon size="16" strokeWidth={2} />
                    This is a protected page that you can only see as an
                    authenticated user
                </div>
            </div>

            <h2 className="font-bold text-2xl mb-4">Create a new collection</h2>
            <CreateNewCollectionForm />
        </div>
    );
}
