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

  // forceUpdate() {
  //   this.showDetails();
  // }

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
          <div className="container">
            <div className="list-group" />
            {this.showMixes()}
          </div>
        </div>
      );
    });
  };

  componentDidUpdate() {
    this.render();
  }

  handleDeleteClick(e) {
    console.log(e.target.id);
    var deletemidi = e.target.id;

    api.deleteMix(deletemidi).then(res => {
      api
        .getMixesDetails(this.props.match.params.id)
        .then(res => this.setState({ mixes: res.mixes }))
        .catch(err => this.setState({ message: err.toString() }));
    });
  }

  showMixes = () => {
    return this.state.mixes.map(mixes => {
      return (
        <div key={mixes._id} className="row list-group-item list-additional">
          <div key={mixes._id} className="text-dark mb-1">
            <h4>{mixes.name}</h4>
            <br />
            <img
              className="profile-pic img-circle"
              src={mixes.userImg}
              alt=""
            />
            <br />
            Submited by:{" "}
            <span className="font-weight-bold">{mixes.ownername}</span>
            <br />
            <br />
            Description: {""}
            {mixes.description}
            <br />
            <br />
            <div className="">
              <audio controls className="embed-responsive-item">
                <source src={mixes.file} />
              </audio>
            </div>
            {/* <audio controls="controls" preload="auto" id="audio_player">
              <source src={mixes.file} />
            </audio> */}
            {JSON.parse(localStorage.getItem("user"))._id === mixes.owner && (
              <button
                className="btn btn-info  my-2 btn-danger "
                id={mixes._id}
                onClick={e => this.handleDeleteClick(e)}
              >
                DELETE
              </button>
            )}
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
