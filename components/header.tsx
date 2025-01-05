import { redirect } from "next/navigation";
import AuthButton from "./header-auth";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import { createClient } from "@/utils/supabase/client";
import { headers } from "next/headers";

export default async function Header() {
    const supabase = createClient();
    const headersList = await headers();
    const pathname = headersList.get("referer");
    const pathnameSplits = pathname ? pathname.split("/").slice(3).filter((_) => _ !== "") : [];
    let [collection, slug] = pathnameSplits; // Extract collection and slug
    if (slug == "new") slug = "";
    const { data: collectionData, error } = slug ? await supabase.from("todo_collections").select("*").eq("id", slug).single() : { data: null, error: null };
    console.log("collectionData", collectionData);
    if(!collectionData && error) {
        redirect("/collections");
    }
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            <BreadcrumbSeparator />
                            {collection && (
                                <>
                                    <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
                                    {collectionData && (
                                        <>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbLink href={`/collections/${collectionData.slug}`}>
                                                {collectionData.name}
                                            </BreadcrumbLink>
                                        </>
                                    )}
                                </>
                            )}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <AuthButton />
            </div>
        </nav>
    );
}
