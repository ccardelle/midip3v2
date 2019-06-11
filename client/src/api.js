import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "https://midibank.herokuapp.com/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  // Get Mixes Route
  getMixes() {
    return service
      .get("/mixes")
      .then(res => res.data)
      .catch(errHandler);
  },

  addCountry(body) {
    return service
      .post("/countries", body)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  // Get Midi Details Route

  getMidiDetails(mididetails) {
    console.log("Received at API ==================== ", mididetails);
    return service
      .get("/mididetails/" + mididetails)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Get Mixes Details Route

  getMixesDetails(mixesdetails) {
    console.log("Received at API ==================== ", mixesdetails);
    return service
      .get("/mixesdetails/" + mixesdetails)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Edit User Route

  editUser(user) {
    console.log("Received at API ==================== ", user);
    return service
      .get("/edituser/" + user)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Delete Mix Route

  deleteMix(mixId, randomthing) {
    console.log("Received at API ==================== ", mixId);
    return service
      .delete(`/deletemix/${mixId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  //Edit Mix Route

  getEditMix(mixId, randomthing) {
    console.log("Received at API ==================== ", mixId);
    return service
      .get(`/editmix/${mixId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Put Edited Mix Route

  putEditMix(mixdata) {
    console.log("Received at EDIT MIX API PUT ==================== ", mixdata);
    return service
      .put("/editmix", mixdata)
      .then(res => res.data)
      .catch(errHandler);
  },

  // Liked Increment Route

  putLikedMix(likedmix) {
    console.log(
      "Received at EDIT LIKES API PUT ==================== ",
      likedmix
    );
    return service
      .put("/editlikes", likedmix)
      .then(res => res.data)
      .catch(errHandler);
  },

  //Upload Midi route

  upload(uploadInfo, data) {
    console.log(
      "the info from the form to the api component >>>>>>>>>>>>> ",
      uploadInfo,
      "------------------- ",
      data
    );
    const formData = new FormData();
    formData.append("file", uploadInfo);
    formData.append("name", data.name);
    formData.append("description", data.description);

    console.log(
      "This is after FormData Appends",
      uploadInfo,
      "And this is DATA",
      data
    );
    return service
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log("adfasdfsaf", res);

        return res.data;
      })
      .catch(errHandler);
  },

  // Upload Mix Route

  uploadmix(uploadInfo, data) {
    console.log(
      "the info from the form to the api component >>>>>>>>>>>>> ",
      uploadInfo,
      "------------------- ",
      data
    );
    const formData = new FormData();
    formData.append("file", uploadInfo);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("midiname", data.midiname);
    console.log(
      "This is after FormData Appends",
      uploadInfo,
      "And this is DATA",
      data
    );
    return service
      .post("/uploadmix", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log("adfasdfsaf", res);

        return res.data;
      })
      .catch(errHandler);
  }
};
