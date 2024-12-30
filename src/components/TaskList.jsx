import React, { useState } from "react";
import { EditTaskModal } from "../modals/EditTaskModal";
import { ConfirmDeleteModal } from "../modals/ConfirmDeleteModal";
import { TaskDetailModal } from "../modals/TaskDetailModal";

export const TaskList = ({ tasks, onUpdate, onDelete, onEdit, isLoading }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filterStatus === "all" ||
      task.completed === (filterStatus === "completed");
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (updatedTask) => {
    onEdit(updatedTask);
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDelete = (task) => {
    setTaskToDelete(task);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(taskToDelete._id);
    setIsConfirmDeleteOpen(false);
    setTaskToDelete(null);
  };

  const handleToggleCompletion = (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    onUpdate(updatedTask);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO");
  };

  return (
    <div className='flex flex-col gap-4 mt-2'>
      <div className='mb-4'>
        <input
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='Buscar tareas...'
          className='w-full p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>

      <div className='mb-4 flex gap-4'>
        <button
          onClick={() => setFilterStatus("all")}
          className={`p-2 rounded transition-colors duration-300 ease-in-out ${
            filterStatus === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`p-2 rounded transition-colors duration-300 ease-in-out ${
            filterStatus === "completed"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`p-2 rounded transition-colors duration-300 ease-in-out ${
            filterStatus === "pending"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pendientes
        </button>
      </div>

      {isLoading ? (
        <div className='flex justify-center items-center h-40'>
          <p className='text-blue-500'>Cargando tareas...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className='flex justify-center items-center h-40'>
          <p className='text-gray-500'>No hay tareas para mostrar</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            className='flex justify-between cursor-pointer items-center p-4 rounded-xl shadow bg-gray-100 transform transition duration-500 hover:scale-105'
            onClick={() => handleTaskClick(task)}
          >
            <div className='flex flex-col gap-1'>
              <div className='flex gap-1'>
                <i className='fa-regular fa-calendar'></i>
                <p className='text-sm text-gray-500'>
                  {formatDate(task.createdAt)}
                </p>
              </div>
              <h3 className='text-lg font-bold'>{task.title}</h3>
              <p className='truncate md:w-96 w-32'>{task.description}</p>

              <span
                className={`px-2 rounded w-fit ${
                  task.completed ? "bg-green-400" : "bg-orange-400"
                }`}
              >
                {task.completed ? "Completada" : "Pendiente"}
              </span>
            </div>
            <div className='flex flex-col items-end'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleCompletion(task);
                }}
                className={`${
                  task.completed ? "text-green-500" : "text-orange-400"
                } transition-transform duration-300 transform hover:scale-110`}
              >
                {task.completed
                  ? "Marcar como pendiente"
                  : "Marcar como completada"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(task);
                }}
                className='p-2 text-blue-500 transition-transform duration-300 transform hover:scale-110'
              >
                <i className='fa-solid fa-pen'></i> Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task);
                }}
                className='p-2 text-red-500 transition-transform duration-300 transform hover:scale-110'
              >
                <i className='fa-solid fa-trash-can'></i> Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <EditTaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <TaskDetailModal
        task={selectedTask}
        isOpen={isTaskDetailOpen}
        onClose={() => setIsTaskDetailOpen(false)}
      />
    </div>
  );
};
