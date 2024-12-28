import React from "react";

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded shadow-lg w-96'>
        <h2 className='text-lg font-bold mb-4'>Confirmar Eliminación</h2>
        <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
        <div className='flex justify-end gap-2 mt-4'>
          <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 bg-red-500 text-white rounded'
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
