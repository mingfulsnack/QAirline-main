import React, { useEffect } from "react";
import NavbarAdmin from "../CommonComponents/NavbarAdmin";
import useRouteElement from "../../useRouteElement";
import "./HomeAdmin.scss";
import { useNavigate } from "react-router-dom";

function HomeAdmin() {
  const navigate = useNavigate();
  const routeElement = useRouteElement();

  useEffect(() => {
    if (window.location.pathname === "/HomeAdmin") {
      navigate("/Posts", { replace: true });
    }
  }, [navigate]);
  return (
    <div className="homeAdmin">
      <NavbarAdmin />
      <div className="adminContent">{routeElement}</div>
    </div>
  );
}

export default HomeAdmin;
