import { Link } from "react-router-dom";

export default function AssignmentCard(props) {
  return (
    <div className="assignment-card">
      <div>
        {props.assignment.user.avatarUrl ? (
          <img src={props.assignment.user.avatarUrl}></img>
        ) : (
          <div className="no-image"></div>
        )}
      </div>
      <div className="assignment-info">
        <h3>{props.assignment.user.email}</h3>
        <span>{props.assignment.name}</span>
        <span>{props.assignment.updateDate}</span>
      </div>
    </div>
  );
}
