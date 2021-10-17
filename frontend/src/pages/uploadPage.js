import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./design.css";
export default function Upload() {
  const [ModelFileState, setModelFileState] = useState("");
  const [PictureFileState, setPictureFileState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [TitleInput, setTitleInput] = useState("");
  const [EmailInput, setEmailInput] = useState("");

  const handleModelInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setModelFileState(e.target.value);
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setModelFileState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (img) => {
    console.log(img);

    try {
      await fetch("https://upload-3d-backend.herokuapp.com/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: img }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div class="col-md-6 offset-md-3 mt-5">
      <h1>Upload your 3d model now!</h1>

      <form onSubmit={handleSubmitFile} className="form">
        <br />
        <div class="form-group">
          <label for="exampleInputName">Title of 3d model</label>
          <input
            type="text"
            name="title"
            class="form-control"
            id="exampleInputName"
            value={TitleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Enter your name and surname"
            required="required"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="exampleInputEmail1" required="required">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={EmailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <hr />

        <div class="form-group mt-3">
          <label class="mr-2">Upload your 3d model: </label>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={(e) => setModelFileState(e.target.files[0])}
            value={ModelFileState}
            className="form-input"
          />
        </div>
        <div class="form-group mt-3">
          <label class="mr-2">Upload your thumbnail: </label>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handlePicChange}
            value={PictureFileState}
            className="form-input"
          />
        </div>
        <hr />

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
