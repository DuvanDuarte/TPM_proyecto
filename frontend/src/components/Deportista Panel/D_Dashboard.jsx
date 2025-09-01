import React from "react";

const D_Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-container">

        <div className="card summary-card">
          <h2>Total Entrenamientos</h2>
          <p>Total sesiones esta semana: 20</p>
          <p>Entrenamiento más popular: Resistencia</p>
        </div>
      </div>
    </>
  );
};

export default D_Dashboard;