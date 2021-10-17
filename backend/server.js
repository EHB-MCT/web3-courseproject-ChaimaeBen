const { cloudinary } = require("./utils/cloudinary");
const express = require("express");
const app = express();
var cors = require("cors");

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.post("/api/upload", async (req, res) => {
  try {
    const file = req.body.data;
    const response =
      (file,
      {
        upload_preset: "3d-models",
      });
    console.log(response);
    res.json({ msg: response });
    res.status(500).json({ err: "somehting when wrong" });
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/upload", async (req, res) => {
  try {
      console.log('the upload file')
    res.json({ msg: "you got the upload file" });
  } catch (err) {
    console.error(err);
  }
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("listening on " + port);
});
// create a GET route
app.get("/", (req, res) => {
  //Line 9
  res.send({ info: "backend is done once again" }); //Line 10
}); //L
