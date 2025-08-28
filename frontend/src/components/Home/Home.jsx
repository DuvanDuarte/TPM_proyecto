import React, { useState } from "react";
import "./Home.css";
import Dashboard from "../Entrenador Panel/Dashboard";
import Athletes from "../Entrenador Panel/Athletes";
import Schedule from "../Entrenador Panel/Schedule";
import Reports from "../Entrenador Panel/Reports";

const Home = ({ userRole }) => {
    const [activePanel, setActivePanel] = useState("dashboard");

    // Opciones según rol o vacío si no hay rol válido
    const options = userPanels[userRole] || [];

    return (
        <div className="container">
            {/* Sidebar */}
            <nav className="sidebar">
                <h2 className="sidebar-title">Panel {userRole}</h2>
                {options.map(({ key, label }) => (
                    <button
                        key={key}
                        style={navButtonStyle(activePanel === key)}
                        onClick={() => setActivePanel(key)}
                    >
                        {label}
                    </button>
                ))}
                {/* Botón cerrar sesión abajo */}
                <button onClick={() => { localStorage.removeItem("token"), window.location.reload()}} className="logout-button">
                    Cerrar sesión
                </button>
            </nav>
            {/* Main Content */}
            <main className="main-content">
                {options.map(({ key, component }) => activePanel === key && component)}
            </main>
        </div>
    );
};

const navButtonStyle = (active) => ({
    backgroundColor: active ? '#e63946' : 'transparent',
    color: active ? 'white' : '#e63946',
    border: 'none',
    padding: '1rem',
    marginBottom: '1rem',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: '600',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
});

const userPanels = {
    admin: [
        { key: "dashboard", label: "Dashboard", component: <Dashboard /> }
        // más opciones admin
    ],
    coach: [
        { key: "dashboard", label: "Dashboard", component: <Dashboard /> },
        { key: "athletes", label: "Deportistas", component: <Athletes /> },
    ],
    athlete: [
        { key: "dashboard", label: "Dashboard", component: <Dashboard /> },
        { key: "schedule", label: "Horarios", component: <Schedule /> },
    ]
};

export default Home;
