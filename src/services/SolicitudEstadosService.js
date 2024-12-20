import { http, urlBase } from "./Http";
export const getSolicitudEstados = (pagina) => {
    return http().get(urlBase+"solicitud-estados?page="+pagina);
}
export const addSolicitudEstado = formulario => {
    return http().post(urlBase+"solicitud-estados",formulario);
}
export const deleteSolicitudEstado = (id) => {
    return http().delete(urlBase+"solicitud-estados/"+id);
}
export const editarSolicitudEstado = (id,fomulario) => {
    return http().put(urlBase+"solicitud-estados/"+id,fomulario);
}
export const getSolicitudEstado = (id) => {
    return http().get(urlBase+"solicitud-estados/"+id);
}
export const getSolicitudEstadosActivos = () => {
    return http().get(urlBase+"solicitud-estados-activos");
}