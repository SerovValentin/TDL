import { useState } from "react";
import TaskModal from "./TaskModal"; // Импортируем новый компонент

export default function AddTask(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    props.setTask({ title: "" });
  };

  return (
    <div>
      <button onClick={openModal}>Добавить задачу</button>
      <TaskModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        task={props.task}
        onTaskChange={props.setTask}
        onAddTask={props.addTask}
      />
    </div>
  );
}
