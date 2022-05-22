import { Button, Table } from "react-bootstrap"
import { useGlobalState } from "./GlobalState";


export default function Cart() {
    const [state, dispatch] = useGlobalState();

    //the totals for all items in the cart
    let suggestedTotal = state.cart.reduce((accumulator, object) => {
        //will this act up if a total begins or ends with a 0?
        const parsed = parseFloat(object.Estimate.slice(1, 6))
        return accumulator + parsed;
    }, 0);
    let offerTotal = state.cart.reduce((accumulator, object) => {
        const parsed = parseFloat(object.Actual)
        return accumulator + parsed;
    }, 0);
    //delta shows difference between suggested total
    let delta = (Math.round((suggestedTotal - offerTotal) * 100)) / 100

    //group that handles button actions in the cart//

    //this is what runs when an item is removed from the cart
    //it should edit the cart to remove this specific instance of the item
    function remove(e) {
        console.log("removing this item: ", e.target.id);
        let newCart = state.cart;
        newCart.splice(e.target.id, 1);
        dispatch(state.cart=newCart);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    //this should dispatch an empty array to the cart, may need to update local storage later
    function clearCart() {
        console.log("emptying the cart")
        dispatch(state.cart = []);
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    //this should move to the next step in the process
    //it nneeds to package the buy up into an object, assign it a unique id, create a barcode for that unique ID, and eventually push that buy to the backend to be stored so it can be verified later
    //buy should include each line item, the total suggested, the total paid, and the delta, the date now when the order was submitted, as well as the user (eventually)

    function submit() {
        console.log("finalize the buy and continue the buying process")
    }


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
                        <tr key={index + item.name}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.condition}</td>
                            <td>{item.Estimate}</td>
                            <td>{item.Actual}</td>
                            <td><Button
                                variant="danger"
                                id={index}
                                onClick={(e) => { remove(e) }}
                            >Remove</Button></td>
                        </tr>
                    ))}
                    <tr className="footer-row">
                        <td>Totals</td>
                        <td>{state.cart.length} Items</td>
                        <td>Delta: {delta}</td>
                        <td>Suggested: {suggestedTotal}</td>
                        <td>Offered: {offerTotal}</td>
                        <td>
                            <Button
                                variant="danger"
                                onClick={clearCart}
                            >Clear</Button>
                            <Button variant="success">Submit</Button></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}