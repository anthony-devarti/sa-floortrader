import { Col, Row, Button, Form } from "react-bootstrap"

export default function Visualizer(currentCard) {
    console.log(currentCard)

    let price = currentCard.currentCard.price
    let foilPrice = currentCard.currentCard.foilPrice
    let image = currentCard.currentCard.image

    return (
        <div className="visualizer">
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Card Image</h2>
                </Row>
                <Row className="image-cell">
                    <img src={currentCard.currentCard.img} style={{height:"32vh", width:"auto"}}></img>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Oracle Text</h2>
                </Row>
                <Row>
                    <p>{currentCard.currentCard.text}</p>
                </Row>
                <Row className="cell-header">
                    <h2>Set</h2>
                </Row>
                <Row>
                    <p>{currentCard.currentCard.set}</p>
                </Row>
                <Row style={{justifyContent:"center"}}>
                    <Button variant="primary" style={{width:"fit-content"}}>Other Versions</Button>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row>
                    <p>Regular: ${price}</p>
                </Row>
                <Row>
                    <p>Foil: ${foilPrice}</p>
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