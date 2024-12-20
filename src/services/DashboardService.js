import { urlBase, http } from './Http.js';

export const listarPostulantesFases = () => {
    return http().get(`${urlBase}dashboard/educacion`);
};
// export const listar
export const getCantidadEstudiantes = () => {
    return http().get(urlBase + "usuarios-estudiantes");
}
export const getEstudiantesXBatch = () => {
    return http().get(urlBase + "estudiantes-batch");
}
export const getNroSolicitudes = () => {
    return http().get(urlBase + "solicitudes-nro");
}
// get simple data or direct for charts 
export const totalPostulantesService = () => {
    return http().get(`${urlBase}dashboard/edu-totalPostulantes`);
};
export const totalEstudiantesService = () => {
    return http().get(`${urlBase}dashboard/edu-totalEstudiantes`);
};
export const obtenerBatchesService = () => {
    return http().get(`${urlBase}dashboard/edu-obtenerBatches`);
};
export const postulantesPorBatchService = () => {
    return http().get(`${urlBase}dashboard/edu-postulantesPorBatch`);
};
export const estudiantesPorBatchService = () => {
    return http().get(`${urlBase}dashboard/edu-estudiantesPorBatch`);
};
