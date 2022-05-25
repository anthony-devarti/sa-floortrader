import { Table } from "react-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";
import { axiosGet, conditionTranslator } from "../data";
import { useGlobalState } from "../GlobalState";
import { useState, useEffect } from "react";
import { compareAsc, format } from 'date-fns'

export default function History() {
  
  const [state, dispatch] = useGlobalState();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let saved = localStorage.getItem("orders");
    if (!saved) {
      async function fetchData() {
        const response = await axiosGet(`/orders/?id=&buyer__id=1`);
        setOrders(response);
        localStorage.setItem("orders", JSON.stringify(response));
        console.log({ response });
      }
      fetchData();
    } else {
      setOrders(JSON.parse(saved));
    }
  }, []);

  

  return (
    <>
      <h1>History</h1>
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
