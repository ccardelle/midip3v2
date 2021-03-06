import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MidiDetails extends Component {
  state = {
    midi: [],
    message: [],
    mixes: [],
    likedmix: [],
    counter: 0
  };

  componentDidMount() {
    this.setState({ counter: 0 });
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
        <div key={midi._id} className="list-group justify-content-between">
          <hr />
          <h2 className="text-white">Song Details</h2>
          <ul className="list-group list-group-item-action">
            <li className="list-group-item justify-content-between secondary-container">
              <h5 className="mb-1">{midi.name}</h5>
              <h6>{midi.description}</h6>

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
          <div className="container mixes-group">
            <div className="list-group" />
            {this.showMixes()}
          </div>
        </div>
      );
    });
  };

  componentDidUpdate() {}

  handleDeleteClick(e) {
    var deletemidi = e.target.id;

    api.deleteMix(deletemidi).then(res => {
      api
        .getMixesDetails(this.props.match.params.id)
        .then(res => this.setState({ mixes: res.mixes }))
        .catch(err => this.setState({ message: err.toString() }));
    });
  }

  handleEditClick(e) {
    console.log(e.target.id);
    var editmix = e.target.id;
    console.log("Edit this mix", editmix);
  }

  handleLikeClick(e) {
    console.log(e.target.id);
    var likedmix = {
      id: e.target.id
    };

    console.log("LIKED", likedmix);

    api
      .putLikedMix(likedmix)
      .then(res => this.setState({}))
      .catch(err => this.setState({ message: err.toString() }));
    api
      .getMixesDetails(this.props.match.params.id)
      .then(res => this.setState({ mixes: res.mixes }))
      .catch(err => this.setState({ message: err.toString() }));
  }

  showMixes = () => {
    return this.state.mixes.map(mixes => {
      return (
        <div
          key={mixes._id}
          className="row list-group-item list-additional action mix-details-div "
        >
          {" "}
          <div key={mixes._id} className="text-dark mb-1">
            <div>
              <h4>LIKES : {mixes.rating}</h4>{" "}
              <button
                id={mixes._id}
                className="like-btn"
                onClick={e => this.handleLikeClick(e)}
              >
                🞤
              </button>
            </div>
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
            <div className="audio-box">
              <audio controls className="embed-responsive-item audio-cntrl">
                <source src={mixes.file} />
              </audio>
            </div>
            {JSON.parse(localStorage.getItem("user"))._id === mixes.owner && (
              <button
                className="btn btn-info  my-2 btn-danger "
                id={mixes._id}
                onClick={e => this.handleDeleteClick(e)}
              >
                DELETE
              </button>
            )}{" "}
            {JSON.parse(localStorage.getItem("user"))._id === mixes.owner && (
              <Link to={`/editmix/${mixes._id}`}>
                {" "}
                <button className="btn  my-2 btn-success">EDIT</button>{" "}
              </Link>
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
