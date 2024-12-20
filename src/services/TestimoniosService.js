import { http, httpNotToken, urlBase } from "./Http";

export const index = (page) => {
    return http().get(`${urlBase}testimonios?page=${page}`);
};

export const store = (formulario) => {
    return http().post(`${urlBase}testimonios`,formulario);
};

export const  show = id => {
    return http().get(`${urlBase}testimonios/${id}`);
};

export const showActives = (page) => {
    return httpNotToken().get(`${urlBase}testimonios-activas?page=${page}`);
};

export const  update = (id, formulario) => {
    return http().put(`${urlBase}testimonios/${id}`,formulario);
};

export const destroy = id => {
    return http().delete(`${urlBase}testimonios/${id}`);
};

