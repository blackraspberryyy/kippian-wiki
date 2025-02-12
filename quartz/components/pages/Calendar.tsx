// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import calendarScript from '../scripts/calendar.inline';
import calendarStyle from "../styles/calendar.scss"
import { RPGCalendar } from "rpg-calendar"
import { ordinal_suffix_of, parseDateString, readBuiltCalendarEventJson } from "../../util/calendar"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Calendar: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // if there are no configs, then don't display the calendar.
  if (!cfg?.calendarConfig) {
    return;
  }

  const calendarConfig = cfg.calendarConfig;
  const calendar = new RPGCalendar(calendarConfig);

  const events = readBuiltCalendarEventJson().filter(e => !!e).map(e => ({...e, date: parseDateString(calendar, e.date)}));
  const sortedEvents = events.filter(e => e.category != 'Calendar').sort((a, b) => {
    if (!a?.date?.epochDayTime || !b?.date?.epochDayTime) {return 0;}
    if (a.date.epochDayTime < b.date.epochDayTime) {return -1;}
    if (a.date.epochDayTime > b.date.epochDayTime) {return 1;}
    return 0;
  });

  // TODO: UI
  return (
    <>
      {sortedEvents.map(e => (
        <div>
          <span>{e.name}</span><br/>
          <span>{ordinal_suffix_of(e.date.dayOfMonth!)} of {e.date.monthName}{e.date.year ? `, ${e.date.year}` : ''} ({e.date.dayName})</span><br/>
          <span>{e.category}</span><br/>
          <span>{e.slug}</span><br/>
          <hr></hr>
        </div>
      ))}
    </>
  )
}

Calendar.css = calendarStyle;
Calendar.beforeDOMLoaded = calendarScript;

export default (() => Calendar) satisfies QuartzComponentConstructor
