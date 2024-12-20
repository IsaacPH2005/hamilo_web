<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas fa-users"></i> Estudiantes del Batch {{ batchId }} </h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-2">
            <div class="col-12 col-md-8 d-flex align-items-center">
              <input
                type="search"
                class="form-control me-4"
                placeholder="Buscar Estudiantes..."
                v-model="buscar"
                @input="fetchUsers"
              />
            </div>
            <div class="col-12 col-md-4 text-center">
              <button type="button" class="btn btn-danger me-2" @click="volver"><i class="fas fa-reply me-2"></i>Volver</button>
            </div>
          </div>
          <div class="table-responsive" v-if="usuarios.length > 0">
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
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                  <td class="text-center">
                    <p class="text-sm font-weight-bold">
                      {{ (paginacion.pagina - 1) * paginacion.items_per_page + index + 1 }}
                    </p>
                  </td>
                  <td class="text-center">{{ usuario.users.datos_generales?.nombre }}</td>
                  <td class="text-center">{{ usuario.users.datos_generales?.apellido }}</td>
                  <td class="text-center">
                    <i
                      class="fas fa-eye mx-1 text-info fa-lg fs-5 cursor-pointer"
                      @click="verEvaluaciones(usuario.id)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="col-12">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li
                    class="page-item"
                    :class="{ disabled: paginacion.pagina <= 1 }"
                  >
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
                    <button type="button" class="page-link bg-gray-700 text-white">
                      {{ paginacion.pagina }}
                    </button>
                  </li>
                  <li
                    class="page-item"
                    :class="{ disabled: paginacion.pagina >= paginacion.total }"
                  >
                    <button
                      type="button"
                      class="page-link"
                      aria-label="Next"
                      @click="pagina_siguinte"
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
          </div>
          <div v-if="error" class="alert alert-danger">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getUsersByBatch } from '@/services/EvaluacionesService';

const router = useRouter();
const route = useRoute();
const usuarios = ref([]);
const paginacion = ref({
  total: 1,
  pagina: 1,
  prev_page_url: null,
  next_page_url: null,
  items_per_page: 10,
});
const buscar = ref("");
const error = ref(null);
const loading = ref(true);
const batchId = ref(route.params.batchId);

const fetchUsers = async (page = 1) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await getUsersByBatch(batchId.value, page, buscar.value);
    if (response && response.datos) {
      const { datos } = response;
      if (datos.data) {
        usuarios.value = datos.data;
        paginacion.value = {
          pagina: datos.current_page,
          total: datos.last_page,
          items_per_page: datos.per_page,
        };
      } else {
        error.value = 'No se encontraron datos en la respuesta.';
      }
    } else {
      error.value = 'La respuesta no contiene la propiedad "datos".';
    }
  } catch (err) {
    console.error('Error al solicitar datos:', err);
    error.value = 'Error al solicitar datos.';
  } finally {
    loading.value = false;
  }
};

const verEvaluaciones = (registroId) => {
  router.push(`/evaluaciones/${registroId}`);
};

const pagina_anterior = () => {
  if (paginacion.value.pagina > 1) {
    fetchUsers(paginacion.value.pagina - 1);
  }
};

const pagina_siguinte = () => {
  if (paginacion.value.pagina < paginacion.value.total) {
    fetchUsers(paginacion.value.pagina + 1);
  }
};

const volver = () => {
  router.push('/Evaluaciones-batch');
};

onMounted(() => {
  fetchUsers();
});
</script>