import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import events from '@/styles/events'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

const Cal = withDragAndDrop(Calendar);

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const handleSelect = (event, e) => {
  const { start, end } = event;
  const data = { title: '', subject: '', start, end, allDay: false };

};
const handleSelectEvent = (event, e) => {

  let { id, title, subject, start, end, allDay } = event;
  start = new Date(start);
  end = new Date(end);
  const data = { id, title, subject, start, end, allDay };
  
};
const handleDragEvent = (event, e) => {

  let { id, title, subject, start, end, allDay } = event;
  start = new Date(start);
  end = new Date(end);
  const data = { id, title, subject, start, end, allDay };
  
};

export default function Home(props) {
  return(
    <div>
      <Cal
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onEventDrop={handleDragEvent}
        //onEventResize={this.resizeEvent}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        style={{ height: 1000, width: 800 }}
        defaultDate={new Date(2015, 3, 12)}
        />
    </div>
  );
}