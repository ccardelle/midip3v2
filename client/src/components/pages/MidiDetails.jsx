import React, { Component } from "react";
import api from "../../api";

class MidiDetails extends Component {
  state = {
    midi: null,
    message: null
  };
  componentDidMount() {
    api
      .getMidiDetails("/MidiDetails")
      .then(data => this.setState({ midi: data.midi }))
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Details">
        <h2>Midi Details</h2>
      </div>
    );
  }
}

export default MidiDetails;
