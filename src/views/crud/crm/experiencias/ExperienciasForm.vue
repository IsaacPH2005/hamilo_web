<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i class="fas fa-pencil me-2"></i>
            {{ editMode ? "Editar Registro" : "Nuevo Registro" }}
          </h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-3">
            <div class="col-12 col-md-6">
  <label for="usuario" class="form-label font-weight-bolder text-sm">
    Usuario<span class="text-danger fst-italic">*</span>
  </label>
  <select
    id="usuario"
    class="form-control"
    v-model="selectedUserId"
  >
    <option value="" disabled>Seleccione un usuario...</option>
    <option
      v-for="user in usuarios"
      :key="user.id"
      :value="user.id"
    >
      {{ user.nombre }} {{ user.apellido }}
    </option>
  </select>
  <small
    v-if="errorMessages.usuario"
    class="text-danger fst-italic text-xs"
  >
    <i class="fas fa-times me-1"></i>{{ errorMessages.usuario }}
  </small>
</div>


            <div class="col-12 col-md-6">
              <label for="nombre" class="form-label font-weight-bolder text-sm">
                Nombre de la Experiencia<span class="text-danger fst-italic"
                  >*</span
                >
              </label>
              <input
                type="text"
                class="form-control"
                :class="{ 'border-danger': errorMessages.nombre }"
                placeholder="Escriba..."
                id="nombre"
                v-model="datos.nombre"
                @input="clearError('nombre')"
              />
              <small
                v-if="errorMessages.nombre"
                class="text-danger fst-italic text-xs"
              >
                <i class="fas fa-times me-1"></i>{{ errorMessages.nombre }}
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label
                for="descripcion"
                class="form-label font-weight-bolder text-sm"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                class="form-control"
                placeholder="Escriba una breve descripción de la experiencia..."
                v-model="datos.descripcion"
                ref="descripcionTextarea"
              ></textarea>
            </div>
            <div class="col-12 col-md-6">
              <label
                for="fechaInicio"
                class="form-label font-weight-bolder text-sm"
              >
                Fecha de Inicio<span class="text-danger fst-italic">*</span>
              </label>
              <input
                type="date"
                class="form-control"
                :class="{ 'border-danger': errorMessages.fechaInicio }"
                id="fechaInicio"
                v-model="datos.fechaInicio"
                @input="clearError('fechaInicio')"
              />
              <small
                v-if="errorMessages.fechaInicio"
                class="text-danger fst-italic text-xs"
              >
                <i class="fas fa-times me-1"></i>{{ errorMessages.fechaInicio }}
              </small>
            </div>

            <div class="col-12 col-md-6">
              <label
                for="fechaFin"
                class="form-label font-weight-bolder text-sm"
              >
                Fecha de Fin
              </label>
              <input
                type="date"
                class="form-control"
                :class="{ 'border-danger': errorMessages.fechaFin }"
                id="fechaFin"
                v-model="datos.fechaFin"
                :disabled="datos.actualidad"
                @input="clearError('fechaFin')"
                v-if="!datos.actualidad"
              />
              <small v-if="datos.actualidad" class="text-muted">
                Actualidad
              </small>
              <small
                v-if="errorMessages.fechaFin"
                class="text-danger fst-italic text-xs"
              >
                <i class="fas fa-times me-1"></i>{{ errorMessages.fechaFin }}
              </small>
              <div class="form-check mt-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="actualidad"
                  v-model="datos.actualidad"
                  @change="onActualidadChange"
                />
                <label class="form-check-label" for="actualidad">
                  Actualidad
                </label>
              </div>
            </div>

            <div class="col-12 text-center">
              <button type="button" class="btn btn-danger me-2" @click="volver">
                <i class="fas fa-reply me-2"></i> Volver
              </button>
              <button
                type="button"
                class="btn btn-primary ms-2"
                @click="guardar"
              >
                <i class="fas fa-save ms-2"></i>
                {{ editMode ? "Actualizar" : "Guardar" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  crearExperiencia,
  obtenerExperiencia,
  actualizarExperiencia,
  obtenerUsuariosNoEstudiantes,
} from "@/services/ExperienciasService";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const datos = ref({
  nombre: "",
  descripcion: "",
  fechaInicio: "",
  fechaFin: "",
  actualidad: false,
});

const errorMessages = ref({});
const editMode = ref(false);
const experienciaId = ref(null);
const usuarios = ref([]);
const selectedUserId = ref(null);

const volver = () => {
  router.push(`/experiencias`);
};

const descripcionTextarea = ref(null);

const ajustarAltura = () => {
  if (descripcionTextarea.value) {
    descripcionTextarea.value.style.height = "auto";
    descripcionTextarea.value.style.height = `${descripcionTextarea.value.scrollHeight}px`;
  }
};

const onActualidadChange = () => {
  if (datos.value.actualidad) {
    datos.value.fechaFin = "";
    errorMessages.value.fechaFin = "";
  }
};

const fetchUsuarios = async () => {
  try {
    const response = await obtenerUsuariosNoEstudiantes();
  
    usuarios.value = response.data.datos || response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

const guardar = async () => {
  errorMessages.value = {};

  if (!datos.value.nombre || !datos.value.fechaInicio || !selectedUserId.value) {
    errorMessages.value.nombre = "Nombre es obligatorio.";
    errorMessages.value.fechaInicio = "Fecha de inicio es obligatoria.";
    errorMessages.value.usuario = "Usuario es obligatorio.";
    return;
  }

  if (!datos.value.actualidad && !datos.value.fechaFin) {
    errorMessages.value.fechaFin =
      "Fecha de fin es obligatoria si no se marca como actualidad.";
    return;
  }

  if (
    datos.value.fechaFin &&
    new Date(datos.value.fechaInicio) > new Date(datos.value.fechaFin)
  ) {
    errorMessages.value.fechaInicio =
      "La fecha de inicio no puede ser posterior a la fecha de fin.";
    return;
  }

  const payload = {
    nombre: datos.value.nombre,
    descripcion: datos.value.descripcion,
    fecha_inicio: datos.value.fechaInicio,
    fecha_fin: datos.value.actualidad ? null : datos.value.fechaFin,
    actualidad: datos.value.actualidad ? 1 : 0,
    user_id: selectedUserId.value, 
  };

  try {
    if (editMode.value) {
      await actualizarExperiencia(experienciaId.value, payload);
      await Swal.fire({
        title: "Éxito",
        text: "Registro modificado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } else {
      await crearExperiencia(payload);
      await Swal.fire({
        title: "Éxito",
        text: "Registro guardado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
    router.push(`/experiencias`);
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errorMessages.value = error.response.data.errors;
    } else {
      await Swal.fire({
        title: "Error",
        text:
          "Error al guardar la experiencia: " +
          (error.message || "Desconocido"),
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }
};

const clearError = (field) => {
  if (errorMessages.value[field]) {
    errorMessages.value[field] = "";
  }
};

const cargarDatos = async () => {
  if (route.params.id) {
    editMode.value = true;
    experienciaId.value = route.params.id;
    try {
      const response = await obtenerExperiencia(experienciaId.value);

      if (response && response.data) {
        const data = response.data.datos;  
        datos.value = {
          nombre: data.nombre || "",
          descripcion: data.descripcion || "",
          fechaInicio: data.fecha_inicio || "",
          fechaFin: data.fecha_fin || "",
          actualidad: !data.fecha_fin, 
        };
        selectedUserId.value = data.user_id || null;
       
      } else {
        console.error("Estructura de respuesta inesperada:", response);
        alert("Estructura de respuesta inesperada.");
      }
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      alert("Error al cargar los datos: " + (error.message || "Desconocido"));
    }
  } else {
    editMode.value = false;
  }
};





onMounted(() => {
  cargarDatos();
  fetchUsuarios();
});
</script>

<style></style>