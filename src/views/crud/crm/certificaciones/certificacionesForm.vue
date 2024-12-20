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
              <select id="usuario" class="form-control" v-model="selectedUserId" @change="clearError('user_id')">
                <option value="" disabled>Seleccione un usuario...</option>
                <option v-for="user in usuarios" :key="user.id" :value="user.id">
                  {{ user.nombre }} {{ user.apellido }}
                </option>
              </select>
              <small v-if="errorMessages.user_id" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>{{ errorMessages.user_id }}
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label for="nombre" class="form-label font-weight-bolder text-sm">
                Nombre de la certificación<span class="text-danger fst-italic">*</span>
              </label>
              <input type="text" class="form-control" :class="{ 'border-danger': errorMessages.nombre }"
                placeholder="Escriba..." id="nombre" v-model="datos.nombre" @input="clearError('nombre')" />
              <small v-if="errorMessages.nombre" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>
                {{ Array.isArray(errorMessages.nombre) ? errorMessages.nombre[0] : errorMessages.nombre }}
              </small>
            </div>
            <div class="col-12 col-md-6">
              <label for="file" class="form-label font-weight-bolder text-sm">
                Cargar Archivo
              </label>
              <input type="file" class="form-control" id="file" ref="fileInput" @change="handleFileChange" />
              <small v-if="errorMessages.file" class="text-danger fst-italic text-xs">
                <i class="fas fa-times me-1"></i>{{ errorMessages.file }}
              </small>
            </div>
            <div class="col-12 text-center">
              <button type="button" class="btn btn-danger me-2" @click="volver">
                <i class="fas fa-reply me-2"></i> Volver
              </button>
              <button type="button" class="btn btn-primary ms-2" @click="guardar">
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
  crearCertificacion,
  obtenerCertificacion,
  actualizarCertificacion,
} from "@/services/CertificacionesService";
import {
  obtenerUsuariosNoEstudiantes,
} from "@/services/ExperienciasService";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
const datos = ref({
  nombre: "",
  storage_url: "",
});
const errorMessages = ref({});
const editMode = ref(false);
const certificacionId = ref(null);
const fileInput = ref(null);
const file = ref(null);
const usuarios = ref([]);
const selectedUserId = ref(null);

const volver = () => {
  router.push(`/certificaciones`);
};

const handleFileChange = (event) => {
  const fileList = event.target.files;
  file.value = fileList.length > 0 ? fileList[0] : null;
};

const guardar = async () => {
  errorMessages.value = {};

  if (!selectedUserId.value) {
    errorMessages.value.user_id = "Debe seleccionar un usuario.";
  }
  if (!datos.value.nombre) {
    errorMessages.value.nombre = "El nombre de la certificación es requerido.";
  }

  if (Object.keys(errorMessages.value).length > 0) {
    return;
  }

  try {
    const formData = new FormData();
    formData.append("nombre", datos.value.nombre);
    formData.append("user_id", selectedUserId.value);
    if (file.value) {
      formData.append("storage_url", file.value);
    }

    if (editMode.value) {
      await actualizarCertificacion(certificacionId.value, formData);
      await Swal.fire({
        title: "Éxito",
        text: "Registro modificado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } else {
      await crearCertificacion(formData);
      await Swal.fire({
        title: "Éxito",
        text: "Registro guardado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }

    router.push(`/certificaciones`);
  } catch (error) {
    console.error("Error completo:", error);

    if (error.response && error.response.data) {
      if (error.response.data.errors) {
        errorMessages.value = error.response.data.errors;
      } else {
        await Swal.fire({
          title: "Error",
          text: `Error al guardar la certificación: ${error.response.data.message || "Desconocido"}`,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } else {
      await Swal.fire({
        title: "Error",
        text: "Error al conectar con el servidor. Por favor, inténtelo de nuevo más tarde.",
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

const fetchUsuarios = async () => {
  try {
    const response = await obtenerUsuariosNoEstudiantes();
    usuarios.value = response.data.datos || response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

const cargarDatos = async () => {
  if (route.params.id) {
    editMode.value = true;
    certificacionId.value = route.params.id;

    try {
      const response = await obtenerCertificacion(certificacionId.value);
      if (response && response.datos && response.datos.certificacion) {
        datos.value.nombre = response.datos.certificacion.nombre || "";
        selectedUserId.value = response.datos.certificacion.user_id || null;
      } else {

        console.error("Datos de certificación no encontrados en la respuesta.");
        alert("Datos de certificación no encontrados en la respuesta.");
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
