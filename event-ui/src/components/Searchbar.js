import React from "react";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import axios from 'axios';

class SearchBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      event: ''
    }
  }
  
  handleOnClick = async (event) => {
    await axios.post('/result', {
      event: 'Taiwan'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(() => window.open(`/eventOverview/${event}`));
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({event: event.target.value })
  }

  render(){
    return (
      <MDBCol md="6">
        <div className="active-pink-3 active-pink-4 mb-4 mt-5">
          <input className="form-control" type="text" value={this.state.event} onChange={this.handleChange} id="event" placeholder="Search" aria-label="Search" />
          <button onClick={() => this.handleOnClick(this.state.event)}> Search </button>
        </div>
      </MDBCol>
    );
  }
}

export default SearchBar;