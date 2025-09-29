import React, { useEffect, useState } from "react";
import { roleMap } from "../../utils/roles";   // Para mostrar el tipo de usuario como texto
import { formatDate } from "../../utils/formatDate"; // Para formatear la fecha
import "../../ui/tables.css"; // Usa el mismo estilo de tablas que Users

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener deportistas");
        return res.json();
      })
      .then((data) => {
        setAthletes(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error al cargar deportistas:", error);
        setError(error.message);
        setAthletes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando deportistas...</p>;
  if (error) return <p>Error: {error}</p>;

  // Filtrar atletas con idTipoUsuario === 3
  const filteredAthletes = athletes.filter(a => a.idTipoUsuario === 3);

  return (
    <>
      <h1>Deportistas</h1>
      <p>Gestión de deportistas: ver información.</p>

      {filteredAthletes.length === 0 ? (
        <p>No hay deportistas registrados.</p>
      ) : (
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
            {filteredAthletes.map((athlete) => (
              <tr key={athlete.documento}>
                <td>{athlete.documento}</td>
                <td>{athlete.nombre}</td>
                <td>{athlete.email}</td>
                <td>{formatDate(athlete.fechaNacimiento)}</td>
                <td>{roleMap[athlete.idTipoUsuario]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Athletes;
