import React, { Component } from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Secret from "./pages/Secret";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import MidiDetails from "./pages/MidiDetails";
import UploadMix from "./pages/UploadMix";
import EditMix from "./pages/EditMix";

import FAQ from "./pages/FAQ";
import api from "../api";
import synthlogo from "../components/synthlogo.svg";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <nav className="navbar main-nav fixed-top">
          <div className="navbar main-logo-group">
            {api.isLoggedIn() && (
              <img
                className="App-logo"
                src={JSON.parse(localStorage.getItem("user")).imgUrl}
                alt=""
              />
            )}
            {!api.isLoggedIn() && (
              <img className="App-logo" src={synthlogo} alt="" />
            )}
            <h1 className="logo-title">MIDIBank</h1>
          </div>
          <NavLink to="/" exact>
            Home
          </NavLink>

          {api.isLoggedIn() && <NavLink to="/profile">Profile</NavLink>}
          {/* <NavLink to="/profile">Profile</NavLink> */}
          {api.isLoggedIn() && (
            <NavLink to="/upload" exact>
              Upload
            </NavLink>
          )}

          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          <NavLink to="/faq">FAQ</NavLink>
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/countries" component={Countries} /> */}
          {/* <Route path="/add-country" component={AddCountry} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/upload" component={Upload} />
          <Route path="/secret" component={Secret} />
          <Route path="/faq" component={FAQ} />
          <Route path="/mididetails/:id" component={MidiDetails} />
          <Route path="/uploadmix/:id" component={UploadMix} />
          <Route path="/deletemix/:id" component={MidiDetails} />
          <Route path="/editmix/:id" component={EditMix} />

          <Route render={() => <h2>404 - Page not found</h2>} />
        </Switch>
      </div>
    );
  }
}
