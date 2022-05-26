import { Modal, Button, Col, Row } from "react-bootstrap";
import bwipjs from 'bwip-js'

export default function BuyConfirmation(props) {
    // console.log("props: ", props)

    function Barcode() {
        try {
            // The return value is the canvas element
            let canvas = bwipjs.toCanvas('mycanvas', {
                bcid: 'code128',       // Barcode type
                text: '0123456789',    // Text to encode
                scale: 3,               // 3x scaling factor
                height: 10,              // Bar height, in millimeters
                includetext: true,            // Show human-readable text
                textxalign: 'center',        // Always good to set this
            });
            return(
                <>
                {canvas}
                </>
            )
        } catch (e) {
            // `e` may be a string or Error object
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.id} Confirmed
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="long-body">
                Pay ${props.order.total_paid} to {props.order.seller}
                <Barcode />
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