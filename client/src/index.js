import React from "react";
import ReactDOM from "react-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faStroopwafel);
library.add(faTrashAlt);
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
// registerServiceWorker();
