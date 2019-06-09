const express = require("express");
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");

const { isLoggedIn } = require("../middlewares");
const Midi = require("../models/Midi");
const User = require("../models/User");
const UploadMix = require("../models/UploadMix");
const multer = require("multer");
// const uploadCloud = require("../configs/cloudinary");
const router = express.Router();

router.get("/secret", isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

router.get("/profile", (req, res, next) => {
  User.find()
    .then(allTheUsers => {
      res.json("profile", { users: allTheUsers });
    })
    .catch(err => {
      next(err);
    });
});

var s3 = new aws.S3({
  /* ... */
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "midibank",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

// Upload Route
router.post("/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log("CURRENT USER", req.user);
  console.log("AMAZON RESPONSE", req.file);
  console.log(
    "/upload backend route",
    "body ",
    req.body,
    "params ",
    req.params,
    "file ",
    req.file
  );
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  let midi = new Midi({
    name: req.body.name,
    description: req.body.description,
    file: req.file.location,
    owner: req.user._id
  });

  midi.save((err, doc) => {
    console.log(err, doc, 25243534345);
    res.json({ file: file });
  });

  //res.send(file);
});

router.post("/uploadmix", upload.single("file"), (req, res, next) => {
  const file = req.file;
  // const originalmidi = req.params.id;
  console.log("CURRENT MIX USER", req.user);
  console.log("CURRENT MIX ORIGINAL MIDI", req.params.id);
  console.log("AMAZON MIX RESPONSE", req.file);
  console.log(
    "/uploadmix backend route",
    "body ",
    req.body,
    "params ",
    req.params,
    "file ",
    req.file
  );
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  let uploadmix = new UploadMix({
    name: req.body.name,
    description: req.body.description,
    file: req.file.location,
    owner: req.user._id,
    midiname: req.body.midiname,
    userImg: req.user.imgUrl,
    ownername: req.user.name
  });

  uploadmix.save((err, doc) => {
    console.log(err, doc, 25243534345);
    res.json({ file: file });
  });

  //res.send(file);
});

router.get("/midis", (req, res, next) => {
  Midi.find().then(midis => {
    res.json({ midis: midis });
  });
});

router.get("/mixes", (req, res, next) => {
  UploadMix.find().then(mixes => {
    res.json({ mixes: mixes });
  });
});

router.get("/userProfile", (req, res, next) => {
  User.find({ _id: req.user._id }).then(user => {
    res.json({ user: user });
  });
});

router.delete("/deletemix/:id", (req, res, next) => {
  console.log("Received mix ID", req.params.id);
  UploadMix.findByIdAndDelete(req.params.id).then(mix => {
    console.log(mix);
    res.json({ mix: mix });
  });
});

router.get("/userUploads", (req, res, next) => {
  UploadMix.find({ owner: req.user._id }).then(uploads => {
    res.json({ uploads: uploads });
  });
});

router.get("/mididetails/:id", (req, res, next) => {
  console.log("Received MIDI ID", req.params.id);
  Midi.find({ _id: req.params.id }).then(midi => {
    console.log(midi);
    res.json({ midi: midi });
  });
});

router.get("/mixesdetails/:id", (req, res, next) => {
  console.log("Received MIDI ID", req.params.id);
  UploadMix.find({ midiname: req.params.id }).then(mixes => {
    console.log(mixes);
    res.json({ mixes: mixes });
  });
});

router.get("/editmix/:id", (req, res, next) => {
  console.log("Received MIX ID", req.params.id);
  UploadMix.find({ _id: req.params.id }).then(mixes => {
    console.log(mixes);
    res.json({ mixes: mixes });
  });
});

router.put("/editmix", (req, res, next) => {
  console.log("Received MIX ID POST UPDATE", req.body);
  UploadMix.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.name, description: req.body.description }
  ).then(mixes => {
    console.log(mixes);
    res.json({ mixes: mixes });
  });
});

router.put("/editlikes", (req, res, next) => {
  console.log("Received LIKED ID POST UPDATE", req.body);
  UploadMix.findByIdAndUpdate(
    { _id: req.body.id },
    { $inc: { rating: 1 } }
  ).then(mixes => {
    console.log(mixes);
    res.json({ mixes: mixes });
  });
});

module.exports = router;
