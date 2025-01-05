import { icons } from "lucide-react";

export const iconsForSelector: {
    value: string;
    label: string;
}[] = [
    ...Object.keys(icons).map((icon) => ({
        value: icon,
        label: icon,
    })),
]
