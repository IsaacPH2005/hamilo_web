import { urlBase, http, httpAsset, httpNotToken } from "./Http";
export const index = (page, search) => {
  return http().get(`${urlBase}especialidad?page=${page}&search=${search}`);
}
export const store = formulario => {
  return httpAsset().post(`${urlBase}especialidad-nueva`, formulario);
}
export const update = (id, formulario) => {
  return httpAsset().post(`${urlBase}especialidad/${id}`, formulario);
}
export const changeStatus = id => {
  return http().delete(`${urlBase}especialidad/${id}`);
}
export const show = id => {
  return httpAsset().get(`${urlBase}especialidad/${id}`);
}
export const especialidadesActivas = (search) => {
  return http().get(`${urlBase}especialidades-activas?search=${search}`);
}
export const especialidadActiva = id => {
  return httpNotToken().get(`${urlBase}especialidades-activas/${id}`);
}
