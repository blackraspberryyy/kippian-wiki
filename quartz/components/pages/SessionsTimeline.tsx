import { RPGCalendar } from "rpg-calendar"
import { ordinal_suffix_of, parseDateString, readBuiltCalendarEventJson } from "../../util/calendar"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import Timeline from "../Timeline";

const SessionsTimeline: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // if there are no configs, then don't display the calendar.
  if (!cfg?.calendarConfig) {
    return;
  }

  const calendarConfig = cfg.calendarConfig;
  const calendar = new RPGCalendar(calendarConfig);

  const events = readBuiltCalendarEventJson().filter(e => !!e).map(e => ({...e, date: parseDateString(calendar, e.date)}));
  const sortedEvents = events.filter(e => e.category === 'Session');

  return (
    <Timeline calendarEvents={sortedEvents}></Timeline>
  )
}

export default (() => SessionsTimeline) satisfies QuartzComponentConstructor
