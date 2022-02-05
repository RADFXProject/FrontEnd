import React, { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { useTabStyles, AntTab} from '@/styles/useTabStyles'
import events from '@/styles/events'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Select from "react-select";

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

export default function Home(props) {

  //const [event, setEvent] = useState({title: '', allDay: '', start: '', end: '', desc: ''});
  const [events, setEvents] = useState(
    [
      {
        id:0,
        title:"help",
        start: new Date(),
        end: new Date(2022, 1, 4, 6),
      },
      {
        id:1,
        title:"help",
        start: new Date(),
        end: new Date(2022, 1, 4, 6),
      },
      {
        id:2,
        title:"help",
        start: new Date(),
        end: new Date(2022, 1, 4, 6),
      },
    ]
  );
  
  const addEvent = ({ event, start, end, allDay }) => {
    console.log(start);
    setSelectedDate(start);
    const newEvent = {
      id: events.length,
      title: "New event",
      start: start,
      end: end,
    }
    console.log(start, end);
    setEvents(state => [ ...state, newEvent ]);
  };

  const [selectedDate, setSelectedDate] = useState(undefined);

  const getCalendarEvents = async () => {
    //make api call to query events
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

  const handleSelect =  (events, e) => {
    console.log(e);
    let { id, title, start, end, allDay } = events;
    setEvents({ ...events, [id]: value });
    console.log(events);
    //const { start, end } = event;
    const data = { title: '', subject: '', start, end, allDay: false };
  
  };

  const handleSelectSlot = ({start, end, slots}) => {
    //pop modal up, from this and be able to pass through, these slots
    setSelectedDate(start);
    console.log(start);
    console.log(end);
    return;
  };

  const handleDragEvent = ({event, start, end}) => {
    //const thisEvent = event;
 
    const nextEvents = events.map((existingEvent) => {
      //console.log(existingEvent);
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent; 
        
    });
    //need to determine way to pinpoint event that is being dragged
    //as of right now it returns all events in the order they are on the calendar
    setEvents(nextEvents);
    //console.log(existingEvent);
    //console.log(nextEvents);
    //console.log(event);
  };

  const handleResizeEvent = ({event, start, end}) => {
    const thisEvent = event;

    const nextEvents = events.map((existingEvent) => {
      //console.log(existingEvent);
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
        
    });

    setEvents(nextEvents);
    //console.log(nextEvents[id]);
  }

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
  const classes = useTabStyles();

  return(
    <div className={classes.padding}>
      <Cal
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onEventDrop={handleDragEvent}
        onEventResize={handleResizeEvent}
        onSelectSlot={(events) => handleSelect(events)}
        onSelectEvent={handleSelectSlot}
        style={{ height: 1000, width: 800 }}
        defaultDate={new Date(2022, 1, 3)}
        hasMargin
        onSelectSlot={addEvent}
        step={15}       
        timeslots={4}
        />
      <Select
        defaultValue={[viewOptions[0], viewOptions[1], viewOptions[2]]}
        isMulti
        options={viewOptions}
        name="View"
        onChange={filterViewChange}
      />
    </div>
  );
}