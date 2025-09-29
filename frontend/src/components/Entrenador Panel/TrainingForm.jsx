import React, { useState } from "react";

const TrainingForm = ({ toggleForm }) => {
  const [nombre, setNombre] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !modalidad || !descripcion) {
      setErrorMsg("Por favor complete todos los campos obligatorios.");
      return;
    }

    const newTraining = {
      nombre,
      modalidad,
      descripcion,
    };

    fetch("http://localhost:5000/createTraining", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTraining),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al crear entrenamiento");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        setErrorMsg("");
        toggleForm();
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });

    // Limpiar y cerrar formulario
    setErrorMsg("");
    toggleForm();
  };

  return (
    <div className="modal-backdrop" onClick={toggleForm}>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div className="form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Entrenamiento</h2>
        <form onSubmit={manejarSubmit}>
          <div className="form-group">
            <label>Nombre de Entrenamiento</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Modalidad</label>
            <select
              value={modalidad}
              onChange={(e) => setModalidad(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="1">Grupal</option>
              <option value="2">Individual</option>
            </select>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Crear Entrenamiento</button>
        </form>
      </div >
    </div >
  );
};

export default TrainingForm;
