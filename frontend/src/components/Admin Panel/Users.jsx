import React, { useState, useEffect } from "react";
import { roleMap } from '../../utils/roles';
import { formatDate } from '../../utils/formatDate';
import "../../ui/tables.css";
import RegisterForm from "./RegisterForm";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => setShowForm(prev => !prev);

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
            <button onClick={toggleForm} className="add-training-button">
                + Nuevo usuario
            </button>
            {showForm && <RegisterForm toggleForm={toggleForm} />}
            <table className="table">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha Nacimiento</th>
                        <th>Tipo Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.documento}>
                            <td>{user.documento}</td>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{formatDate(user.fechaNacimiento)}</td>
                            <td>{roleMap[user.idTipoUsuario]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;