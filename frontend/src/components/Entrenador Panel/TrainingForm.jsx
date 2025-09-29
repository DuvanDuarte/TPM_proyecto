import React, { useState } from "react";

const TrainingForm = ({ toggleForm }) => {
  const [nombre, setNombre] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [deportista, setDeportista] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();
    // Validaciones básicas
    if (!nombre || !modalidad || !descripcion || (modalidad === "grupal" && (!fecha || !hora)) || (modalidad === "personalizado" && !deportista)) {
      setErrorMsg("Por favor complete todos los campos obligatorios.");
      return;
    }

    // Construir objeto entrenamiento según modalidad
    const newTraining = {
      nombre,
      modalidad,
      descripcion,
      ...(modalidad === "grupal" ? { fecha, hora } : { deportista }),
    };

    // Aquí harías el fetch o manejo posterior de envío al backend
    console.log("Entrenamiento a crear:", newTraining);

    // Limpiar y cerrar formulario
    setErrorMsg("");
    toggleForm();
  };

  return (
    <div className="modal-backdrop" onClick={toggleForm}>
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <h2>Crear Entrenamiento</h2>
        <form onSubmit={manejarSubmit}>
          <div className="form-group">
            <label>Nombre de Entrenamiento</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Modalidad</label>
            <select value={modalidad} onChange={(e) => setModalidad(e.target.value)} required>
              <option value="">Seleccione modalidad</option>
              <option value="grupal">Grupal</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>

          {modalidad === "grupal" && (
            <>
              <div className="form-group">
                <label>Fecha</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Hora</label>
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
              </div>
            </>
          )}

          {modalidad === "personalizado" && (
            <div className="form-group">
              <label>Seleccionar Deportista</label>
              <input type="text" value={deportista} onChange={(e) => setDeportista(e.target.value)} required placeholder="Documento o nombre" />
            </div>
          )}

          <div className="form-group">
            <label>Descripción</label>
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </div>

          <button type="submit" className="submit-button">Crear Entrenamiento</button>
        </form>
      </div>
    </div>
  );
};

export default TrainingForm;
