import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Upload from './pages/uploadPage';
import Home from './pages/homePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav } from 'react-bootstrap';


function App() {
    return (
        <div>
            <div>
        <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as={Link} to="/">3D showcase</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/upload">Upload</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
</div>
<div>
<Switch>
<Route component={Upload} path="/upload" />
                    <Route component={Home} path="/" />
          </Switch>
</div>
      </div>
    );
}

export default App;
