import { http, httpAsset, urlBase,urlBaseAsset} from "./Http";
// mostrar todos los reconocimientos
export const index=(page,titulo)=>{
  return http().get(`${urlBase}reconocimientos?page=${page}&search=${titulo}`);
}
// guardar nueva red social
export const store = (reconocimientos) => {
  return httpAsset().post(`${urlBase}reconocimientos`, reconocimientos);
}
// actualizar una red social
export const update = (id,reconocimientos) => {
  return httpAsset().post(`${urlBase}reconocimientos/${id}`, reconocimientos);
}
// cambiar el estado
export const changeStatus = (id, nuevoEstado) => {
  return http().delete(`${urlBase}reconocimientos/${id}`, { params: { is_deleted: nuevoEstado } });
};
// mostrar un registro
export const show = id => {
  return http().get(`${urlBase}reconocimientos/${id}`);
}
//mostrar los reconocimientos activos
export const indexActivos =()=>{
  return http().get(`${urlBase}reconocimientos-activos`);
}
