import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateToArabic(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // تنسيق التاريخ بصيغة DD-MM-YYYY
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
}

export function formatTimeToArabic(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // تنسيق الوقت بصيغة 12 ساعات
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}
