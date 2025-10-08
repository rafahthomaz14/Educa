import React, { useState } from 'react'
import Modal from '../Modal' // Ajuste o caminho conforme sua estrutura

export default function ListaTarefa({ day, onClose }) {
  const [modalAberto, setModalAberto] = useState(false)
  const [tarefas, setTarefas] = useState([])

  const handleSalvarTarefa = (novaTarefa) => {
    setTarefas(prev => [...prev, novaTarefa])
    setModalAberto(false)
  }

  const handleRemoverTarefa = (index) => {
    setTarefas(prev => prev.filter((_, i) => i !== index))
  }

  // Formata a data recebida em formato ISO para "Segunda Feira - 01/11/2025"
  const formatarDia = (dataISO) => {
    if (!dataISO) return ''

    const dateObj = new Date(dataISO)
    if (isNaN(dateObj)) return 'Data inválida'

    const diaSemana = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' })
    const diaSemanaFormatado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)

    const dataFormatada = dateObj.toLocaleDateString('pt-BR')

    return `${diaSemanaFormatado} - ${dataFormatada}`
  }

  const diaFormatado = formatarDia(day)

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[100%] h-screen animate-zoom-in relative overflow-y-auto">
        {/* Botão Fechar tela de lista de tarefas */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Data formatada acima do botão */}
        <div className="mb-4 text-lg font-semibold text-gray-800">
          {diaFormatado}
        </div>

        <div className="mb-4">
          <button
            onClick={() => setModalAberto(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Adicionar Tarefa
          </button>
        </div>

        {/* Lista de tarefas */}
        {tarefas.length === 0 ? (
          <p className="text-gray-600">Nenhuma tarefa adicionada ainda.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {tarefas.map((tarefa, index) => (
              <li
                key={index}
                className="border p-3 rounded flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold">{tarefa.title}</h3>
                  <p className="text-sm text-gray-700">{tarefa.description}</p>
                </div>
                <button
                  onClick={() => handleRemoverTarefa(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Modal de nova tarefa */}
        {modalAberto && (
          <Modal
            day={day}
            onClose={() => setModalAberto(false)}
            onSave={handleSalvarTarefa}
          />
        )}
      </div>
    </div>
  )
}
