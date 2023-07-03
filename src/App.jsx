/* eslint-disable no-unused-vars */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./components/views/Error404";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Inicio from "./components/views/Inicio";
import DetalleProducto from "./components/views/DetalleProducto";
import Registro from "./components/views/Registro"
import Login from "./components/views/Login"
import { useState } from "react";
import RutasProtegidas from "./components/routes/RutasProtegidas"
import RutasAdmin from "./components/routes/RutasAdmin";

function App() {
  const usuarioValorInicial = JSON.parse(sessionStorage.getItem("usuario")) || {}
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioValorInicial);
  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/registro" element={<Registro />} />
        <Route
          exact
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />
        <Route exact path="/detalle" element={<DetalleProducto />} />
        <Route exact path="/administrador/*" element={
          <RutasProtegidas>
            <RutasAdmin></RutasAdmin>
          </RutasProtegidas>
        } />
        
        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
