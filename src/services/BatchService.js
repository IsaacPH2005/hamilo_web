import { urlBase, http,httpNotToken, httpAsset } from "./Http";
export const index = (page, search) => {
    return http().get(`${urlBase}batch?page=${page}&search=${search}`);
}
export const store = formulario => {
    return httpAsset().post(`${urlBase}batch-nuevo`, formulario);
}
export const update = (id, formulario) => {
    return httpAsset().post(`${urlBase}batch/${id}`, formulario);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}batch/${id}`);
}
export const show = id => {
    return httpAsset().get(`${urlBase}batch/${id}`);
}
export const batchActivos = () => {
    return httpNotToken().get(`${urlBase}batchs-activos`);
}
export const batchsIndex = () => {
    return http().get(`${urlBase}batchs-total`);
}
export const batchEspecialidad = id => {
    return httpNotToken().get(`${urlBase}batchs-activos/${id}`);
}