import React, { useState } from "react";

const EventoForm = ({ toggleForm, onCreateSuccess }) => {
  const [fechaEvento, setFechaEvento] = useState("");
  const [lugarEvento, setLugarEvento] = useState("");
  const [evento, setEvento] = useState("");
  const [descEvento, setDescEvento] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!fechaEvento || !lugarEvento || !evento || !tipoEvento) {
      setErrorMsg("Por favor complete todos los campos obligatorios.");
      return;
    }

    const newEvento = {
      fechaEvento,
      lugarEvento,
      evento,
      descEvento,
      tipoEvento,
    };

    try {
      const res = await fetch("http://localhost:5000/createEvento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvento),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data.message);
        setErrorMsg("");
        toggleForm();
        if (onCreateSuccess) {
          onCreateSuccess(); // Aquí avisas al padre que recargue eventos
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="modal-backdrop" onClick={toggleForm}>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div className="form-container multiple-columns" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Evento</h2>
        <form onSubmit={manejarSubmit}>
          <div className="form-group">
            <label htmlFor="fechaEvento">Fecha de Evento</label>
            <input
              id="fechaEvento"
              type="date"
              value={fechaEvento}
              onChange={(e) => setFechaEvento(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lugarEvento">Lugar del Evento</label>
            <input
              id="lugarEvento"
              type="text"
              value={lugarEvento}
              onChange={(e) => setLugarEvento(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="evento">Evento</label>
            <input
              id="evento"
              type="text"
              value={evento}
              onChange={(e) => setEvento(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descEvento">Descripción</label>
            <input
              id="descEvento"
              type="text"
              value={descEvento}
              onChange={(e) => setDescEvento(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipoEvento">Tipo de Evento</label>
            <select
              id="tipoEvento"
              value={tipoEvento}
              onChange={(e) => setTipoEvento(e.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="1">Entrenamiento</option>
              <option value="2">Torneo</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Crear Evento</button>
        </form>
      </div>
    </div>
  );
};

export default EventoForm;
