import { RPGCalendarDate } from "rpg-calendar/build/main/lib/types";
import { CalendarEvent, ParsedCalendarEvent } from "../plugins/types";
import { ordinal_suffix_of } from "../util/calendar";

type TimelineProps = {
  calendarEvents: ParsedCalendarEvent[]
};
const Timeline = (props: TimelineProps) => {
  const calendarEvents = props.calendarEvents || [];

  const sortedEvents = calendarEvents.sort((a, b) => {
    if (!a?.date?.epochDayTime || !b?.date?.epochDayTime) {return 0;}
    if (a.date.epochDayTime < b.date.epochDayTime) {return -1;}
    if (a.date.epochDayTime > b.date.epochDayTime) {return 1;}
    return 0;
  })

  const myStyles = {
    padding: "12px",
  };
  
  return <>
    {sortedEvents.map(e => (
      <div style={myStyles}>
        {e.slug ? <a href={e.slug} class="internal alias" data-slug={e.slug}>{e.name}</a> : <span>{e.name}</span>}<br/>
        <span>{ordinal_suffix_of(e.date.dayOfMonth!)} of {e.date.monthName}{e.date.year ? `, ${e.date.year}` : ''} ({e.date.dayName})</span><br/>
      </div>
    ))}
  </>
}

export default Timeline;
