import myIcon from "../assets/myIcon.svg";
import { useState } from "react";
import EditModal from "./EditModal";

export default function TaskList(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const openModal = (task) => {
    setCurrentTask(task);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentTask({});
    setModalIsOpen(false);
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      props.setSearchResult(
        props.taskList.filter((task) =>
          task.title.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      props.setSearchResult([]);
    }
  };

  const handleSort = () => {
    const sortedTaskList = [...props.taskList].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    props.setTaskList(sortedTaskList);
  };

  return (
    <>
      <h2>TaskList</h2>
      <div className="search">
        <input
          type="search"
          name="search"
          placeholder="Поиск"
          onChange={debounce(handleSearch, 500)}
        />
        <button onClick={() => handleSort()}>↓↑</button>
      </div>
      <div>
        <ul className="taskList">
          {props.searchResult.length > 0
            ? props.searchResult.map((task) => (
                <li key={task.id} className="task">
                  {task.title}
                  <button className="btn" onClick={() => openModal(task)}>
                    <img
                      src={myIcon}
                      alt="edit"
                      width={"10px"}
                      height={"10px"}
                    />
                  </button>
                  <button
                    onClick={() => props.deleteTask(task.id)}
                    className="btn"
                  >
                    x
                  </button>
                </li>
              ))
            : props.taskList.map((task) => (
                <li key={task.id} className="task">
                  {task.title}
                  <button className="btn" onClick={() => openModal(task)}>
                    <img
                      src={myIcon}
                      alt="edit"
                      width={"10px"}
                      height={"10px"}
                    />
                  </button>
                  <button
                    onClick={() => props.deleteTask(task.id)}
                    className="btn"
                  >
                    x
                  </button>
                </li>
              ))}
        </ul>
        <EditModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          currentTask={currentTask}
          updateTask={props.updateTask}
          onTaskChange={setCurrentTask}
        />
      </div>
    </>
  );
}
