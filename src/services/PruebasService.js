import { urlBase,http, httpDownload } from "./Http";
export const BuscadorPruebas=(data)=>{
    return http().get(`${urlBase}pruebas-buscador?search=${data}`)
}
export const StorePruebas=(formulario)=>{
    return http().post(`${urlBase}pruebas`,formulario)
}
export const IndexPruebas=(page)=>{
    return http().get(`${urlBase}pruebas?page=${page}`)
}
export const seleccionarPresona=(id)=>{
    return http().get(`${urlBase}pruebas/${id}`)
}
export const ShowPruebasId=(id)=>{
    return http().get(`${urlBase}pruebas/${id}`)
}
export const UpdatePruebasId=(id,formulario)=>{
    return http().put(`${urlBase}pruebas-revision/${id}`,formulario)
}
export const enviarCorreoPruebas=(mensaje)=>{
    return http().post(`${urlBase}enviar-email-pruebas`,mensaje)
}
export const listarEstadoPrueba=(page)=>{
    return http().get(`${urlBase}pruebas-estado?page=${page}`)
}
export const ExportExcelPostulaciones=(id)=>{
    return httpDownload().get(`${urlBase}exportaciones/export/${id}`)
}