import { useState } from "react"
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap"
import "../CSS/calendar.css"
import { NewCalIcon, EditIcon } from "../Icons"
import EventScheduleModal from "./EventScheduleModal"

export default function Events() {

    ///////////manages event state and sets up with dummy data///////////////////////
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
    ////////////////////end///////////////////////////

    ////////////////// Event scheduluer Modal /////////////////////////
    const [modalShow, setModalShow] = useState(false);

    function createEvent(name, format, entry, prize, top8, cap, link) {
        console.log("Create Event Called")
        //this is going to need to get the expected id
        //need to add the time formatter to the modal and to here
        const newEvent = {
            "name": name, 
            "format":format, 
            "entry": parseInt(entry), 
            "prizeSupport": parseInt(prize), 
            "top8": top8, 
            "cap": parseInt(cap), 
            "registrationLink": link
        }
        const newEvents = events.concat(newEvent)
        setEvents(newEvents)
        setModalShow(false)
    }

    function editEvent(id) {
        console.log("Editing event ", id)
    }

    //I can probably adjust this for the edit function


    ////////////// end ///////////////////////////////////

    ///////////// Get Request for Event API Data /////////////////////



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
                <button
                    className="tile-button"
                    onClick={() => setModalShow(true)}
                >
                    <NewCalIcon />
                    Schedule Event
                </button>
                <EventScheduleModal
                    create={createEvent}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    )
}