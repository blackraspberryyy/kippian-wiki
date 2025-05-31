import { RPGCalendarDate, RPGCalendarWeekday } from "rpg-calendar/build/main/lib/types";
import { CalendarEvent, FCDateObj } from "../plugins/types";
import fs from "fs";
import path from "path";
import { styleText } from 'util';
import { RPGCalendar } from "rpg-calendar";


/**
 * Get's the day of the week's name.
 * @param weekdays - array of weekdays from the config
 * @param date - created calendar date
 */
export const getDayName = (weekdays: RPGCalendarWeekday[], date: RPGCalendarDate) => {
  const daysInWeek = weekdays.length;
  const dayMod = date.dayOfMonth! % daysInWeek;
  const weekdayIndex = dayMod === 0 ? daysInWeek : dayMod;  // if divisible by weeekdays.length, it's the last day of the week.

  return (daysInWeek > 0 && weekdays[weekdayIndex-1] && weekdays[weekdayIndex-1].name) || 'Unknown' ;
};

export const insertToJson = (calendarEvents: CalendarEvent[]) => {
  // get the user-written calendar_events and use it as default data
  const existingCalendarEventsFile = path.resolve('quartz', 'calendar_events.json');
  let defaultData = fs.readFileSync(existingCalendarEventsFile, {encoding: 'utf-8'});

  if (defaultData) {
    defaultData = JSON.parse(defaultData);
  }

  // let's assign random uuid to the built calendar.
  const filename = path.resolve('quartz', 'static', 'built_calendar_events.json');

  // delete the built file if it exists
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
    console.log(styleText('yellow', `\n'${filename}' found. Deleting it and creating new...`))
  }

  // write to a file
  const events = [...defaultData, ...calendarEvents];
  fs.writeFileSync(filename, JSON.stringify(events) , {encoding: 'utf-8', flag: 'w'});

  console.log(styleText('green', `"${filename}" file has been generated.`))
}

export const readBuiltCalendarEventJson = (): CalendarEvent[] => {
  const filename = path.resolve('quartz', 'static', 'built_calendar_events.json');
  
  if (fs.existsSync(filename)) {
    const fileContents = fs.readFileSync(filename, {encoding: 'utf-8'});
    return JSON.parse(fileContents);
  }

  return [];
}

export const parseDateString = (calendar: RPGCalendar, dateString: string): RPGCalendarDate => {
  const strs = dateString.split('-');
  let year = parseInt(strs[0]);
  const month = parseInt(strs[1]);
  const day = parseInt(strs[2]);

  return calendar.createDate(year, month, day);
}

// Adds 'st', 'nd', 'rd, and 'th' on numbers
// ref: https://stackoverflow.com/a/13627586/9183405
export function ordinal_suffix_of(i: number) {
  let j = i % 10;
  let k = i % 100;

  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

export function getFcDateString(fcDate: Date | string | FCDateObj) {
  if (typeof (fcDate as Date).getMonth === 'function') {  // date
    return (fcDate as Date).toISOString().split('T')[0];
  } else if (typeof fcDate === 'string') {  // string
    return fcDate;
  } else if (typeof fcDate === 'object' && typeof (fcDate as FCDateObj).month === 'number') {  // FCDateObj
    return `${(fcDate as FCDateObj)?.year || '0000'}-${(fcDate as FCDateObj)?.month || '00'}-${(fcDate as FCDateObj)?.day || '00'}`;
  } else {
    return '';
  }
}