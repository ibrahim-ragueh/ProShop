// Bringing path module from node
import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// For config we create storage variable & initialize our storage engine with multer.diskStorage
// An object with 2 functions is passed in: destination & filename
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // A callback function where null as for no error & where we want to upload
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // The following reformats the uploaded file name with fieldname + date + file extension
    // path module from node is used to get the extension
    // extname is a mothod on path which gets the extension of a file name
    // The extension will include the (.) so we don't have to manually add it
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  // An expression of the required file types is created
  const fileTypes = /jpg|jpeg|png/;
  // The fileTypes expression is tested against the extension the file name that passed in
  // The result of the test is boolean (true or false)
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // The following checks the mimetype (e.g. jpg is image/jpg)
  // The result is boolean (true or false)
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // Callback with an error
    cb("Images only!");
  }
}

// This is passed as a middleware to the route
// fileFilter is a function used to upload a specific type of files
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    // A custom function called checkFileType to validate the uploaded file type
    checkFileType(file, cb);
  },
});

// The endpoint
// Only "/" is used because uploadRoutes.js file is connected to api/uploads
// upload middleware is used with single image is uploaded & called image
router.post("/", upload.single("image"), (req, res) => {
  // path is sent back from this route
  res.send(`/${req.file.path}`);
});

export default router;
