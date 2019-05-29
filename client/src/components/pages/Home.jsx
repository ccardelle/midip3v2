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
      <div>
        <div className="header-container">
          <div className="header-text">
            <h1 className="font-weight-light "> MIDIBank </h1>
            <br />
            <p> Make mixes with MIDI Templates </p>
            <p> Upload your mix </p>
            <p> Have it rated</p>
          </div>
        </div>

        <div className="bg-test">
          <div className="card border-0 shadow my-5 home-container">
            <div className="card-body p-5">
              <h1 className="font-weight-light">Current Challenges</h1>
              <br />
              <TrackList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
