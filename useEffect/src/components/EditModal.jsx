import Modal from "react-modal";

import { useState } from "react";
Modal.setAppElement("#root");

const EditModal = ({ isOpen, onRequestClose, updateTask, currentTask }) => {
  const [upgradeTask, setUpgradeTask] = useState({
    title: currentTask.title,
  });
  const handleUpdateTask = () => {
    if (currentTask.title.trim()) {
      currentTask.title = upgradeTask.title;
      updateTask(currentTask);
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Редактировать задачу</h2>
      <h3>{currentTask.title}</h3>
      <input
        type="text"
        placeholder="Введите задачу"
        value={updateTask.title}
        onChange={(e) => setUpgradeTask({ title: e.target.value })}
      />
      <button onClick={handleUpdateTask}>Сохранить</button>
      <button onClick={onRequestClose}>Закрыть</button>
    </Modal>
  );
};

export default EditModal;
