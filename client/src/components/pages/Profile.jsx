import React, { Component, Link } from "react";
import synthlogo from "../../components/synthlogo.svg";
import Axios from "axios";
Axios.defaults.withCredentials = true;

class Profile extends Component {
  state = {
    user: []
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/api/userProfile", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log(443534534433454353535, res);
        this.setState({ user: res.data.user[0] });
        console.log(this.state.user[0]);
      })
      .catch(err => console.error(err));
  }

  // showMidis = () => {
  //   return this.state.midis.map(midi => {
  //     return (
  //       <a download href={`./uploads/${midi.file}`}>
  //         {midi.name}
  //       </a>
  //     );
  //   });
  // };

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
                {/* <a href="http://localhost:5000/uploads/file-1558709787621.mid">
                NEW MIDI{" "}
              </a> */}
                {/* {this.showMidis()} */}
              </div>
            </div>
            <div className="card border-0 shadow my-5 secondary-container">
              <div className="card-body p-5">
                <div>
                  <h5>Favorites</h5>
                  {/* Midi Link */}
                  {/* <a href="http://localhost:5000/uploads/file-1558709787621.mid">
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
                {/* <a href="http://localhost:5000/uploads/file-1558709787621.mid">
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
