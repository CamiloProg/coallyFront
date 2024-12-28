export const TaskDetailModal = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se muestra nada

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h2 className='text-xl font-bold mb-4'>Detalles de la Tarea</h2>
        <div>
          <p>
            <strong>Título:</strong> {task?.title}
          </p>
          <p>
            <strong>Descripción:</strong>
            <p className='text-sm text-gray-600 break-words w-full'>
              {task.description}
            </p>
          </p>
          <p>
            <strong>Fecha de creación:</strong> {task?.createdAt}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            {task?.completed ? "Completada" : "Pendiente"}
          </p>
        </div>
        <div className='flex justify-end mt-4'>
          <button
            onClick={onClose}
            className='bg-gray-500 text-white px-4 py-2 rounded'
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
