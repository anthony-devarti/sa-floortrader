import { Button, Table } from "react-bootstrap"
import { useGlobalState } from "./GlobalState";


export default function Cart() {
    const [state, dispatch] = useGlobalState();

    return (
        <>
        <h1>Current Offer</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Card Name</th>
                    <th>Condition</th>
                    <th>Price Suggested</th>
                    <th>Price Offered</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
            {state.cart.map((item, index) => (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.condition}</td>
                    <td>{item.Estimate}</td>
                    <td>{item.Actual}</td>
                    <td><Button variant="danger">Remove</Button></td>
                </tr>
                    ))}
            </tbody>
        </Table>
        </>
    )
}