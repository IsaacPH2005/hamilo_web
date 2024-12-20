import { http, urlBase} from "./Http";
// mostrar todas las redes sociales
export const index = page => {
  return http().get(`${urlBase}redes-sociales?page=${page}`);
}
// guardar nueva red social
export const store = (redSocial) => {
  return http().post(`${urlBase}redes-sociales`, redSocial);
}
// actualizar una red social
export const update = (id,redSocial) => {
  return http().put(`${urlBase}redes-sociales/${id}`, redSocial);
}
// cambiar el estado
export const changeStatus = (id, nuevoEstado) => {
  return http().delete(`${urlBase}redes-sociales/${id}`, { params: { is_deleted: nuevoEstado } });
};


// mostrar un registro
export const show = id => {
  return http().get(`${urlBase}redes-sociales/${id}`);
}
// para mostrar los activos

export const RedesSocialesActivo = () => {
  return http().get(`${urlBase}redes-sociales-activas`);
}