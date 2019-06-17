import React from "react";
import api from "../../api";

// Component for editing mixes and details

class EditMix extends React.Component {
  state = {
    name: "",
    description: "",
    mixes: []
  };

  componentDidMount() {
    console.log("Received ID for EDIT", this.props.match.params.id);

    api
      .getEditMix(this.props.match.params.id)
      .then(res =>
        this.setState({
          name: res.mixes[0].name,
          description: res.mixes[0].description,
          id: this.props.match.params.id
        })
      )
      .catch(err => this.setState({ message: err.toString() }));
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log("this is the state prior to the submit ------ ", this.state);
    let data = {
      name: this.state.name,
      description: this.state.description,
      id: this.state.id
    };

    api
      .putEditMix(data)
      .then(result => {
        console.log("SUCCESS! [==================== ", result);
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err }));
  }

  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <div className="">
              <h2>Edit Mix Details</h2>

              <div>
                <form
                  action={`/editmix/${this.state.mixes._id}`}
                  method="POST"
                  encType="multipart/form-data"
                >
                  <label>Name</label>
                  <input
                    className="form-control mb-4"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <label>Description</label>
                  <input
                    className="form-control mb-4"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <button
                    className="btn btn-info btn-block my-4 bg-success btn-sizing"
                    onClick={e => this.handleClick(e)}
                  >
                    Submit
                  </button>
                </form>
                <button
                  className="btn btn-info btn-block my-4 bg-danger btn-sizing"
                  onClick={e => this.cancelEdit()}
                >
                  Cancel
                </button>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default EditMix;
