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
            console.log("here is the detail data ===== "+JSON.stringify(data[0].secure_url));

            setModel(data[0].secure_url);
                    } catch (err) {
            console.error(err);
          }
        }
        fetchData();
      }, []);

    return (
        <div>
        
<model-viewer id="window3d" loading="eager" camera-controls auto-rotate  src={model} alt="A 3D model "></model-viewer>
        </div>
    )
}

