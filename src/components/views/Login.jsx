/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Form, Button, Container, Card } from "react-bootstrap";
import { login } from "../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (usuario) => {
    login(usuario).then((res) => {
      if (res) {
        sessionStorage.setItem("usuario", JSON.stringify(res));
        setUsuarioLogueado(res);
      } else {
        Swal.fire(
          "Ocurrió un error",
          "Alguno de los datos ingresados no es correcto",
          "error"
        );
      }
    });
  };
  return (
    <Container className="mainSection">
      <Card className="my-5">
        <Card.Header as="h5">Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese un email"
                {...register("email", {
                  required: "El campo email es requerido",
                  pattern: {
                    value:
                      /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                    message: "El correo ingresado no tiene formato de email",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "El campo password es obligatorio",
                  pattern: {
                    value: /^(?=.*[a-zA-Z0-9])(?=.*[@#$%^&+=])(?=.{8,20}$).*/,
                    message:
                      "La contraseña debe tener entre 8 y 20 caracteres, alfanuméricos y especiales",
                  },
                })}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
