import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Importamos el CSS externo

const Calendar = () => {
    // Estado para mes y año seleccionados. Inicializamos con el actual.
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    // Función para obtener los días del mes seleccionado
    function getDaysInMonth(year, month) {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    useEffect(() => {
        const fakeEvents = [
            { id: 1, title: "Entrenamiento 1", date: "2025-09-05" },
            { id: 2, title: "Evento Especial", date: "2025-09-12" },
            { id: 3, title: "Entrenamiento 2", date: "2025-09-16" },
        ];
        setEvents(fakeEvents);
    }, []);

    const days = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());

    // Obtener el índice del día de la semana del primer día del mes (0=Domingo,...)
    const startDayIndex = days.length > 0 ? days[0].getDay() : 0;

    // Funciones para avanzar y retroceder mes
    const prevMonth = () => {
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setSelectedDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    return (
        <>
            <h1 className="calendarT">Calendario</h1>
            <p>Entrenamientos y eventos programados en el mes</p>

            <div className="month-selector">
                <button onClick={prevMonth}>&lt; Mes anterior</button>
                <h2>
                    {selectedDate.toLocaleString("es-ES", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button onClick={nextMonth}>Mes siguiente &gt;</button>
            </div>

            <div className="calendar-grid">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                    <div key={day} className="calendar-header">
                        {day}
                    </div>
                ))}
                {/* Agregar divs vacíos para el offset antes de los días del mes */}
                {[...Array(startDayIndex)].map((_, index) => (
                    <div key={"empty-" + index} className="calendar-day empty"></div>
                ))}

                {days.map((day) => {
                    const dayEvents = events.filter((e) => {
                        const eventDate = new Date(e.date);
                        return eventDate.toDateString() === day.toDateString();
                    });
                    const isToday = day.toDateString() === new Date().toDateString();
                    return (
                        <div
                            key={day.toISOString()}
                            className={`calendar-day ${isToday ? "today" : ""}`}
                        >
                            <div className="date-number">{day.getDate()}</div>
                            {dayEvents.map((ev) => (
                                <div key={ev.id} className="event">
                                    {ev.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Calendar;