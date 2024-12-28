// TaskForm.js
import { useState } from "react";

export const TaskForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <input
        type='text'
        placeholder='Título'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full p-2 border rounded'
        required
      />
      <textarea
        placeholder='Descripción (opcional)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full p-2 border rounded'
      />
      <div className='flex justify-end gap-2 items-center'>
        <button
          type='button'
          onClick={onClose}
          className='bg-gray-500 text-white px-4 py-2 rounded'
        >
          Cerrar
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-green-500 text-white rounded'
        >
          Agregar Tarea
        </button>
      </div>
    </form>
  );
};
