<template>
	<section id="testimonios" class=" titulo background" >
		<div class="container" v-if="testimonios.length > 0">
			<div class="text-center mb-4">
				<h2 class="display-6 monserrat-bold-titulo titulo">TESTIMONIOS</h2>
				<h2 class="monserrat-regular-subtitulo" style="color: #00c4d0;">¿Qué opinan nuestros estudiantes?</h2>
			</div>
			<div class="row">
				<div class="col-12 p-1">
					<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
						<div class="carousel-inner">
							<div class="carousel-item active">
								<div class="cards-wrapper">
									<div class="card card2 rounded-4" v-for="item in testimonios" :key="item.id" style="background-color: #FFCC01;">
										<div class="card-body">
											<p class="card-text fw-bold">"{{ item.experiencia }}"</p>
										</div>
										<div class="card-footer p-0">
											<div class="d-flex align-items-center pt-4">
												<img :src="item.datos_usuario.foto_perfil == null ? '/public/jubilee/images/hombre.png' : urlBaseAsset+'img/img_users/'+item.datos_usuario.foto_perfil" class="rounded-circle" alt="" width="90px" height="90px">
												<div>
													<h5 class="card-title fw-bold">{{ item.datos_usuario.nombre + " "+item.datos_usuario.apellido }}</h5>
													<span class="text-dark-subtle fw-bold">{{ item.titulo }}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" @click="paginaPrev()" data-bs-slide="prev">
							<span class="carousel-control-prev-icon" aria-hidden="true"></span>
							<span class="visually-hidden">Previous</span>
						</button>
						<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" @click="paginaNext()" data-bs-slide="next">
							<span class="carousel-control-next-icon" aria-hidden="true"></span>
							<span class="visually-hidden">Next</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { showActives } from "@/services/TestimoniosService";
import { ref, onMounted } from "vue";
import { urlBaseAsset } from "@/services/Http";
const paginacion = ref({
    total: null,
    pagina: 1
})
const testimonios = ref([]);
const testimonios2 = ref(testimonios);
const testimonios3 = ref(testimonios);
async function obtenerCursos() {
	try {
		const { data } = await showActives(paginacion.value.pagina);
		paginacion.value.total = data.datos.last_page;
		testimonios.value = data.datos.data;
	} catch (error) {
		console.log("Error fatal: " + error);
	}
}
onMounted(() => {
	import('@/../public/jubilee/js/jquery-1.11.0.min.js');
	obtenerCursos();
});
const paginaNext = () => {
	if (paginacion.value.pagina<paginacion.value.total){
		paginacion.value.pagina++;
    	obtenerCursos();
	}
}
const paginaPrev = () => {
	if (paginacion.value.pagina>1){
		paginacion.value.pagina--;
    	obtenerCursos();
	} 
}

</script>

<style>
.card2{
	background-color:#FFCC01;
	opacity: 0.8;
}
.card2:hover {
	background-color: #303644;
	color: #fff;
	opacity: 1;
}


.card2 {
	border: none;
	border-radius: 0;
	box-shadow: 2px 6px 8px 0 rgba(22, 22, 26, 0.18);
}

.carousel-inner {
	padding: 1em;
}

.carousel-control-prev,
.carousel-control-next {
	position: absolute;
	background-color: #303644;
	width: 6vh;
	height: 6vh;
	border-radius: 50%;
	top: 50%;
	transform: translateY(-60%);
	
}



.carousel-control-prev span,
.carousel-control-next span {
	width: 1.5rem;
	height: 1.5rem;
}
@media screen and (min-width: 577px) {
	.cards-wrapper {
		display: flex;
	}

	.card2 {
		margin: 0 0.5em;
		width: calc(100% / 2);
	}

	.image-wrapper {
		height: 20vw;
		margin: 0 auto;
	}
}

@media screen and (max-width: 576px) {
	.card2:not(:first-child) {
		display: none;
	}
}

.image-wrapper img {
	max-width: 100%;
	max-height: 100%;
}
</style>
