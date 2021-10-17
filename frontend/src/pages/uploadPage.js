import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./design.css";
export default function Upload() {
 // const [model, setModel] = useState("");
  const [picture, setPicture] = useState("");

  const [selectedPicture, setSelectedPicture] = useState();
  //const [selectedModel, setSelectedModel] = useState();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");

//   const handleModelChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedModel(file);
//     setModel(e.target.value);
//   };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    setPicture(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    console.log("the naaaame " + title +" "+email);

    if (!selectedPicture) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedPicture);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("does not work!!");
    };
  };

  const uploadImage = async (img1) => {

    try {
      await fetch("https://upload-3d-backend.herokuapp.com/api/upload", {
        method: "POST",
        body: JSON.stringify({
          data: img1,
          title: title,
          email: email,
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

        {/* <div className="form-group mt-3">
          <label className="mr-2">Upload your 3d model: </label>
          <input
            id="model"
            type="file"
            name="model"
            //onchange
            value={model}
            className="form-input"
          />
        </div> */}
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
