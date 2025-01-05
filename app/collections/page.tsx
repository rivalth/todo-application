import { InfoIcon } from "lucide-react";
import { getCollections } from "../actions/collection/getCollections";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Collections() {
    const collections = await getCollections();



    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="w-full">
                <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                    <InfoIcon size="16" strokeWidth={2} />
                    This is a protected page that you can only see as an
                    authenticated user
                </div>
            </div>

            {collections?.length === 0 && (
                <>
                    <h2 className="font-bold text-2xl mb-4">No collections found</h2>
                    <p className="text-foreground">
                        You don't have any collections yet. Create a collection to
                        see it here.
                    </p>

                    <Link href={`/collections/new`}>
                        <Button>Create Collection</Button>
                    </Link>
                </>
            )}
            <div className="flex flex-col gap-2 items-start">
                <h2 className="font-bold text-2xl mb-4">Collections details</h2>
                <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
                    {JSON.stringify(collections, null, 2)}
                </pre>
            </div>
        </div>
    );
}
