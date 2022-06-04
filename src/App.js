import Body from './Body';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import Login from './services/Login'
import { useGlobalState } from './GlobalState';
import './App.css';

function App() {
  const[state, dispatch] = useGlobalState()
  const [view, setView] = useState(0)

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/buy">Strange Aeons</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => dispatch({view:1})}>Buy</Nav.Link> | {" "}
            <Nav.Link onClick={() => dispatch({view:2})}>History</Nav.Link> | {" "}
            <Nav.Link onClick={() => dispatch({view:3})}>Settings</Nav.Link>
            <Nav.Link onClick={() => dispatch({view:4})}>Profile</Nav.Link>
            <Nav.Link onClick={() => dispatch({view:5})}>Calendar</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Body view={view} />
    </>
  );
}

export default App;
