/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from "react-bootstrap";
import { borrarProductos, obtenerProductos } from "../../helpers/queries";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemProducto = ({ producto, setProductos }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estás seguro de que quiere eliminar este producto?",
      text: "Una vez eliminado, el producto no se va a poder recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarProductos(producto.id).then((respuesta) => {
          if (respuesta && respuesta.status === 200) {
            Swal.fire(
              "Producto Eliminado",
              `Se ha eliminado el producto ${producto.nombreProducto}`,
              "success"
            );
            obtenerProductos().then((respuesta) => {
              setProductos(respuesta);
            });
          } else {
            Swal.fire(
              "Ha ocurrido un error",
              `No se ha eliminado el producto ${producto.nombreProducto}`,
              "error"
            );
          }
        });
      }
    });
  };
  return (
    <tr>
      {/* <td>{props.producto._id}</td> */}
      <td>{producto.id}</td>
      <td>{producto.nombreProducto}</td>
      <td>{producto.precio}</td>
      <td>{producto.imagen}</td>
      <td>{producto.categoria}</td>
      <td>
        <Link
          className="btn btn-warning"
          to={`/administrador/editar-producto/${producto.id}`}
        >
          Editar
        </Link>
        <Button variant="danger" onClick={eliminarProducto}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
