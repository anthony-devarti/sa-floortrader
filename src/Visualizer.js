import { Col, Row, Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useGlobalState } from "./GlobalState";
import { offerPrice } from "./data";
import BulkGuide from "./help/BulkGuide"

export default function Visualizer(offer) {

    const [state, dispatch] = useGlobalState()

    let card = state.card
    //for whatever reason, card.image_uris works, but when I go one deeper to normal, it can't be read
    //console.log("card image when it reaches visualizer: ", card.image_uris)

    //console.log("offer: ", offer.offer)
    const [offerField, setOfferField] = useState()
    const [bulkRares, setBulkRares] = useState(0)
    const [bulkCU, setBulkCU] = useState(0)

    //modal behavior
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let suggested = offerPrice(state.card.prices.usd, state.card.prices.usd_foil, state.foilStatus, state.condition, state.margins.margin, state.margins.bulkThreshold)

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
                                //this is adding global state keys for each key in the printing, rather than just replacing the value of the card key
                                // onClick={(e) => dispatch(state.card={printing})}
                                onClick={(e) => {
                                    handleClose()
                                    dispatch({ card: printing })
                                }}
                            // onClick={(e) => dispatch({ type: 'selectPrinting', payload: printing })}
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

    function addBulk(e) {
        // console.log("id: ", e.target.id, "rare rate: ", state.margins.bulkRareRate, "cu rate: ", state.margins.bulkCURate)
        let rarity = e.target.id
        let price = 0
        let title
        if (rarity == "rare") {
            price = bulkRares * state.margins.bulkRareRate
            title = "Bulk Rares"
        } else {
            price = bulkCU * state.margins.bulkCURate
            title = "Bulk C/U"
        }
        // console.log(price)
        let lineItem = {
            name: title,
            Estimate: price,
            foil: "N/A",
            Actual: price,
            condition: "N/A",
        }
        dispatch([state.cart.push(lineItem)]);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }

    //this should handle the grading guide modal
    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="visualizer">
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Card</h2>
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
                    <Col className="center">
                        <p>{card.set}</p>
                    </Col>
                    <Col className="center">
                        <Button
                            variant="primary"
                            onClick={fetchModal}
                            style={{ width: "fit-content" }}>Versions
                        </Button>
                    </Col>
                    <VersionModal />
                </Row>
            </Col>
            <Col className="cell">
                <Row className="cell-header">
                    <h2>Price</h2>
                </Row>
                <Row className="center">
                    {/* put the current offer here.  This should update whenever the app renders */}
                    Suggested Offer: ${suggested}
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
                                size="sm"
                            >+</Button>
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="bulk-title">
                    Bulk
                    <Button
                        variant="outline-info"
                        size="sm"
                        className="circle-button"
                        onClick={() => setModalShow(true)}>
                        ?
                    </Button>
                </Row>
                <Row>
                    <Form className="buy-form">
                        <Form.Group className="buy-form" controlId="bulkrares">
                            <Form.Control
                                type="currency"
                                placeholder="Bulk Rare Count"
                                onChange={(e) => setBulkRares(e.target.value)}
                            />
                            <Button
                                variant="success"
                                onClick={addBulk}
                                id="rare"
                                size="sm"
                            >+</Button>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Form className="buy-form">
                        <Form.Group className="buy-form" controlId="bulkcu">
                            <Form.Control
                                type="currency"
                                placeholder="Bulk C/U Count"
                                onChange={(e) => setBulkCU(e.target.value)}
                            />
                            <Button
                                variant="success"
                                onClick={addBulk}
                                //common uncommon id
                                id="cu"
                                size="sm"
                            >+</Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Col>
            <BulkGuide
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}