import { urlBase, http, httpAsset } from './Http.js';

export const listarTecnologias = (search, page) => {
    return http().get(`${urlBase}tecnologias?search=${search}&page=${page}`);
};
export const listarTecnologiasActivas = (search) => {
    return http().get(`${urlBase}tecnologias-activas?search=${search}`);
};

export const crearTecnologia = (data) => {
    return httpAsset().post(`${urlBase}tecnologias`, data);
};

export const obtenerTecnologia = (id) => {
    return http().get(`${urlBase}tecnologias/${id}`);
};

export const editarTecnologia = (id, data) => {
    return httpAsset().post(`${urlBase}tecnologias/${id}`, data);
};

export const eliminarTecnologia = (id) => {
    return http().delete(`${urlBase}tecnologias/${id}`);
};