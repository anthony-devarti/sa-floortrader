import { Col, Row } from "react-bootstrap"

export default function Visualizer(currentCard){
    console.log(currentCard)

    return(
        <div className="visualizer">
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Card Image</h2>
                </Row>
                <Row>
                    <p>Image goes here.</p>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Oracle Text</h2>
                </Row>
                <Row>
                    <p>{currentCard.currentCard.text}</p>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row>
                    <p>Regular: ${currentCard.currentCard.price}</p>
                </Row>
            </Col>
        </div>
    )
}