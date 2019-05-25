import React, { Component } from "react";
import api from "../../api";

class MidiDetails extends Component {
  state = {
    secret: null,
    message: null
  };
  componentDidMount() {
    api
      .getSecret()
      .then(data => this.setState({ secret: data.secret }))
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Secret">
        <h2>Midi Details</h2>
      </div>
    );
  }
}

export default MidiDetails;
