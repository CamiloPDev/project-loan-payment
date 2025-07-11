import './Home.css';
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="home-container">
      <Link to='administration'>
        <h1>Administración</h1>
      </Link>

    </div>
  );
}
