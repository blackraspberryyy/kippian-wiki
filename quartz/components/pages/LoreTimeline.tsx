import { RPGCalendar } from "rpg-calendar"
import { ordinal_suffix_of, parseDateString, readBuiltCalendarEventJson } from "../../util/calendar"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import Timeline from "../Timeline";
import { ParsedCalendarEvent } from "../../plugins/types";

const LoreTimeline: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // if there are no configs, then don't display the calendar.
  if (!cfg?.calendarConfig) {
    return;
  }

  const calendarConfig = cfg.calendarConfig;
  const calendar = new RPGCalendar(calendarConfig);

  const events: ParsedCalendarEvent[] = readBuiltCalendarEventJson().filter(e => !!e).map(e => ({...e, date: parseDateString(calendar, e.date)}));
  const sortedEvents = events.filter(e => e.category === 'Lore');

  return (
    <Timeline calendarEvents={sortedEvents}></Timeline>
  )
}

export default (() => LoreTimeline) satisfies QuartzComponentConstructor
