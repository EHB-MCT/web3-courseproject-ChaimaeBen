import React from "react"
import {useParams} from "react-router-dom"

export default function Detail() {
    const {id_param} = useParams()
    const [model, setModel] = useState();

    useEffect(() => {
        async function fetchData() {
          console.log("fetching data");
          try {
            const res = await fetch(
              "https://upload-3d-backend.herokuapp.com/detail/"+id_param
            );
            const data = await res.json();
            setModel(data);
            console.log(data);
          } catch (err) {
            console.error(err);
          }
        }
        fetchData();
      }, []);

    return (
        <div>
         
        </div>
    )
}

