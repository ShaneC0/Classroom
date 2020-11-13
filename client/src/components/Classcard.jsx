export default function Classcard(props) {
  return (
    <div className="class-card">
      <h1>{props.class.name}</h1>
      <p>Period {props.class.period}</p>
      <p>Join Code: {props.class.id}</p>
    </div>
  );
}
