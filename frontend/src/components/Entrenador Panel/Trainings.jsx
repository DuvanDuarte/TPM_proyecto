import React, { useState, useEffect } from "react";

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/entrenamientos") // Your backend URL
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener entrenamientos");
        }
        return res.json();
      })
      .then((data) => {
        setTrainings(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTrainings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando entrenamientos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Entrenamientos</h1>
      <p>Lista de entrenamientos creados.</p>
      <table className="table">
        <thead>
          <tr>
            <th>ID Entrenamiento</th>
            <th>Nombre</th>
            <th>ID Modalidad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((entrenamiento) => (
            <tr key={entrenamiento.idEntrenamiento}>
              <td>{entrenamiento.idEntrenamiento}</td>
              <td>{entrenamiento.nombreEnt}</td>
              <td>{entrenamiento.idModalidad}</td>
              <td>{entrenamiento.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Trainings;
