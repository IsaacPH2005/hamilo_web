<template>
    <div class="row gy-3">
      <div class="col-12">
        <div class="card border border-0 shadow-lg">
          <div class="card-body">
            <h5 class="card-title font-weight-bolder">
              <i class="fas fa-users"></i> Egresados
            </h5>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card shadow-lg">
          <div class="card-body">
            <div class="row gy-2">
              <div class="col-12">
                <div class="input-group">
                  <span class="input-group-text" id="addon-wrapping">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Buscar Egresados..."
                    aria-label="Buscar Egresados"
                    aria-describedby="addon-wrapping"
                    v-model="buscar"
                    @input="fetchUsuariosEgresados"
                  />
                </div>
                <div class="table-responsive" v-if="usuariosEgresados.length > 0">
                  <table class="table align-items-center justify-content-center text-sm">
                    <thead class="table-gray-personalizado">
                      <tr class="text-white">
                        <th class="text-uppercase font-weight-bolder text-center">Item</th>
                        <th class="text-uppercase font-weight-bolder text-center">Nombre</th>
                        <th class="text-uppercase font-weight-bolder text-center">Apellido</th>
                        <th class="text-uppercase font-weight-bolder text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(usuario, index) in usuariosEgresados" :key="usuario.id">
                        <td class="text-center">
                          <p class="text-sm font-weight-bold">
                            {{ (paginacion.pagina - 1) * paginacion.items_per_page + index + 1 || 'N/A' }}
                          </p>
                        </td>
                        <td class="text-center">{{ usuario.datos_generales?.nombre }}</td>
                        <td class="text-center">{{ usuario.datos_generales?.apellido }}</td>
                        <td class="text-center">
                          <div class="btn-group btn-group-sm">
                            <button
                              class="btn btn-info btn-xs"
                              @click="cambioRol(usuario.id, 'egresado')"
                            >
                              <i class="fa-solid fa-arrows-rotate"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="col-12">
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: paginacion.pagina <= 1 }">
                          <button
                            type="button"
                            class="page-link"
                            aria-label="Previous"
                            @click="pagina_anterior"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        <li class="page-item">
                          <button type="button" class="page-link">
                            {{ paginacion.pagina }}
                          </button>
                        </li>
                        <li class="page-item" :class="{ disabled: paginacion.pagina >= paginacion.total }">
                          <button
                            type="button"
                            class="page-link"
                            aria-label="Next"
                            @click="pagina_siguiente"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <p>No se encuentran datos disponibles</p>
                  <button type="button" class="btn btn-danger me-2" @click="volver">
                    <i class="fas fa-reply me-2"></i> Volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { obtenerUsuariosEgresados } from '@/services/EgresadosService';
  import Swal from 'sweetalert2';
  
  const usuariosEgresados = ref([]);
  const paginacion = ref({
    total: 1,
    pagina: 1,
    items_per_page: 10,
  });
  const buscar = ref("");
  const error = ref(null);
  const loading = ref(true);
  
  const fetchUsuariosEgresados = async (page = 1) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await obtenerUsuariosEgresados(page, buscar.value);
      console.log('Datos de egresados obtenidos:', response.data);
  
      if (response && response.data && response.data.datos) {
        usuariosEgresados.value = response.data.datos;
        paginacion.value = {
          pagina: response.data.current_page || 1,
          total: response.data.last_page || 1,
          items_per_page: response.data.per_page || 10,
        };
      } else {
        error.value = 'No se encontraron datos en la respuesta.';
      }
    } catch (err) {
      console.error('Error al solicitar datos:', err);
      error.value = 'Error al solicitar datos.';
    } finally {
      loading.value = false;
    }
  };
  
  const cambioRol = async (usuarioId, rol) => {
    
    console.log('Cambiar rol para el usuario ID:', usuarioId, 'Rol:', rol);
  };
  
  const pagina_anterior = () => {
    if (paginacion.value.pagina > 1) {
      fetchUsuariosEgresados(paginacion.value.pagina - 1);
    }
  };
  
  const pagina_siguiente = () => {
    if (paginacion.value.pagina < paginacion.value.total) {
      fetchUsuariosEgresados(paginacion.value.pagina + 1);
    }
  };
  
  const volver = () => {
    router.push('/alguna-ruta'); 
  };
  
  onMounted(() => {
    fetchUsuariosEgresados();
  });
  
  watch(buscar, () => {
    fetchUsuariosEgresados();
  });
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  