import React, { useState, useEffect } from "react";

const D_Dashboard = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/entrenamientos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener entrenamientos");
        return res.json();
      })
      .then((data) => setTrainings(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-container">
        <div className="card summary-card">
          <h2>Entrenamientos</h2>
          <p>Total sesiones esta semana: {trainings.length}</p><br />

          <h3>Lista de entrenamientos:</h3>
          <ul>
            {trainings.map((t) => (
              <li key={t.idEntrenamiento}>
                <strong>{t.nombreEnt}</strong>: {t.descripcion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default D_Dashboard;
