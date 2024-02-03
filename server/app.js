const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { v2: cloudinary } = require("cloudinary");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://arjunsingh27:Test123@cluster0.0t9vaxx.mongodb.net/PhotoApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const photoSchema = new mongoose.Schema({
   
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageurl: { type: String, required: true }
});

const Photo = mongoose.model('Photo', photoSchema);

cloudinary.config({
  cloud_name: "dubmtkonj",
  api_key: "341241963193961",
  api_secret: "EsYtmfUD6COuZLg-K4vHGTmMrlY",
});

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/uploads/",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});


app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
 
      console.log("File details:", req.file);
      console.log("File path on the server:", req.file.path);
          const { title, description } = req.body;
          console.log(title, description);
      try {
       
        const response = await cloudinary.uploader.upload(req.file.path, {
          public_id: req.file.filename,
        });
        console.log(response.url);
        const photo = new Photo({
          title: title,
          description:  description,
          imageurl: response.url
        });
        await photo.save();
        console.log("Photo saved to database");
        res.json({ success: true, message: "File uploaded " });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        res.json({ success: false, message: "File uploaded failed" });
      }

      res
        .status(200)
        // .json({ success: true, message: "File uploaded successfully" });
    } else {
      res.status(400).json({ success: false, message: "No file uploaded" });
    }

  } catch (error) {
    console.error("Error processing file upload:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

 

app.get("/photos", async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/photos/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Photos id ", id);
  try {
    const photo = await Photo.findById(id);
    console.log(photo)
    if (!photo) {
      console.log("Photo not found");
      res.status(404).json({ message: "Photo not found" });
      console.log(error);
    } else {
      res.json(photo);
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
