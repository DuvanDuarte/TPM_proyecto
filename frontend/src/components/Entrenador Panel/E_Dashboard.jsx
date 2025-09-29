import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { roleMap } from "../../utils/roles";
import TrainingForm from "./TrainingForm";

const E_Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  const [userCounts, setUserCounts] = useState({});
  useEffect(() => {
    fetch("http://localhost:5000/users") // Cambia por tu URL real
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

  const cardsData = [
    {
      id: 1,
      icon: "sprint",
      growth: "", // Puedes dejar vacío o poner otra métrica según lo que comentamos antes
      title: "Deportistas a Cargo",
      content: (
        <>
          <p>Total Deportistas: {userCounts["Deportista"] || 0}</p>
          <p>Promedio de edad: 21 años</p>
          {/* Más datos o históricos pueden ir aquí */}
        </>
      ),
    },
    {
      id: 2,
      icon: "exercise",
      growth: "", // Si quieres agregar más tarjetas con datos, aquí va
      title: "Entrenamientos",
      content: (
        <>
          <p>Total sesiones esta semana: 20</p>
          <p>Entrenamiento más popular: Resistencia</p>
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
            {cardsData.map((card) => (
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
              <h2>Añadir Entrenamiento</h2>
              <button onClick={toggleForm} className="add-training-button">
                + Nuevo entrenamiento
              </button>
            </div>
          </Masonry>
        </ResponsiveMasonry>

        {showForm && <TrainingForm toggleForm={toggleForm} />}
      </div>
    </>
  );
};

export default E_Dashboard;