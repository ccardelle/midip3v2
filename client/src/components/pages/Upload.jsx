import React from "react";
import api from "../../api";
import FileUploadProgress from "react-fileupload-progress";

class Upload extends React.Component {
  state = {
    name: "",
    description: "",
    file: null
  };

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFileInputChange(event) {
    console.log(
      "the event target on file change >>>>>>>>>> ",
      event.target.files[0]
    );
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log("this is the state prior to the submit ------ ", this.state);
    let data = {
      name: this.state.name,
      description: this.state.description,
      file: this.state.file
    };

    api
      .upload(this.state.file, data)
      .then(result => {
        console.log("SUCCESS! [==================== ", result);
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err }));
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   var data = {
  //     description: this.state.description
  //   }
  //   console.log("this is the data being passed -------- ", data);
  //   // Reuse of the method "addPicture" from the file '../api'
  //   api.addPicture(this.state.file, data).then(result=>{
  //     console.log("the fruits of our labor ---------- ", result)
  //   })
  // }

  // componentDidMount() {
  //   api
  //     .getSecret()
  //     .then(data => this.setState({ secret: data.secret }))
  //     .catch(err => this.setState({ message: err.toString() }));
  // }

  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <div className="">
              <h2>Upload</h2>

              <div>
                <form
                  action="/upload"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <label>Name</label>
                  <input
                    className="form-control mb-4"
                    type="text"
                    name="name"
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <label>Description</label>
                  <input
                    className="form-control mb-4"
                    type="text"
                    name="description"
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <label>Midi File (.mid only)</label>
                  <input
                    className="form-control mb-4"
                    type="file"
                    name="file"
                    onChange={e => {
                      this.handleFileInputChange(e);
                    }}
                  />

                  <button
                    className="btn btn-info btn-block my-4 btncolors"
                    onClick={e => this.handleClick(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <br />
            {/* <FileUploadProgress
              key="ex1"
              url="http://localhost:3000/api/upload"
              onProgress={(e, request, progress) => {
                console.log("progress", e, request, progress);
              }}
              onLoad={(e, request) => {
                console.log("load", e, request);
              }}
              onError={(e, request) => {
                console.log("error", e, request);
              }}
              onAbort={(e, request) => {
                console.log("abort", e, request);
              }}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
