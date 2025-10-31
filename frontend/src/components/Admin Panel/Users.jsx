import React, { useState, useEffect } from "react";
import { roleMap } from '../../utils/roles';
import { formatDate } from '../../utils/formatDate';
import "../../ui/tables.css";
import RegisterForm from "./RegisterForm";


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(false);  // Formulario para crear usuario
    const [showEditForm, setShowEditForm] = useState(false);          // Formulario para editar usuario
    const [selectedUser, setSelectedUser] = useState(null);           // Usuario seleccionado para edición

    const toggleRegisterForm = () => {
        setShowRegisterForm(prev => !prev);
        if (showRegisterForm) setSelectedUser(null);
    };

    const toggleEditForm = () => {
        setShowEditForm(prev => !prev);
        if (showEditForm) setSelectedUser(null);
    };

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

    // Al hacer click en "Editar" de un usuario, abrir modal con formulario y pasar datos
    const handleEditClick = (user) => {
        setSelectedUser(user);
        setShowEditForm(true);
    };

    // Función para actualizar usuario tras submit del formulario de edición
    const handleUpdateUser = (updatedUser) => {
        
        fetch("http://localhost:5000/editUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Error al actualizar usuario");
                }
                return res.json();
            })
            .then(() => {
                setUsers(prev =>
                    prev.map(u => (u.documento === updatedUser.documento ? updatedUser : u))
                );
                toggleEditForm();
            })
            .catch(err => {
                alert(err.message);
            });
    };

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Usuarios</h1>
            <p>Gestión de usuarios: agregar, editar y ver información.</p>

            <button onClick={toggleRegisterForm} className="add-training-button">
                + Nuevo usuario
            </button>
            {showRegisterForm && <RegisterForm toggleForm={toggleRegisterForm} />}
            {showEditForm && (
                <EditUserForm
                    user={selectedUser}
                    toggleForm={toggleEditForm}
                    onSave={handleUpdateUser}
                />
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha Nacimiento</th>
                        <th>Tipo Usuario</th>
                        <th>Acciones</th>
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
                            <td><button onClick={() => handleEditClick(user)}
                                className="add-training-button table-button">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

const EditUserForm = ({ user, toggleForm, onSave }) => {
    const [nombre, setNombre] = useState(user?.nombre || "");
    const [email, setEmail] = useState(user?.email || "");
    const [fechaNacimiento, setFechaNacimiento] = useState(
        user ? user.fechaNacimiento.slice(0, 10) : ""
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !email || !fechaNacimiento) {
            alert("Completa todos los campos obligatorios");
            return;
        }
        const updatedUser = {
            documento: user.documento,
            nombre,
            email,
            fechaNacimiento,
            idTipoUsuario: user.idTipoUsuario,
        };
        onSave(updatedUser);
    };

    return (
        <div className="modal-backdrop" onClick={toggleForm}>
            <div
                className="form-container single-column"
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Editar Usuario</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Documento</label>
                        <input type="text" value={user.documento} disabled />
                    </div>

                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha de nacimiento</label>
                        <input
                            type="date"
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        onClick={toggleForm}
                        className="add-training-button"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Users;