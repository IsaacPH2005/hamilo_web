import { http, urlBase } from "./Http";

export const mostrarRoles = () => {
    return http().get(`${urlBase}roles`);
}

export const mostrarPermisos = () => {
    return http().get(`${urlBase}permisos`);
}

export const agregarRol = (formulario) => {
    return http().post(`${urlBase}roles-permisos`, formulario);
}

export const eliminarRol = (id) => {
    return http().delete(`${urlBase}roles/${id}`);
}

export const mostrarRolConPermisos = (id) => {
    return http().get(`${urlBase}rol-permisos/${id}`);
}

export const actualizarRolConPermisos = (id, formulario) => {
    return http().put(`${urlBase}roles/${id}`, formulario);
}

export const mostrarRolesUsuario = (id) => {
    return http().get(`${urlBase}user/roles/${id}`);
}

export const asignarRolesUsuario = (formulario) => {
    return http().post(`${urlBase}user/roles`, formulario);
}