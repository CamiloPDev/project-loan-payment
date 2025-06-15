import { Link } from "react-router-dom";

export default function NotFoundPage (){
    return (
        <div> 
            No se encuentra nada :( <br></br>
            <Link to="/">Home</Link>
        </div>

    );
}
