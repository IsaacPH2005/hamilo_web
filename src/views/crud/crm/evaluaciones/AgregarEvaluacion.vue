<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas fa-pencil me-2"></i>Nueva Evaluación</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-3">
            <div class="col-12 col-md-6">
              <label for="modulo_id" class="form-label font-weight-bolder text-sm">Módulo
                <span class="text-danger fst-italic">*</span>
              </label>
              <select class="form-select" id="modulo_id" v-model="evaluacion.modulo_id">
                <option value="" disabled>Seleccionar módulo...</option>
                <option v-for="modulo in modulos" :key="modulo.id" :value="modulo.id">
                  {{ modulo.nombre }}
                </option>
              </select>
              <small v-if="submitAttempted && !evaluacion.modulo_id" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>Este campo es requerido
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label for="tipo_prueba_id" class="form-label font-weight-bolder text-sm">Tipo Prueba
                <span class="text-danger fst-italic">*</span>
              </label>
              <select class="form-select" id="tipo_prueba_id" v-model="evaluacion.tipo_prueba_id">
                <option value="" disabled>Seleccionar tipo de prueba...</option>
                <option v-for="tipo in tiposPrueba" :key="tipo.id" :value="tipo.id">
                  {{ tipo.nombre }}
                </option>
              </select>
              <small v-if="submitAttempted && !evaluacion.tipo_prueba_id" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>Este campo es requerido
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label for="puntaje" class="form-label font-weight-bolder text-sm">Puntaje
                <span class="text-danger fst-italic">*</span>
              </label>
              <input type="number" class="form-control" placeholder="Escriba..." id="puntaje" v-model="evaluacion.puntaje">
              <small v-if="submitAttempted && puntajeInvalido" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>Puntaje debe estar entre 0 y 100
              </small>
            </div>
            <div class="col-12 text-center">
              <button type="button" class="btn btn-danger me-2" @click="volver">
                <i class="fas fa-reply me-2"></i>Volver
              </button>
              <button type="button" class="btn btn-primary ms-2" @click="agregarEvaluacion">
                Guardar<i class="fas fa-save ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { indexModulos, getTiposPruebaService, store } from '@/services/EvaluacionesService';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const registroId = ref(route.params.registroId);
const submitAttempted = ref(false); // Nueva variable para controlar si se ha intentado enviar el formulario

const evaluacion = ref({
  modulo_id: '',
  tipo_prueba_id: '',
  puntaje: ''
});

const modulos = ref([]);
const tiposPrueba = ref([]);

const puntajeInvalido = computed(() => {
  const puntaje = Number(evaluacion.value.puntaje);
  return isNaN(puntaje) || puntaje < 0 || puntaje > 100;
});

const formInvalido = computed(() => {
  return !evaluacion.value.modulo_id || !evaluacion.value.tipo_prueba_id || puntajeInvalido.value;
});

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
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

const agregarEvaluacion = async () => {
  submitAttempted.value = true; // Se establece en true cuando se intenta enviar el formulario

  if (formInvalido.value) {
    await Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos correctamente.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  try {
    await store(registroId.value, evaluacion.value);
    await Swal.fire({
      title: 'Éxito',
      text: 'Evaluación agregada correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    router.push({ name: 'evaluaciones', params: { registroId: registroId.value } });
  } catch (error) {
    console.error('Error al agregar evaluación:', error);
    await Swal.fire({
      title: 'Error',
      text: 'Error al agregar evaluación',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
};

const volver = () => {
  router.push({ name: 'evaluaciones', params: { registroId: registroId.value } });
};

onMounted(() => {
  fetchData();
});
</script>
