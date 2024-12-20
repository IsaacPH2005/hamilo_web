<template>
	<section id="beneficios" class="background" >
		<div class="container mt-4">
			<div class="text-center mb-5">
				<div>
					<h2 class="display-6 monserrat-bold-titulo titulo">¿POR QUÉ HAMILO?</h2>
				</div>
			</div>
			<div class="row d-flex justify-content-center" v-if="beneficios.length > 0">
				<div class="col-12 col-md-6 mb-5 " v-for="beneficio in beneficios" :key="beneficio.id">
					<div class="card text-center border-0 rounded-4 shadow mt-4 p-0 h-100" style="background-color: #ffcc01;">
						<div class="position-absolute start-50 translate-middle p-1 text-light">
							<img class=""
								:src="urlBaseAsset+'img/img_beneficios/'+beneficio.icono || 'https://img.freepik.com/vector-premium/servidor-no-encontrado-simbolo-icono-error-nube-ilustracion-vectorial-eps-10-imagen-archivo_756957-2264.jpg'"
								alt="" width="100px" />
						</div>
						<div class="card-body mt-4">
							<h5 class="card-title pt-2 monserrat-regular-subtitulo">
								{{ beneficio.tipo }}
							</h5>
							<p class="card-text py-2 pb-0 monserrat-regular ">
								{{ beneficio.descripcion }}
							</p>
						</div>
					</div>

				</div>
			</div>
			<div class="row d-flex justify-content-center" v-else>
				<div class="col-12 col-md-6 mb-5">
					<div class="card text-center border-0 rounded-4 shadow mt-4 p-0 h-100" style="background-color: #ffcc01;">
						<div class="position-absolute start-50 translate-middle p-1 text-light">
							<img class="rounded-circle" src="https://img.freepik.com/vector-premium/servidor-no-encontrado-simbolo-icono-error-nube-ilustracion-vectorial-eps-10-imagen-archivo_756957-2264.jpg" alt="" width="100px" />
						</div>
						<div class="card-body mt-4">
							<h5 class="card-title pt-2 monserrat-regular-subtitulo">
								Bootcamp en Programación
							</h5>
							<p class="card-text py-2 pb-0 monserrat-regular ">
								Un total de 4 meses, full time (8hrs/dia, de lunes a viernes).
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { beneficiosActivos } from "@/services/BeneficiosServicios";
import { onMounted, ref } from "vue";
import { urlBaseAsset } from "@/services/Http";
const beneficios = ref([]);
async function obtenerBeneficios() {
	try {
		const { data } = await beneficiosActivos();
		beneficios.value = data.datos;
	} catch (error) {
		console.log("Error fatal" + e);
	}
}
onMounted(() => {
	obtenerBeneficios();
});
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
  font-size: 25px;
  text-transform: none; 
}
.monserrat-regular {
font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
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
</style>