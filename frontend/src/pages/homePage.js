import React, { useState, useEffect } from "react";
//import { Image } from 'cloudinary-react';

export default function Home() {
  const [msg, setmsg] = useState("");

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("https://upload-3d-backend.herokuapp.com/api/upload")
      .then((response) => response.json())
      .then((data) => {
        console.log("here is the data ");
        setmsg(data);
      });
  }, []);

  return (
    <div>
      <h1>new home here </h1>
      {msg && <p class="msg">{msg}</p>}
    </div>
  );
}
