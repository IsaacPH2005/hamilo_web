import { urlBase, http } from './Http.js'
export const iniciarSesion = credenciales => {
    return http().post(`${urlBase}login`, credenciales);
}

export const registroUsuario = datosUsuario => {
    return http().post(`${urlBase}register`, datosUsuario);
}

export const cerrarSesion = () => {
    return http().post(`${urlBase}logout`)
}

export const registroPostulante = datosUsuario => {
    return http().post(`${urlBase}usuario-registro`, datosUsuario);
}
