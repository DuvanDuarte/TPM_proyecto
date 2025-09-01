import React from "react";

const A_Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-container">

        <div className="card summary-card">
          <div className="summary-header">
            <div className="summary-icon">
              <span class="material-symbols-outlined">sprint</span>
            </div>
            <div className="summary-growth">+12%</div>
          </div>
          <h2>Total Deportistas</h2>
          <p className="summary-count">248</p>
        </div>

        <div className="card summary-card">
          <h2>Total Entrenadores</h2>
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

export default A_Dashboard;