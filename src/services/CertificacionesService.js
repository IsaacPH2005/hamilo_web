import { http, urlBase } from "./Http";

// Obtener certificaciones por usuario
export const getAllCertificaciones = (page, searchQuery = '') => {
  return http().get(`${urlBase}certificaciones`, {
    params: {
      page,
      search: searchQuery,
    },
  }).then(response => response.data);
};

// Eliminar certificación
export const deleteCertificacion = (id) => {
  return http().delete(`${urlBase}certificaciones/${id}`)
   
};

// Crear certificación
export const crearCertificacion = (data) => {
  return http().post(`${urlBase}certificaciones`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
};

// Actualizar certificación
export const actualizarCertificacion = (id, data) => {
  return http().post(`${urlBase}certificaciones/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => response.data);
};

export const obtenerCertificacion = (id) => {
  return http().get(`${urlBase}certificaciones/${id}`)
    .then(response => response.data);
};
