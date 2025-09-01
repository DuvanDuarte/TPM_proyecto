import React from "react";

const Profile = () => {
    return (
        <>
            <h1>Dashboard</h1>

            <div className="dashboard-container">
                <div className="card personal-info-card">
                    <h2>Información Personal</h2>
                    <p>Nombre: Juan Pérez</p>
                    <p>Email: juan.perez@example.com</p>
                    <p>Teléfono: +123 456 7890</p>
                </div>
            </div>
        </>
    )
}

export default Profile;