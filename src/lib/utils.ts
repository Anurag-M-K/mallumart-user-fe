import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDirectionUrl = (latitude:any,longitude:any) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}