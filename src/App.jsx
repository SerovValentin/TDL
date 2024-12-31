import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [task, setTask] = useState({ title: "" });
  useEffect(() => {
    fetch("http://localhost:3000/tasklist")
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  }, []);

  const addTask = (task) => {
    fetch("http://localhost:3000/tasklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((addedTask) => setTaskList((prevList) => [...prevList, addedTask]));
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasklist/${id}`, {
      method: "DELETE",
    }).finally(() => {
      setTaskList((prevList) => prevList.filter((task) => task.id !== id));
      if (setSearchResult.length > 0) {
        setSearchResult(searchResult.filter((task) => task.id !== id));
      }
    });
  };

  const updateTask = (updatedTask) => {
    fetch(`http://localhost:3000/tasklist/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    }).then(() => {
      setTaskList((prevList) =>
        prevList.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    });
  };

  return (
    <>
      <div className="tdl">
        <h1>ToDoList</h1>
        <AddTask addTask={addTask} task={task} setTask={setTask} />
        <TaskList
          taskList={taskList}
          deleteTask={deleteTask}
          updateTask={updateTask}
          task={task}
          setTask={setTask}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setTaskList={setTaskList}
        />
      </div>
    </>
  );
}

export default App;
