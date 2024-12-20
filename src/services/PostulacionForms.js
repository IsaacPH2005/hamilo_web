import { urlBase, http } from "./Http";
 
export const index = (order, page) => {
  return http().get(`${urlBase}postulacion/${order}?page=${page}`);
};
export const indexsearch = (formulario) => {
  return http().get(`${urlBase}postulacion-search`, formulario);
};
export const store = (formulario) => {
  return http().post(`${urlBase}postulacion`, formulario);
};
export const show = (id) => {
  return http().get(`${urlBase}postulacion-show/${id}`);
};
export const destroy = (id) => {
  return http().delete(`${urlBase}postulacion/${id}`);
};
export const update = (id, formulario) => {
  return http().put(`${urlBase}postulacion/${id}`, formulario);
}; 
export const storeweb = (formulario) => {
  return http().post(`${urlBase}postulacion`, formulario);
};