import React from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import Axios from "axios";
import api from "../../api";
import MidiDetails from "./MidiDetails";

// import MidiPlayer from "midi-player-js";
// const MIDIjs = require("https://www.midijs.net/lib/midi.js");

Axios.defaults.withCredentials = true;

class TrackList extends React.Component {
  state = {
    midis: [],
    mixes: [],
    active: true,
    clickedOn: null
  };

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "//www.midijs.net/lib/midi.js";
    script.async = true;

    document.body.appendChild(script);

    Axios.get("http://localhost:5000/api/midis", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log(443534534433454353535, res);
        this.setState({ midis: res.data.midis });
      })
      .catch(err => console.error(err));

    Axios.get("http://localhost:5000/api/mixes", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log(443534534433454353535, res);
        this.setState({ mixes: res.data.mixes });
      })
      .catch(err => console.error(err));
  }

  getNumberMixes(id) {
    let count = 0;
    this.state.mixes.forEach(function(item) {
      if (item.midiname === id) {
        count++;
      }
    });
    return count;
  }

  toggleClass(e) {
    const currentState = this.state.active;
    this.setState({ picElement: e.target.id });
    this.setState({ active: !currentState });
  }

  showMidis() {
    return this.state.midis.map(midi => {
      return (
        <div key={midi._id} className="list-group">
          <hr />
          <ul className="list-group list-group-item-action active">
            <li className="list-group-item justify-content-between secondary-container">
              <br />
              <img
                object={midi._id}
                className={
                  this.state.clickedOn === midi._id
                    ? "spin-animation vinylicon"
                    : "vinylicon"
                }
                src="https://s3.us-east-2.amazonaws.com/midibank/vinylicon.png"
                alt=""
              />
              <br />
              <small className="mixnumber">
                Current Mixes: {this.getNumberMixes(midi._id)}
              </small>{" "}
              <h5 className="mb-1">{midi.name}</h5>
              <h6>{midi.description}</h6>
              <NavLink to={`/mididetails/${midi._id}`}>
                <button className="btn btn-info my-2 btncolors">Details</button>
              </NavLink>
              <a download href={midi.file}>
                <button className="btn btn-info my-2 btncolors">
                  Download
                </button>
              </a>
              <a>
                <button
                  className="btn btn-info my-2 btncolors"
                  name={midi.name}
                  onClick={() => {
                    console.log(this);
                    this.setState({ clickedOn: midi._id });
                    window.MIDIjs.play(midi.file);
                  }}
                >
                  Play
                </button>
              </a>
              <a>
                <button
                  className="btn btn-info my-2 btncolors"
                  onClick={() => {
                    this.setState({ clickedOn: null });
                    window.MIDIjs.stop();
                  }}
                >
                  Stop
                </button>
              </a>
            </li>
          </ul>
        </div>
      );
    });
  }

  render() {
    return <div>{this.showMidis()}</div>;
  }
}

export default TrackList;
