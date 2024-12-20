<template>
	<section id="about" class="padding-medium background" >
		<div class="container">
			<div class="row align-items-center mt-xl-5">
				<div class="col-12 d-flex justify-content-center">
					<div class="mb-3 text-center">
						<!--<p class="text-info about">Conoce sobre nosotros</p>-->
						<h2 class="display-6 monserrat-bold-titulo titulo">
							¿QUIÉNES SOMOS?
						</h2>
						<hr>
						<h2 class="display-6 monserrat-regular titulo">
							{{ empresa.about }}
						</h2>
					</div>
				</div>
			</div>

			<div class="row align-items-center mt-xl-1">
				<div class="col-12 col-md-6 p-5">
					<img
						:src="empresa.url_banner || 'https://www.hamiloes.cool/wp-content/uploads/2023/09/Logos-Hamilo-3-768x768.png'"
						alt="img" class="img-fluid rounded-4" />
				</div>
				<div class="col-12 col-md-6">
					<!-- Misión -->
					<div class="content-horizontal">
						<img src="../../../../public/jubilee/images/mision.png" alt="Misión" style="width: 30%;">
						<div class="card card-hover text-white monserrat-regular" style="background-color: #303644;">
							<div class="card-body p-4">
								<p class="card-text">{{ empresa.mision }}</p>
							</div>
						</div>
					</div>
					<!-- Visión -->
					<div class="content-horizontal">
						<img src="../../../../public/jubilee/images/vision.png" alt="Visión" style="width: 30%;">
						<div class="card card-hover text-white monserrat-regular" style="background-color: #303644;">
							<div class="card-body p-4">
								<p class="card-text">{{ empresa.vision }}</p>
							</div>
						</div>
					</div>
					<!-- Historia -->
				<!--<div class="content-horizontal about">
						<img src="../../../../public/jubilee/images/historia.png" alt="Historia" style="width: 20%;">
						<div class="card card-hover bg-dark text-white cardr">
							<div class="card-body p-4">
								<p class="card-text">{{ empresa.historia}}</p>
							</div>
						</div>
					</div>-->
				</div>
			</div>
		</div>
	</section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { datosEmpresaLibre } from "@/services/EmpresaService";

const empresa = ref({ about: "taamnio", mision: "ASDf", vision: "asdf", url_banner: 'https://www.hamiloes.cool/wp-content/uploads/2023/09/Logos-Hamilo-3-768x768.png' });
const expansion = ref(false);

onMounted(() => {
	obtenerInfoEmpresa();
});
async function obtenerInfoEmpresa() {
	try {
		const { data } = await datosEmpresaLibre();
		if (data!= {}) {
			empresa.value = data;
		}
	} catch (error) {
		console.log("Existe un error FATAL:" + error);
	}
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
.about {
  animation-duration: 3s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
.card-hover:hover {
  transform: scale(1.05);
  background-color: #f8f9fa;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.content-horizontal {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.content-horizontal:nth-child(even) {
  flex-direction: row-reverse;
}

.content-horizontal img {
  width: 50%;
  height: auto;
  object-fit: cover;
}

.cardr .icon {
  font-size: 3rem;
  color: lightseagreen;
}

.cardr-text {
  color: gray;
}

.cardr {
  transition: all 0.5s;
}

.cardr:hover {
  background-color: lightseagreen;
  color: #fff;
}

.cardr:hover .icon,
.cardr:hover .cardr-text {
  color: #fff;
}
</style>
