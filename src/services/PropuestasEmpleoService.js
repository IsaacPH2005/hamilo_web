import { http, httpAsset, urlBase } from "./Http";

export const mostrarPropuestas = (pagina) => {
    return http().get(`${urlBase}propuestas?page=${pagina}`);
}

export const guardarPropuesta = formulario => {
    return httpAsset().post(`${urlBase}propuestas-empresas`, formulario);
}

export const mostrarPropuestasActivas = pagina => {
    return http().get(`${urlBase}propuestas-activas?page=${pagina}`);
}

export const cambiarEstadoPropuesta = id => {
    return http().delete(`${urlBase}propuestas-empresas/${id}`);
}