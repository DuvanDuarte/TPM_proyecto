import React, { useState } from "react";
import "./Home.css";
import Dashboard from "../Entrenador Panel/Dashboard";
import Athletes from "../Entrenador Panel/Athletes";
import Schedule from "../Entrenador Panel/Schedule";
import Reports from "../Entrenador Panel/Reports";

const Home = () => {
    const [activePanel, setActivePanel] = useState("dashboard");

    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina token o datos de sesión
        window.location.reload(); // Para refrescar la app y forzar redirección o cambio de estado
        // Aquí puedes redirigir a login si usas react-router: navigate('/login');
    };

    return (
        <div className="container">
            {/* Sidebar */}
            <nav className="sidebar">
                <h2 className="sidebar-title">Panel Entrenador</h2>
                <button style={navButtonStyle(activePanel === "dashboard")} onClick={() => setActivePanel("dashboard")}>
                    Dashboard
                </button>
                <button style={navButtonStyle(activePanel === "athletes")} onClick={() => setActivePanel("athletes")}>
                    Deportistas
                </button>
                <button style={navButtonStyle(activePanel === "schedule")} onClick={() => setActivePanel("schedule")}>
                    Horarios
                </button>
                <button style={navButtonStyle(activePanel === "reports")} onClick={() => setActivePanel("reports")}>
                    Reportes
                </button>
                {/* Botón cerrar sesión abajo */}
                <button onClick={handleLogout} className="logout-button">
                    Cerrar sesión
                </button>
            </nav>
            {/* Main Content */}
            <main className="main-content">
                {activePanel === "dashboard" && <Dashboard />}
                {activePanel === "athletes" && <Athletes />}
                {activePanel === "schedule" && <Schedule />}
                {activePanel === "reports" && <Reports />}
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

export default Home;
