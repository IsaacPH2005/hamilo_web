import { urlBase, http, httpAsset } from "./Http";


export const listarBatchs = () => {
    return http().get(`${urlBase}batch`);
};

export const listar_users_batch = (id) =>{
    return http().get(`${urlBase}registros_batch_all/${id}`);
} //lista usuarios activos solo activos

export const postulantes_no_registrados = (search,batch_id) =>{
    return http().get(`${urlBase}registros-search?search=${search}&batch_id=${batch_id}`);
}
export const registrar_postulante_api = (form) => {
    return http().post(`${urlBase}nuevo_registro`,form);
}

export const soft_delete_registro= (registro_id) =>{
    return http().get(`${urlBase}eliminar_registro/${registro_id}`);
}

export const listar_registro = (registro_id) =>{
    return http().get(`${urlBase}registro/${registro_id}`);
}
export const update_batch = (registro_id,form) =>{
    return http().put(`${urlBase}actualizar_registro/${registro_id}`,form);
}