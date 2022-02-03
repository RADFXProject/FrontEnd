import React, { useState } from 'react';
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
import HTML5Backend from "react-dnd-html5-backend";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { month } from 'react-big-calendar/lib/utils/dates';

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

const DragAndDropCalendar = withDragAndDrop(Calendar);

const views = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda'
}



/*useEffect(() => {
  if (!initialized) {
    getCalendarEvents();
  }
});*/

export default function Home(props) {

  const [event, setEvent] = useState({title: '', allDay: '', start: '', end: '', desc: ''});

  const getCalendarEvents = async () => {
    const response = await getCalendar();
    const evs = response.data.map((d) => {
      return {
        ...d,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
  
    setInitialized(true);
  };
  const handleSelect =  (e) => {
    let { id, title, subject, start, end, allDay } = e;
    setEvent({ ...event, [name]: value });

    //const { start, end } = event;
    const data = { title: '', subject: '', start, end, allDay: false };
  
  };
  const handleSelectEvent = (event, e) => {
    
    let { id, title, subject, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { id, title, subject, start, end, allDay };
    
  };
  const handleDragEvent = (event, e) => {
    /*const { title } = event.target;
    const { start } = event.target;
    const { end } = event.target;
    const { desc } = event.target;
    const { allDay } = event.target;*/
    let { id, title, subject, start, end, allDay } = event;
    start = new Date(start);
    end = new Date(end);
    const data = { id, title, subject, start, end, allDay };
    
  };

  return(
    <div>
      <DragAndDropCalendar
        localizer={localizer}
        selectable
        events={events}
        onEventDrop={handleDragEvent}
        resizable
        //onEventResize={this.resizeEvent}
        onSelectSlot={handleSelect}
        onSelectEvent={handleSelectEvent}
        defaultView={DragAndDropCalendar.WEEK}
        defaultDate={new Date(2015, 3, 12)}
      />
    </div>
  );
}


