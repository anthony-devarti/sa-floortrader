import { Col, Row, Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"

export default function Visualizer(currentCard) {
    // console.log(currentCard.currentCard)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function VersionModal() {


        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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
                    <img src={currentCard.currentCard.img} style={{ height: "32vh", width: "auto" }}></img>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Oracle Text</h2>
                </Row>
                <Row className="overflow-scroll">
                    <p>{currentCard.currentCard.text}</p>
                </Row>
                <Row className="cell-header">
                    <h2>Set</h2>
                </Row>
                <Row>
                    <p>{currentCard.currentCard.set}</p>
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
                    Suggested Offer: $ {currentCard.currentCard.price}
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