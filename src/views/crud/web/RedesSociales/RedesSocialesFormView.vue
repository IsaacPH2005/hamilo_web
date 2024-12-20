<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas me-2"
              :class="idRedesSociales !== '' ? 'fa-pencil' : 'fa-save'"></i>{{ idRedesSociales !== '' ?
                'EditarRegistro' :'Nuevo Registro' }}</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="row gy-3">
                    <div class="col-12 col-md-6">
                      <label for="floatingNombre" class="form-label font-weight-bolder text-sm">Nombre<span
                          class="text-danger">*</span></label>
                      <input type="url" class="form-control" id="floatingNombre" v-model="formulario.nombre"
                        placeholder="Escriba un nombre..." />
                      <small class="text-danger fst-italic text-xs" v-if="errors.nombre?.length">
                        <i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}
                      </small>
                    </div>
                    <!-- Url -->
                    <div class="col-12 col-md-6">
                      <label for="floatingUrl" class="form-label font-weight-bolder text-sm">Url de la Red Social<span
                          class="text-danger">*</span></label>
                      <input type="url" class="form-control" id="floatingUrl" v-model="formulario.url"
                        placeholder="Escriba una url..." />
                      <small class="text-danger fst-italic text-xs" v-if="errors.url?.length">
                        <i class="fas fa-times me-1"></i>{{ errors.url[0] }}
                      </small>
                    </div>

                    <!-- Imagen -->
                    <div class="col-12 col-md-6">
                      <button class="btn btn-secondary" type="button" id="iconSelectButton" @click="openIconModal()">
                        <i class="fa-regular fa-image"></i> Elegir icono
                      </button>

                    </div>
                    <div class="row">
                      <div class="col-12 col-md-6 text-center">
                        <!-- Mostrar el icono seleccionado -->
                        <i :class="formulario.logo_img" class="fa-4x"></i>
                        <p class="text-success fst-italic">{{ formulario.logo_img }}</p>
                      <small class="text-danger fst-italic text-xs" v-if="errors.logo_img?.length">
                        <i class="fas fa-times me-1"></i>{{ errors.logo_img[0] }}
                      </small>
                      </div>
                    </div>


                    <!-- Botones -->
                    <div class="col-12 text-center">
                      <button type="button" class="btn btn-danger me-2" @click="volver">
                        <i class="fas fa-reply me-2"></i> Volver
                      </button>
                      <button type="button" class="btn ms-2"
                        :class="idRedesSociales !== '' ? 'btn-warning' : 'btn-primary'" @click="guardar">
                        {{ idRedesSociales !== '' ? 'Editar' : 'Guardar' }}
                        <i class="fas ms-2" :class="idRedesSociales !== '' ? 'fa-pencil' : 'fa-save'"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------- Modal ------------------->
          <!-- Modal para seleccionar íconos -->
          <div class="modal fade" id="iconModal" tabindex="-1" aria-labelledby="iconModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="iconModalLabel"><i class="fa-solid fa-icons"></i> Selecciona un ícono</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-light">
                  <div class="row text-center">
                    <div v-for="icon in icons" :key="icon" class="col-3 mb-3">
                      <i :class="icon" class="fa-3x mt-2" @click="selectIcon(icon)" style="cursor: pointer;"></i>
                      <!-- <p class="mt-2">{{ icon }}</p> -->
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
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
import { useRouter } from "vue-router";
import { show, store, update } from "@/services/RedesSocialesService";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
const formulario = ref({
  nombre: "",
  url: "",
  logo_img: "",
});
const router = useRouter();
const errors = ref({});
const idRedesSociales = router.currentRoute.value.params.idRedesSociales || "";

const verRegistro = async () => {
  formulario.value = { nombre: "", url: "", logo_img: "", empresa_id: "" }; // Limpia el formulario
  try {
    const { data } = await show(idRedesSociales);
    formulario.value = {
      nombre: data.datos.nombre,
      empresa_id: data.datos.empresa_id,
      url: data.datos.url,
      logo_img: data.datos.logo_img,
    };
  } catch (error) {
    console.error("Error al cargar los datos: ", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al cargar los datos. Por favor, inténtelo de nuevo.',
      confirmButtonText: 'Aceptar'
    });

  }
};
const volver = () => {
  router.push({ path: "/redes-sociales" });
};

onMounted(() => {
  if (idRedesSociales) {
    verRegistro();
  }
});
const guardar = async () => {
  errors.value = {};
  try {
    let mensaje = null;
    if (idRedesSociales) {
      const { data } = await update(idRedesSociales, formulario.value);
      mensaje = data.mensaje;
    } else {
      const { data } = await store(formulario.value);
      mensaje = data.mensaje;
    }
    Swal.fire({
      title: "¡Bien!",
      text: idRedesSociales
        ? "Registro actualizado con éxito."
        : "Registro creado con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    volver();
  } catch (error) {
    let mensajeError = "Ocurrió un error inesperado.";
    let errores = {};
    if (error.response && error.response.data) {
      console.error("Error de la API:", error.response.data);
      mensajeError = error.response.data.message || mensajeError;
      errores = error.response.data.errors || {};
      if (error.response.data.mensaje) {
        errores.general = [error.response.data.mensaje];
      }
    } else {
      console.error("Error en la solicitud:", error.message);
      mensajeError = "Error en la solicitud: " + error.message;
      errores.general = [mensajeError];
    }
    Swal.fire({
      title: "¡Error!",
      text: mensajeError,
      icon: "error",
      confirmButtonText: "Aceptar",
      footer: Object.keys(errores).length
        ? "Por favor, revisa los campos en rojo."
        : "",
    });
    errors.value = errores; // Asigna los errores al objeto de errores
  }
};
// Iconos

const selectedIcon = ref('');

// Lista de íconos disponibles (ejemplo, puedes agregar más)
const icons = [
  'fab fa-facebook',
  'fab fa-facebook-f',
  'fa-brands fa-square-facebook',
  'fab fa-facebook-messenger',
  'fab fa-twitter',
  "fa-brands fa-square-twitter",
  "fa-brands fa-x-twitter",
  "fa-brands fa-square-x-twitter",
  'fab fa-instagram',
  'fa-brands fa-square-instagram',
  'fab fa-linkedin',
  'fab fa-linkedin-in',
  'fab fa-github',
  'fab fa-youtube',
  'fab fa-whatsapp',
  'fa-brands fa-square-whatsapp',
  'fab fa-pinterest',
  'fab fa-snapchat',
  'fab fa-telegram',
  'fab fa-tiktok',
  'fab fa-reddit',
  'fab fa-tumblr',
  'fab fa-vk',
  'fab fa-weibo',
  'fab fa-dribbble',
  'fab fa-behance',
  'fab fa-vimeo',
  'fab fa-flickr',
  'fab fa-medium',
  'fab fa-soundcloud',
  'fab fa-spotify',
  'fab fa-discord',
  'fab fa-slack',
  'fab fa-quora',
  'fab fa-twitch',
  'fab fa-stack-overflow',
  'fab fa-wordpress',
  'fab fa-xing',
  'fa-solid fa-hashtag',
  "fa-brands fa-google",
  "fa-brands fa-google-plus-g",
  "fa-brands fa-square-google-plus",
  "fa-brands fa-google-plus",
  "fa-brands fa-google-play",
];

// Función para abrir el modal de íconos
const openIconModal = () => {
  const modal = new bootstrap.Modal(document.getElementById('iconModal'));
  modal.show();
};

// Función para seleccionar el ícono y colocarlo en el input
const selectIcon = (icon) => {
  formulario.value.logo_img = icon;  // Actualiza logo_img en el formulario
  const modal = bootstrap.Modal.getInstance(document.getElementById('iconModal'));
  modal.hide();
};

const validateIconClass = () => {
  // Regex que verifica si la clase empieza con 'fa-' o 'fa-brands'
  const validIconClassRegex = /^(fa|fa-(brands|solid|regular|light|duotone|thin))\s+fa-[a-zA-Z0-9-]+$/;

  // Limpiar errores anteriores
  errors.value.logo_img = [];

  // Si el input no coincide con el patrón, mostrar un error
  if (!validIconClassRegex.test(formulario.value.logo_img)) {
    errors.value.logo_img.push('El formato de clase no es válido. Debe seguir el formato de Font Awesome.');
  }
};

</script>
<style>
/* iconos */
i {
  cursor: pointer;
  transition: transform 0.2s ease;
}

i:hover {
  transform: scale(1.2);
  color: #17a2b8;
}
</style>
