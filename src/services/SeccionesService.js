import {http, httpAsset, urlBase, httpNotToken} from "./Http";
export const indexSecciones = formulario => {
    return http().get(`${urlBase}secciones`);
};
export const storeSeccion = formulario => {
    return http().post(`${urlBase}secciones`,formulario);
};
export const indexSeccionesActivas = formulario => {
    return httpNotToken().get(`${urlBase}secciones-activas`);
};