/* eslint-disable no-unused-vars */
import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { obtenerProductos } from "../helpers/queries";
import Swal from "sweetalert2";

const Inicio = () => {
  const [listaProductos, setListaProductos] = useState([])
  useEffect(() => {
    obtenerProductos().then((respuesta) => {
      if (respuesta) {
        setListaProductos(respuesta);
      } else {
        Swal.fire(
          "Ocurrió un error",
          "Intente nuevamente en unos minutos",
          "error"
        );
      }
    } )
  } , [])
  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="fondo cafe"
      />
      <Container className="pt-5 pb-4">
        <h1 className="display-4 text-center">Nuestros Productos</h1>
        <hr />
        <Row>
            {listaProductos.map( (producto) => <CardProducto producto={producto} key={producto.id}></CardProducto> )}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
