<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i class="fas fa-pencil me-2"></i>Editar Evaluación
          </h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-3">
            <div class="col-12 col-md-6">
              <label for="modulo_id" class="form-label font-weight-bolder text-sm">
                Módulo<span class="text-danger fst-italic">*</span>
              </label>
              <select class="form-select" id="modulo_id" v-model="evaluacion.modulo_id">
                <option value="" disabled>Seleccionar módulo...</option>
                <option v-for="modulo in modulos" :key="modulo.id" :value="modulo.id">
                  {{ modulo.nombre }}
                </option>
              </select>
              <small v-if="!evaluacion.modulo_id" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>Este campo es requerido
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label for="tipo_prueba_id" class="form-label font-weight-bolder text-sm">
                Tipo Prueba<span class="text-danger fst-italic">*</span>
              </label>
              <select class="form-select" id="tipo_prueba_id" v-model="evaluacion.tipo_prueba_id">
                <option value="" disabled>Seleccionar tipo de prueba...</option>
                <option v-for="tipo in tiposPrueba" :key="tipo.id" :value="tipo.id">
                  {{ tipo.nombre }}
                </option>
              </select>
              <small v-if="!evaluacion.tipo_prueba_id" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>Este campo es requerido
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label for="puntaje" class="form-label font-weight-bolder text-sm">
                Puntaje
              </label>
              <input type="text" class="form-control" placeholder="Escriba..." id="puntaje" v-model="evaluacion.puntaje">
              <small v-if="!evaluacion.puntaje || evaluacion.puntaje < 0 || evaluacion.puntaje > 100" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>Puntaje debe ser entre 0 y 100
              </small>
            </div>
            <div class="col-12 text-center">
              <button type="button" class="btn btn-danger me-2" @click="volver">
                <i class="fas fa-reply me-2"></i>Volver
              </button>
              <button type="button" class="btn btn-primary ms-2" @click="guardarEvaluacion" :disabled="!formValido">
                Actualizar<i class="fas fa-save ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { indexModulos, getTiposPruebaService, update, show } from '@/services/EvaluacionesService';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const evaluacionId = ref(route.params.id);
const evaluacion = ref({
  modulo_id: '',
  tipo_prueba_id: '',
  puntaje: ''
});
const modulos = ref([]);
const tiposPrueba = ref([]);

const formValido = computed(() => {
  return evaluacion.value.modulo_id && evaluacion.value.tipo_prueba_id && evaluacion.value.puntaje >= 0 && evaluacion.value.puntaje <= 100;
});

const cargarDatos = async () => {
  try {
    if (evaluacionId.value) {
      const response = await show(evaluacionId.value);
      if (response && response.datos) {
        const data = response.datos;
        evaluacion.value = {
          modulo_id: data.modulo_id || "",
          tipo_prueba_id: data.tipo_prueba_id || "",
          puntaje: data.puntaje || ""
        };
      } else {
        alert("Estructura de respuesta inesperada.");
      }
    }
  } catch (error) {
    const errorMsg = error.response ? error.response.data : error.message;
    alert("Error al cargar los datos: " + errorMsg);
  }
};

const fetchModulos = async () => {
  try {
    const modulosResponse = await indexModulos();
    modulos.value = modulosResponse;
  } catch (error) {
    console.error('Error al obtener módulos:', error);
  }
};

const fetchTiposPrueba = async () => {
  try {
    const tiposPruebaResponse = await getTiposPruebaService();
    tiposPrueba.value = tiposPruebaResponse;
  } catch (error) {
    console.error('Error al obtener tipos de prueba:', error);
  }
};

const fetchData = async () => {
  try {
    await fetchModulos();
    await fetchTiposPrueba();
    await cargarDatos();
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

const guardarEvaluacion = async () => {
  if (!formValido.value) return;

  try {
    if (evaluacionId.value) {
      await update(evaluacionId.value, evaluacion.value); 
      await Swal.fire({
        title: 'Éxito',
        text: 'Evaluación editada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      router.back();
    } else {
      alert('Error: ID de evaluación no encontrado');
    }
  } catch (error) {
    console.error('Error al guardar evaluación:', error);
    await Swal.fire({
      title: 'Error',
      text: 'Error al editar la evaluación: ' ,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
};

const volver = () => {
  if (route.params.registroId) {
    router.push({ name: 'evaluaciones', params: { registroId: route.params.registroId } });
  } else {
    router.back();
  }
};

onMounted(() => {
  fetchData();
});
</script>
