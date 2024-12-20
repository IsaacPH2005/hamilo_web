<template>
	<section id="postular">
		<div class="container mt-8">
			<div class="row g-md-3 mt-2">
				<div class="col-12 col-md-6 text-center">
					<div>
						<h2 class="display-6 monserrat-bold-titulo">¿CÓMO POSTULAR?</h2>
					</div>
				</div>
				<div class="col-12 col-md-6 text-center">
					<div class="mt-4 mt-md-0">
						<button class="button-yellow monserrat-regular-subtitulo px-5 py-4" @click="agregarPostulacion()">Postúlate aquí</button>
					</div>
				</div>
				<hr />
				<div class="col-12 col-md-6" v-if="postulaciones.length > 0">
					<div
						class="gray rounded-3 p-4 my-2 mt-5"
						v-for="postulacion in postulaciones" :key="postulacion.id"
					>
						<div class="">
							<img class="position-absolute translate-middle rounded-circle p-1 text-light" :src="(postulacion.icono ? urlBaseAsset + 'img/img_postulacionPasos/' + postulacion.icono : 'https://img.freepik.com/vector-premium/servidor-no-encontrado-simbolo-icono-error-nube-ilustracion-vectorial-eps-10-imagen-archivo_756957-2264.jpg')" alt="" width="90px" />
						</div>
						<div class="d-flex align-items-center">
							<div class="ps-5">
								<p
									class="category-paragraph monserrat-regular-subtitulo text-uppercase mb-1 text-center"
								>
									{{ postulacion.nombre }}
								</p>
								<p class="category-paragraph m-0 monserrat-regular">
									{{ postulacion.descripcion }}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-6" v-else>
					<div class="gray rounded-3 p-4 my-2 mt-5">
						<div class="">
							<img class="position-absolute translate-middle rounded-circle p-1 text-light" src="https://img.freepik.com/vector-premium/servidor-no-encontrado-simbolo-icono-error-nube-ilustracion-vectorial-eps-10-imagen-archivo_756957-2264.jpg" alt="" width="90px" />
						</div>
						<div class="d-flex align-items-center">
							<div class="ps-5">
								<p
									class="category-paragraph monserrat-regular-subtitulo text-uppercase mb-1 text-center"
								>
									PRE REGISTRO
								</p>
								<p class="category-paragraph m-0 monserrat-regular">
									Déjanos tus datos en nuestro formulario oficial.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-6">
					<!--<img
						src="/public/jubilee/images/3.png"
						alt=""
						width="100%"
						class="rounded-5"
					/>-->
					<img id="imagen1-seccion"
					:src=" imagen.id > 0
            		? urlBaseAsset + 'img/img_pagina/' + imagen.url_imagen
            		: imagen.url_imagen"
						alt=""
						width="100%"
						class="rounded-5"
					/>
				</div>
			</div>
		</div>
	</section>
	<div class="modal fade" id="postularModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
			aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title" id="modal-title-notification"><i class="far fa-edit me-3"></i> Regístrate para postular</h4>
							<button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
							</button>
						</div>
						<div class="modal-body">
							<p>Por favor, llena tus datos de forma correcta, todos los datos son requeridos *</p>
							<div class="form-group">
								<label for="password" class="form-label font-weight-bolder text-sm">Nombre(s)<span class="text-danger fst-italic">*</span></label>
								<input type="text" class="form-control" v-model="registro.nombre">
								<small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.nombre[0]}}</small>
							</div>
							<div class="form-group">
								<label for="password" class="form-label font-weight-bolder text-sm">Apellido(s)<span class="text-danger fst-italic">*</span></label>
								<input type="text" class="form-control" v-model="registro.apellido">
								<small v-if="errors.apellido" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.apellido[0]}}</small>
							</div>
							<div class="form-group">
								<label for="password" class="form-label font-weight-bolder text-sm">Correo electrónico<span class="text-danger fst-italic">*</span></label>
								<input type="text" class="form-control" v-model="registro.email">
								<small v-if="errors.email" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.email[0]}}</small>
							</div>
							<div class="form-group">
								<label for="password" class="form-label font-weight-bolder text-sm">Contraseña<span class="text-danger fst-italic">*</span></label>
								<input type="password" class="form-control" v-model="registro.password">
								<small v-if="errors.password" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.password[0]}}</small>
							</div>
							<div class="form-group">
								<label for="password" class="form-label font-weight-bolder text-sm">Confirme Contraseña<span class="text-danger fst-italic">*</span></label>
								<input type="password" class="form-control" v-model="registro.password_confirmation">
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" @click="cerrarModal()">Cancelar</button>
							<button type="button" class="btn btn-primary" @click="registrar()">Guardar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
<script setup>
import { postulacionesActivas } from "@/services/PostulacionPasosService";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router'
import { urlBaseAsset } from "@/services/Http";
import { Modal } from 'bootstrap';
import { registroPostulante } from "@/services/AuthService";
import { Buffer } from "buffer";
import Swal from "sweetalert2";
import { showPaginaNombre } from "@/services/PaginasService";
import { idsValidos } from "@/services/ids.js";
import { indexSeccionesActivas, storeSeccion } from "@/services/SeccionesService.js";
let modal = null;
let instanciaModal = null;
const registro = ref({});
const errors = ref({});
const router = useRouter();



//imagen background
const pagina = ref({});
  const imagenes = ref([]);
  const imagen = ref({});
  const imagenStyle = ref({});
  const imagenUrl = ref('');
  const seccionesActuales = ref([]);
//imagen background

const postulaciones = ref([]);
async function obtenerPostulaciones() {
	try {
		const { data } = await postulacionesActivas();
		postulaciones.value = data.datos;
	} catch (error) {
		console.log("error fatal: " + error);
	}
}
onMounted(() => {
	//imagen 
    cargarSecciones();
    cargarImagenes();
	//imagen
	obtenerPostulaciones();
	modal = document.getElementById('postularModal');
    instanciaModal = new Modal(modal); 
});

const agregarPostulacion = () => {
	if (localStorage.token){
		router.push({ path: "/form-postulacion" });
	}else{
		instanciaModal.show();
	}
    
}
const cerrarModal = () => {
    instanciaModal.hide();
    errors.value = ref({});
    registro.value = {};
}
const registrar = async () => {
  try {
    const { data } = await registroPostulante(registro.value);
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
	Swal.fire({
        icon: "success",
        title: "Bien",
        text: "Usuario creado correctamente!",
    });
	cerrarModal();
    router.push({ path: "/form-postulacion" });
  } catch (error) {
    if (error.response.status == 422) {
        errors.value = error.response.data.errors;
    } else {
        console.log(error);
    }
  }
};
//secciones
const cargarSecciones = async () => {
    try {
        const {data} = await indexSeccionesActivas();
        seccionesActuales.value = data.mensaje;
        const allElements = document.querySelectorAll('*[id]');
        const ids = Array.from(allElements).map(element => element.id);
        const idsvalidos = idsValidos(ids,"-seccion");
        idsvalidos.forEach(element=>{
            if(!seccionesActuales.value.some(seccion => seccion.seccion === element)){
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
        const {data} = await storeSeccion(objeto);
    } catch (error) {
        console.log(error);
    }
};

//imagen background
const cargarImagenes = async () => {
    try {
      const { data } = await showPaginaNombre('home');
      pagina.value = data.datos;
      let indiceimagenes = -1;
      if (
        pagina.value.secciones_pagina != null &&
        pagina.value.secciones_pagina.length > 0
      ) {
        indiceimagenes = pagina.value.secciones_pagina.findIndex(
          (seccion_pagina) => seccion_pagina.seccion.seccion == 'imagen1'
        );
      }
      if (indiceimagenes !== -1) {
        imagenes.value = pagina.value.secciones_pagina[indiceimagenes].imagenes;
        let indice = obtenerNumeroRandomico(0, imagenes.value.length - 1);
        imagen.value = imagenes.value[indice];
        imagenUrl.value = `${urlBaseAsset}img/img_pagina/${imagen.url_imagen}`;
      } else {
        imagen.value = {
          id: 0,
          url_imagen: `${urlBaseAsset}img/img_default/imagen_default.png`,
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

</script>
<style>
@import 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
.monserrat-bold-titulo{
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  text-transform: none; 
}
.monserrat-regular-subtitulo {
 font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  text-transform: none; 
}
.monserrat-regular {
font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  text-transform: none; 
}
.monserrat-regular-italic {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 18px;
  text-transform: none; 
}
.monserrat-bold-italic {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: 18px;
  text-transform: none; 
}
.background {
    background-color: white;
}
.titulo{
	color: #303644;
}
.transparencia {
    Background-color: transparent;
}
</style>
