import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { roleMap } from "../../utils/roles";
import RegisterForm from "./RegisterForm";

const A_Dashboard = () => {
  const [userCounts, setUserCounts] = useState({});
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(prev => !prev);

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

  const cardsData = [
    {
      id: 1, icon: "sprint", growth: "+12%", title: "Deportistas",
      content: <p>Total: {userCounts["Deportista"] || 0} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus provident explicabo fugit amet nesciunt veritatis veniam in, temporibus quis officia eius beatae culpa ratione aliquid delectus? Molestias earum officiis reiciendis corrupti, debitis facilis officia doloremque in obcaecati neque cupiditate consequuntur itaque expedita aut, quas at quam? Aut, facilis pariatur, nisi tempore totam ab at tempora expedita accusamus accusantium modi, saepe adipisci natus odit sit quas cupiditate suscipit aliquam alias et reiciendis illum culpa! Aut nesciunt explicabo sunt dolorum animi dolor soluta repudiandae commodi, nobis alias facere enim tempora libero doloremque repellendus dolorem tenetur? Perferendis omnis eveniet voluptates pariatur quod tenetur maiores illum, laborum exercitationem eaque est facilis, soluta voluptatibus eligendi minima? Voluptatum dolore possimus harum officia, assumenda reprehenderit quos, fuga molestiae temporibus nulla deleniti quia totam veniam. Fuga molestiae provident quidem veniam dolore quasi fugit beatae magnam repellat iure ab eos, sapiente, illo et voluptatum optio nihil aspernatur doloremque. Facere deserunt cupiditate libero ut odio reprehenderit vitae, sapiente delectus ipsa natus qui consequuntur nulla, repellat itaque totam voluptatibus laborum nesciunt aut non omnis, nisi tenetur optio officia quaerat? Corporis nam excepturi minima! Fugit distinctio porro aliquid eum impedit veniam iure velit voluptatum delectus, odit assumenda consequatur placeat doloremque est omnis.</p>,
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
          <p>Totales: 6</p>
          <p>Este mes: 2</p>
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
          </Masonry>
        </ResponsiveMasonry>

        {showForm && <RegisterForm toggleForm={toggleForm} />}
      </div >
    </>
  );
};



export default A_Dashboard;