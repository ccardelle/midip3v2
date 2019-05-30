import React, { Component } from "react";
import TrackList from "./TrackList";
import api from "../../api";
export default class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  render() {
    return (
      <div>
        <div className="header-container">
          <div className="header-text">
            {api.isLoggedIn() && (
              <h1 className="font-weight-light ">
                {" "}
                Welcome {JSON.parse(localStorage.getItem("user")).name}{" "}
              </h1>
            )}
            <br />
            {api.isLoggedIn() && (
              <h1 className="font-weight-light "> Start Creating </h1>
            )}
            {api.isLoggedIn() && <p className="down-arrow">▼</p>}
            {!api.isLoggedIn() && <p className="down-arrow">▲</p>}
            {!api.isLoggedIn() && (
              <h1 className="font-weight-light "> Sign Up or Log In </h1>
            )}

            <div>
              {/* <p> UPLOAD YOUR MIX </p>

              <p> HAVE IT RATED</p> */}
              <br />
            </div>
          </div>
        </div>
        {api.isLoggedIn() && (
          <div className="bg-test">
            <div className="card border-0 my-5 home-container">
              <div className="card-body p-5">
                <h1 className="font-weight-light">This Month's Challenges</h1>
                <br />
                <TrackList />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
