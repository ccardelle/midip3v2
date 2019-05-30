import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
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

  // This is an example on how to use this method in a different file
  // api.getCountries().then(countries => { /* ... */ })
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

  getMidiDetails(mididetails) {
    console.log("Received at API ==================== ", mididetails);
    return service
      .get("/mididetails/" + mididetails)
      .then(res => res.data)
      .catch(errHandler);
  },

  getMixesDetails(mixesdetails) {
    console.log("Received at API ==================== ", mixesdetails);
    return service
      .get("/mixesdetails/" + mixesdetails)
      .then(res => res.data)
      .catch(errHandler);
  },

  editUser(user) {
    console.log("Received at API ==================== ", user);
    return service
      .get("/edituser/" + user)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteMix(mixId, randomthing) {
    console.log("Received at API ==================== ", mixId);
    return service
      .delete(`/deletemix/${mixId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  getEditMix(mixId, randomthing) {
    console.log("Received at API ==================== ", mixId);
    return service
      .get(`/editmix/${mixId}`)
      .then(res => res.data)
      .catch(errHandler);
  },

  putEditMix(mixdata) {
    console.log("Received at EDIT MIX API PUT ==================== ", mixdata);
    return service
      .put("/editmix", mixdata)
      .then(res => res.data)
      .catch(errHandler);
  },

  // addPicture(file) {
  //   const formData = new FormData();
  //   formData.append("picture", file);
  //   return service
  //     .post("/endpoint/to/add/a/picture", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       }
  //     })
  //     .then(res => res.data)
  //     .catch(errHandler);
  // },
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
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        // localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

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
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        // localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  }
};

// formData.body = file.description

// addPicture(file, items) {
//   const formData = new FormData()
//   formData.append("picture", file)
//   console.log(" the form data ---------- ", formData, " ======================= ", items);
//   return service
//     .post('/first-user/pictures', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then(res => {
//       console.log("the res.data after file upload -------------- ", res.data)
//       items.imageInfo = res.data.saved
//       return this.updatePic(items)
//     })
//     .catch(errHandler)
// },
// updatePic(info) {
//   console.log("the info when updating the pic >>>>>>>>>>>>>>> ", info)
//   return service
//   .post('/updatePhoto', info)
//   .then(res => res.data)
//   .catch(errHandler)
// },
