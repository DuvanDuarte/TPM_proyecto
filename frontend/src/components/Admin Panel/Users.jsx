import React, { useState, useEffect } from "react";
import { roleMap } from '../../utils/roles';
import "./Users.css";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Cambia la URL por la de tu backend
        fetch("http://localhost:5000/users")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener usuarios");
                }
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setUsers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Usuarios</h1>
            <p>Gestión de usuarios: agregar, editar y ver información.</p>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Tipo Usuario</th>
                        <th>Fecha Nacimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.documento}>
                            <td>{user.documento}</td>
                            <td>{user.nombre}</td>
                            <td>{roleMap[user.idTipoUsuario]}</td>
                            <td>{formatDate(user.fechaNacimiento)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default Users;