import { urlBase, http, httpNotToken, httpAsset } from "./Http";
export const index = (page) => {
	return http().get(`${urlBase}postulaciones?page=${page}`);
};
export const indexsearch = (formulario) => {
	return http().get(`${urlBase}postulaciones-search?search=${formulario}`);
};
export const store = (formulario) => {
	return http().post(`${urlBase}postulaciones`, formulario);
};
export const show = (id) => {
	return http().get(`${urlBase}postulaciones-show/${id}`);
};
export const destroy = (id, formulario) => {
	return http().put(`${urlBase}postulacionesestado/${id}`, formulario);
};
export const update = (id, formulario) => {
	return http().put(`${urlBase}postulaciones/${id}`, formulario);
};
export const postulacionesIndex = () => {
	return http().get(`${urlBase}postulaciones`);
};
export const verifestado = (formulario) => {
	return http().get(`${urlBase}postulaciones-estado?search=${formulario}`);
};
export const vernopost = () => {
	return http().get(`${urlBase}postulacionesver`);
};
export const mostrarUsuarios = () => {
	return http().get(`${urlBase}postulacionesmostraruser`);
};
export const filtrofases = (formulario, page) => {
	return http().get(`${urlBase}postulaciones-filtro?search=${formulario}&page=${page}`);
};
export const postulacionUsuario = (id, ids) => {
	return http().get(`${urlBase}postulaciones-usuario/${id}/${ids}}`);
};
export const filtrofasesagrupado = () => {
	return http().get(`${urlBase}postulaciones-filtrogroup`);
};
export const filtrofasesagrupadoshow = (id, formulario, page) => {
	return http().get(`${urlBase}postulaciones-groupshow/${id}?search=${formulario}&page=${page}`);
};  
export const indexsearchagrupado = (formulario) => {
	return http().get(`${urlBase}postulaciones-searchagrupado?search=${formulario}`);
};
export const importarexcel = (formulario) => {
	return httpAsset().post(`${urlBase}postulaciones-importar`,formulario);
};

export const storeFormWeb = (formulario) => {
	return http().post(`${urlBase}postulaciones-form-web`, formulario);
};