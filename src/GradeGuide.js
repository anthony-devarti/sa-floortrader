import { Modal, Button, Col, Row } from "react-bootstrap";

export default function GradeGuide(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Grading Guide
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="long-body">
                <p>
                    The condition of a card is determined by the number and extent of imperfections that a card exhibits.  Imperfections are any atypical printing or manufacturing defects, and any wear or damage to the card after that printing process. Imperfections are characterized by both a Type (ex: scratch) and a Severity (ex: slight).
                </p>
                <div>
                    <h5>Near Mint</h5>
                    <Row className="condition-section">
                        <Col>
                            <img src={process.env.PUBLIC_URL + 'Images/NearMintCard.png'} className="grade-img" />
                        </Col>
                        <Col>
                            Cards in Near Mint (NM) condition show minimal wear from shuffling, play or handling and can have a nearly unmarked surface, crisp corners and unblemished edges outside of a few slight flaws. A Near Mint card may have slight edge wear or a scratch or three, but overall look nearly unplayed with no major defects.

                            The acceptable range of cards within the Near Mint condition includes both cards with no imperfections and cards with a few slight imperfections.
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className="condition-section">
                        <h5>Lightly Played</h5>
                        <Col>
                            <img src={process.env.PUBLIC_URL + 'Images/LightlyPlayedCard.png'} className="grade-img" />
                        </Col>
                        <Col>
                            Cards in Lightly Played (LP) condition may have minor border or corner wear, scuffs or scratches. There are no major defects such as grime, bends or issues with the structural integrity of the card. Noticeable imperfections are okay, but none should be too severe or at too high a volume.

                            The acceptable range of cards within the Lightly Played condition includes both cards with few or a handful of minor imperfections.
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className="condition-selector">
                        <h5>Moderately Played</h5>
                        <Col>
                            <img src={process.env.PUBLIC_URL + 'Images/ModeratelyPlayedCard.png'} className="grade-img" />
                        </Col>
                        <Col>
                            Cards in Moderately Played (MP) condition can have border wear, corner wear, scratching or scuffing, creases or whitening or any combination of moderate examples of these flaws.

                            A Moderately Played card may have some form of imperfection impacting a small area of the card from mishandling or poor storage, such as creasing that doesnʼt affect card integrity, in combination with other issues such as scratches, scuffs or border/edge wear.
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className="condition-selector">
                        <h5>Heavily Played</h5>
                        <Col>
                            <img src={process.env.PUBLIC_URL + 'Images/HeavilyPlayedCard.png'} className="grade-img" />
                        </Col>
                        <Col>
                            Cards in Heavily Played (HP) condition show a major amount of wear. Cards can show a variety of moderate imperfections along with creasing, whitening and bends. Heavily Played cards can also have flaws that impact the integrity of the card, but the card can still be sleeve playable.
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className="condition-selector">
                        <h5>Damaged</h5>
                        <Col>
                            <img src={process.env.PUBLIC_URL + 'Images/DamagedCard.png'} className="grade-img" />
                        </Col>
                        <Col>
                            Damaged cards show wear or imperfections beyond the standards for other conditions. Cards in Damaged condition can also exhibit an imperfection that may make the card illegal for tournament play, even in a sleeve. Cards in Damaged condition may have major border wear, corner wear, scratching or scuffing, as well as folds, creases, tears or other damage that impacts the structural integrity of the card.

                            (Note: No one likes to receive a card that is covered in a foreign substance, such as food, liquid or other material. Cards like these should not be accepted.)
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onHide}
                    variant="secondary"
                >Close</Button>
            </Modal.Footer>
        </Modal>
    );
}