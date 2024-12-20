import { http, urlBase, httpAsset} from "./Http";
export const obtenerSolicitudes = () => {
    return http().get(urlBase+"solicitudes");
}
export const obtenerSolicitudesByUser = (pagina) => {
    return http().get(urlBase+"solicitudes-user?page="+pagina);
}
export const obtenerSolicitud = id => {
    return http().get(urlBase+"solicitudes/"+id);
}
export const postSolicitud = formulario => {
    return httpAsset().post(urlBase+"solicitudes",formulario);
}
export const putSolicitud = (id, formulario) => {
    return http().post(urlBase+"solicitudes/"+id,formulario);
}
export const cambiarEstado = id => {
    return http().delete(urlBase+"solicitudes/"+id);
}
//solicitudes admin
export const buscardorSolicitudes = (dato) => {
    return http().get(urlBase+"solicitudes?buscador="+dato);
}
export const getBuscarSolicitudes = (pagina,url) => {
    return http().get(urlBase+"solicitudes-admin?page="+pagina+'&'+url);
}
//datos para el dashboard
export const getCantidadSolicitudesPorEstado = () => {
    return http().get(urlBase+"solicitud-estados-cantidad");
}
