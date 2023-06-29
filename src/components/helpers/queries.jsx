/* eslint-disable no-unused-vars */
const URL_usuario = import.meta.env.VITE_API_USUARIO;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(URL_usuario);
    console.log(respuesta);
    const listaUsuarios = await respuesta.json();
    console.log(listaUsuarios);
    const usuarioBuscado = listaUsuarios.find(
      (itemUsuario) => itemUsuario.email === usuario.email
    );
    if (usuarioBuscado) {
      if (usuarioBuscado.password === usuario.password) {
        return usuarioBuscado;
      } else {
        console.log("El password es incorrecto");
        return null;
      }
    } else {
      console.log("el mail no exister");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
