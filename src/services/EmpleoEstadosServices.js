import { urlBase, http, httpAsset, httpNotToken } from "./Http";
export const index = (page) =>{
    return http().get(`${urlBase}empleo-estados?page=${page}`);
}
export const store = formulario => {
    return http().post(`${urlBase}empleo-estados`, formulario);
}
export const update = (formulario) => {
    return httpAsset().post(`${urlBase}empleo-estados`,formulario);
}
export const changeStatus = id => {
    return http().delete(`${urlBase}empleo-estados/${id}`);
}
export const show = () => {
    return http().get(`${urlBase}empleo-estados`);
}
export const empleoEstadosActivos = () => {
    return http().get(`${urlBase}empleo-estados-activos`);
}

//Web talentos
export const talentosDisponibles = (page) => {
    return httpNotToken().get(`${urlBase}talentos?page=${page}`);
}