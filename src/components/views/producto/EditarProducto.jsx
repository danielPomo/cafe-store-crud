/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editarProducto, obtenerUnProducto } from "../../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditarProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const { id } = useParams();

  const navegacion = useNavigate();

  useEffect(() => {
    obtenerUnProducto(id).then((respuesta) => {
      setValue("nombreProducto", respuesta.nombreProducto);
      setValue("descripcion", respuesta.descripcion);
      setValue("precio", respuesta.precio);
      setValue("imagen", respuesta.imagen);
      setValue("categoria", respuesta.categoria);
    });
  });

  const onSubmit = (producto) => {
    console.log(producto);
    editarProducto(producto, id).then((respuesta) => {
      if (respuesta && respuesta.status === 200) {
        Swal.fire(
          "Producto editado",
          `El producto ${producto.nombreProducto} se ha editado correctamente`,
          "success"
        );
        reset();
      } else {
        Swal.fire(
          "Error al editar producto",
          `El producto ${producto.nombreProducto} no pudo ser editado`,
          "error"
        );
      }
    });
    navegacion("/");
  };
  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Editar producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "Se debe suministrar un nombre para el producto",
            })}
          />
          <Form.Text className="text-danger">
            {errors.producto?.message}
          </Form.Text>
        </Form.Group>
        <FloatingLabel controlId="floatingTextarea2" label="Description">
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            {...register("descripcion", {
              required: "Se debe especificar los detalles del producto",
              maxlenth: {
                value: 300,
                message: "La descripción debe tener como máximo 300 caracteres",
              },
              minLength: {
                value: 20,
                message: "La descripción debe tener como mínimo 20 caracteres",
              },
            })}
          />
        </FloatingLabel>
        <Form.Text className="text-danger">
          {errors.descripcion?.message}
        </Form.Text>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "Se debe indicar el precio del producto",
              validate: {
                positive: (v) =>
                  parseInt(v) > 0 ||
                  "El precio debe ser un número mayor a cero",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required:
                "Debe proporcionarse una url de imágen para el producto",
              pattern: {
                value: /^(https?:\/\/)?\S+\.(?:png|jpe?g|gif|bmp|svg)$/,
                message: "El texto ingresado no tiene formato de URL",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.url?.message}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            {...register("categoria", {
              required: "Debe elegirse una categoría",
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">Bebida caliente</option>
            <option value="bebida fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default EditarProducto;
