import React, { Component } from "react";
import Axios from "axios";
Axios.defaults.withCredentials = true;

class Profile extends Component {
  state = {
    user: [],
    recentuploads: [],
    favoritemidis: [],
    following: [],
    currentuserId: String
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

    this.setState({
      currentuserId: JSON.parse(localStorage.getItem("user"))._id
    });
  }

  showMidis = () => {
    return this.state.recentuploads.map(midi => {
      console.log("Profile - CURRENT USER", this.state.currentuserId);

      return (
        <div key={midi._id} className="list-group">
          <hr />
          <ul className="list-group list-group-item-action  active">
            <li className="list-group-item justify-content-between secondary-container">
              <h5 className="mb-1">{midi.name}</h5>
              <h6>{midi.description}</h6>

              <div className="">
                <audio
                  controls
                  className="embed-responsive-item profile-play-btn"
                >
                  <source src={midi.file} />
                </audio>
              </div>
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
          <div className="">
            <br />
            <img
              className="profile-pic img-circle"
              src={this.state.user.imgUrl}
              alt=""
            />

            <h3 className="font-weight-strong"> {this.state.user.name}</h3>
            <hr />
            <div className="user-stats">
              <span>Uploads: 4 🎹</span>
              <span>ReMixes: 2 💿</span>
              <span>Likes: 237 👍 </span>
              <span>Followers: 150 💚</span>
              <span>Following: 10 🧡</span>
            </div>
            <hr />
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <h5>Recent Mix Uploads</h5>

                {this.showMidis()}
              </div>
            </div>
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <div>
                  <h5>Favorites</h5>
                </div>
              </div>
            </div>
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <h5>Favorite Mixers</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
