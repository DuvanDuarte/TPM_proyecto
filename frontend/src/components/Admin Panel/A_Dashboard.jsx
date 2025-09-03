import React from "react";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const A_Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(prev => !prev);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="dashboard-container">

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="30px">
            {cardsData.map((card, idx) => (
              <div key={idx} className="card summary-card">
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
          </Masonry>
        </ResponsiveMasonry>

        {showForm && (
          <div className="modal-backdrop" onClick={toggleForm}>
            <div className="login-form-container" onClick={(e) => e.stopPropagation()}>
              <h2>Registrar Usuario</h2>
              <form action="" method="post" onSubmit={() => { }}>
                {/* Formulario aquí */}
                <button onClick={toggleForm} className="submit-button">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const cardsData = [
  {
    icon: "sprint",
    growth: "+12%",
    title: "Deportistas",
    content: (
      <>
        <p>Total: 248</p>
      </>
    ),
  },
  {
    icon: "exercise",
    growth: "+12%",
    title: "Entrenadores",
    content: <p>Total: 11</p>,
  },
  {
    icon: "clinical_notes",
    growth: "+4%",
    title: "Profesionales",
    content: <p>Total: 6</p>,
  },
  {
    icon: "calendar_month",
    growth: "+4%",
    title: "Eventos",
    content: (
      <>
        <p>Totales: 6</p>
        <p>Este mes: 2</p>
      </>
    ),
  },
];

export default A_Dashboard;