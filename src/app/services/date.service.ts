import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  generateDate(selectedDate: string, reverseToFormInput = false){

    const date = new Date(selectedDate);

   if (!reverseToFormInput) {
     const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Define an array of day names
     const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

     const day: string = days[date.getDay()];
     const month: string = months[date.getMonth()];
     const year:number = date.getFullYear();

     const dayOfMonth:string = ('0' + date.getDate()).slice(-2);

// Construct the formatted date string
     return `${day}, ${month} ${dayOfMonth}, ${year}`;
   } else {
     const date = new Date(selectedDate);

// Get the year, month, and day from the Date object
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
     const day = String(date.getDate()).padStart(2, '0');


     const formattedDate = `${year}-${month}-${day}`;

     return formattedDate;
   }
  }
}
