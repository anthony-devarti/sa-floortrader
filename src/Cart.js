import { Button, Table } from "react-bootstrap"
import { useGlobalState } from "./GlobalState";
import { conditionTranslator } from "./data";
import axios from "axios";


export default function Cart() {
    const [state, dispatch] = useGlobalState();

    //the totals for all items in the cart
    let suggestedTotal = state.cart.reduce((accumulator, object) => {
        //will this act up if a total begins or ends with a 0?
        console.log("Estimate type: ", typeof object.Estimate)
        const parsed = parseFloat(object.Estimate)
        return accumulator + parsed;
    }, 0);
    let offerTotal = state.cart.reduce((accumulator, object) => {
        console.log("actual: ", typeof object.Actual)
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
        dispatch({ cart: newCart });
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    //this should dispatch an empty array to the cart, may need to update local storage later
    function clearCart() {
        console.log("emptying the cart")
        dispatch({ cart: [] });
        localStorage.setItem("cart", JSON.stringify(state.cart));
    }
    //this should move to the next step in the process
    //it nneeds to package the buy up into an object, assign it a unique id, create a barcode for that unique ID, and eventually push that buy to the backend to be stored so it can be verified later
    //buy should include each line item, the total suggested, the total paid, and the delta, the date now when the order was submitted, as well as the user (eventually)

    function submit() {
        console.log("finalize the buy and continue the buying process")
        //how did I get this set up last time around?
        //I need to post to items and orders at the same time.
        const orderObject = {
            "total_paid": offerTotal,
            "pub_date": Date.now(),
            "suggested": suggestedTotal,
            "delta": suggestedTotal=offerTotal,
            "note": "None"
        }
        axios
            .post(
                process.env.REACT_APP_BASE + "item/create_orders/",
                orderObject
            )
            //need to save response.data to a variable
            .then(function (response) {
                console.log(response);
                // setCurrentId(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

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
                            <td>{conditionTranslator(item.condition)}</td>
                            <td>${item.Estimate}</td>
                            <td>${item.Actual}</td>
                            <td><Button
                                variant="danger"
                                id={index}
                                onClick={(e) => { remove(e) }}
                            >-</Button></td>
                        </tr>
                    ))}
                    <tr className="footer-row">
                        <td>Totals</td>
                        <td>{state.cart.length} Items</td>
                        <td>Delta: ${delta}</td>
                        <td>Suggested: ${suggestedTotal}</td>
                        <td>Offered: ${offerTotal}</td>
                        <td>
                            <Button
                                variant="danger"
                                onClick={clearCart}
                            >Clear</Button>
                            <Button
                                variant="success"
                                onClick={() => submit()}>Submit</Button></td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}