import { Col, Row } from "react-bootstrap"

export default function Visualizer(){
    return(
        <div className="visualizer">
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Card Image</h2>
                </Row>
                <Row>
                    <p>This is where the image will go.</p>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Oracle Text</h2>
                </Row>
                <Row>
                    <p>This is where the text will go.</p>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row>
                    <p>This is where the card price goes.</p>
                </Row>
            </Col>
        </div>
    )
}