import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { roleMap } from '../../utils/roles';
import "./Profile.css";


const Profile = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const roleName = roleMap[user.idRol] || "Rol no disponible";

  const toggleForm = () => setShowForm(prev => !prev);

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {
      nombre,
      email,
      // otros campos editables que quieras agregar
    };

    console.log("Datos a enviar:", updatedData);

    // Aquí harías la llamada para actualizar la información en backend

    toggleForm(); // cerrar formulario
  };

  return (
    <>
      <div className="dashboard-container new">
        <section className="personal-info-section">
          <h2>INFORMACIÓN PERSONAL</h2>

          <div className="profile-grid">

            {/* Editar datos personales */}
            {showForm && (
              <div className="modal-backdrop" onClick={toggleForm}>
                <div
                  className="form-container single-column"
                  onClick={e => e.stopPropagation()} // evitar cerrar al click dentro del form
                >
                  <h3>Editar informacion personal</h3>
                  <form
                    action=""
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label htmlFor="documento">Documento</label>
                      <input
                        type="text"
                        id="documento"
                        name="documento"
                        value={user.documento}
                        disabled // Campo no editable
                      /></div>

                    <div className="form-group">
                      <label htmlFor="nombre">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        placeholder="Ingrese su nombre"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Correo electrónico</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ingrese su email"
                      />
                    </div>

                    <button type="submit" className="submit-button">Guardar Cambios</button>
                  </form>
                </div>
              </div>
            )}

            {/* Foto, nombre y rol */}
            <div className="profile-main">
              <img
                src="/src/assets/images/profile.jpg"
                alt="Foto de perfil"
                className="profile-photo"
                onClick={() => setIsModalOpen(true)}
              />
              <div className="profile-name-role">
                <h3>{user.nombre}</h3>
                <p className="role">
                  {roleName || "Rol no disponible"}
                </p>
              </div>
            </div>

            {/* Contacto */}
            <div className="profile-contact card2">
              <h4>CONTACTO</h4>
              <p><span className="icon-email"></span> {user?.email || "email@example.com"}</p>
              <p><span className="icon-phone"></span> {user?.telefono || "+57 000 000 000"}</p>
            </div>

            {/* Estadísticas */}
            <div className="profile-stats card2">
              <h4>STATISTICS</h4>
              <div className="stats-numbers">
                <div>
                  <span className="stat-number">3.5</span>
                  <span>AÑOS DE EXPERIENCIA</span>
                </div>
                <div>
                  <span className="stat-number">95</span>
                  <span>DEPORTISTAS</span>
                </div>
              </div>
            </div>

            {/* Perfil descripción */}
            <div className="profile-description card2">
              <h4>INFORMACIÓN</h4>
              <p>
                {user?.descripcion || "Sin información adicional disponible."}
              </p>
            </div>

            {/* Redes sociales */}
            <div className="profile-social card2">
              <h4>SOCIAL</h4>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF size={32} color="#4FDFFF" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram size={32} color="#4FDFFF" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn size={32} color="#4FDFFF" />
                </a>
              </div>
            </div>

            {/* Certificaciones */}
            <div className="profile-certifications card2">
              <h4>CERTIFICATIONS</h4>
              <ul>
                <li><span className="icon-check"></span> CERTIFIED PERSONAL TRAINER</li>
                <li><span className="icon-check"></span> NUTRITION SPECIALIST</li>
              </ul>
            </div>

          </div>

          <div className="profile-edit-button">
            <button onClick={toggleForm}>Editar perfil</button>
          </div>

        </section>
        {/* Modal de imagen perfil */}
        {isModalOpen && (
          <div
            className="modal-backdrop"
            onClick={() => setIsModalOpen(false)} // cerrar al hacer click afuera
          >
            <img
              src="/src/assets/images/profile.jpg"
              alt="Foto ampliada de perfil"
              className="modal-image"
              onClick={(e) => e.stopPropagation()} // prevenir cierre al clicar imagen
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
