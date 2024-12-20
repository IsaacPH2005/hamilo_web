import {http, httpAsset, urlBase} from "./Http";
export const showImagenesPaginaSeccion = idPaginaSeccion => {
    return http().get(`${urlBase}paginas-imagenes-seccion/${idPaginaSeccion}`);
};
export const deleteImagen = idImagen => {
    return http().delete(`${urlBase}paginas-imagen/${idImagen}`);
};
export const changeStatusImagen = idImagen => {
    return http().delete(`${urlBase}paginas-imagenes/${idImagen}`);
};
export const storeImagePaginaSeccion = (idPaginaSeccion,formulario) => {
    return httpAsset().post(`${urlBase}paginas-imagenes/${idPaginaSeccion}`,formulario);
};