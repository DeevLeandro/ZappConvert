import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogin }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
          <Link to="/" aria-label="inicio">
          <h1 className="logo">ZaapConvert</h1>
          </Link>
        

        <div className="icons">
          {!isLoggedIn ? (
            <Link to="/login" aria-label="Ir para login">
              <FontAwesomeIcon icon={faUserCircle} className="fa-icon" />
            </Link>
          ) : (
            <span>Bem-vindo!</span>
          )}

          <button
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label={showMenu ? "Fechar menu" : "Abrir menu"}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </nav>
  );
}