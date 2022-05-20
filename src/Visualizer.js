import { Col, Row, Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"
import { useGlobalState } from "./GlobalState";
import { printings } from "./data";

export default function Visualizer(currentCard) {

    const [state, dispatch] = useGlobalState()

    let card = state.card

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function VersionModal() {

        //get all of the printings from the api

        //this is not logging
        console.log("card when modal is rendering",state.card.name)

        //this is hitting the api whenever the search value state is updating
        //that's bad
        const otherPrintings = printings(state.card.name)
        console.log(otherPrintings)


        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Other Sets</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="visualizer">
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Card Image</h2>
                </Row>
                <Row className="image-cell">
                    <img src={card.img} style={{ height: "32vh", width: "auto" }}></img>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Oracle Text</h2>
                </Row>
                <Row className="overflow-scroll">
                    <p>{card.text}</p>
                </Row>
                <Row className="cell-header">
                    <h2>Set</h2>
                </Row>
                <Row>
                    <p>{card.set}</p>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <Button
                        variant="primary"
                        onClick={handleShow}
                        style={{ width: "fit-content" }}>Other Versions</Button>
                    <VersionModal />
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row>
                    Suggested Offer: $ {card.price}
                </Row>
                <Row>
                    <Form className="buy-form">
                        <Form.Group className="buy-form" controlId="offerPrice">
                            <Form.Control type="currency" placeholder="Your Offer" />
                            <Button variant="success">Add to Offer</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Col>
        </div>
    )
}