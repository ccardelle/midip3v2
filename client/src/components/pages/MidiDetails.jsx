import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Axios from "axios";
// Axios.defaults.withCredentials = true;

class MidiDetails extends Component {
  state = {
    midi: [],
    message: [],
    mixes: [],
    counter: 0
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
        <div key={midi._id} className="list-group">
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
          <div className="list-group col-md-3 secondary-container" />
          {this.showMixes()}
        </div>
      );
    });
  };

  handleDeleteClick(e) {
    console.log(e.target.id);
    var deletemidi = e.target.id;

    api.deleteMix(deletemidi).then(res => {
      this.props.history.push(`/`);
    });

    // .then(res => this.setState({ mixes: res.mixes }))
    // .catch(err => this.setState({ message: err.toString() }));
  }

  showMixes = () => {
    return this.state.mixes.map(mixes => {
      return (
        <div
          key={mixes._id}
          className="list-group-item col-md-4 secondary-container"
        >
          <div className="list-item text-dark">
            <h4>{mixes.name}</h4>
            <br />
            {JSON.parse(localStorage.getItem("user"))._id === mixes.owner && (
              <button id={mixes._id} onClick={e => this.handleDeleteClick(e)}>
                <FontAwesomeIcon
                  id={mixes._id}
                  icon="trash-alt"
                  onClick={e => this.handleDeleteClick(e)}
                />
              </button>
            )}
            <hr />

            {mixes.description}
            <div className="col-sm-offset-4 embed-responsive embed-responsive-16by9">
              <audio controls className="embed-responsive-item">
                <source src={mixes.file} />
              </audio>
            </div>
            {/* <audio controls="controls" preload="auto" id="audio_player">
              <source src={mixes.file} />
            </audio> */}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="details list-group-item justify-content-between home-container">
        {this.showDetails()}
      </div>
    );
  }
}

export default MidiDetails;
