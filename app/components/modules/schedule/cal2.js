/*import React, { useState } from 'react';
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
});

export default function Home(props) {

  //const [event, setEvent] = useState({title: '', allDay: '', start: '', end: '', desc: ''});
  const [events, setEvents] = useState(
    [
      {
        id:1,
        title:"help",
        start:new Date(),
        end: new Date(),
      }
    ]
  );
  
  const [selectedDate, setSelectedDate] = useState(undefined);

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
  const handleSelect =  (events, e) => {
    console.log(e);
    let { title, start, end, allDay } = events;
    setEvent({ ...event, [title]: value });
    console.log(events);
    //const { start, end } = event;
    const data = { title: '', subject: '', start, end, allDay: false };
  
  };
  const handleSelectEvent = ({start, end, slots}) => {
    //pop modal up, from this and be able to pass through, these slots
    setSelectedDate(start);
    return;
  };
  const handleDragEvent = ({event, start, end}) => {
    /*const { title } = event.target;
    const { start } = event.target;
    const { end } = event.target;
    const { desc } = event.target;
    const { allDay } = event.target;
    const thisEvent = event;
 
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
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
}*/
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
 
import Router from "next/router";
import React, { useState } from "react";
import Select from "react-select";
 
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
 
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
 
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
 
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
 
const DragAndDropCalendar = withDragAndDrop(Calendar);
 
export default function MyCalendar() {
  const [events, setEvents] = useState(
    [
      {
        id:1,
        title:"help",
        start:new Date(),
        end: new Date(),
      }
    ]
  );
 
 
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(undefined);
 
  const [showAssignments, setShowAssignments] = useState(true);
  const [showCourseTimes, setShowCourseTimes] = useState(true);
  const [showOfficeHours, setShowOfficeHours] = useState(true);
  const [showStudySessions, setShowStudySessions] = useState(false); // add later
 
  const setView = [
    setShowAssignments,
    setShowCourseTimes,
    setShowOfficeHours,
    setShowStudySessions,
  ];
 
 
  const handleSelectSlot = ({ start, end, slots }) => {
    //pop modal up, from this and be able to pass through, these slots
    setSelectedDate(start);
    return;
  };
 
  const moveEvent = ({ event, start, end }) => {
    const thisEvent = event;
 
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    setEvents(nextEvents);
    //console.log(existingEvent);
    console.log(nextEvents);
    console.log(event);
  };
 
 
  const viewOptions = [
    { value: "Assignments", label: "Assignment due dates", index: 0 },
    { value: "Courses", label: "Courses times", index: 1 },
    { value: "Office Hours", label: "Office hours", index: 2 },
    {
      value: "Study Sessions",
      label: "Study sessions (Not implemented)",
      index: 3,
    },
  ];
 
  const filterViewChange = (selected) => {
    var indexOfSelected = [];
    selected.map((selection) =>
      indexOfSelected.push(selection.index)
    );
 
    viewOptions.map((option) =>
      indexOfSelected.includes(option.index)
        ? setView[option.index](true)
        : setView[option.index](false)
    );
  };
 
  return (
    <div className="h-auto">
      <div>
        <DragAndDropCalendar
          selectable
          resizable
          popup
 
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
 
          onEventDrop={moveEvent}
          onEventResize={moveEvent}
          onSelectEvent={(event) => handleSelectEvent(event)}
          onSelectSlot={handleSelectSlot}
 
          style={{ height: 500 }}
          defaultDate={new Date()}
        />
 
        <Select
          defaultValue={[viewOptions[0], viewOptions[1], viewOptions[2]]}
          isMulti
          options={viewOptions}
          name="View"
          onChange={filterViewChange}
        />
      </div>
    </div>
  );
}
