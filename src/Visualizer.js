import { Col, Row, Button, Form, Modal } from "react-bootstrap"
import { useState } from "react"
import { useGlobalState } from "./GlobalState";
import { getPrintings, printings } from "./data";

export default function Visualizer(offer) {

    const [state, dispatch] = useGlobalState()

    let card = state.card
    //for whatever reason, card.image_uris works, but when I go one deeper to normal, it can't be read
    //console.log("card when it reaches visualizer: ", card.image_uris)

    //console.log("offer: ", offer.offer)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


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
    // console.log(printings)

    function VersionModal() {



        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Other Sets</Modal.Title>
                </Modal.Header>
                <Modal.Body className="over-x">
                    {printings.map((printing) => (
                    <div key={printing.id} className="selector">
                        <img src={printing.image_uris.small}></img>
                    </div>    
                    ))}
                </Modal.Body>
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
                    <img src={state.card.image_uris} style={{ height: "32vh", width: "auto" }}></img>
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
                    Suggested Offer: {offer.offer}
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