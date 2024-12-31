import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { ref, onValue, push, set, remove } from "firebase/database";
import { db } from "./firebase";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [task, setTask] = useState({ title: "" });
  useEffect(() => {
    const tdlRef = ref(db, "tasklist");

    const unsubscribe = onValue(
      tdlRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const tdlData = snapshot.val();
          const tasksArray = Object.entries(tdlData).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setTaskList(tasksArray);
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error("Error getting data: ", error);
      }
    );

    return () => unsubscribe(); // Чистим подписку при размонтировании
  }, []);

  const addTask = (task) => {
    const tdlRef = ref(db, "tasklist");
    push(tdlRef, task);
  };

  const deleteTask = (id) => {
    const tdlRef = ref(db, "tasklist/" + id);
    remove(tdlRef);
  };

  const updateTask = (updatedTask) => {
    const tdlRef = ref(db, "tasklist/" + updatedTask.id);
    const newValue = {
      title: updatedTask.title,
    };
    set(tdlRef, newValue);
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
