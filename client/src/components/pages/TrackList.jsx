import React from "react";
import { Route, Link, NavLink, Switch } from "react-router-dom";
import playbtn from "../playbtn.png";
import Axios from "axios";
import MidiDetails from "./MidiDetails";
// import MidiPlayer from "midi-player-js";
// const MIDIjs = require("https://www.midijs.net/lib/midi.js");

Axios.defaults.withCredentials = true;

class TrackList extends React.Component {
  state = {
    midis: []
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
  }
  // playMidi(e) {
  //   console.log(e.target.name);
  //   var Player = new MidiPlayer.Player(function(event) {
  //     console.log(event);
  //   });
  //   Player.loadFile(e.target.name);
  //   Player.play();
  // }
  // handleMidiClick(e) {
  //   e.preventDefault();
  //   console.log("The link was clicked.");
  //   console.log(e.target);
  //   document.write(`"MIDIjs.play(${e.target.name})"`);
  // }

  showMidis() {
    return this.state.midis.map(midi => {
      return (
        // <a download href={`./uploads/${midi.file}`}>
        //   {midi.name}
        // </a>

        <div key={midi._id} className="list-group">
          <hr />
          <ul className="list-group list-group-item-action active">
            <li className="list-group-item justify-content-between secondary-container">
              <h5 className="mb-1">{midi.name}</h5>
              <h6>{midi.description}</h6>
              <NavLink to={`/mididetails/${midi._id}`}>
                <button className="btn btn-info  my-2 btncolors">
                  Details
                </button>
              </NavLink>
              <a download href={midi.file}>
                <button className="btn btn-info  my-2 btncolors">
                  Download
                </button>
              </a>
              {/* <button name={midi.file} onClick={e => this.handleMidiClick(e)}>
                {" "}
                Click me 2{" "}
              </button> */}
              {/* <a href="#" onClick={`MIDIjs.play(${midi.file})`}>
                Play hinematov.mid
              </a> */}
              {React.createElement(
                "button",
                {
                  href: "#",
                  onclick:
                    "MIDIjs.play('https://midibank.s3.amazonaws.com/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up.mid');",
                  className: "buttonTest"
                },
                `PLAY`
              )}

              <button
                name={midi.name}
                onClick={() =>
                  "MIDIjs.play('https://midibank.s3.amazonaws.com/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up.mid');"
                }
              >
                Click me
              </button>
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
