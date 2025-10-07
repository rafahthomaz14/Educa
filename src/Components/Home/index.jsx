import React, { useState } from 'react'
import Modal from '../Modal' // Caminho relativo ao seu projeto

export default function Home() {
    const [selectedDay, setSelectedDay] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false) // ✅ Adicionado

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const monthName = today.toLocaleString('default', { month: 'long' })

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const emptyStartDays = Array.from({ length: firstDay })
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const totalCells = 35
    const emptyEndDays = Array.from({
        length: totalCells - emptyStartDays.length - monthDays.length,
    })

    const calendarCells = [...emptyStartDays, ...monthDays, ...emptyEndDays]

    // ✅ Atualiza estado ao clicar no dia
    const handleDayClick = (day) => {
        setSelectedDay(day)
        setIsModalOpen(true)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 capitalize">
                {monthName} {year}
            </h2>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 w-[95%] sm:max-w-[700px] gap-1 sm:gap-2 mx-auto p-2 lg:p-5">
                {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day) => (
                    <div
                        key={day}
                        className="flex items-center justify-center rounded bg-gray-300 h-10 text-xs sm:text-base"
                        style={{ minWidth: '3rem' }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Grade dos dias */}
            <div className="grid grid-cols-7 grid-rows-5 gap-1 sm:gap-2 w-[95%] sm:max-w-[700px] px-2 sm:px-5 mx-auto">
                {calendarCells.map((day, i) => (
                    <button
                        key={i}
                        disabled={!day}
                        onClick={() => day && handleDayClick(day)}
                        className={`flex items-center justify-center rounded h-10 w-full
        ${!day ? 'bg-transparent' : 'bg-gray-300 hover:bg-blue-400 cursor-pointer'}
        ${selectedDay === day ? 'bg-blue-600 text-white font-bold' : ''}
      `}
                        style={{ minWidth: '3rem' }}
                    >
                        {day || ''}
                    </button>
                ))}
            </div>



            {/* Modal */}
            {isModalOpen && (
                <Modal
                    selectedDate={`${selectedDay} de ${monthName} de ${year}`}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
