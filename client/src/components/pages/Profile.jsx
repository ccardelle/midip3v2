import React, { Router, Component, NavLink, Link } from "react";
import synthlogo from "../../components/synthlogo.svg";
import Axios from "axios";
Axios.defaults.withCredentials = true;

class Profile extends Component {
  state = {
    user: [],
    recentuploads: [],
    favoritemidis: [],
    following: []
  };

  componentDidMount() {
    Axios.get("https://midibank.herokuapp.com/api/userProfile", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log("Retriving user data", res);
        this.setState({ user: res.data.user[0] });
        console.log(this.state.user[0]);
      })
      .catch(err => console.error(err));

    Axios.get("https://midibank.herokuapp.com/api/userUploads", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log("Retrieving uploads", res);
        this.setState({ recentuploads: res.data.uploads });
        console.log(this.state.recentuploads);
      })
      .catch(err => console.error(err));
  }

  showMidis = () => {
    return this.state.recentuploads.map(midi => {
      return (
        <div key={midi._id} className="list-group">
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
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <br />
            <img className="profile-pic img-circle" src={synthlogo} alt="" />

            <h3 className="font-weight-strong"> {this.state.user.username}</h3>
            <hr />
            <div className="user-stats">
              <span>Uploads: 20 🎹</span>
              <span>Mixes: 5 💿</span>
              <span>Likes: 237 👍 </span>
              <span>Followers: 150 💚</span>
              <span>Following: 10 🧡</span>
            </div>
            <hr />
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <h5>Recent Uploads</h5>
                {/* Midi Link */}
                {/* <a href="https://midibank.herokuapp.com/uploads/file-1558709787621.mid">
                NEW MIDI{" "}
              </a> */}
                {this.showMidis()}
              </div>
            </div>
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <div>
                  <h5>Favorites</h5>
                  {/* Midi Link */}
                  {/* <a href="https://midibank.herokuapp.com/uploads/file-1558709787621.mid">
                NEW MIDI{" "}
              </a> */}
                  {/* {this.showMidis()} */}
                </div>
              </div>
            </div>
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <h5>Favorite Mixers</h5>
                {/* Midi Link */}
                {/* <a href="https://midibank.herokuapp.com/uploads/file-1558709787621.mid">
                NEW MIDI{" "}
              </a> */}
                {/* {this.showMidis()} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

// client/build/uploads/file-1558709787621
