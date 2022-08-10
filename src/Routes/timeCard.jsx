import { getHours, getMinutes } from "date-fns";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { axiosPost, axiosGet, addOutTime } from "../data";
import PunchCards from "../Calendar/PunchCards";

export default function TimeCard() {
    const [punches, setPunches] = useState([]);
    const [clockedIn, setClockedIn] = useState(false);

    async function fetchPunches(currentUser) {
        const response = await axiosGet(`/punches/?id=&ordering=-time_in&user__id=${currentUser}`);
        setPunches(response.results);
    }

    async function punchHandler(e) {
        e.preventDefault();
        let now = new Date().toISOString();
        const currentUser = 1
        await fetchPunches(currentUser);
        console.log("userpunches: ", punches);
        let lastPunch = punches.length - 1
        //this should edit the time_out field of the last punch in the database
        if (e.target.id === "in") {
            //check to see if the current user is already clocked in, reject this if they are
            const response = await axiosPost(`/punches/`, {
                user: currentUser,
                time_in: now,
                time_out: null
            });
            setClockedIn(true)
            return response
        } else if (e.target.id === "out") {
            addOutTime(lastPunch);
            setClockedIn(false);
            return
        }
    }


    return (
        <div className="timeCard">
            <h1>Time Card</h1>
            <Row className="row-buttons">
                <Col md className="row-buttons">
                    <button
                        className="tile-button"
                        id="in"
                        onClick={(e) => punchHandler(e)}
                        style={{ backgroundColor: "green" }}
                    >Clock In</button>
                </Col>
                <Col md className="row-buttons">
                    You are currently clocked {clockedIn ? "in" : "out"}.
                </Col>
                <Col md className="row-buttons">
                    <button
                        className="tile-button"
                        id="out"
                        onClick={(e) => punchHandler(e)}
                        style={{ backgroundColor: "#3a86ff" }}
                    >Clock Out</button>
                </Col>
            </Row>
            Shifts:
            <PunchCards />
            <Row className="row-buttons">
                <Col md className="row-buttons">
                    <button className="tile-button">New Time-Off Request</button>
                </Col>
                <Col md className="row-buttons">
                    You have no time off requests.
                </Col>
            </Row>
        </div>
    )
}