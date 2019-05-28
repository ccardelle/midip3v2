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

// Date.now().toString()

// router.post("/upload", upload.single("photos", 3), function(req, res, next) {
//   res.send("Successfully uploaded " + req.files.length + " files!");
// });

// router.post("/upload", uploadCloud.single("midi-file"), (req, res, next) => {
//   Midi.create({
//     name: req.body.name,
//     description: req.body.description,
//     file: req.file.url
//   })
//     .then(() => {
//       res.redirect("/profile");
//       res.json({ sucess: "heeey" });
//     })
//     .catch(err => {
//       next(err);
//     });
// });

// Create MIDI File
// router.post(
//   "/CHANGEMEBACK/upload",
//   uploadCloud.single("file"),
//   (req, res, next) => {
//     console.log(
//       req.body.name,
//       "==============",
//       req.body.description,
//       "==============",
//       req.body.file,
//       "==============",
//       req.file
//     );

// Midi.create({
//   name: req.body.name,
//   description: req.body.description,
//   file: req.body.file
// })

//     Midi.create({ file: req.file })
//       .then(res => {
//         res.json({ data: res });
//       })
//       .catch(err => {
//         next(err);
//       });
//   }
//
//);%PUBLIC_URL%/

// Defines Multer Storage Properties
// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "../public/uploads");
//     // cb(null, "%PUBLIC_URL%/public/uploads");
//   },
//   filename: function(req, file, cb) {
//     console.log(
//       "file",
//       file,
//       "THIS IS THE API RECEIVING END OOOOOOOOOOOOOOOOOOS"
//     );
//     filename = file.fieldname + "-" + Date.now() + ".mid";
//     //filename = "midi.mid";
//     console.log(
//       "-------------------------",
//       filename,
//       typeof filename,
//       "_+_+_+_+_+__+_+",
//       req.body,
//       req.params,
//       req.user
//     );

//     cb(null, filename);
//     // cb(null, "middyNEWONE.mid");
//   }
// });

// var upload = multer({ storage: storage });

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
    midiname: req.body.midiname
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

router.get("/userProfile", (req, res, next) => {
  User.find({ _id: req.user._id }).then(user => {
    res.json({ user: user });
  });
});

router.get("/userUploads", (req, res, next) => {
  Midi.find({ owner: req.user._id }).then(uploads => {
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

// router.post("/upload", uploadCloud.single("file"), (req, res, next) => {
//   console.log("what the file BACK END >>>>>>>>>>> ", req.file);
//   console.log(
//     "what the body +++++++++++ BACK END BODY",
//     req.body,
//     "======================= BACK END DATA",
//     req.file
//   );

//   // User.findOneAndUpdate({}, { pictureUrl: req.file.url })
//   //   .then(() => {
//   //     res.json({
//   //       success: true,
//   //       pictureUrl: req.file.url
//   //     })
//   //   })

//   Midi.create({ file: req.file })
//     .then(result => {
//       console.log("saved MIDI", result);
//       res.json({ saved: result });
//     })
//     .catch(err => console.error(err));
// });

// router.post("/updatePhoto", (req, res, next) => {
//   console.log("the info when updated the picture................ ", req.body);
//   Picture.findById(req.body.imageInfo._id)
//     .then(thePic => {
//       thePic.description = req.body.description;
//       thePic
//         .save()
//         .then(updatedPic => {
//           res.json({ thePhoto: updatedPic });
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
