import { Link } from "react-router-dom";

export default function Classcard(props) {
  return (
    <div className="class-card">
      <div className="color">
      <Link to={`/stream/${props.classObj.id}`}>
        <h1>{props.classObj.name}</h1>
      </Link>
      <p>Period {props.classObj.period}</p>
      <p>Join Code: {props.classObj.id}</p>
      </div>
    </div>
  );
}
