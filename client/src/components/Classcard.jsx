import { Link } from "react-router-dom";

export default function Classcard(props) {
  return (
    <div className="class-card">
      <div className="color">
      <Link to={`/stream/${props.class.id}`}>
        <h1>{props.class.name}</h1>
      </Link>
      <p>Period {props.class.period}</p>
      <p>Join Code: {props.class.id}</p>
      </div>
    </div>
  );
}
