import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./design.css";
export default function Upload() {
  const [model, setModel] = useState("");
  const [selectedModel, setSelectedModel] = useState();

  const [picture, setPicture] = useState("");
  const [selectedPicture, setSelectedPicture] = useState();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");

  const handleModelChange = (e) => {
    const file = e.target.files[0];
    setSelectedModel(file);
    setModel(e.target.value);
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    setPicture(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    console.log(
      "the naame " + title + " " + email + " " + model + " " + picture + " 555 "
    );

    if (!selectedPicture || !selectedModel) return;
    const reader = new FileReader();
    const reader2 = new FileReader();
    reader.readAsDataURL(selectedPicture);
    reader2.readAsDataURL(selectedModel);

    console.log(reader,reader2);
    uploadImage(reader,reader2);

    reader.onerror = (e) => {
      console.error(e);
    };
  };
  const uploadImage = async (img,mdl) => {
    try {
      await fetch("https://upload-3d-backend.herokuapp.com/api/upload", {
        method: "POST",
        body: JSON.stringify({
          image: img,
          title: title,
          email: email,
          model:mdl
        }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <h1>Upload your 3d model now!</h1>

      <form onSubmit={handleSubmitFile} className="form">
        <br />
        <div className="form-group">
          <label htmlFor="title">Title of 3d model</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="enter the name of your project"
            required="required"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email" required="required">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>

        <hr />

        <div className="form-group mt-3">
          <label className="mr-2">Upload your 3d model: </label>
          <input
            id="model"
            type="file"
            name="model"
            onChange={handleModelChange}
            value={model}
            className="form-input"
          />
        </div>
        <div className="form-group mt-3">
          <label className="mr-2">Upload your thumbnail: </label>
          <input
            id="picture"
            type="file"
            name="picture"
            onChange={handlePicChange}
            value={picture}
            className="form-input"
          />
        </div>
        <hr />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
