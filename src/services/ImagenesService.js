import { http, httpAsset, urlBase} from "./Http";
export const storeImageActividad = (idActividad,formulario) => {
    return httpAsset().post(`${urlBase}imagenes/${idActividad}`,formulario);
};
export const changeStatusImage = (idImagen) => {
    return http().delete(`${urlBase}imagenes/${idImagen}`);
};
export const deleteImage = (idImagen) => {
    return http().delete(`${urlBase}imagen/${idImagen}`);
};
export const updateImage = (idImagen, formulario) => {
    return httpAsset().post(`${urlBase}imagenes/${idImagen}`,formulario);
};
export const indexImagenes = (idActividad) => {
    return http().get(`${urlBase}imagenes/${idActividad}`);
};
export const showImage = (id) => {
    return http().get(`${urlBase}imagen/${id}`);
};