import React from "react";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import axios from 'axios';

class SearchBar extends React.Component{
  handleOnClick = async () => {
    await axios.post('/result', {
      event: 'Taiwan'
    })
    .then(function (response) {
      console.log(response);
    })
    .then(() => window.open('/eventOverview'))
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return (
      <MDBCol md="6">
        <div className="active-pink-3 active-pink-4 mb-4 mt-5">
          <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
          <button onClick={this.handleOnClick()}> Search </button>
        </div>
      </MDBCol>
    );
  }
}

export default SearchBar;