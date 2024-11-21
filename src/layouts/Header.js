import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onHandleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };
  const onHandleLogIn = () => {
    navigate("/login");
  };
  useEffect(() => {
    let token = localStorage.getItem("access_token") || false;
    if (!token) {
      setIsLoggedIn(false);
    } else setIsLoggedIn(true);
  });

  return (
    <nav className="sb-topnav navbar">
      <a className="navbar-brand ps-3" href="/">
        <i class="fa fa-bus" aria-hidden="true"></i> Managing Bus
      </a>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button
            className="btn btn-primary"
            id="btnNavbarSearch"
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      {!isLoggedIn ? (
        <button className="btn btn-primary" onClick={onHandleLogIn}>
          Đănng nhập
        </button>
      ) : (
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              href="#"
              onClick={(e) => e.preventDefault()} // Prevents page jump
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <a className="dropdown-item" href="#!">
                  Thông tin cá nhân
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={onHandleLogout}>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
