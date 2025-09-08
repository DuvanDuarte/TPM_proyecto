import React, { useState } from "react";

const RegisterForm = ({ toggleForm }) => {
  // Variables de estado internas para el formulario
  const [documento, setDocumento] = useState("");
  const [confirmarD, setConfirmarD] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Función de envío con la lógica original
  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (documento !== confirmarD) {
      setErrorMsg("Los documentos no coinciden.");
      return;
    }

    setErrorMsg("");

    const newUser = {
      documento,
      nombre,
      email,
      fechaNacimiento,
      password,
      idTipoUsuario: Number(tipoUsuario),
    };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error("Error al registrar usuario");
      toggleForm(); // cerrar modal tras éxito
    } catch (error) {
      console.error(error.message);
      setErrorMsg("Error al registrar usuario"); // opcional, mostrar error
    }
  };

  return (
    <div className="modal-backdrop" onClick={toggleForm}>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div className="form-container multiple-columns" onClick={(e) => e.stopPropagation()}>
        <h2>Registrar Usuario</h2>
        <form onSubmit={manejarSubmit}>
          <div className="form-group">
            <label htmlFor="documento">Documento</label>
            <input
              type="text"
              id="documento"
              name="documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
              placeholder="Ingrese el documento"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarD">Confirmar Documento</label>
            <input
              type="text"
              id="confirmarD"
              name="confirmarD"
              value={confirmarD}
              onChange={(e) => setConfirmarD(e.target.value)}
              required
              placeholder="Documento nuevamente"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Nombre completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingrese el email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
              placeholder="Seleccione su fecha de nacimiento"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingrese la contraseña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
            <select
              id="tipoUsuario"
              name="tipoUsuario"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="2">Entrenador</option>
              <option value="3">Deportista</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
