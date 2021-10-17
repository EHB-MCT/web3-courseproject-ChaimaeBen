import React, { useState, useEffect } from "react";
//import { Image } from 'cloudinary-react';

export default function Home() {
  const [msg, setmsg] = useState([]);

  useEffect(() => {
      console.log('here is info')
    // GET request using fetch inside useEffect React hook
    fetch("https://upload-3d-backend.herokuapp.com/api/upload")
      .then((response) => response.json())
      .then((data) => {
        console.log("here is the data " + JSON.stringify(data.msg));
        setmsg(data.msg);
      });
  }, []);

  return (
    <div>
      <h1>new home hoem here </h1>
      <p>The message = {msg}</p>
    </div>
  );
}
