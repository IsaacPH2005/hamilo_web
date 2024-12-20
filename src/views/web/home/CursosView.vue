<template>
	<section id="cursos" class="padding-medium background" >
		<div class="container mt-5" v-if="cursos.length > 0">
			<div class="text-center mb-5 ">
				<h2 class="display-6 monserrat-bold-titulo titulo">CARRERAS</h2>
			</div>

			<div class="row d-flex justify-content-center">
				<div class="col-sm-12 col-xl-6 col-xxl-4 mb-5" v-for="(curso, index) in cursos" :key="index">
					<div class="z-1 position-absolute m-4 p-0">
						<h4>
							<span class="badge bg-success ">OPEN</span>
						</h4>
					</div>
					<div class="card rounded-5 border-5 shadow position-relative h-100" style="background-color: #303644">
						<img :src="curso.imagen ||
							'https://img.freepik.com/vector-premium/servidor-no-encontrado-simbolo-icono-error-nube-ilustracion-vectorial-eps-10-imagen-archivo_756957-2264.jpg'
							" class="img rounded-top-5" alt="image" style="width: 100%; height: 250px" />
						<div class="card-body text-white">
							<div class="pb-4">
								<h5 class="fw-bold m-0 monserrat-regular text-white text-center px-5">
								{{ curso.nombre }}
								</h5>
							</div>
							<button class="button-yellow monserrat-regular-subtitulo py-3 custom-btn" type="button" @click="irCarrera(curso.id)" style="color: #303644;">
								Ver más
							</button>
						</div>
					</div>
				</div>
				</div>
			<div class="text-center mt-4">
				<RouterLink to="/carreras" class="btn btn-warning-personalizado monserrat-regular-subtitulo px-5 py-3 text-dark">VER TODAS LAS CARRERAS</RouterLink>
			</div>
		</div>
	</section>
</template>
<script setup>
import { especialidadesActivas } from "@/services/EspecialidadService";
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();

const cursos = ref([]);
async function obtenerCursos() {
	try {
		// se debe recuperar solo los cursos que esten abiertos y con el rango de la fecha limite
		// realizar paginacion para ver las demas carreras, o hacer un carrusel...
		const { data } = await especialidadesActivas('');
		cursos.value = data.datos;
	} catch (error) {
		console.log("Error fatal: " + error);
	}
}
onMounted(() => {
	obtenerCursos();
});
const irCarrera = (id) =>{
  router.push({path: `/carrera/${id}`});
}
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
.cardm:hover{
	background-color: #ffcc01;
}
.btn-warning-personalizado{
	background: #ffcc01;
}
.btn-warning-personalizado:hover {
	background: #ffcc01;
}
.custom-btn {
  position: absolute;
  bottom: -10%; /* Esto posiciona el botón un 50% por debajo del final del card */
  left: 50%; /* Centra horizontalmente el botón */
  transform: translateX(-50%); /* Ajusta el centrado */
}
</style>