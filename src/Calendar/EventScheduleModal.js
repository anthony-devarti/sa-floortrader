import { Button, Modal, Form, Row, Col } from "react-bootstrap"
import { useState } from "react";

export default function EventScheduleModal(props) {

    const [name, setName] = useState("");
    const [format, setFormat] = useState();
    const [entry, setEntry] = useState();
    const [prize, setPrize] = useState();
    const [top8, setTop8] = useState(false);
    const [cap, setCap] = useState();
    const [link, setLink] = useState();
    //Event Time needs to be set up
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    function toggle() {
        top8 ? setTop8(false) : setTop8(true)
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Schedule an Event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                    value={name}
                    type="text"
                    id="title"
                    placeholder="Enter a clear event name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>Format</Form.Label>
                <Form.Select aria-label="Format"
                    value={format}
                    id="format"
                    onChange={(e) => setFormat(e.target.value)}
                >
                    <option>Choose a Format</option>
                    <option value="1">Standard</option>
                    <option value="2">Modern</option>
                    <option value="3">Legacy</option>
                    <option value="4">Commander</option>
                    <option value="5">Pioneer</option>
                    <option value="6">Pauper</option>
                    <option value="7">Sealed</option>
                    <option value="8">Draft</option>
                    <option value="9">Other</option>
                </Form.Select>
                <Row className="g-2">
                    <Col md>
                        <Form.Label>Entry Fee</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            value={entry}
                            placeholder="$"
                            onChange={(e) => setEntry(e.target.value)}
                        />
                    </Col>
                    <Col md>
                        <Form.Label>Prize Support</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            value={prize}
                            placeholder="$"
                            onChange={(e) => setPrize(e.target.value)}
                        />
                    </Col>
                    <Col md>
                        <Form.Label>Top 8 Cut?</Form.Label>
                        <Form.Check
                            type="switch"
                            id="t8Cut"
                            value={top8}
                            onChange={toggle}
                        />
                    </Col>
                    <Col md>
                        <Form.Label>Cap</Form.Label>
                        <Form.Control
                            type="number"
                            id="cap"
                            placeholder="8"
                            value={cap}
                            onChange={(e) => setCap(e.target.value)}
                        />
                    </Col>
                </Row>
                <Form.Label>Regisration Link</Form.Label>
                <Form.Control
                    type="text"
                    id="title"
                    placeholder="www.example.com"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <Row>
                    <Col md>
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="eventDate"
                            placeholder="Event Date"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Col>
                    <Col md>
                        <Form.Label>Select Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="eventTime"
                            placeholder="Event Time"
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={() => props.create(name, format, entry, prize, top8, cap, link, date, time)}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
}