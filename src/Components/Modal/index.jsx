import React, { useState } from 'react'

export default function Modal({ day, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)

    if (attachments.length + files.length > 10) {
      setError('Você pode anexar no máximo 10 arquivos.')
      return
    }

    setAttachments(prev => [...prev, ...files])
    setError('')
  }

  const handleRemoveAttachment = (indexToRemove) => {
    setAttachments(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleSave = () => {
    console.log({
      title,
      description,
      attachments,
      date: day,
    })

    setTitle('')
    setDescription('')
    setAttachments([])
    setError('')
    onClose()
  }

  const renderPreviews = () => {
    if (attachments.length === 0) return null

    return (
      <div className="mt-4 max-h-48 overflow-y-auto pr-2 space-y-3">
        {attachments.map((file, index) => {
          const isImage = file.type.startsWith('image/')
          const previewURL = URL.createObjectURL(file)

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {isImage && (
                  <img
                    src={previewURL}
                    alt={`Anexo ${index + 1}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}

                <p className="text-sm text-gray-700 truncate max-w-[200px]">
                  {file.name}
                </p>
              </div>

              {/* Botão de remover */}
              <button
                onClick={() => handleRemoveAttachment(index)}
                className="text-red-500 hover:text-red-700 text-base"
                title="Remover arquivo"
              >
                ❌
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex p-5 justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl animate-zoom-in relative">
        {/* Botão Fechar */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Nova Tarefa</h2>

        {/* Linha com título + botão de anexo */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[200px]"
          />

          <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm py-2 px-4 rounded border border-gray-400 whitespace-nowrap self-center">
            📎 Anexar Arquivos
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Mensagem de erro */}
        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        {/* Descrição */}
        <textarea
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-32 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Anexos com barra de rolagem */}
        {renderPreviews()}

        {/* Botão salvar */}
        <div className="mt-6 text-end">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
