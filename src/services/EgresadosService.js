import { urlBase, http } from "./Http";

export const obtenerUsuariosEstudiantes = (batchId, page = 1, search = "") => {
  return http().get(`${urlBase}registros_batch_estudiantes/${batchId}?page=${page}&search=${search}`);
};

export const cambiarRolUsuario = (usuarioId, rol_name) => {
  // Cambia el nombre del parámetro enviado para que coincida con lo que el backend espera
  return http().post(`${urlBase}cambiar-rol/${usuarioId}`, { rol_name });
};

export const obtenerUsuariosEgresados = () => {
  return http().get(`${urlBase}usuarios-egresados`);
};
export const evaluacionesImagen = () => {
  return http().get(`${urlBase}evaluacionesImagen`);
};
