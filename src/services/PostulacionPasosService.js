import { urlBase, http, httpAsset, httpNotToken } from "./Http";
export const index = (page) => {
    return http().get(`${urlBase}postulacion-pasos?page=${page}`);
}
export const store = formulario => {
    return httpAsset().post(`${urlBase}postulacion-pasos-nuevo`, formulario);
}
export const update = (id, formulario) => {
    return httpAsset().post(`${urlBase}postulacion-pasos/${id}`, formulario);
}
export const show = id => {
    return httpAsset().get(`${urlBase}postulacion-pasos/${id}`);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}postulacion-pasos/${id}`);
}
export const postulacionesActivas=()=>{
	return httpNotToken().get(`${urlBase}postulacion-pasos-activos`);
}
export const buscador = (datos) => {
    return http().get(`${urlBase}postulacion-pasos?search=${datos}`);
}