import React, { useEffect, useState } from "react";

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/athletes")
      .then((res) => res.json())
      .then((data) => {
        setAthletes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar deportistas:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando deportistas...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deportistas</h1>
      <p>Gestión de deportistas: agregar, editar y ver información.</p>

      {athletes.length === 0 ? (
        <p>No hay deportistas registrados.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Fecha de Nacimiento</th>
              <th>Email</th>
              <th>Tipo Usuario</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.documento}>
                <td>{athlete.documento}</td>
                <td>{athlete.nombre}</td>
                <td>{new Date(athlete.fechaNacimiento).toLocaleDateString()}</td>
                <td>{athlete.email}</td>
                <td>{athlete.idTipoUsuario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Athletes;
