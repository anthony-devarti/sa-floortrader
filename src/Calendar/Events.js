import { useState } from "react"
import { Card, Button } from "react-bootstrap"
import "../CSS/calendar.css"
import { NewCalIcon, EditIcon } from "../Icons"

export default function Events() {
    const dummy = [
        {
            name: "Modern Showcase",
            format: "Modern",
            prizeSupport: 1000,
            entry: 35,
            cap: 64,
            time: "datetime",
            registrationLink: "www.google.com",
            location: "Store",
            qualifications: "none",
            top8: true,
            id: 1
        },
        {
            name: "Standard FNM",
            format: "Standard",
            prizeSupport: 100,
            entry: 5,
            cap: 64,
            time: "datetime",
            registrationLink: "www.google.com",
            location: "Store",
            qualification: "none",
            top8: false,
            id: 2
        }
    ]

    const [events, setEvents] = useState(dummy)

    //needs a get request to go get the events and set them to the events state


    return (
        <>
            <div className="events">
                {events.map((event) => (
                    <Card key={event.id} border="dark" className="event-card">
                        <Card.Header className="card-header">{event.name}|{event.format}|
                            <Button
                                variant="light"
                                size="sm"
                            >
                                <EditIcon />
                            </Button>
                        </Card.Header>
                        <Card.Body className="scroll-body">
                            <div >
                                <ul>
                                    <li>Max Prize Support: ${event.prizeSupport}</li>
                                    <li>Entry Fee: ${event.entry}</li>
                                    <li>Attendance Cap: {event.cap}</li>
                                    <li>Start Time: {event.time}</li>
                                    <li>Signup Link: {event.registrationLink}</li>
                                    <li>Location: {event.location}</li>
                                    <li>Qualifies for: {event.qualification}</li>
                                    <li>T8 Cut: {event.top8 ? "Yes" : "No"}</li>
                                    <li>Event ID: {event.id}</li>
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div>
                <button className="tile-button">
                    <NewCalIcon />
                    Schedule Event
                </button>
            </div>
        </>
    )
}