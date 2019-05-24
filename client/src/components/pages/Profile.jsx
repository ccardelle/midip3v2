import React, { Component, Link } from "react";
import synthlogo from "../../components/synthlogo.svg";
import Axios from "axios";
Axios.defaults.withCredentials = true;

class Profile extends Component {
  state = {
    midis: []
  };

  componentDidMount() {
    Axios.get("https://midibank.herokuapp.com/api/midis", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log(443534534433454353535, res);
        this.setState({ midis: res.data.midis });
      })
      .catch(err => console.error(err));
  }

  showMidis = () => {
    return this.state.midis.map(midi => {
      return (
        <a download href={`./uploads/${midi.file}`}>
          {midi.name}
        </a>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <br />
            <div>
              <img className="profile-pic img-circle" src={synthlogo} alt="" />
              <h1 className="font-weight-light">USER NAME</h1>
              {/* Midi Link */}
              {/* <a href="https://midibank.herokuapp.com/uploads/file-1558709787621.mid">
                NEW MIDI{" "}
              </a> */}
              {this.showMidis()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

// client/build/uploads/file-1558709787621
