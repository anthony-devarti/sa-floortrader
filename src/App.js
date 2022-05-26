import Body from './Body';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import Login from './services/Login'
import { useGlobalState } from './GlobalState';
import './App.css';

function App() {
  const[state, dispatch] = useGlobalState()
  const [view, setView] = useState(0)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function LoginHandler() {
    //this is grabbing this info in a weird way right now.
    // it's grabbing all of the info and showing the current

    if (show == true) {
      return (
        <Modal className="floraison-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login handleClose={handleClose} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

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
            <Nav.Link onClick={() => handleShow()}>Login</Nav.Link>
          </Nav>
          <LoginHandler />
        </Container>
      </Navbar>
      <Body view={view} />
    </>
  );
}

export default App;
