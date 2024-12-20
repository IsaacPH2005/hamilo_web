import { urlBase, http, httpAsset } from './Http.js';

export const listarModulos = (search, page) => {
    return http().get(`${urlBase}modulos?search=${search}&page=${page}`);
};
export const listarModulosActivos = (search) => {
    return http().get(`${urlBase}modulos-activos?search=${search}`);
};

export const crearModulo = (data) => {
    return httpAsset().post(`${urlBase}modulos`, data);
};

export const obtenerModulo = (id) => {
    return http().get(`${urlBase}modulos/${id}`);
};

export const editarModulo = (id, data) => {
    return httpAsset().post(`${urlBase}modulos/${id}`, data);
};

export const eliminarModulo = (id) => {
    return http().delete(`${urlBase}modulos/${id}`);
};