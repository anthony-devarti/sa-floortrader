import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useGlobalState } from "./GlobalState";
import { offerPrice } from "./data";

export default function Visualizer(offer) {

    const [state, dispatch] = useGlobalState()

    let card = state.card
    //for whatever reason, card.image_uris works, but when I go one deeper to normal, it can't be read
    //console.log("card image when it reaches visualizer: ", card.image_uris)

    //console.log("offer: ", offer.offer)
    const [offerField, setOfferField] = useState()

    //modal behavior
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let suggested = offerPrice(card.prices.usd, card.prices.usd_foil, state.foil, state.condition)


    const [printings, setPrintings] = useState([])
    function fetchModal() {
        //this is hitting the api whenever the search value state is updating
        //that's bad
        const fetchPromise = fetch(`https://api.scryfall.com/cards/search?order=released&q=oracleid%3A${card.oracle_id}&unique=prints`);

        fetchPromise
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                console.log("response: ", json.data);
                setPrintings(json.data)
            })
            .catch(error => {
                console.error(`Could not get products: ${error}`);
            });

        handleShow()
    }


    function VersionModal() {



        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Other Sets</Modal.Title>
                </Modal.Header>
                <Modal.Body className="over-x">
                    {printings.map((printing) => (
                        <div
                            key={printing.id}
                            id={printing.set_name}
                            className="selector"
                        >
                            <h4>{printing.set_name}</h4>
                            <img
                                src={printing.image_uris.small}
                                alt={card.name}
                            >
                            </img>
                            <Button
                                variant="primary"
                                //the goal here is to get the button to highlight the card, then for the visualizer
                                //to rerender whenever the save button is clicked so the new printing can update.
                                //may make sense to change this workflow to selecting the printing before this.
                                onClick={(e) => dispatch(state.card = { ...printing })}
                            >Choose Printing</Button>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        );
    }

    //adding to the current cart
    function addToCart(e) {
        let lineItem = {
            name: card.name,
            Estimate: suggested,
            foil: state.foil,
            Actual: offerField,
            condition: state.condition,
        }
        dispatch([state.cart.push(lineItem)]);
        localStorage.setItem("cart", JSON.stringify(state.cart));
        setOfferField("")
    }

    return (
        <div className="visualizer">
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Card Image</h2>
                </Row>
                <Row className="image-cell">
                    <img
                        src={card.image_uris.normal}
                        style={{ height: "32vh", width: "auto" }}
                        alt={card.name}
                    >
                    </img>
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Oracle Text</h2>
                </Row>
                <Row className="overflow-scroll">
                    <p>{card.oracle_text}</p>
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
                        onClick={fetchModal}
                        style={{ width: "fit-content" }}>Other Versions</Button>
                    <VersionModal />
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row>
                    {/* put the current offer here.  This should update whenever the app renders */}
                    Suggested Offer: {suggested}
                </Row>
                <Row>
                    <Form className="buy-form">
                        <Form.Group className="buy-form" controlId="offerPrice">
                            <Form.Control
                                type="currency"
                                placeholder="Your Offer"
                                onChange={(e) => setOfferField(e.target.value)}
                            />
                            <Button
                                variant="success"
                                onClick={addToCart}
                            >Add to Offer</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Col>
        </div>
    )
}