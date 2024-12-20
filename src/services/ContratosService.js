import { http, httpAsset, urlBase} from "./Http";
export const index = () => {
    return http().get(`${urlBase}contratos`);    //Muestra todos los contratos del sistema
};

export const contratos_registro = (registro_id) => {
    return http().get(`${urlBase}contratos/${registro_id}`); // Muestra los contratos de un registro q esta asocido a un batch (registro_id)
}

export const agregar_contrato = (form) =>{
    return httpAsset().post(`${urlBase}nuevo_contrato`,form);
}

export const eliminar_contrato_api = (id) =>{
    return http().delete(`${urlBase}destruir_contrato/${id}`);
}

export const contratos_estados = () => {
    return http().get(`${urlBase}estados_contratos`);
}