import { Col, Row, Button, Form } from "react-bootstrap"
import { useState } from "react"

export default function Visualizer(currentCard) {
    console.log(currentCard)

    let price = currentCard.currentCard.price
    let foilPrice = currentCard.currentCard.foilPrice

    //foil state
    const options = [
        { label: 'Non-Foil', value: 'non' },
        { label: 'Foil', value: 'foil' },
    ];

    const [foil, setFoil] = useState("non")

    const handleChange = (event) => {
        setFoil(event.target.value);
      };

    //condition state
    const conditions = [
        { label: "Near-Mint", value: "nm" },
        { label: "Lightly Played", value: "lp" },
        { label: "Moderately Played", value: "mp" },
        { label: "Heavily Played", value: "hp" },
        { label: "Damaged", value: "dmg" },
    ]

    const [condition, setCondition] = useState("nm")

    const handleConditionChange = (event) => {
        setCondition(event.target.value);
      };


    //determine estimated value
    //these returns will be determined by settings later, but are hc for now
    function condMod(condition){
        if (condition == "nm"){
            return 1
        } else if (condition == "lp"){
            return .9
        } else if (condition == "mp"){
            return .75
        } else if (condition == "hp"){
            return .6
        } else if (condition == "dmg"){
            return .25
        } else return 1
    }
    
    
    function getPrice(foiling){
        if (foil == "foil") {
            return foilPrice
        } else return price
    }
    //need to find a way to make the price that is displayed in the dom update on change.

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
                <Row>
                    <p>{currentCard.currentCard.text}</p>
                </Row>
                <Row className="cell-header">
                    <h2>Set</h2>
                </Row>
                <Row>
                    <p>{currentCard.currentCard.set}</p>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <Button variant="primary" style={{ width: "fit-content" }}>Other Versions</Button>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row>
                    <label>
                        Foiling
                        <select foil={foil} onChange={handleConditionChange}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </label>
                </Row>
                <Row>
                <label>
                        Condition
                        <select condition={condition} onChange={handleChange}>
                            {conditions.map((condition) => (
                                <option key={condition.value} value={condition.value}>{condition.label}</option>
                            ))}
                        </select>
                    </label>
                </Row>
                <Row>
                    <p>Est Value: {getPrice(foil, condition)}</p>
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