import React from "react";

const E_Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-container">

        <div className="card summary-card">
          <h2>Deportistas a Cargo</h2>
          <p>Total Deportistas: 12</p>
          <p>Promedio de edad: 21 años</p>
          {/* Aquí podrías añadir más datos o estadísticos */}
        </div>

        <div className="card summary-card">
          <h2>Entrenamientos</h2>
          <p>Total sesiones esta semana: 20</p>
          <p>Entrenamiento más popular: Resistencia</p>
        </div>

        <div className="card add-training-card">
          <h2>Añadir Entrenamiento</h2>
          <button className="add-training-button">+ Nuevo entrenamiento</button>
        </div>
      </div>
    </>
  );
};

export default E_Dashboard;