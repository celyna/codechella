import React from 'react'
import './App.css';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Import Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventsDetails'
import EventsNearMe from './pages/EventsNearMe'

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

  // componentDidMount(){
  //   axios.get(``)
  //     .then(res => {
  //       this.setState({data: res.json()})
  //     })
  // }

  render(){
    return(
      <Router>
        <Container>
          <Navbar bg="transparent" expand="lg">
            <Navbar.Toggle aria-controls="navbar-toggle"/>
            <Navbar.Collapse id="navbar-toggle">
                <Nav className="ml-auto">
                    <h5> <Link className="nav-link display-5 font-weight-semibold subheading" to="/">Home</Link></h5>
                    <h5> <Link className="nav-link display-5 font-weight-semibold subheading" to="/Events">Events</Link></h5>
                    <h5> <Link className="nav-link display-5 font-weight-semibold subheading" to="/EventsNearMe">Around Me</Link></h5>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/Events" exact render={() => <Events />} />
            <Route path="/EventDetails/:event" component={EventDetails} />
            <Route path="/EventsNearMe" component={EventsNearMe} />
        </Container>
      </Router>
    );
  }
}

export default App;