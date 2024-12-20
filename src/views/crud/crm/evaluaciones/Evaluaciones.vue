<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="row gy-3">
        <div class="col-12">
          <div class="card border border-0 shadow-lg">
            <div class="card-body">
              <h5 class="card-title font-weight-bolder">
                <i class="fas fa-user"></i>
                {{ usuario?.nombre || 'El usuario no cuenta con evaluaciones registradas' }} 
                {{ usuario?.apellido }}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-2">
            <div class="col-12 col-md-8"></div>
            <div class="col-12 col-md-4">
              <div class="text-center">
                <button type="button" class="btn btn-danger me-2" @click="volver">
                  <i class="fas fa-reply me-2"></i>Volver
                </button>
                <button type="button" class="btn btn-primary" @click="irAgregarEvaluacion" v-if="permisoStore.permisosUser.some(element => element === 'evaluacion crear')">
                  <i class="fas fa-plus-circle me-2"></i> Agregar
                </button>
              </div>
            </div>

            <div class="col-12">
              <div class="table-responsive">
                <table class="table align-items-center justify-content-center text-sm">
                  <thead class="table-gray-personalizado">
                    <tr class="text-white">
                      <th class="text-uppercase font-weight-bolder text-center">Item</th>
                      <th class="text-uppercase font-weight-bolder text-center">Evaluación</th>
                      <th class="text-uppercase font-weight-bolder text-center">Módulo</th>
                      <th class="text-uppercase font-weight-bolder text-center">Puntaje</th>
                      <th class="text-uppercase font-weight-bolder text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(dato, index) in evaluaciones" :key="dato.id">
                      <td class="text-center">
                        <p class="text-sm font-weight-bold">
                          {{
                            (paginacion.pagina - 1) * paginacion.items_per_page + index + 1
                          }}
                        </p>
                      </td>
                      <td class="text-center">{{ dato.tipo_prueba ? dato.tipo_prueba.nombre : 'No Disponible' }}</td>
                      <td class="text-center">{{ dato.modulo ? dato.modulo.nombre : 'No disponible' }}</td>
                      <td class="text-center">{{ dato.puntaje }}</td>
                      <td class="text-center">
                        <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 cursor-pointer" @click="editarEvaluacion(dato.id)"></i>
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
                        <button type="button" class="page-link">
                          {{ paginacion.pagina }}
                        </button>
                      </li>
                      <li
                        class="page-item"
                        :class="{
                          disabled: paginacion.pagina >= paginacion.total,
                        }"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { showByRegistroId } from '@/services/EvaluacionesService';
import { usePermisoStore } from '@/stores/PermisosStore';

const permisoStore = usePermisoStore();
const route = useRoute();
const router = useRouter();

const evaluaciones = ref([]);
const paginacion = ref({
  total: 1,
  pagina: 1,
  prev_page_url: null,
  next_page_url: null,
  items_per_page: 1,
});
const registroId = ref(route.params.registroId);
const usuario = ref({  });

const listar = async () => {
  try {
    const response = await showByRegistroId(registroId.value, paginacion.value.pagina);
    if (response) {
      evaluaciones.value = response.datos || [];
      paginacion.value.total = response.last_page || 1;
      paginacion.value.pagina = response.current_page || 1;
      usuario.value = response.usuario || {  };
    } else {
      console.error('La estructura de la respuesta no es la esperada:', response);
    }
  } catch (error) {
    console.error('Error al listar las evaluaciones:', error);
  }
};

onMounted(() => {
  listar();
});

const irAgregarEvaluacion = () => {
  router.push({ name: 'agregar-evaluacion', params: { registroId: registroId.value } });
};

const editarEvaluacion = (id) => {
  router.push(`/evaluaciones/editar/${id}`);
};
const pagina_anterior = () => {
  if (paginacion.value.pagina > 1) {
    paginacion.value.pagina -= 1;
    listar();
  }
};

const pagina_siguinte = () => {
  if (paginacion.value.pagina < paginacion.value.total) {
    paginacion.value.pagina += 1;
    listar();
  }
};
const volver = () => {
  router.back();
};
</script>
