import { http, urlBase,  httpAsset, httpNotToken} from "./Http";

export const index = (page) => {
    return http().get(`${urlBase}modelos?page=${page}`);
};
export const  modelosActivos = () => {
    return httpNotToken().get(`${urlBase}modelos-disponibles`);
};
export const update = (id, formulario) => {
    return httpAsset().post(`${urlBase}modelos/${id}`, formulario);
};
export const store = formulario => {
    return httpAsset().post(`${urlBase}modelos`, formulario);
}
export const show = id => {
    return http().get(`${urlBase}modelos/${id}`);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}modelos/${id}`);
};
export const datosModeloAprendisaje = () => {
	return httpNotToken().get(`${urlBase}modelos-disponibles`);
};
