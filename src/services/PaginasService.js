import {http, httpAsset, urlBase, httpNotToken} from "./Http";
export const indexPaginas = () => {
    return http().get(`${urlBase}paginas`);
};

export const showPaginaNombre = pagina => {
    return httpNotToken().get(`${urlBase}paginas-nombre?nombre=${pagina}`);
};

export const storePagina = formulario => {
    return http().post(`${urlBase}paginas`,formulario);
};

export const indexPaginasActivas = () => {
    return httpNotToken().get(`${urlBase}paginas-activas`);
};
