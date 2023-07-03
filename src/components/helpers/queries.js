/* eslint-disable no-unused-vars */
const URL_usuario = import.meta.env.VITE_API_USUARIO;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(URL_usuario);
    const listaUsuarios = await respuesta.json();
    const usuarioBuscado = listaUsuarios.find(
      (itemUsuario) => itemUsuario.email === usuario.email
    );
    if (!usuarioBuscado) {
      console.log("el mail no existe");
      return null;
    }
    if (usuarioBuscado.password !== usuario.password) {
      console.log("el password es incorrecto");
      return null;
    }
    const { id, email, nombreUsuario } = usuarioBuscado;
    console.log(usuarioBuscado);
    return { id, email, nombreUsuario };
  } catch (error) {
    console.log(error);
  }
};
