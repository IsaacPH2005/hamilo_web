<template>
	<div class="d-aflex justify-content-center">
		<div class="row">
			<div class="col-12">
				<div class="card border border-0 shadow-lg">
					<div class="card-body">
						<h5 class="card-title font-weight-bolder"><i class="fas me-2 fa-solid fa-building"></i> Editar Datos empresa</h5>
					</div>
				</div>
			</div>
			<div class="mt-3">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12 col-md-6">
								<label for="razonSocial" class="form-label">Razon social*</label>
								<input type="text" class="form-control" v-model="form.razon_social" id="razonSocial" />
								<small class="text-danger" v-if="errors.razon_social"><i class="fas fa-times me-1"></i>{{
									errors.razon_social }}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="nit" class="form-label">
									Nit*</label>
								<input type="text" class="form-control" v-model="form.nit" id="nit" />
								<small class="text-danger" v-if="errors.nit"><i class="fas fa-times me-1"></i>{{ errors.nit }}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="telefono" class="form-label">Telefono*</label>
								<input type="text" class="form-control" id="telefono" v-model="form.telefono" />
								<small class="text-danger" v-if="errors.telefono"><i class="fas fa-times me-1"></i>{{ errors.telefono
									}}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="cuidad" class="form-label">Cuidad*</label>
								<input type="text" class="form-control" v-model="form.ciudad" />
								<small class="text-danger" v-if="errors.ciudad"><i class="fas fa-times me-1"></i>{{ errors.ciudad
									}}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="cuidad" class="form-label">Pais*</label>
								<input type="text" class="form-control" v-model="form.pais" />
								<small class="text-danger" v-if="errors.pais"><i class="fas fa-times me-1"></i>{{ errors.pais }}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="representanteLegal" class="form-label">Representante Legal*</label>
								<input type="text" class="form-control" id="representanteLegal" v-model="form.representante_legal" />
								<small class="text-danger" v-if="errors.representante_legal"><i class="fas fa-times me-1"></i>{{
									errors.representante_legal }}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="mision" class="form-label">Mision*</label>
								<input type="text" class="form-control" v-model="form.mision" id="mision" />
								<small class="text-danger" v-if="errors.mision"><i class="fas fa-times me-1"></i>{{ errors.mision
									}}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="vision" class="form-label">Vision*</label>
								<input type="text" class="form-control" v-model="form.vision" id="vision" />
								<small class="text-danger" v-if="errors.vision"><i class="fas fa-times me-1"></i>{{ errors.vision
									}}</small>
							</div>
							<div class="col-12 col-md-6">
								<label for="vision" class="form-label">About*</label>
								<textarea type="text" class="form-control" v-model="form.about" id="vision" rows="5" />
								<small class="text-danger" v-if="errors.about"><i class="fas fa-times me-1"></i>{{ errors.about
									}}</small>
							</div>
							<div class="col-12 col-md-6">
								<div class="">
									<label for="historia" class="form-label">Historia*</label>
									<textarea id="historia" v-model="form.historia" class="form-control" rows="5"></textarea>
									<small class="text-danger" v-if="errors.historia"><i class="fas fa-times me-1"></i>{{
										errors.historia
									}}</small>
								</div>
							</div>
							<div class="col-12 col-md-6">
								<div class="">
									<label for="vision" class="form-label">URL Banner*</label>
									<input type="file" class="form-control" ref="image" @change="cargarArchivo" id="vision" />
								</div>
								<small class="text-danger" v-if="errors.url_banner"><i class="fas fa-times me-1"></i>{{
									errors.url_banner
								}}</small>
								<div class="text-center mt-3">
									<img :src="imagenUrl" alt="" class="border rounded" width="300px" height="300px" />
								</div>
							</div>
							<div class="col-12 col-md-6">
								<label for="direccion" class="form-label">Direccion*</label>
								<input id="direccion" type="text" class="form-control" v-model="form.direccion" />
								<small class="text-danger" v-if="errors.direccion"><i class="fas fa-times me-1"></i>{{ errors.direccion
									}}</small>
								<div class="mt-3">
									<div id="map" style="width: 100%; height: 400px;"></div>
								</div>
							</div>
						</div>
						<div class="text-center mt-4">
							<button @click="cancel" class="btn btn-danger ">
								<i class="fas fa-reply"></i> Volver
							</button>
							<button :class="{ 'btn btn-primary ms-5 disabled': cargando, 'btn btn-primary ms-5 ': !cargando }"
								@click="enviarDatosEdicion()">
								Guardar <i v-if="!cargando" class="fas fa-save"></i> <i v-else class="fas fa-spinner fa-spinner"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { datosEmpresa, editarDatosEmpresa } from "@/services/EmpresaService";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const cargando = ref(false);
const form = ref({ latitud: -17.76042066516615, longitud: -63.1990604338378 });
const errors = ref({});
const imagenUrl = ref();
const mostrarMensajeExito = ref(false);
const router = useRouter();
const cargarArchivo = (event) => {
	imagenUrl.value = URL.createObjectURL(event.target.files[0]);
	form.value.url_banner = event.target.files[0];
	mostrarMensajeExito.value = false;
};
const map = ref(null);
const marker = ref(null);
const geocoder = ref(null);

onMounted(() => {
	listarDatosEmpresa();
});
async function listarDatosEmpresa() {
	try {
		const { data } = await datosEmpresa();
		form.value = data;
		imagenUrl.value = data.url_banner;
		montarMapa();
	} catch (error) {
		console.log("hubo un error" + error);
	}
}
function montarMapa() {
	window.initMap = initMap;
	const script = document.createElement('script');
	script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAZTsJUjdoYYGwe6Oj_XFbE1jzhAPIm6oU&callback=initMap`;
	script.async = true;
	script.defer = true;
	document.head.appendChild(script);
}
const initMap = () => {
	const initialPosition = {
		lat: parseFloat(form.value.latitud),
		lng: parseFloat(form.value.longitud)
	};
	map.value = new google.maps.Map(document.getElementById('map'), {
		center: initialPosition,
		zoom: 15,
	});

	marker.value = new google.maps.Marker({
		position: initialPosition,
		map: map.value,
		draggable: true,
	});

	google.maps.event.addListener(marker.value, 'dragend', (event) => {
		form.value.latitud = event.latLng.lat();
		form.value.longitud = event.latLng.lng();
	});

	geocoder.value = new google.maps.Geocoder();
};
const cancel = () => {
	router.push('/')
}
async function enviarDatosEdicion() {
	errors.value = {};
	cargando.value = true;
	try {
		const formData = new FormData();
		formData.append("razon_social", form.value.razon_social);
		formData.append("nit", form.value.nit);
		formData.append("direccion", form.value.direccion);
		formData.append("telefono", form.value.telefono);
		formData.append("ciudad", form.value.ciudad);
		formData.append("pais", form.value.pais);
		formData.append("representante_legal", form.value.representante_legal);
		formData.append("latitud", form.value.latitud);
		formData.append("longitud", form.value.longitud);
		formData.append("historia", form.value.historia);
		// Solo añade url_banner si se ha subido una nueva imagen
		if (form.value.url_banner instanceof File) {
			formData.append("url_banner", form.value.url_banner);
		}

		formData.append("mision", form.value.mision);
		formData.append("vision", form.value.vision);
		formData.append("about", form.value.about);
		const { data } = await editarDatosEmpresa(formData);

		Swal.fire({
			title: "¡Bien!",
			text: data,
			icon: "success",
			confirmButtonText: "Aceptar",
		});
		router.push('/empresaedicion');
		cargando.value = false;
	} catch (error) {

		if (error.response && error.response.status == 422) {
			errors.value = error.response.data;

		}
		if (error.response && error.response.status == 403) {
			Swal.fire({
				title: "Error",
				text: error.response.data.message,
				icon: 'error',
				confirmButtonText: "Aceptar"
			})
			router.push('/')
		} else {
			Swal.fire({
				title: 'Error',
				icon: 'error',
				text: "Ocurrio un error inesperado, intentelo mas tarde."
			})
		}
	} finally {
		cargando.value = false;
	}
}
</script>
<style></style>