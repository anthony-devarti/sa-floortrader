import { Button, Table } from "react-bootstrap"

export default function Cart() {
    return (
        <>
        <h1>Current Offer</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Card Name</th>
                    <th>Condition</th>
                    <th>Price Offered</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td><Button variant="danger">Remove</Button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td><Button variant="danger">Remove</Button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Larry the Bird</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td><Button variant="danger">Remove</Button></td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}