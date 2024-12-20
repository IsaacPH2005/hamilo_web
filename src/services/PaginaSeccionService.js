import {http, httpAsset, urlBase, httpNotToken} from "./Http";
export const index = formulario => {
    return http().get(`${urlBase}pagina-seccion?pagina=${formulario.pagina}&seccion=${formulario.seccion}`);
};
export const show = id => {
    return http().get(`${urlBase}pagina-seccion/${id}`);
};
export const showPaginaSeccion = formulario => {
    return http().get(`${urlBase}pagina-seccion-ids?pagina=${formulario.pagina}&seccion=${formulario.seccion}`);
};
export const storePaginaSeccion = formulario => {
    return http().post(`${urlBase}pagina-seccion`,formulario);
};
export const updatePaginaSeccion = (idPaginaSeccion,formulario) => {
    return http().put(`${urlBase}pagina-seccion/${idPaginaSeccion}`,formulario);
};
