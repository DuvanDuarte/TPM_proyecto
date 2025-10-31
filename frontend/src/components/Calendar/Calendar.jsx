import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Importamos el CSS externo
import EventForm from "../Admin Panel/EventForm";
import { roleMap } from "../../utils/roles";

const Calendar = () => {
    // Estado para mes y año seleccionados. Inicializamos con el actual.
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showFormEvento, setShowFormEvento] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [, setUserData] = useState(null);

    const toggleFormEvento = () => setShowFormEvento(prev => !prev);

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

    // Cargar usuario desde token al montar
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = parseJwt(token);
            setUserData(decoded);
            const roleName = roleMap[decoded?.idRol] || null;
            setUserRole(roleName);
        }
    }, []);

    // Obtener eventos al montar
    useEffect(() => {
        fetch("http://localhost:5000/eventos")
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener eventos");
                return res.json();
            })
            .then((data) => {
                // Supón que data es un array de objetos con { id, title, date }
                const fetchedEvents = data.map((ev) => ({
                    id: ev.idEvento ?? ev.id,
                    title: ev.evento ?? ev.title ?? "Evento",
                    date: ev.fechaEvento ?? ev.date,
                }));
                setEvents(fetchedEvents);
            })
            .catch((err) => {
                console.error(err);
                // Opcional: manejar error visible en UI
            });
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
            {userRole === "Admin" && (
                <button onClick={toggleFormEvento} className="add-training-button">
                    + Nuevo Evento
                </button>
            )}

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

            {showFormEvento && <EventForm toggleForm={toggleFormEvento} />}
        </>
    );
};

function parseJwt(token) {
    if (!token) return null;
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error parsing JWT:", e);
        return null;
    }
}

export default Calendar;