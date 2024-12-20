import { urlBase, httpAsset, httpNotToken } from "./Http";

export const datosEmpresa = () => {
	return httpAsset().get(`${urlBase}empresa`);
};

export const editarDatosEmpresa = (formData) => {
	return httpAsset().post(`${urlBase}empresa`, formData);
};

export const datosEmpresaLibre = () => {
	return httpNotToken().get(`${urlBase}empresa`);
};

export const datosCoordenadasEmpresa = ()=>{
	return httpNotToken().get(`${urlBase}coordenadasempresa`)
}