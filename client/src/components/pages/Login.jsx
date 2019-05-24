import React, { Component } from "react";
import api from "../../api";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    api
      .login(this.state.username, this.state.password)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Login container">
        <h2 className="text-center">Login</h2>

        <form className="text-center border border-light p-5">
          Username:{" "}
          <input
            className="main-input form-control mb-4"
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          Password:{" "}
          <input
            className="form-control mb-4"
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
          />{" "}
          <br />
          <button
            className="btn btn-info btn-block my-4 btncolors"
            onClick={e => this.handleClick(e)}
          >
            Login
          </button>
        </form>
        {this.state.message && (
          <div className="info info-danger">{this.state.message}</div>
        )}
      </div>

      // <form className="text-center border border-light p-5">
      //   <p className="h4 mb-4">Login</p>

      //   <input
      //     type="email"
      //     id="defaultLoginFormEmail"
      //     className="form-control mb-4 main-input"
      //     placeholder="E-mail"
      //     onChange={this.handleInputChange}
      //   />

      //   <input
      //     type="password"
      //     id="defaultLoginFormPassword"
      //     className="form-control mb-4"
      //     placeholder="Password"
      //     onChange={this.handleInputChange}
      //   />

      //   <div className="d-flex justify-content-around">
      //     <div>
      //       <div className="custom-control custom-checkbox">
      //         <input
      //           type="checkbox"
      //           className="custom-control-input"
      //           id="defaultLoginFormRemember"
      //         />
      //         <label
      //           className="custom-control-label"
      //           for="defaultLoginFormRemember"
      //         >
      //           Remember me
      //         </label>
      //       </div>
      //     </div>
      //     <div>
      //       <a href="">Forgot password?</a>
      //     </div>
      //   </div>

      //   <button
      //     className="btn btn-info btn-block my-4"
      //     onClick={e => this.handleClick(e)}
      //   >
      //     Login
      //   </button>

      //   <p>
      //     Not a member?
      //     <a href="">Register</a>
      //   </p>
      // </form>
    );
  }
}
