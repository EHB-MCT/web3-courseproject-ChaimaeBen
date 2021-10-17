const express = require("express");
const app = express();
var cors = require("cors");
const { cloudinary } = require("./utils/cloudinary.js");

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());


app.get('/api/gallery', async (req, res) => {
  const { resources } = await cloudinary.search
      .expression('folder:3d-models')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

app.post('/api/upload', async (req, res) => {
  try {
      const fileStr = req.body.data;
      const formInfo = {"title":req.body.title};
      const folderEmail={"email":req.body.email};
        

      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: '3d-models',
          folder:JSON.stringify(folderEmail),
         public_id:JSON.stringify(formInfo)
      });
      console.log(uploadResponse);
      res.json({ msg: uploadResponse, file:fileStr , info:formInfo});
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
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
