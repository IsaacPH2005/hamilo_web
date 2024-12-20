<template>
  <div class="">
    <nav
      class="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
      <div class="container">
        <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
          data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon mt-2">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navigation">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center me-2" aria-current="page" to="/">
                <i class="fa-solid fa-pager me-1"></i>
                Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link me-2" to="/register">
                <i class="fa fa-user me-1"></i>
                Registro
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link me-2" to="/login">
                <i class="fas fa-user-circle me-1"></i>
                Iniciar sesión
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
    <main class="main-content mt-0">
      <!--<div
        class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
        style="
          background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
          background-position: top;
        "
      >-->
      <div id="background-seccion" class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
        :style="backgroundImagenStyle">
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
              <h1 class="text-white mb-2 mt-5">Bienvenido!</h1>
              <p class="text-lead text-white">
                Únete a nuestra comunidad y desarrolla tu futuro tecnológico sin
                costo inicial.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
          <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div class="card z-index-0">
              <div class="card-header text-center pt-4">
                <h5>Registrate</h5>
              </div>
              <div class="card-body">
                <form role="form">
                  <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Nombre(s)" v-model="formulario.nombre"
                      aria-label="Name" />
                    <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i
                        class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                  </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" placeholder="Apellido(s)" v-model="formulario.apellido"
                      aria-label="Name" />
                    <small v-if="errors.apellido" class="text-danger fst-italic text-xs"><i
                        class="fas fa-times me-1"></i>{{ errors.apellido[0] }}</small>
                  </div>
                  <div class="mb-3">
                    <input type="email" class="form-control" placeholder="Email" v-model="formulario.email"
                      aria-label="Email" />
                    <small v-if="errors.email" class="text-danger fst-italic text-xs"><i
                        class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
                  </div>
                  <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Password" v-model="formulario.password"
                      aria-label="Password" />
                    <small v-if="errors.password" class="text-danger fst-italic text-xs"><i
                        class="fas fa-times me-1"></i>{{ errors.password[0] }}</small>
                  </div>
                  <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Confirme password"
                      v-model="formulario.password_confirmation" aria-label="Password" />
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2" @click="registrar()">
                      Registrarse
                    </button>
                  </div>
                  <p class="text-sm mt-3 mb-0">
                    Ya tienes una cuenta?
                    <router-link to="/login" class="text-dark font-weight-bolder">Inicia sesión</router-link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="footer py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mb-4 mx-auto text-center">
            <a href="#" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Company
            </a>
            <a href="#" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              About Us
            </a>
            <a href="#" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Team
            </a>
            <a href="#" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Products
            </a>
            <a href="#" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Blog
            </a>
            <a href="#" target="_blank" class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2">
              Pricing
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { registroUsuario } from "../../services/AuthService.js";
import { useRouter } from "vue-router";
import Swal from 'sweetalert2';

import { showPaginaNombre } from "@/services/PaginasService";
import { urlBaseAsset } from "@/services/Http";
import { idsValidos } from "@/services/ids.js";
import { indexSeccionesActivas, storeSeccion } from "@/services/SeccionesService.js";

const sizeScreen = ref(null);
const formulario = ref({});
const router = useRouter();
const errors = ref({});

//imagen background
const pagina = ref({});
const imagenes = ref([]);
const tipo_presentacion = ref("e");
const imagen = ref({});
const imagenStyle = ref({});
const imagenUrl = ref('');
const seccionesActuales = ref([]);
//imagen background

const registrar = async () => {
  try {
    const { data } = await registroUsuario(formulario.value);
    Swal.fire({
      icon: "success",
      title: "Bien",
      text: "Usuario creado correctamente!",
    });
    router.push({ path: "/login" });
  } catch (error) {
    if (error.response.status == 422) {
      errors.value = error.response.data.errors;
    } else {
      console.log(error);
    }
  }
};
onMounted(() => {
  import("/public/plantilla_argon/assets/js/core/popper.min.js");
  import("/public/plantilla_argon/assets/js/core/bootstrap.min.js");
  import("/public/plantilla_argon/assets/js/argon-dashboard.min.js");
  //imagen background
  cargarSecciones();
  cargarBackground();
});

//secciones
const cargarSecciones = async () => {
  try {
    const { data } = await indexSeccionesActivas();
    seccionesActuales.value = data.datos;
    const allElements = document.querySelectorAll('*[id]');
    const ids = Array.from(allElements).map(element => element.id);
    const idsvalidos = idsValidos(ids, "-seccion");
    idsvalidos.forEach(element => {
      if (!paginasActuales.value.some(seccion => seccion.seccion === element)) {
        let objeto = {
          seccion: element
        }
        registrarNuevaSeccion(objeto);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const registrarNuevaSeccion = async (objeto) => {
  try {
    const { data } = await storeSeccion(objeto);
  } catch (error) {
    console.log(error);
  }
};

//imagen background
const cargarBackground = async () => {
  try {
    const { data } = await showPaginaNombre('registro');
    pagina.value = data.datos;
    let indiceimagenes = -1;
    if (
      pagina.value.secciones_pagina != null &&
      pagina.value.secciones_pagina.length > 0
    ) {
      indiceimagenes = pagina.value.secciones_pagina.findIndex(
        (seccion_pagina) => seccion_pagina.seccion.seccion == 'background'
      );
    }
    if (indiceimagenes !== -1) {
      imagenes.value = pagina.value.secciones_pagina[indiceimagenes].imagenes;
      tipo_presentacion.value =
        pagina.value.secciones_pagina[indiceimagenes].tipo_presentacion;
      let indice = obtenerNumeroRandomico(0, banner.value.length - 1);
      imagen.value = banner.value[indice];
      imagenUrl.value = `${urlBaseAsset}img/img_pagina/${imagen.url_imagen}`;
    } else {
      imagen.value = {
        id: 0,
        url_imagen: `${urlBaseAsset}img/img_default/background_register.jpg`,
        detalle: ""
      };
      imagenUrl.value = imagen.value.url_imagen;
    }
  } catch (error) {
    console.log(error);
  }
};
function obtenerNumeroRandomico(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
};

const backgroundImagenStyle = computed(() => ({
  backgroundImage: `url(${imagenUrl.value})`,
  backgroundSize: 'cover',  // Opcional: Para cubrir todo el contenedor
}
));

//imagen background
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700");
@import "/plantilla_argon/assets/css/nucleo-icons.css";
@import "/plantilla_argon/assets/css/nucleo-svg.css";
@import "/plantilla_argon/assets/css/argon-dashboard.css";
@import "/plantilla_argon/assets/js/argon-dashboard.min.js?v=2.0.4";

.sidenav-toggle {
  position: absolute;
  top: 50px;
  right: -20px;
  z-index: 1000;
}

.btn-circle {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-circle:hover {
  background-color: #45a049;
}

.sidenav-open .btn-circle i {
  transform: rotate(180deg);
}

#sidenav-main {
  overflow: visible;
}

.total {
  height: 100vh;
}
</style>
