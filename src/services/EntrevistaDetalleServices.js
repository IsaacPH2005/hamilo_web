import { urlBase, http, httpNotToken } from "./Http";
export const indexentrevista = () => {
	return http().get(`${urlBase}entrevistadetalle`);
};
export const store = (formulario) => {
	return http().post(`${urlBase}entrevistadetalle`, formulario);
};
export const showentrevista = (id) => {
	return http().get(`${urlBase}entrevistadetalle-show/${id}`);
};
export const entrevistadores = (page) => {
	return http().get(`${urlBase}entrevistadetalleentrevistadores?page=${page}`);
};
export const postulantes = (page) => {
	return http().get(`${urlBase}entrevistadetallepostulantes?page=${page}`);
};
export const postulantesearch = (formulario) => {
	return http().get(`${urlBase}entrevistapostulante-search?search=${formulario}`);
};
export const entrevistasearch = (formulario) => {
	return http().get(`${urlBase}entrevistaentrevista-search?search=${formulario}`);
};
export const showentrevista2 = (id) => {
	return http().get(`${urlBase}entrevista-detalle2/${id}`);
};
