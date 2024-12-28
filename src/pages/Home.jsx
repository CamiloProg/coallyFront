import { useEffect, useState } from "react";
import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { TaskModal } from "../modals/TaskModal";

export const Home = () => {
  const { state, dispatch } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks();
      dispatch({ type: "SET_TASKS", payload: tasks });
    };
    loadTasks();
  }, [dispatch]);

  const handleAddTask = async (task) => {
    const newTask = await createTask(task);
    dispatch({ type: "ADD_TASK", payload: newTask });
    closeModal(); // Cerrar el modal después de agregar la tarea
  };

  const handleUpdateTask = async (updatedTask) => {
    const updatedData = await updateTask(updatedTask._id, {
      completed: updatedTask.completed, // Asegúrate de que esta propiedad esté correcta
    });
    dispatch({ type: "UPDATE_TASK", payload: updatedData });
  };

  const handleEditTask = async (updatedTask) => {
    const task = await updateTask(updatedTask._id, updatedTask);
    dispatch({ type: "UPDATE_TASK", payload: task });
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Gestión de Tareas</h1>
      <button
        onClick={openModal}
        className='px-4 py-2 bg-blue-500 text-white rounded mb-4'
      >
        Agregar Nueva Tarea
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddTask}
      />
      <TaskList
        tasks={state.tasks}
        onUpdate={handleUpdateTask} 
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};
