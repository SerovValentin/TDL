import Modal from "react-modal";

Modal.setAppElement("#root");

const TaskModal = ({
  isOpen,
  onRequestClose,
  task,
  onTaskChange,
  onAddTask,
}) => {
  const handleAddTask = () => {
    if (task.title.trim()) {
      onAddTask(task);
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
      <h2>Добавить задачу</h2>
      <input
        type="text"
        placeholder="Введите задачу"
        value={task.title}
        onChange={(e) => onTaskChange({ title: e.target.value })}
      />
      <button onClick={handleAddTask}>Добавить</button>
      <button onClick={onRequestClose}>Закрыть</button>
    </Modal>
  );
};

export default TaskModal;
