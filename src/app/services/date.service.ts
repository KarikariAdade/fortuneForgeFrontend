import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  generateDate(date: Date){

    const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Define an array of day names
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day: string = days[date.getDay()];
    const month: string = months[date.getMonth()];
    const year:number = date.getFullYear();

    const dayOfMonth:string = ('0' + date.getDate()).slice(-2);

// Construct the formatted date string
    return `${day}, ${month} ${dayOfMonth}, ${year}`;
  }
}
