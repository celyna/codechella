import React from 'react'
import './App.css';
import axios from 'axios';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Import Pages
import Home from './pages/Home';

//Other Imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data: null,
    }
  }

  async componentDidMount(){
    await axios.post('/result', {
      event: 'codechella'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return(
      <Router>
        <Container>
          <Navbar bg="transparent" expand="lg">
            <Navbar.Toggle aria-controls="navbar-toggle"/>
            <Navbar.Collapse id="navbar-toggle">
                <Nav className="ml-auto">
                    <h5> <Link className="nav-link display-5 font-weight-semibold subheading" to="/">Home</Link></h5>
                    <h5> <Link className="nav-link display-5 font-weight-semibold subheading" to="/">Events</Link></h5>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <Route path="/" exact render={() => <Home />} />
        </Container>
      </Router>
    );
  }
}

export default App;