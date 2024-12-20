<template>
  <BannerPagina pagina="contacto" seccion="banner" />
  <div class="container">
    <br />
     <div class="row">
      <div class="col-12">
        <h1 class="h1-titulo text-dark">CONTÁCTANOS</h1><br>
        <p class="parrafo text-dark">
          Complete el siguiente formulario para ponerse en contacto con
          nosotros. Utilícelo exclusivamente para consultas generales o mensajes
          específicos.
        </p>
      </div>
      <div class="row">
        <div class="col-12 col-lg-5">
          <div class="col-12 text-center px-5">
            <img src="../../../../public/jubilee/images/hamilo.png" alt="" width="100%"/>
          </div>
        </div>
        <div class="col-12 col-lg-7 px-5">
          <form @submit.prevent="enviarFormulario">
            <div class="col-12 form-group">
              <label class="form-group text-dark" for="nombres">Nombres <br /></label>
              <input type="text" id="nombres" :class="{ 'border-warning': errors.nombres }" v-model="formulario.nombres"
                required /><small class="text-danger fst-italic text-xs" v-if="errors.nombres"><i
                  class="fas fa-times me-1"></i>{{ errors.nombres[0] }}</small>
            </div>
            <br />
            <div class="col-12 form-group">
              <label class="form-group text-dark" for="apellidos">Apellidos <br /></label>
              <input type="text" id="apellidos" :class="{ 'border-warning': errors.apellidos }"
                v-model="formulario.apellidos" required /><small class="text-danger fst-italic text-xs"
                v-if="errors.apellidos"><i class="fas fa-times me-1"></i>{{ errors.apellidos[0] }}</small>
            </div>
            <br />
            <div class="col-12 form-group">
              <label class="form-group text-dark" for="email">Email <br /></label>
              <input type="email" id="email" :class="{ 'border-warning': errors.email }" v-model="formulario.email"
                required /><small class="text-danger fst-italic text-xs" v-if="errors.email"><i
                  class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
            </div>
            <br />
            <div class="col-12 form-group">
              <label class="form-group text-dark" for="telefono">Teléfono <br /></label>
              <input type="tel" id="telefono" :class="{ 'border-warning': errors.telefono }"
                v-model="formulario.telefono" required /><small class="text-danger fst-italic text-xs"
                v-if="errors.telefono"><i class="fas fa-times me-1"></i>{{ errors.telefono[0] }}</small>
            </div>
            <br />
            <div class="col-12 form-group">
              <label class="form-group text-dark" for="mensaje">Mensaje <br /></label>
              <textarea id="mensaje" :class="{ 'border-warning': errors.mensaje }" v-model="formulario.mensaje"
                required></textarea><small class="text-danger fst-italic text-xs" v-if="errors.mensaje"><i
                  class="fas fa-times me-1"></i>{{ errors.mensaje[0] }}</small>
            </div>
            <br />
            <div class="col-12 text-center">
              <button type="submit" class="btn btn-dark px-5 py-4">
                ENVIAR MENSAJE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BannerPagina from '@/components/web/BannerPagina.vue';
import { datosCoordenadasEmpresa, datosEmpresa } from "@/services/EmpresaService";
import { store } from '@/services/ContactosService';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const formulario = ref({
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  mensaje: ''
});
const errors = ref({});
const enviarFormulario = async () => {
  errors.value = {};
  try {
    let mensaje = null;
    const { data } = await store(formulario.value);
    mensaje = data.mensaje;
    Swal.fire({
            title: "Enviado",
            text: "Se envió el mensaje correctamente.",
            icon: "success"
    })
  } catch (error) {
    if (error.response && error.response.status == 422) {
      errors.value = error.response.data.errors;
    } else {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar el formulario. Inténtalo de nuevo.",
        icon: "error"
      });
    }
  }
  formulario.value = {
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      mensaje: ''
    };
}

const form = ref({ latitud: -17.76042066516615, longitud: -63.1990604338378 });
onMounted(() => {
  listarDatosEmpresa();
});
const mapUrl = ref("")
async function listarDatosEmpresa() {
  try {
    const { data } = await datosCoordenadasEmpresa();
    form.value = data;
    const latitude = parseFloat(form.value.latitud);
    const longitude = parseFloat(form.value.longitud);

    console.log("Latitud:", latitude, "Longitud:", longitude); // Para verificar que las coordenadas sean válidas

    mapUrl.value = `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;


    console.log("mapUrl:", mapUrl.value);
  } catch (error) {
    console.log("hubo un error" + error);
  }
}

</script>

<style scoped>
.contact-form-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  padding: 4rem;
}

.h1-titulo {
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #ffcc01;
}

.parrafo {
  font-family: "Montserrat", sans-serif;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #00c4d0;
  text-align: center;
}

.form-group label {
  display: between;
  margin-bottom: 0.5rem;
  color: #00c4d0;
  font-size: 1.1rem;
}

.form-group input,
.form-group textarea {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  height: 2.5rem;
  border: 3px solid #ffcc01;
  border-radius: 6px;
}

.form-group textarea {
  height: 20rem;
}

button {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  background-color: #303644;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #c0a719;
}

.img-fluid {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
