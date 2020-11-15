import { Link } from "react-router-dom";

export default function AssignmentCard(props) {
  return (
    <div className="assignment-card">
    <h3>{props.assignment.user.email}</h3>
    <span>{props.assignment.name}</span>
    </div>
  );
}
