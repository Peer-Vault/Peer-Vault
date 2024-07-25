import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const Authentication = localStorage.getItem("login");

  return (
    <nav className="shadow bg-white">
      <div className={`logo nameDisplay ${isMenuOpen ? "hide" : ""}`}>
        <h2
          className="ml-5"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Peer Vault
        </h2>
      </div>
      <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
        <button
          onClick={() => {
            navigate("/");
            closeMenu();
          }}
          style={{
            color: "#1372c0",
            border: "none",
            fontWeight: "bold",
            marginTop: "5px",
            padding: "0.5rem 1rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "transparent",
            transition: "background-color 0s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          Home
        </button>
        <button 
              onClick={() => {
                navigate("/file/upload");
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Upload
            </button>
        <button
              onClick={() => {
                navigate("/file/all-files");
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              All Files
            </button>
        {!Authentication && (
          <>
            <button
              onClick={() => {
                navigate("/user/auth/register");
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Register
            </button>
            <button
              onClick={() => {
                navigate("/user/auth/login");
                closeMenu();
              }}
              style={{
                color: "#1372c0",
                border: "none",
                fontWeight: "bold",
                marginTop: "5px",
                padding: "0.5rem 1rem",
                fontSize: "1.2rem",
                cursor: "pointer",
                backgroundColor: "transparent",
                transition: "background-color 0s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Login
            </button>
          </>
        )}
        <button
          onClick={() => {
            navigate("/contact-us");
            closeMenu();
          }}
          style={{
            color: "#1372c0",
            border: "none",
            fontWeight: "bold",
            marginTop: "5px",
            padding: "0.5rem 1rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "transparent",
            transition: "background-color 0s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
        >
          About Us
        </button>
        {Authentication && (
          <button
            onClick={() => {
              navigate("/user/auth/logout");
              closeMenu();
            }}
            style={{
              color: "#1372c0",
              border: "none",
              fontWeight: "bold",
              marginTop: "5px",
              padding: "0.5rem 1rem",
              fontSize: "1.2rem",
              cursor: "pointer",
              backgroundColor: "transparent",
              transition: "background-color 0s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#ecf5fa")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Logout
          </button>
        )}
      </ul>
      <div className="burger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "open1" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open2" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "open3" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
