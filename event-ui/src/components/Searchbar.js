import React from "react";
import { MDBCol } from "mdbreact";

const SearchBar = () => {
  return (
    <MDBCol>
      <div className="active-pink-3 active-pink-4 mt-5">
        <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
      </div>
    </MDBCol>
  );
}

export default SearchBar;