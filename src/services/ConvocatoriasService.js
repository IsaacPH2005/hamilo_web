import { urlBase, http, httpAsset } from "./Http";
export const index = (page) => {
    return http().get(`${urlBase}convocatorias?page=${page}`);
}
export const indexSearchConvocatorias = (datos) => {
	return http().get(`${urlBase}convocatorias?search=${datos}`);
}
export const store = formulario => {
    return httpAsset().post(`${urlBase}convocatorias`, formulario);
}
export const update = (id, formulario) => {
    return httpAsset().post(`${urlBase}convocatorias/${id}`, formulario);
}
export const cambiarEstado = id => {
    return http().delete(`${urlBase}convocatorias/${id}`);
}
export const show = id => {
    return httpAsset().get(`${urlBase}convocatorias/${id}`);
}
export const batchActivos = () => {
    return http().get(`${urlBase}batchs-activos`);
}
export const convocatoriasActivos = () => {
    return http().get(`${urlBase}convocatorias-activos`);
}