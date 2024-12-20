import { urlBase, http} from "./Http";

export const index = (page) => {
    return http().get(`${urlBase}contactanos?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}contactanos`, formulario);
}
export const indexSearchContactos = (datos) => {
	return http().get(`${urlBase}contactanos?search=${datos}`);
}
export const cambiarEstado = id => {
    return http().delete(`${urlBase}contactanos/${id}`);
}