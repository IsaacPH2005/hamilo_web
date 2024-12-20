import { http, urlBase} from "./Http";

export const index = () => {
    return http().get(`${urlBase}blogs`);
};
export const changeStatus = id => {
    return http().delete(`${urlBase}blogs/${id}`);
};
export const show = id => {
    return http().get(`${urlBase}blogs/${id}`);
};
export const activas = () => {
    return http().get(`${urlBase}blogs-activas`);
};
export const inactivas = () => {
    return http().get(`${urlBase}blogs-inactivas`);
};
export const buscador = (datos) => {
    return http().get(`${urlBase}blogs?search=${datos}`);
}
export const vistas = id => {
    return http().put(`${urlBase}blogs-vistas/${id}`);
}
export const store = formulario =>{
    return http().post(`${urlBase}blogs`, formulario);
}
export const storeResp = formulario =>{
    return http().post(`${urlBase}comentarios`, formulario);
}
export const changeStatusResp = id => {
    return http().delete(`${urlBase}comentarios/${id}`);
};