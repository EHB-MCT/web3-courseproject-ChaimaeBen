import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./design.css";

export default function Upload() {
  const [model, setModel] = useState("");
  const [selectedModel, setSelectedModel] = useState();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");

  const handleModelChange = (e) => {
    const file = e.target.files[0];
    setSelectedModel(file);
    setModel(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
  console.log(selectedModel)
    if (!selectedModel) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedModel);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("does not work!!");
    };
  };
  const uploadImage = async (mdl) => {
    try {
      await fetch("https://upload-3d-backend.herokuapp.com/api/upload", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          email: email,
          model: mdl,
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
        <hr />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
