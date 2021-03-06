const express = require("express");
const app = express();
var cors = require("cors");
const { cloudinary } = require("./utils/cloudinary.js");

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());



app.get('/detail/:id', async (req, res) => {
  const id_file=req.params.id;
  const { resources } = await cloudinary.search
      .expression('asset_id:'+id_file)
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();
  const publicIds = resources.map((file) => file);
  console.log(publicIds)

  res.send(publicIds);
});

app.get("/api/gallery", async (req, res) => {
  const { resources } = await cloudinary.search
    .max_results(30)
    .execute();

  const fileObject = resources.map((file) => file);
  res.send(fileObject);
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileModel = req.body.model;
    const formInfo = req.body.title;
    const folderEmail = req.body.email;

    const ModelResponse = await cloudinary.uploader.upload(fileModel, {
      upload_preset: "3d-models",
      folder: "3d-models/" + folderEmail,
      public_id: formInfo,
    });

    console.log(ModelResponse);
    res.json({ model: ModelResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.get("/api/upload", async (req, res) => {
  try {
    console.log("the upload file");
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
