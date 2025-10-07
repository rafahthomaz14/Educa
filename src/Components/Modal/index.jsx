export default function Modal({ day, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex p-5 justify-center items-center z-50">
      <div
        className="bg-white p-6 rounded shadow-md text-end w-[100%] h-[100%] animate-zoom-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Seu conteúdo do modal */}

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
