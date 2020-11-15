

export default function AssignmentCard(props) {
  return (
    <div className="assignment-card">
      <div>
        {props.assignment.user.avatarUrl ? (
          <img src={props.assignment.user.avatarUrl} alt="avatar"></img>
        ) : (
          <div className="no-image"></div>
        )}
      </div>
      <div className="assignment-info">
        <h3>{props.assignment.user.email}</h3>
        <span>{getDateFormat(props.assignment.updateDate)}</span>
        <p>{props.assignment.name}</p>
      </div>
    </div>
  );
}

const getDateFormat = (iso) => {
  let date = new Date(iso);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${month}/${dt}/${year}`
};
