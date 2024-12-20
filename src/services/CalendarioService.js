import { http, httpDownload, urlBase} from "./Http";
export const index = () => {
    return http().get(`${urlBase}calendario`);
};
export const view = param => {
    return http().get(`${urlBase}calendario/${param}`);
};
export const downloadExcel = () => {
    return httpDownload().get(`${urlBase}download-plantilla`);
};