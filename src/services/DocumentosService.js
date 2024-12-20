import { http, httpAsset, urlBase} from "./Http";

export const index = () => {
    return http().get(`${urlBase}documentos`);    //Muestra todos los contratos del sistema
};

export const agregar_documento = (form) =>{
    return httpAsset().post(`${urlBase}nuevo_documento`,form);
}

export const eliminar_documento_api = (id) =>{
    return http().delete(`${urlBase}destruir_documento/${id}`);
}

export const documentos_registro = (registro_id) => {
    return http().get(`${urlBase}documentos_registro/${registro_id}`); // Muestra los docuemntos de un registro q esta asocido a un batch (registro_id)
}