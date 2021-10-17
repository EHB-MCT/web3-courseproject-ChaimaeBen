import React, { useState, useEffect } from "react";
//import { Card, Button } from "react-bootstrap";
import { Image,CloudinaryContext,Transformation } from "cloudinary-react";
export default function Home() {
  const [models, setModels] = useState();

  useEffect(() => {
    async function fetchData() {
      console.log('fetching data')
      try {
        const res = await fetch(
          "https://upload-3d-backend.herokuapp.com/api/gallery"
        );
        const data = await res.json();
        setModels(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div class="container">
      <h1>Gallery of all 3d models!</h1>
      {models &&
        models.map((imageId, index) => (
          <CloudinaryContext cloudName="dmj6tqnkw">
          <Image publicId={imageId}>
            
          <Transformation fetchFormat="gif" />
  <Transformation flags="animated" />
  <Transformation aspectRatio="1.0" height="200" crop="fill" />
          </Image>
      </CloudinaryContext>
     
        ))}
    </div>
  );
}
