/* eslint-disable no-unused-vars */
// const URL_usuario = import.meta.env.VITE_API_USUARIO;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch("http://localhost:3004/usuarios");
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
    return usuarioBuscado;
  } catch (error) {
    console.log(error);
  }
};
