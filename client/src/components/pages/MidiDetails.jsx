import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
// import Axios from "axios";
// Axios.defaults.withCredentials = true;

class MidiDetails extends Component {
  state = {
    midi: [],
    message: [],
    mixes: []
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

    api
      .getMixesDetails(this.props.match.params.id)
      .then(res => this.setState({ mixes: res.mixes }))
      .catch(err => this.setState({ message: err.toString() }));
  }

  showDetails = () => {
    return this.state.midi.map(midi => {
      return (
        <div className="list-group">
          <hr />
          <h2 className="text-white">Song Details</h2>
          <ul className="list-group list-group-item-action">
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
              <Link to={`/uploadmix/${midi._id}`}>
                <button className="btn btn-info  my-2 btncolors">
                  Upload Mix
                </button>
              </Link>
            </li>
          </ul>
          <hr />
          <h2 className="text-white">Mixes</h2>
          <div className="list-group col-md-3" />
          {this.showMixes()}
        </div>
      );
    });
  };

  showMixes = () => {
    return this.state.mixes.map(mixes => {
      return (
        <div className="list-group-item col-md-3">
          <div className="list-item text-dark">
            TESTING <hr />
            {mixes.name}
            {mixes.description}
            <audio controls="controls" preload="auto" id="audio_player">
              <source src={mixes.file} />
            </audio>
          </div>
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
