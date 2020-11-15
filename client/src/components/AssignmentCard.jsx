import { Link } from "react-router-dom";

export default function AssignmentCard(props) {
  return (
    <div className="assignment-card">
    <h3>Assignment: </h3>
      {props.assignment.name ? props.assignment.name : 'nothing'}
    <h3>User Id:</h3>
    {props.assignment.userId ? props.assignment.userId : 'nothing'}
    <h3>Lesson Id:</h3>
    {props.assignment.lessonId ? props.assignment.lessonId : 'nothing'}
    </div>
  );
}
