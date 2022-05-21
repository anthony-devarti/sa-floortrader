import Body from './Body';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState(1)

  return (
    <>
    <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/buy">Strange Aeons</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => setView(1)}>Buy</Nav.Link> | {" "}
                    <Nav.Link onClick={() => setView(2)}>History</Nav.Link> | {" "}
                    <Nav.Link onClick={() => setView(3)}>Settings</Nav.Link>
                    <Nav.Link onClick={() => setView(4)}>Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    <Body view={view}/>
    </>
  );
}

export default App;
