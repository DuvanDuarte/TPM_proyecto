import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { roleMap } from "../../utils/roles";
import RegisterForm from "./RegisterForm";
import EventForm from "./EventForm";

const A_Dashboard = () => {
  const [userCounts, setUserCounts] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showFormEvento, setShowFormEvento] = useState(false);
  const [events, setEvents] = useState([]);

  const toggleForm = () => setShowForm(prev => !prev);
  const toggleFormEvento = () => setShowFormEvento(prev => !prev);

  useEffect(() => {
    // Reemplaza '/api/users' con tu URL real del backend
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) => {
        const counts = {};
        users.forEach((user) => {
          const roleName = roleMap[user.idTipoUsuario];
          counts[roleName] = (counts[roleName] || 0) + 1;
        });
        setUserCounts(counts);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const loadEvents = () => {
    fetch("http://localhost:5000/eventos")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener eventos");
        return res.json();
      })
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const cardsData = [
    {
      id: 1, icon: "sprint", growth: "+12%", title: "Deportistas",
      content: <p>Total: {userCounts["Deportista"] || 0}</p>,
    },
    {
      id: 2, icon: "exercise", growth: "+12%", title: "Entrenadores",
      content: <p>Total: {userCounts["Entrenador"] || 0}</p>,
    },
    {
      id: 3, icon: "clinical_notes", growth: "+4%", title: "Profesionales",
      content: <p>Total: {userCounts["Profesional"] || 0}</p>,
    },
    {
      id: 4, icon: "calendar_month", growth: "+4%", title: "Eventos",
      content: (
        <>
          <p>Totales: {events.length}</p>
          <p>
            Este mes:{" "}
            {events.filter((e) => {
              // Filtra eventos que son del mes actual
              const eventDate = new Date(e.fechaEvento ?? e.date);
              const now = new Date();
              return (
                eventDate.getMonth() === now.getMonth() &&
                eventDate.getFullYear() === now.getFullYear()
              );
            }).length}
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-container">

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 1000: 2, 1200: 3 }}>
          <Masonry gutter="30px">
            {cardsData.map(card => (
              <div key={card.id} className="card summary-card">
                <div className="summary-header">
                  <div className="summary-icon">
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <div className="summary-growth">{card.growth}</div>
                </div>
                <h1>{card.title}</h1>
                {card.content}
              </div>
            ))}

            <div className="card add-training-card">
              <h2>Añadir Usuario</h2>
              <button onClick={toggleForm} className="add-training-button">
                + Nuevo usuario
              </button>
            </div>
            <div className="card add-training-card">
              <h2>Añadir Evento</h2>
              <button onClick={toggleFormEvento} className="add-training-button">
                + Nuevo evento
              </button>
            </div>
          </Masonry>
        </ResponsiveMasonry>

        {showForm && <RegisterForm toggleForm={toggleForm} />}
        {showFormEvento && <EventForm toggleForm={toggleFormEvento} onCreateSuccess={loadEvents}/>}
      </div >
    </>
  );
};



export default A_Dashboard;