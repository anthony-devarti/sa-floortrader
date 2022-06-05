import { getHours, getMinutes } from "date-fns";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import { axiosGetPunchesByUser, axiosPost, axiosGet } from "../data";

export default function TimeCard() {
    const [punches, setPunches] = useState([]);

    async function fetchPunches(currentUser) {
        const response = await axiosGet(`/punches/?id=&ordering=-time_in&user__id=${currentUser}`);
        setPunches(response.results);
      }

    async function punchHandler(e) {
        e.preventDefault();
        let now = new Date().getTime();
        const currentUser = 1
        if (e.target.id === "in") {
            //check to see if the current user is already clocked in, reject this if they are
            await fetchPunches(currentUser);
            if (punches[0].time_out === null) {
                alert("You are already clocked in!");
                return
            } else if (punches[0].time_in === undefined) {
                alert("Something went wrong. Try again.")
                return
            } else {
                const response = await axiosPost(`/punches/`, {
                    user: currentUser,
                    time_in: now,
                    time_out: null
                });
                return
            }
        } else if (e.target.id === "out"){
            let lastPunch = punches[0]
            if (lastPunch.time_out === null) {
                console.log("Punching out");
                //patch the punch with the time out
            } else {
                let id = lastPunch.id
                await axiosGet(`/punches/${id}/`);
                
                alert("You are already clocked out!");
                return
            }
            //this should edit the time_out field of the last punch in the database
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
                    You are currently clocked in.
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
            <h3>You've been clocked in for </h3>
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