import { http, urlBase } from "./Http";

export const getAllExperiencias = ( page, searchQuery = '') => {
  return http().get(`${urlBase}experiencias`, {
    params: {
      page,
      search: searchQuery,
    },
  })
};

export const deleteExperiencia = (id) => {
  return http().delete(`${urlBase}experiencias/${id}`)
};

export const crearExperiencia = (data) => {
  return http().post(`${urlBase}experiencias`, data) 
};

export const actualizarExperiencia = (id, data) => {
  return http().put(`${urlBase}experiencias/${id}`, data)
};

export const obtenerExperiencia = (id) => {
  return http().get(`${urlBase}experiencias/${id}`)
};

export const obtenerUsuariosNoEstudiantes = () => {
  return http().get(`${urlBase}usuarios/no-estudiantes`)
};


