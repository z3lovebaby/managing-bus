import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Sidebar = ({ isSidebarOpen }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang); // Lưu ngôn ngữ vào localStorage
  };
  console.log(i18n); // Kiểm tra đối tượng i18n
  console.log(i18n.changeLanguage); // Kiểm tra xem i18n.changeLanguage có phải là một hàm không
  return (
    <div
      id="layoutSidenav_nav"
      className={isSidebarOpen ? "sidebar-open" : "sidebar-closed"}
    >
      <nav className="sb-sidenav accordion" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <a className="nav-link" href="index.html">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </a>
            <div className="sb-sidenav-menu-heading">Interface</div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-user"></i>
              </div>
              Users
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapseLayouts"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link to="/users" className="nav-link">
                  Add User
                </Link>
                <Link to="/users" className="nav-link">
                  List Users
                </Link>
              </nav>
            </div>
            <a
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePost"
              aria-expanded="false"
              aria-controls="collapseLayouts"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Lái xe
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </a>
            <div
              className="collapse"
              id="collapsePost"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link to="/users" className="nav-link">
                  Add Post
                </Link>
                <Link to="/users" className="nav-link">
                  List Posts
                </Link>
              </nav>
            </div>
            <div className="language-buttons">
              <button
                className="btn btn-success m-2"
                onClick={() => changeLanguage("vi")}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/800px-Flag_of_Vietnam.svg.png"
                  style={{ width: "24px", height: "auto" }}
                ></img>
                <p>Tiếng Việt</p>
              </button>

              <button
                className="btn btn-primary m-2"
                onClick={() => changeLanguage("en")}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                  style={{ width: "24px", height: "auto" }}
                ></img>
                <p>English</p>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
