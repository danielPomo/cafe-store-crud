import { Routes, Route } from "react-router-dom"
import Administrador from "../views/Administrador"
import CrearProducto from "../views/producto/CrearProducto"
import EditarProducto from "../views/producto/EditarProducto"

const RutasAdmin = () => {
    return (
        <>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Administrador></Administrador>}
                />
                <Route
                    exact
                    path="/crear-producto"
                    element={<CrearProducto></CrearProducto>}
                />
                <Route
                    exact
                    path="/editar-producto/:id"
                    element={<EditarProducto></EditarProducto>}
                />
            </Routes>
        </>
    )
}

export default RutasAdmin