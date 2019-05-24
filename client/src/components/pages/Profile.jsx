import React, { Component } from "react";
import synthlogo from "../../components/synthlogo.svg";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <br />
            <div>
              <img className="profile-pic img-circle" src={synthlogo} alt="" />
              <h1 className="font-weight-light">USER NAME</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
