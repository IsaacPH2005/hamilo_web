<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i :class="idReconocimiento !== ''
              ? 'fa-regular fa-pen-to-square'
              : 'fa-solid fa-plus'
              "></i>
            {{
              idReconocimiento !== ""
                ? "Editar reconocimiento"
                : "Agregar reconocimiento"
            }}
          </h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-3">
            <!-- Título -->
            <div class="col-12 col-md-6">
              <label for="floatingTitulo" class="form-label font-weight-bolder text-sm">
                Título<span class="text-danger">*</span>
              </label>
              <input type="text" class="form-control" id="floatingTitulo" placeholder="Escribe el título aquí..."
                v-model="formulario.titulo" :class="{ 'border-danger': errors.titulo?.length }" />
              <small class="text-danger fst-italic text-xs" v-if="errors.titulo?.length">
                <i class="fas fa-times me-1"></i>{{ errors.titulo[0] }}
              </small>
            </div>

            <!-- Imagen -->
            <div class="col-12 col-md-6">
              <label for="floatingImagen" class="form-label font-weight-bolder text-sm">
                Imagen
              </label>
              <input type="file" class="form-control" id="floatingImagen" name="imagen"
                placeholder="Ingrese una imagen..." accept="image/png, image/jpeg, image/jpg"
                @change="obtenerImagen($event)" />
              <small class="text-danger fst-italic text-xs" v-if="errors.imagen?.length">
                <i class="fas fa-times me-1"></i>{{ errors.imagen[0] }}
              </small>

            </div>

            <!-- Detalle -->
            <div class="col-6 col-md-6">
              <label for="floatingDetalle" class="form-label font-weight-bolder text-sm">
                Detalle
              </label>
              <textarea class="form-control" id="floatingDetalle" v-model="formulario.detalle"
                placeholder="Escribe los detalles..." rows="6" cols="30"></textarea>
              <small class="text-danger fst-italic text-xs" v-if="errors.detalle?.length">
                <i class="fas fa-times me-1"></i>{{ errors.detalle[0] }}
              </small>
            </div>
            <div class="col-6">
              <div class="text-center mt-3">
                <img :src="image" alt="" width="115px" />
              </div>
            </div>

            <!-- Botones -->
            <div class="col-12 text-center mt-4">
              <button type="button" class="btn btn-danger me-2" @click="volver">
                <i class="fas fa-reply me-2"></i>Volver
              </button>
              <button type="button" class="btn ms-2" :class="idReconocimiento !== '' ? 'btn-warning' : 'btn-primary'"
                @click="guardar">
                {{ idReconocimiento !== "" ? "Editar" : "Guardar" }}
                <i class="fas ms-2" :class="idReconocimiento !== '' ? 'fa-pencil' : 'fa-save'"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { show, store, update } from "@/services/ReconocimientosService";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
const formulario = ref({});
const router = useRouter();
const errors = ref({});
const idReconocimiento =
  router.currentRoute.value.params.idReconocimiento || "";
const image = ref(null);
const imagenCambio = ref(false);
const obtenerImagen = (event) => {
  imagenCambio.value = true;
  formulario.value.imagen = event.target.files[0];
  if (formulario.value.imagen != null) {
    const reader = new FileReader();
    reader.onload = (e) => (image.value = e.target.result);
    reader.readAsDataURL(formulario.value.imagen);
  }
};

const verRegistro = async () => {
  formulario.value = { titulo: "", imagen: "", detalle: "" }; // Limpia el formulario
  try {
    const { data } = await show(idReconocimiento);
    formulario.value = {
      titulo: data.datos.titulo,
      imagen: null,
      detalle: data.datos.detalle,
    };
  } catch (error) {
    console.error("Error al cargar los datos: ", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error al cargar los datos. Por favor, inténtelo de nuevo.",
      confirmButtonText: "Aceptar",
    });
  }
};
onMounted(() => {
  if (idReconocimiento) {
    verRegistro();
  }
});
const volver = () => {
  router.push({ path: "/reconocimientos" });
};

const guardar = async () => {
  errors.value = {};
  const formData = new FormData();

  // Verificar que 'titulo' no esté vacío
  if (formulario.value.titulo != null && formulario.value.titulo != "") {
    formData.append("titulo", formulario.value.titulo);
  } else {
    errors.value.titulo = "El título es obligatorio.";
  }
  // Agregar datos del formulario
  formData.append("detalle", formulario.value.detalle);

  // Agregar imagen solo si es una instancia de File
  if (formulario.value.imagen && formulario.value.imagen instanceof File) {
    if (!idReconocimiento || (idReconocimiento && imagenCambio))
      formData.append("imagen", formulario.value.imagen);
  }
  try {
    // Realizar solicitud de creación o actualización
    let response;
    console.log("🚀 ~ guardar ~ idReconocimiento:", idReconocimiento);
    if (idReconocimiento) {
      formData.append("_method", "put"); // Indicar método PUT para actualización
      response = await update(idReconocimiento, formData);
    } else {
      response = await store(formData);
    }

    Swal.fire({
      title: "¡Bien!",
      text: idReconocimiento
        ? "Registro actualizado con éxito."
        : "Registro creado con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    volver();
  } catch (error) {
    // Manejo de errores
    let mensajeError = "Ocurrió un error inesperado.";
    if (error.response) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
        mensajeError = "Errores de validación. Revisa los campos.";
      } else {
        mensajeError = error.response.data.message || mensajeError;
      }
      console.error("Error de la API:", error.response.data);
    } else {
      console.error("Error en la solicitud:", error.message);
    }
    Swal.fire({
      title: "¡Error!",
      text: mensajeError,
      icon: "error",
      confirmButtonText: "Aceptar",
      footer: Object.keys(errors.value).length
        ? "Por favor, revisa los campos en rojo."
        : "",
    });
  }
};
</script>
<style>
/* Estilos específicos del componente */
</style>
