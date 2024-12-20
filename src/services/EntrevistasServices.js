import { urlBase, http, httpNotToken } from "./Http";
export const indexentrevistas = () => {
	return http().get(`${urlBase}entrevistas`,);
};
export const showentrevistas = (id) => {
	return http().get(`${urlBase}entrevistas-show/${id}`);
};
export const store = (formulario) => {
	return http().post(`${urlBase}entrevistas`, formulario);
};
export const cambiarEstadoAgregarARegistros = (id, formulario) => {
	return http().put(`${urlBase}entrevista-aprobar/${id}`, formulario);
}
export const update = (id, formulario) => {
    return http().put(`${urlBase}entrevistas/${id}`, formulario);
}