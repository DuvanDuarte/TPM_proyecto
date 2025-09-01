import React, { useState } from "react";
import "./Home.css";
import E_Dashboard from "../Entrenador Panel/E_Dashboard";
import A_Dashboard from "../Admin Panel/A_Dashboard";
import D_Dashboard from "../Deportista Panel/D_Dashboard";
import Athletes from "../Entrenador Panel/Athletes";
import Schedule from "../Entrenador Panel/Schedule";
import Reports from "../Entrenador Panel/Reports";
import Profile from "../Profile/Profile";

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
                <button onClick={() => { localStorage.removeItem("token"), window.location.reload() }} className="logout-button">
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
    Admin: [
        { key: "profile", label: "Profile", component: <Profile /> },
        { key: "dashboard", label: "Dashboard", component: <A_Dashboard /> },
        { key: "schedule", label: "Horarios", component: <Schedule /> },
        { key: "athletes", label: "Deportistas", component: <Athletes /> },
        // más opciones admin
    ],
    Entrenador: [
        { key: "profile", label: "Profile", component: <Profile /> },
        { key: "dashboard", label: "Dashboard", component: <E_Dashboard /> },
        { key: "athletes", label: "Deportistas", component: <Athletes /> },
    ],
    Deportista: [
        { key: "profile", label: "Profile", component: <Profile /> },
        { key: "dashboard", label: "Dashboard", component: <D_Dashboard /> },
        { key: "schedule", label: "Horarios", component: <Schedule /> },
    ]
};

export default Home;
