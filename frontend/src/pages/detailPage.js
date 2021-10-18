import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"

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
         <p>{id}</p>
        </div>
    )
}

