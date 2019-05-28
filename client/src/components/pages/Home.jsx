import React, { Component } from "react";
import TrackList from "./TrackList";
export default class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <h1 className="font-weight-light">Current Challenges</h1>
            <br />
            <TrackList />
          </div>
        </div>
      </div>
    );
  }
}
