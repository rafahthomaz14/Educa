import React, { useState } from 'react'
import Lista from '../ListaTarefa' // Ajuste conforme a estrutura do seu projeto

export default function Home() {
    const today = new Date()

    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const [selectedDay, setSelectedDay] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(prev => prev - 1)
        } else {
            setCurrentMonth(prev => prev - 1)
        }
    }

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(prev => prev + 1)
        } else {
            setCurrentMonth(prev => prev + 1)
        }
    }

    const handleDayClick = (day) => {
        setSelectedDay(day)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedDay(null)
    }

    // Informações do mês atual
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const emptyStartDays = Array.from({ length: firstDayOfMonth })
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const totalCells = 42 // 6 semanas
    const emptyEndDays = Array.from({
        length: totalCells - emptyStartDays.length - monthDays.length,
    })

    const calendarCells = [...emptyStartDays, ...monthDays, ...emptyEndDays]

    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })

    return (
        <>
            <div className='bg-blue-500 h-15'></div>

            {/* AVIÃO E ELEFANTE — apenas quando o modal estiver fechado */}
            {!isModalOpen && (
                <>
                    <img src="./aviao.png" alt="Avião" className="hidden lg:block fixed top-0 left-0 z-[9999] w-[350px] m-2" />
                    <img src="./elefante.png" alt="Elefante" className="hidden lg:block fixed bottom-0 right-0 z-[9999] w-[400px] m-2" />
                </>
            )}

            {/* BOTÕES FIXOS — apenas quando o modal estiver fechado */}
            {!isModalOpen && (
                <div className="fixed w-full h-50 flex justify-center items-center z-50">
                    <div className="flex flex-col sm:flex-row justify-center gap-3 items-center w-[95%] mt-15">
                        <button className="w-full sm:w-auto px-7 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                            Primeiro Botão
                        </button>
                        <button className="w-full sm:w-auto px-7 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                            Segundo Botão
                        </button>
                        <button className="w-full sm:w-auto px-7 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                            Terceiro Botão
                        </button>
                        <button className="w-full sm:w-auto px-7 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                            Terceiro Botão
                        </button>
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0  p-4 flex flex-col justify-center items-center">
                {/* Cabeçalho com navegação */}
                <div className="flex items-center justify-between w-[95%] sm:max-w-[700px] mb-4">
                    <button
                        onClick={handlePreviousMonth}
                        className="text-xl font-bold px-2 hover:text-blue-600"
                    >
                        ←
                    </button>
                    <h2 className="text-2xl font-semibold capitalize">
                        {monthName} {currentYear}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="text-xl font-bold px-2 hover:text-blue-600"
                    >
                        →
                    </button>
                </div>

                {/* Dias da semana */}
                <div className="grid grid-cols-7 w-[95%] sm:max-w-[700px] gap-1 sm:gap-2 mx-auto p-2 lg:p-5">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                        <div
                            key={day}
                            className="flex items-center justify-center rounded bg-gray-300 h-10 text-xs sm:text-base"
                            style={{ minWidth: '3rem' }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Grade do calendário */}
                <div className="grid grid-cols-7 grid-rows-6 gap-1 sm:gap-2 w-[95%] sm:max-w-[700px] px-2 sm:px-5 mx-auto">
                    {calendarCells.map((day, i) => {
                        const isToday =
                            day &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear() &&
                            day === today.getDate()

                        return (
                            <button
                                key={i}
                                disabled={!day}
                                onClick={() => day && handleDayClick(day)}
                                className={`
                flex items-center justify-center rounded h-10 w-full
                ${!day ? 'bg-transparent' : 'bg-gray-300 hover:bg-blue-400 cursor-pointer'}
                ${selectedDay === day ? 'bg-blue-600 text-white font-bold' : ''}
                ${isToday && selectedDay === null ? 'border-3 border-blue-500 font-bold' : ''}
              `}
                                style={{ minWidth: '3rem' }}
                            >
                                {day || ''}
                            </button>
                        )
                    })}
                </div>

                {/* ListaTarefa */}
                {isModalOpen && selectedDay && (
                    <Lista
                        day={new Date(currentYear, currentMonth, selectedDay).toISOString()}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </>



    )
}
