import { Modal, Button, Col, Row } from "react-bootstrap";

export default function BuyConfirmation(props) {
    console.log("props: ", props)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="long-body">
                Pay ${props.order.total_paid} to {props.order.seller}
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