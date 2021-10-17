import React, { useState, useEffect } from "react";
import { Card, Button, Container, Nav } from "react-bootstrap";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

export default function Home() {
  const [msg, setmsg] = useState([]);
  const [models, setModels] = useState();

  useEffect(() => {
    try {
      const res = await fetch(
        "https://upload-3d-backend.herokuapp.com/api/gallery"
      );
      const data = await res.json();
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div className="col-md-6 offset-md-1 mt-5">
      <h1>Gallery of all 3d models!</h1>
      {imageIds &&
        imageIds.map((imageId, index) => (
          <Card style={{ width: "18rem" }}>
            <Image
              key={index}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={imageId}
              width="50"
              crop="scale"
            />{" "}
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
