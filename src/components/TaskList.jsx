export default function TaskList(props) {
  return (
    <>
      <h2>TaskList</h2>
      <div>
        <ul>
          {props.taskList.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
