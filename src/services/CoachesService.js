import { urlBase, httpNotToken } from "./Http";

export const obtenerDatosCoaches = () => {
	return httpNotToken().get(`${urlBase}coaches`);
};
