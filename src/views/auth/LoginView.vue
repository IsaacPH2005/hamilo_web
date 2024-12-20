<template>
  <div class="">
    <div class="container position-sticky z-index-sticky top-0">
      <div class="row">
        <div class="col-12">
          <nav
            class="navbar col-md-6 navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow-lg position-absolute mt-4 py-2 start-0 end-0 mx-4">
            <div class="container-fluid">
              <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse"
                data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false"
                aria-label="Toggle navigation">
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
        </div>
      </div>
    </div>
    <main class="main-content mt-0">
      <section>
        <div class="page-header min-vh-100">
          <div class="container">
            <div class="row">
              <div class="col-md-6 d-flex flex-column mx-lg-0 mx-auto">
                <div class="card card-plain">
                  <div class="card-header pb-0 text-start">
                    <h4 class="font-weight-bolder text-center">
                      Iniciar Sesión
                    </h4>
                    <p class="mb-0 text-center">
                      Introduzca su correo electrónico y contraseña para iniciar
                      sesión
                    </p>
                  </div>
                  <div class="card-body">
                    <form role="form">
                      <div class="mb-3">
                        <input type="email" class="form-control form-control-lg" placeholder="Email" aria-label="Email"
                          v-model="formulario.email" />
                      </div>
                      <div class="mb-3">
                        <input type="password" class="form-control form-control-lg" placeholder="Contraseña"
                          aria-label="Password" v-model="formulario.password" />
                      </div>
                      <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="rememberMe" />
                        <label class="form-check-label" for="rememberMe">Recuerdame</label>
                      </div>
                      <div class="text-center">
                        <button type="button" class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0" @click="login()">
                          Iniciar sesión
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center pt-0 px-lg-2 px-1">
                    <p class="mb-4 text-sm mx-auto">
                      No tienes una cuenta?
                      <router-link to="/register"
                        class="text-primary text-gradient font-weight-bold">Registrate</router-link>
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="col-md-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                <!--<div
                  class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  style="
                    background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                    background-size: cover;
                  "
                >
                  <span class="mask bg-gradient-primary opacity-6"></span>
                  <h4
                    class="mt-5 text-white font-weight-bolder position-relative"
                  >
                    "Attention is the new currency"
                  </h4>
                  <p class="text-white position-relative">
                    The more effortless the writing looks, the more effort the
                    writer actually put into the process.
                  </p>
                </div>-->
                <div id="background-seccion"
                  class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  :style="backgroundImagenStyle">
                  <span class="mask bg-gradient-primary opacity-6"></span>
                  <h4 class="mt-5 text-white font-weight-bolder position-relative">
                    "Attention is the new currency"
                  </h4>
                  <p class="text-white position-relative">
                    The more effortless the writing looks, the more effort the
                    writer actually put into the process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { iniciarSesion } from "../../services/AuthService.js";
import { Buffer } from "buffer";
import { useRouter } from "vue-router";

import { showPaginaNombre } from "@/services/PaginasService";
import { urlBaseAsset } from "@/services/Http";
import { idsValidos } from "@/services/ids.js";
import { indexSeccionesActivas, storeSeccion } from "@/services/SeccionesService.js";

const router = useRouter();
const formulario = ref({});

//imagen background
const pagina = ref({});
const imagenes = ref([]);
const tipo_presentacion = ref("e");
const imagen = ref({});
const imagenStyle = ref({});
const imagenUrl = ref('');
const seccionesActuales = ref([]);
//imagen background

const login = async () => {
  try {
    const { data } = await iniciarSesion(formulario.value);
    const tokenEncrypt = Buffer.from(data.access_token).toString("base64");
    localStorage.setItem("token", tokenEncrypt);
    let datosUsuario = {
      id: data.user.id,
      nombre: data.user.datos_generales.nombre,
      apellido: data.user.datos_generales.apellido,
      email: data.user.email,
      image: data.user.datos_generales.foto_perfil,
      role: data.user.roles[0].name,
    };
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    if ( data.user.roles[0].name == "Estudiante" || data.user.roles[0].name == "Postulante") {
      router.push({ path: "/" });
    } else {
      router.push({ path: "/roles" });
    }
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  import("/public/plantilla_argon/assets/js/core/popper.min.js");
  import("/public/plantilla_argon/assets/js/core/bootstrap.min.js");
  import("/public/plantilla_argon/assets/js/plugins/perfect-scrollbar.min.js");
  import("/public/plantilla_argon/assets/js/argon-dashboard.min.js");
  //imagen background
  cargarSecciones();
  cargarBackground();
});

//secciones
const cargarSecciones = async () => {
  try {
    const { data } = await indexSeccionesActivas();
    seccionesActuales.value = data.mensaje;
    const allElements = document.querySelectorAll('*[id]');
    const ids = Array.from(allElements).map(element => element.id);
    const idsvalidos = idsValidos(ids, "-seccion");
    idsvalidos.forEach(element => {
      if (!seccionesActuales.value.some(seccion => seccion.seccion === element)) {
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
    const { data } = await showPaginaNombre('login');
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
        imagenes.value.secciones_pagina[indiceimagenes].tipo_presentacion;
      let indice = obtenerNumeroRandomico(0, imagenes.value.length - 1);
      imagen.value = imagenes.value[indice];
      imagenUrl.value = `${urlBaseAsset}img/img_pagina/${imagen.url_imagen}`;
    } else {
      imagen.value = {
        id: 0,
        url_imagen: `${urlBaseAsset}img/img_default/background_login.png`,
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
@import "/plantilla_argon/assets/css/nucleo-icons.css";
@import "/plantilla_argon/assets/css/nucleo-svg.css";
@import "/plantilla_argon/assets/css/nucleo-svg.css";
@import "/plantilla_argon/assets/css/argon-dashboard.css";

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
