import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  });
  return (
    <>
      <div className="tdl">
        <h1>ToDoList</h1>
        <AddTask />
        <TaskList taskList={taskList} />
      </div>
    </>
  );
}

export default App;
