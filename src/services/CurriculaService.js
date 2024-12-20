import { urlBase, http, httpAsset } from "./Http";
export const index = (page, search) => {
    return http().get(`${urlBase}curricula?page=${page}&search=${search}`);
}
export const store = formulario => {
    return httpAsset().post(`${urlBase}curricula-nueva`, formulario);
}
export const update = (id, formulario) => {
    return httpAsset().post(`${urlBase}curricula/${id}`, formulario);
}
export const changeStatusCurricula = id => {
    return http().delete(`${urlBase}curricula/${id}`);
}
export const showCurricula = id => {
    return httpAsset().get(`${urlBase}curricula/${id}`);
}