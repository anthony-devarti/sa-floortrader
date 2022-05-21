import { Table } from "react-bootstrap";
import { Button, ButtonGroup } from "react-bootstrap";

export default function History() {
  return (
    <>
      <h1>History</h1>
      <div style={{display:"flex", flexDirection:"column"}}>
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
            <th>Buyer Name</th>
            <th>Seller Name</th>
            <th>Total</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
