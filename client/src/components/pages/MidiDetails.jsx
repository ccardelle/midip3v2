import React, { Component } from "react";
import api from "../../api";
// import Axios from "axios";
// Axios.defaults.withCredentials = true;

class MidiDetails extends Component {
  state = {
    midi: [],
    message: []
  };

  // componentDidMount() {
  //   Axios.get(
  //     "http://localhost:5000/api/mididetails/" + this.props.match.params.id,
  //     {
  //       headers: { "Content-Type": "application/octet-stream" }
  //     }
  //   )
  //     .then(res => {
  //       console.log("Retriving user data", res);
  //       this.setState({ midi: res.data.midi });
  //       console.log("THIS IS THE CURRENT STATE", this.state.midi[0]);
  //     })
  //     .catch(err => console.error(err));
  // }

  componentDidMount() {
    console.log(this.props.match.params.id);
    api
      .getMidiDetails(this.props.match.params.id)
      .then(res => this.setState({ midi: res.midi }))
      .catch(err => this.setState({ message: err.toString() }));
  }

  showDetails = () => {
    return this.state.midi.map(midi => {
      return (
        <div className="list-group">
          <hr />
          <ul className="list-group list-group-item-action active">
            <li className="list-group-item justify-content-between secondary-container">
              <h5 className="mb-1">{midi.name}</h5>
              <h6>{midi.description}</h6>

              {/* <Link to="/upload" exact>
                <button className="btn btn-info  my-2 btncolors">
                  Details
                </button>
              </Link> */}
              <a download href={midi.file}>
                <button className="btn btn-info  my-2 btncolors">
                  Download
                </button>
              </a>
            </li>
          </ul>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="Details list-group-item justify-content-between home-container">
        {this.showDetails()}
      </div>
    );
  }
}

export default MidiDetails;
