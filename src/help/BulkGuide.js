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
                    Bulk Guide
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="long-body">
                <Row><p>Use these fields to input bulk.  The bulk rate will be applied to the totals.  Please only include one bulk item per buy. Rares that do not have a set symbol Should be entered as bulk Commons.</p></Row>
               <Row><h3>Bulk Mythics</h3></Row>
               <Row>Maybe include rate information, here?</Row>
               <Row><h3>Bulk Rares</h3></Row>
               <Row>Probably should have set symbols to help buyer</Row>
               <Row><h3>Bulk Commons/Uncommons</h3></Row>
               <Row><h3>Bulk Foils</h3></Row>
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