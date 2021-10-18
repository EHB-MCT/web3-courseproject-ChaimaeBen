import React, { useState, useEffect } from "react";
import { Card} from "react-bootstrap";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import "./home.css";
import { Link} from 'react-router-dom';


export default function Home() {
  const [models, setModels] = useState();
  const [name, setName] = useState();

  function stringSub(name){
    var str2 = name;
console.log(str2.split("/").pop());
 
return str2.split("/").pop();
}

  useEffect(() => {
    async function fetchData() {
      console.log("fetching data");
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
<div className="centered" >
      <h1>Gallery of all 3d models!</h1>
      <section className="cards">
      
      {models &&
        models.map((imageId, index) => (


         <Link to={`/detail/${imageId.asset_id}`} style={{ textDecoration: 'none' }}>

          <Card style={{ width: "18rem" }} className="card"  key={imageId.asset_id}>
            <Card.Body id="content_card">
              <CloudinaryContext cloudName="dmj6tqnkw" className="content" >
                <Image publicId={imageId.public_id}>
                  <Transformation fetchFormat="gif" />
                  <Transformation flags="animated" />
                  <Transformation height="800" width="800" crop="crop" />
                </Image>
              </CloudinaryContext>
              <Card.Title id="title">{imageId.filename}</Card.Title>
            </Card.Body>
          </Card>
         </Link>
         ))}
         </section>
    </div>
  );
}
