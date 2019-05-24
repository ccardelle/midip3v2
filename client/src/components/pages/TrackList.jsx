import React from "react";
import playbtn from "../playbtn.png";
import Axios from "axios";
Axios.defaults.withCredentials = true;

class TrackList extends React.Component {
  state = {
    midis: []
  };

  componentDidMount() {
    Axios.get("http://localhost:5000/api/midis", {
      headers: { "Content-Type": "application/octet-stream" }
    })
      .then(res => {
        console.log(443534534433454353535, res);
        this.setState({ midis: res.data.midis });
      })
      .catch(err => console.error(err));
  }

  showMidis() {
    return this.state.midis.map(midi => {
      return (
        // <a download href={`./uploads/${midi.file}`}>
        //   {midi.name}
        // </a>

        <div className="list-group">
          <ul className="list-group list-group-item-action active">
            <li className="list-group-item justify-content-between">
              <img className="play-btn" src={playbtn} alt="" />
              <h5 className="mb-1">{midi.name}</h5>
              <h6>{midi.description}</h6>
              <small>
                <a download href={`./uploads/${midi.file}`}>
                  DOWNLOAD
                </a>
              </small>
            </li>
          </ul>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>{this.showMidis}</React.Fragment>

      // <div className="list-group">
      //   <ul className="list-group list-group-item-action active">
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //     <li className="list-group-item justify-content-between">
      //       <img className="play-btn" src={playbtn} alt="" />
      //       <h5 className="mb-1">Track 1</h5>
      //       <h6>Random MIDI Name</h6>
      //       <small>3 days ago</small>
      //     </li>{" "}
      //   </ul>
      // </div>
    );
  }
}

export default TrackList;
