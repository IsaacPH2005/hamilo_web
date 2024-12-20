import { http, httpAsset, urlBase } from "./Http";

export const mostrarUsuario = id => {
    return http().get(`${urlBase}usuario/${id}`);
}

export const actualizarCredenciales = (formulario) => {
    return http().put(`${urlBase}usuario`, formulario);
}

export const actualizarCredencialesAdmin = (id, formulario) => {
    return http().put(`${urlBase}usuario/${id}`, formulario);
}

export const actualizarDatosGenerales = formulario => {
    return httpAsset().post(`${urlBase}datos-generales`, formulario);
}

export const actualizarDatosGeneralesAdmin = (id, formulario) => {
    return httpAsset().post(`${urlBase}datos-generales/${id}`, formulario);
}

export const mostrarUsuariosPaginados = (pagina, busqueda) => {
    return http().get(`${urlBase}usuario?page=${pagina}&search=${busqueda}`);
}

export const borrarUsuario = (id) => {
    return http().delete(`${urlBase}usuario/${id}`);
}

export const mostrarUsueriosActivos = () => {
    return http().get(`${urlBase}usuarios-activos`);
}

//Servicio Obtener permisos
export const obtenerPermisos = () => {
    return http().get(`${urlBase}usuario-permiso`);
}

export const registroUsuarioRol = formulario => {
    return http().post(`${urlBase}usuario`, formulario);
}