import React, { Component } from "react";

class FAQ extends Component {
  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <h1 className="font-weight-light">FAQ</h1>
            <div>
              <hr />
              <section>
                <h3> What is MIDIBank?</h3>
                <p>
                  {" "}
                  MIDIBank is a music collaboration site. It centers around
                  sharing a MIDI file template and challenging others to build a
                  song around it.
                </p>
              </section>
              <section>
                <hr />
                <h3> Why MIDI?</h3>
                <p>
                  {" "}
                  MIDI is usually considered an audio format. That's actually
                  not true at all. The truth is, MIDI is just data. The file
                  format is a storage container that stores notes, tempo,
                  instrument type, track, etc. When imported into your favorite
                  DAW (Digital Audio Workstation) it produces a template of the
                  stored song. You can then change the instruments and build
                  upon the song.
                </p>
              </section>
              <section>
                <hr />
                <h3> How does the site work?</h3>
                <p>
                  You sign in and become a member. Then you can upload a MIDI to
                  the collection or look at the currently uploaded MIDIs for
                  inspiration. All MIDIs on the site are publically available to
                  share. Once you choose a MIDI, you can download it and dop it
                  into your DAW of choice.
                </p>
                <p>
                  Once you create a song from the template, return here to
                  upload your mp3 under the respective MIDI's details page.
                  There it can be played and voted on.
                </p>
              </section>
              <section>
                <hr />
                <h3> Do I win anything?</h3>
                <p> Absolutely not! So have fun!</p>
              </section>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FAQ;
