import { useState } from "react"
import { Card, Button, Modal, Form, Row, Col } from "react-bootstrap"
import "../CSS/calendar.css"
import { NewCalIcon, EditIcon } from "../Icons"
import EventScheduleModal from "./EventScheduleModal"
import './EventCard.css'

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

    ///////// translator function.  I want to add this to the data file, but I'm having trouble with the import ///////
    function formatTranslator(input) {
        let parsed = parseInt(input)
        switch (true) {
            case parsed === 1:
                return "Standard"
            case parsed === 2:
                return "Modern"
            case parsed === 3:
                return "Legacy"
            case parsed === 4:
                return "Commander"
            case parsed === 5:
                return "Pioneer"
            case parsed === 6:
                return "Pauper"
            case parsed === 7:
                return "Sealed"
            case parsed === 8:
                return "Draft"
            default:
                return "N/A"
        }
    }

    const [events, setEvents] = useState(dummy)
    ////////////////////end///////////////////////////

    ////////////////// Event scheduluer Modal /////////////////////////
    const [modalShow, setModalShow] = useState(false);

    function createEvent(name, format, entry, prize, top8, cap, link, date, time) {
        //need to add the time formatter to the modal and to here
        const newEvent = {
            "name": name,
            "format": formatTranslator(format),
            "entry": parseInt(entry),
            "prizeSupport": parseInt(prize),
            "top8": top8,
            "cap": parseInt(cap),
            "registrationLink": link,
            //this might need to be changed to be based on the results of the api call
            "id": events.length + 1,
            "time": time,
            //date is not working as expected
            "date": date
        }
        const newEvents = events.concat(newEvent)
        setEvents(newEvents)
        setModalShow(false)
    }

    //I can probably adjust this for the edit function
    function editEvent(id) {
        console.log("Editing event ", id)
    }



    ////////////// end ///////////////////////////////////

    ///////////// Get Request for Event API Data /////////////////////

    ///////////// Post Request for Event API Data /////////////////////

    ////filter events/////////
    const [standard, setStandard] = useState(true)
    const [modern, setModern] = useState(true)
    const [legacy, setLegacy] = useState(true)
    const [commander, setCommander] = useState(true)
    const [pioneer, setPioneer] = useState(true)
    const [pauper, setPauper] = useState(true)
    const [sealed, setSealed] = useState(true)
    const [draft, setDraft] = useState(true)
    const [upcoming, setUpcoming] = useState(true)

    const standardEvents = events.filter(event => event.format === "Standard")
    const modernEvents = events.filter(event => event.format === "Modern")
    const legacyEvents = events.filter(event => event.format === "Legacy")
    const commanderEvents = events.filter(event => event.format === "Commander")
    const pioneerEvents = events.filter(event => event.format === "Pioneer")
    const pauperEvents = events.filter(event => event.format === "Pauper")
    const sealedEvents = events.filter(event => event.format === "Sealed")
    const draftEvents = events.filter(event => event.format === "Draft")

    const filteredEvents = []
    if (standard) {
        filteredEvents.push(...standardEvents)
    }
    if (modern) {
        filteredEvents.push(...modernEvents)
    }
    if (legacy) {
        filteredEvents.push(...legacyEvents)
    }
    if (commander) {
        filteredEvents.push(...commanderEvents)
    }
    if (pioneer) {
        filteredEvents.push(...pioneerEvents)
    }
    if (pauper) {
        filteredEvents.push(...pauperEvents)
    }
    if (sealed) {
        filteredEvents.push(...sealedEvents)
    }
    if (draft) {
        filteredEvents.push(...draftEvents)
    }
    if (upcoming) {
        filteredEvents.filter(event => event.date > new Date())
    }

    function checkHandler(format) {
        switch (format) {
            case "Standard":
                setStandard(!standard)
                break;
            case "Modern":
                setModern(!modern)
                break;
            case "Legacy":
                setLegacy(!legacy)
                break;
            case "Commander":
                setCommander(!commander)
                break;
            case "Pioneer":
                setPioneer(!pioneer)
                break;
            case "Pauper":
                setPauper(!pauper)
                break;
            case "Sealed":
                setSealed(!sealed)
                break;
            case "Draft":
                setDraft(!draft)
                break;
            default:
                break;
        }
    }

    //a box for format filters
    function FormatFilters() {
        return (
            <div className="filter-group">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Row>
                        <h3>Format Filters</h3>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={standard}
                                onChange={() => checkHandler("Standard")}
                                label="Standard" />
                            <Form.Check
                                type="checkbox"
                                defaultChecked={modern}
                                onChange={() => checkHandler("Standard")}
                                label="Modern" />
                            <Form.Check
                                type="checkbox"
                                defaultChecked={legacy}
                                onChange={() => checkHandler("Legacy")}
                                label="Legacy" />
                            <Form.Check
                                type="checkbox"
                                defaultChecked={commander}
                                onChange={() => checkHandler("Commander")}
                                label="Commander" />
                        </Col>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                defaultChecked={pioneer}
                                onChange={() => checkHandler("Pioneer")}
                                label="Pioneer" />
                            <Form.Check
                                type="checkbox"
                                defaultChecked={pauper}
                                onChange={() => checkHandler("Pauper")}
                                label="Pauper" />
                            <Form.Check
                                type="checkbox"
                                defaultChecked={sealed}
                                onChange={() => checkHandler("Sealed")}
                                label="Sealed" />
                            <Form.Check
                                type="checkbox"
                                defaultChecked={draft}
                                onChange={() => checkHandler("Draft")}
                                label="Draft" />
                        </Col>
                    </Row>
                </Form.Group>
            </div>
        )
    }


    return (
        <>
            <div className="filters">
                <FormatFilters />
                <div className="filter-group">
                    <label class="form-switch">
                        <Row><h3>Show Past Events</h3></Row>
                        <input
                            type="checkbox"
                            label="Show Past Events"
                            onChange={() => setUpcoming(!upcoming)}
                        />
                        <i></i>
                        <Row></Row>
                    </label>
                </div>
            </div>
            <div className="events">
                {filteredEvents.map((event) => (
                    <div className="container">
                        <div className={`card ${event.format.toLowerCase()}`}>
                            <div className="contentBx">
                                <h2>{event.name}</h2>
                                <div className={"size"}>
                                    <span>Date: {event.time}</span>
                                    <span>Prize: ${event.prizeSupport}</span>
                                </div>
                                <div className="size">
                                    <span>Format: {event.format}</span>
                                    <span>Entry: ${event.entry}</span>
                                </div>
                                <div className="size">
                                    <span>Time: {event.time}</span>
                                    <span>Cap: {event.cap}</span>
                                </div>
                                <div className="event-clickthrough">
                                    <Button variant="light" onClick={() => editEvent(event.id)}>Edit</Button>
                                    <Button variant="light" >More</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <EventCard /> */}
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