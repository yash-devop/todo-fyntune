import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {isValid , isBefore , startOfDay, parseISO, isToday, isTomorrow, format} from "date-fns"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function isValidDate(date:Date){
  if(!isValid(date)) throw new Error("Date passed to isValid fn is not valid.");
  return !isBefore(date, startOfDay(new Date()))
}

export const formatDueDate = (dateStr: string) => {
  const date = parseISO(dateStr);
  if (isToday(date)) return "Due Today";
  if (isTomorrow(date)) return "Due Tomorrow";
  return format(date, "MMM dd, yyyy");
};