import { useState } from 'react';
import { Table, Button, Form, FormControl, Modal, Row, Col, FloatingLabel } from 'react-bootstrap';
import { stateNames } from '../data';

export default function Customer() {

    //customers should be immutable so I can go back to the full list later
    const customers = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@gmail.com",
            phone: "123-456-7890",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
        },
        {
            id: 2,
            name: "Jane Oed",
            email: "jane@gmail.com",
            phone: "123-456-7890",
            address: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
        },
        {
            id: 3,
            name: "Anthony DeVarti",
            email: "john.doe@gmail.com",
            phone: "123-456-7890",
            address: "123 Main St",
            city: "Lexington",
            state: "KY",
            zip: "40502",
            country: "USA",
        },
    ]

    const [search, setSearch] = useState(customers);
    //this naming implies the opposite of its actual behavior, might need to change this
    const [local, setLocal] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    //modal form state objects
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");

    function NewCustomerModal() {
        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Register a New Customer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                    label="Name"
                    >
                    <Form.Control
                        value={name}
                        type="text"
                        id="title"
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    </FloatingLabel>
                    <Form.Label>Email</Form.Label>
                    <Form.Control aria-label="email"
                        value={email}
                        id="email"
                        placeholder="example@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Row className='mt-3'>
                        <Col md>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                id="address"
                                value={address}
                                placeholder="123 Fake St"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                id="city"
                                value={city}
                                placeholder="Lexington"
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Col>
                        <Col md>
                            <Form.Label>State</Form.Label>
                            <Form.Select
                                
                                type="text"
                                id="state"
                                value={state}
                                placeholder="KY"
                                onChange={(e) => setState(e.target.value)}
                            >
                                {stateNames.map((state) => {
                                    return <option key={state} value={state}>{state}</option>
                                })}
                            </Form.Select>
                        </Col>
                        <Col md>
                            <Form.Label>Zip</Form.Label>
                            <Form.Control
                                type="text"
                                id="zip"
                                value={zip}
                                placeholder="$"
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                    <Button variant="primary" onClick={() => console.log("submit")}>Create</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    function handleSearch(searchTerm) {
        setSearch(
            customers.filter(customer => {
                return customer.name.toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    }

    function handleLocal() {
        let current
        setLocal(!local)
        if (local === false) {
            current = customers.filter(customer => {
                return customer.city == "Lexington"
            })
        }
        if (local === true) {
            current = customers;
            console.log("current on deselect: ", current)
        }
        setSearch(current)
    }

    return (
        <>
            <div className="search-bar">
                <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search Customers by Name"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </Form>
            </div>
            <div>
                <label className="form-switch">
                    <input
                        type="checkbox"
                        onChange={handleLocal}
                    />
                    <i></i>
                    Limit to local customers
                </label>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {search.map((customer, index) => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.city}</td>
                            <td>{customer.state}</td>
                            <td>{customer.zip}</td>
                            <td>{customer.country}</td>
                            <td><Button>Edit</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <button
                    className="tile-button"
                    onClick={() => setModalShow(true)}
                >
                    Add Customer
                </button>
                <NewCustomerModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
        </>
    )
}