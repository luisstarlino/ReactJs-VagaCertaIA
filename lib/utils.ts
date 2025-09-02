import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-30 09:20
* Description: Utility functions for file handling and formatting.
* 
* @param bytes - The file size in bytes to be formatted.
* @returns A human-readable string representing the size in B, KB, MB, or GB.
*****************************************************************************************/
export function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
}

/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-08-30 23:55
* Description: Generate Dynamic UUID 
* @returns A string uuid
*****************************************************************************************/
export const generateUUID = () => crypto.randomUUID();


/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-09-01 21:10
* Description: Generate Dynamic Class marge 
* @param inputs: Classes
* @returns A string uuid
*****************************************************************************************/
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}