import { urlBase,http, httpNotToken, httpAsset } from "./Http";
export const index=(page)=>{
    return http().get(`${urlBase}web_beneficios?page=${page}`);
}
export const store=formulario=>{
    return httpAsset().post(`${urlBase}web_beneficios`,formulario);
}
export const cambioEstado=id=>{
    return http().delete(`${urlBase}web_beneficios/${id}`);
} 
export const update=(id, formulario)=>{
    return httpAsset().post(`${urlBase}web_beneficios/${id}`,formulario);
}
export const beneficiosActivos = () => {
	return httpNotToken().get(`${urlBase}web_beneficios-activos`);
}
export const show=id=>{
    return http().get(`${urlBase}web_beneficios/${id}`);
}