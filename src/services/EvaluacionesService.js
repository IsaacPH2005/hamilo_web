import { urlBase, http } from "./Http";

export const indexEvaluaciones = (page) => {
  return http().get(`${urlBase}evaluaciones-activas?page=${page}`);
};

export const store = async (id, evaluacion) => {
  return http().post(`${urlBase}evaluaciones/${id}`,evaluacion);
};

export const update = (id, data) => {
  return http().put(`${urlBase}evaluaciones/${id}`, data);
};

export const estado = (id) => {
    return http().delete(`${urlBase}evaluaciones/${id}`);
};

export const show = async (id) => {
  try {
    const response = await http().get(`${urlBase}evaluaciones/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener evaluación:', error);
    throw error;
  }
};
//usuarios activos
/*export const index3 = (registroId, page) => {
  return http().get(`${urlBase}usuarios-activos?page=${page}`, {
      params: { registroId }
  });
};*/
///para ver los batchs activos 
export const index = () => {
    return http().get(`${urlBase}batch`);
};

export const indexModulos = async () => {
  try {
    const response = await http().get(`${urlBase}modulos-activos`);
    return response.data.datos;
  } catch (error) {
    console.error('Error al obtener módulos:', error);
    throw error;
  }
};
/*export const index2 = (batchId) => {
return http().get(`${urlBase}registros_batch/${batchId}`);
};*/
export const getUsersByBatch = async (batchId, page = 1, searchQuery = '') => {
  try {
    const { data } = await http().get(`${urlBase}registros_batch/${batchId}`, {
      params: {
        page,
        search: searchQuery
      }
    });
    return data;
  } catch (error) {
    console.error('Error fetching users by batch:', error);
    throw error;
  }
};
export const showByRegistroId = async (registroId, pagina) => {
  try {
      const response = await http().get(`${urlBase}evaluaciones-registro/${registroId}`, {
          params: { page: pagina }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching evaluations by registro:', error);
      throw error;
  }
};
export const agregarEvaluacionService = async (registroId, evaluacion) => {
    try {
      const response = await http().post(`${urlBase}evaluaciones`, {
        registro_id: registroId,
        ...evaluacion
      });
      return response.data;
    } catch (error) {
      console.error('Error al agregar evaluación:', error);
      throw error;
    }
  };
  export const getTiposPruebaService = async () => {
    try {
      const response = await http().get(`${urlBase}tipo-pruebas`);
      return response.data.datos.data;
    } catch (error) {
      console.error('Error al obtener tipos de prueba:', error);
      throw error;
    }
  };

  export const getModulosByBatch = async (batchId) => {
    try {
      const { data } = await http().get(`${urlBase}/modulos-por-batch/${batchId}`);
      return data;
    } catch (error) {
      console.error('Error fetching modules by batch:', error);
      throw error;
    }
  };