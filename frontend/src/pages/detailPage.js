import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import '@google/model-viewer/dist/model-viewer'

export default function Detail() {


    const {id} = useParams()
    const [model, setModel] = useState();

    useEffect(() => {
        console.log("fetching new data ");

        async function fetchData() {
          try {
            const res = await fetch(
              "https://upload-3d-backend.herokuapp.com/detail/"+id
            );
            const data = await res.json();
            setModel(data);
            console.log(data);
          } catch (err) {
            console.error(err);
          }
        }
        console.log("param "+id)
        fetchData();
      }, []);

    return (
        <div>
<model-viewer id="window3d" loading="eager" camera-controls auto-rotate  src="https://res.cloudinary.com/dmj6tqnkw/image/upload/v1634513630/3d-models/helloGITF_dvxemm_djrvnl.glb" alt="A 3D model "></model-viewer>
        </div>
    )
}

