import { Button, Card } from "react-bootstrap";
import { EditIcon } from "../Icons";
import { useState } from "react";
import { axiosGet } from "../data";

export default function PunchCards() {

    const id = 1
    const dummy = [
        {
            id: 1,
            user: 1,
            time_in: "2022-06-04T23:18:42Z",
            time_out: "2022-06-04T17:18:58Z"
        },
        {
            id: 2,
            user: 1,
            time_in: "2022-06-05T14:04:42.92Z",
            time_out: null
        },
    ]
    const [punches, setPunches] = useState(dummy)

    async function fetchPunches(currentUser) {
        const response = await axiosGet(`/punches/?id=&ordering=-time_in&user__id=${currentUser}`);
        setPunches(response.results);
    }

    return (
        <>
            <Button onClick={() => fetchPunches(id)}>Fetch</Button>
            <div className="events">
                {punches.map((punch) => (
                    <Card key={punch.id} border="dark" className="event-card">
                        <Card.Header className="card-header">{punch.time_in} |
                            <Button
                                variant="light"
                                size="sm"
                            >
                                <EditIcon />
                            </Button>
                        </Card.Header>
                        <Card.Body className="scroll-body">
                            <div >
                                Time In: {punch.time_in}
                                Time Out: {punch.time_out}
                                {/* Hours worked: {punch.time_in - punch.time_out} */}
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    )
}