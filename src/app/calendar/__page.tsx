'use client'

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

// Define the Event type
type Event = {
  id: string
  title: string
  start: Date
  end: Date
  description: string
  status: 'todo' | 'done'
}

// Sample events
const events: Event[] = [
  {
    id: '1',
    title: 'Event 1',
    start: new Date('2024-11-16 14:30'),
    end: new Date('2024-11-16'),
    description: "Meet Mary",
    status: 'todo',      
  },
  {
    id: '2',
    title: 'Event 2',
    start: new Date('2024-11-11'),
    end: new Date('2024-11-15'),
    description: "Meet Jane",
    status: 'done',        
  },
]

// Function to format events for react-big-calendar
const formatEvents = (events: Event[]) => {
  return events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }))
}

// Custom event component
const EventComponent = ({ event }: { event: Event }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`h-full w-full p-1 text-xs ${
            event.status === 'todo' ? 'bg-yellow-200' : 'bg-green-200'
          }`}
        >
          {event.title}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{event.description}</p>
        <p>Status: {event.status}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export default function Component() {
  const formattedEvents = formatEvents(events)

  return (
    <div className="h-[600px] w-full p-4">
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        components={{
          event: EventComponent,
        }}
      />
    </div>
  )
}