import { Table } from "react-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import { axiosGet, conditionTranslator } from "../data";
import { useGlobalState } from "../GlobalState";
import { useState, useEffect } from "react";
import { compareAsc, format } from "date-fns";

export default function History() {
  const [state, dispatch] = useGlobalState();

  //default loading state so I can include my fetch in a useEffect
  const loading = {
    buyer: "loading",
    delta: "loading",
    id: "loading",
    item_set: [],
    method: { id: 1, method: "Cash", multiplier: 1 },
    note: "Loading",
    pub_date: "Loading",
    seller: "Loading",
    suggested: "Loading",
    total_paid: "Loading",
  };

  const [orders, setOrders] = useState([{...loading}]);


  //the user is hard-coded now, but can be manipulated later
  let user = state.currentUser.user_id;

  async function fetchData() {
    const response = await axiosGet(`/orders/?id=&buyer__id=${user}`);
    setOrders(response.results);
    localStorage.setItem("orders", JSON.stringify(response));
    console.log({ response });
  }

  const findAverage = (arr) => {
    const { length } = arr;
    return arr.reduce((acc, val) => {
       return acc + (val.delta/length);
    }, 0);
 };

 const findSum = (arr) => {
   const { length } = arr;
   return arr.reduce((acc, val) => {
     return acc + val.delta;
    }, 0);
  }

 const average = (Math.round((findAverage(orders)/findSum(orders))*10000))/100;


  return (
    <>
      <h1>History</h1>
      <Button variant="info" onClick={fetchData}>
        Get Order History
      </Button>
      Average Delta: {average}%
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">All</Button>
          <Button variant="secondary">Event</Button>
          <Button variant="secondary">Me</Button>
        </ButtonGroup>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date Purchased</th>
            <th>Buyer Name</th>
            <th>Seller Name</th>
            <th>Total</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.pub_date}</td>
              <td>{order.buyer.first_name + " " + order.buyer.last_name}</td>
              <td>{order.seller}</td>
              <td>${order.total_paid}</td>
              <td>${order.delta}</td>
              <td>
                <Button variant="danger" id={index}>
                  Button
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
