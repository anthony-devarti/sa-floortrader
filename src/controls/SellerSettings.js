import { Card, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function SellerSettings() {

    const [require, setRequire] = useState(false);
    const [homeCity, setHomeCity] = useState("");

    return (
        <div>
            <h1>Seller Settings</h1>
            <Card>
                <Card.Header>Allow Anonymous Seller</Card.Header>
                <Card.Body>
                    <label class="form-switch">
                        <input
                            type="checkbox"
                            onChange={() => setRequire(!require)}
                        />
                        <i></i>
                    </label>
                </Card.Body>
                <Card.Footer>
                    Turn on to require sales to be attached to a customer record.
                </Card.Footer>
            </Card>
            <Card>
                <Card.Header>Local Cities</Card.Header>
                <Card.Body>
                    <Form.Group className="buy-form" controlId="bulkrares">
                        <Form.Control
                            type="text"
                            placeholder={homeCity}
                            onChange={(e) => setHomeCity(e.target.value)}
                        />
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    Comma separated list of local cities.
                </Card.Footer>
            </Card>
        </div>
    );
}