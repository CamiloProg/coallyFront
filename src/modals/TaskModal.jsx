import React from "react";
import { TaskForm } from "../components/TaskForm";

export const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  return (
    isOpen && (
      <div className='fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
          <h2 className='text-2xl mb-4'>Agregar Tarea</h2>
          <TaskForm onSubmit={onSubmit} onClose={onClose} />
        </div>
      </div>
    )
  );
};
