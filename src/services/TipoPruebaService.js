import { urlBase,http } from "./Http";
export const storeTipoPruebas=(data)=>{
    return http().post(`${urlBase}tipo-pruebas`,data)
}
export const indexTipoPruebas=(page)=>{
    return http().get(`${urlBase}tipo-pruebas?page=${page}`)
}
export const showTipoPruebas=(id)=>{
    return http().get(`${urlBase}tipo-pruebas/${id}`)
}
export const updateTipoPruebas=(id,formulario)=>{
    return http().put(`${urlBase}tipo-pruebas/${id}`,formulario)
}
export const destroyTipoPruebas=(id)=>{
    return http().delete(`${urlBase}tipo-pruebas/${id}`)
}
export const obtenerTodosTiposPruebas=()=>{
    return http().get(`${urlBase}tipo-pruebas-total`)
}
export const buscadorTipoPruebas=(data)=>{
    return http().get(`${urlBase}tipo-pruebas-buscador?search=${data}`)
}