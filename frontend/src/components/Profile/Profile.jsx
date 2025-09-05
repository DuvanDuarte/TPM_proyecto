import React,  { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Profile.css";


const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="dashboard-container new">
        <section className="personal-info-section">
          <h2>INFORMACIÓN PERSONAL</h2>

          <div className="profile-grid">
            {/* Botón Editar Perfil */}
            <div className="profile-edit-button">
              <button onClick={() => alert("Editar perfil")}>Editar perfil</button>
            </div>

            {/* Foto, nombre y rol */}
            <div className="profile-main">
              <img
                src="/src/assets/images/profile.jpg"
                alt="Foto de perfil"
                className="profile-photo"
                onClick={() => setIsModalOpen(true)}
              />
              <div className="profile-name-role">
                <h3>NOMBRE</h3>
                <p className="role">
                  ROL<br/>
                  FITNESS COACH
                </p>
              </div>
            </div>

            {/* Contacto */}
            <div className="profile-contact card2">
              <h4>CONTACTO</h4>
              <p><span className="icon-email"></span> name@example.com</p>
              <p><span className="icon-phone"></span> +57 000 000 000</p>
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam quaerat, 
                maiores placeat vero veniam inventore eveniet cum exercitationem quam cupiditate iste 
                reprehenderit a, dicta laborum consequuntur quo sequi at beatae. Quae quis tempora quod corporis 
                error commodi quam enim molestiae.
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
