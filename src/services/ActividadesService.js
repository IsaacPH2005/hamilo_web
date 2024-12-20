import { http, httpAsset, httpNotToken, urlBase} from "./Http";
export const index = formulario => {
    return http().get(`${urlBase}actividades?search=${formulario.search}&page=${formulario.page}`);
};
export const changeStatus = id => {
    return http().delete(`${urlBase}actividades/${id}`);
};
export const  show = id => {
    return http().get(`${urlBase}actividades/${id}`);
};
export const store = formulario => {
    return httpAsset().post(`${urlBase}actividades`,formulario);
};
export const update = (id,formulario) => {
    return httpAsset().post(`${urlBase}actividades/${id}`,formulario);
};
export const actividadesActivas = () => {
    return httpNotToken().get(`${urlBase}actividades-activas`);
};
export const  showWeb = id => {
    return httpNotToken().get(`${urlBase}actividad/${id}`);
};

 