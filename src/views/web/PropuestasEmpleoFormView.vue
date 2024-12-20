<template>
    <h4 class="text-white">Registro convocatoria</h4>
    <div class="form pb-5 pt-3">
        <div class="container mt-5">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header" style="background-color: #FFCC01;">
                            <h3 class="text-center mt-4">Registro de Oferta Laboral</h3>
                            <p class="px-5">
                                <b>¡Bienvenido a la plataforma de publicación de vacantes!</b> Nos alegra que formes parte de 
                                nuestra red de reclutadores en busca de talento. Completa el siguiente formulario para registrar 
                                tus ofertas laborales y conecta con candidatos altamente calificados. <b>Juntos, encontraremos el mejor equipo para tu empresa."</b>
                            </p>
                        </div>
                        <div class="card-body bg-dark-subtle">
                            <div class="row mt-3">
                                <p class="text-uppercase text-center fw-bold">SOBRE LA EMPRESA</p>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="empresa" class="form-label">1. Empresa <span class="text-danger fst-italic">*</span></label>
                                    <input type="text" class="form-control" id="empresa" placeholder="Escriba su respuesta" v-model="datos_propuesta.empresa">
                                    <small v-if="errors.empresa" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.empresa[0]}}</small>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="email" class="form-label">2. Correo electrónico <span class="text-danger fst-italic">*</span></label>
                                    <input type="email" class="form-control" id="email" placeholder="Escriba su respuesta" v-model="datos_propuesta.email">
                                    <small v-if="errors.email" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.email[0]}}</small>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="telefono" class="form-label">3. Contacto (incluye el código del país)</label>
                                    <input type="text" class="form-control" id="telefono" placeholder="Escriba su respuesta" v-model="datos_propuesta.contacto">
                                </div>
                                <hr class="horizontal dark">
                                <p class="text-uppercase text-center fw-bold">SOBRE LA VACANTE</p>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="puesto" class="form-label">4. Puesto <span class="text-danger fst-italic">*</span></label>
                                    <input type="email" class="form-control" id="puesto" placeholder="Escriba su respuesta" v-model="datos_propuesta.puesto">
                                    <small v-if="errors.puesto" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.puesto[0]}}</small>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="modalidad" class="form-label">5. Modalidad <span class="text-danger fst-italic">*</span></label>
                                    <select class="form-select" v-model="datos_propuesta.modalidad">
                                        <option value="remoto">Remoto</option>
                                        <option value="hibrido">Híbrido</option>                                        
                                        <option value="presencial">Presencial</option>
                                    </select>
                                    <small v-if="errors.modalidad" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.modalidad[0]}}</small>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="descripcion" class="form-label">6. Descripción </label>
                                    <textarea class="form-control" id="descripcion" placeholder="Escriba su respuesta" cols="30" rows="1" v-model="datos_propuesta.descripcion"></textarea>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="fecha_postulacion" class="form-label">7. Fecha límite de postulación<span class="text-danger fst-italic">*</span></label>
                                    <input type="date" class="form-control" id="fecha_postulacion" v-model="datos_propuesta.fecha_limite_postulacion">
                                    <small v-if="errors.fecha_limite_postulacion" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.fecha_limite_postulacion[0]}}</small>
                                </div>        
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="descripcion_file" class="form-label">8. Adjuntar archivo de descripción de puesto</label>
                                    <input type="file" class="form-control" id="descripcion_file" accept=".pdf,.xls,.xlsx,.doc,.docx" placeholder="Escriba su respuesta" @change="obtenerArchivo($event)">
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="imagen_file" class="form-label">9. Imagen de la oferta</label>
                                    <input type="file" class="form-control" id="imagen_file" accept="image/*" placeholder="Escriba su respuesta" @change="obtenerImagen($event)">
                                </div>                        
                            </div>
                        </div>
                        <div class="card-footer" style="background-color: #FFCC01;">
                            <div class="col-12 text-center">
                                <button type="button" class="btn btn-lg btn-dark pe-5 ps-5" @click="almacenarPropuesta()">Enviar</button>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>  
        </div>
    </div>
</template>
<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import { guardarPropuesta } from "@/services/PropuestasEmpleoService.js";
    import { useRouter } from "vue-router";
    import Swal from 'sweetalert2';

    const router = useRouter();
    const datos_propuesta = ref({});
    const errors = ref({});
    const image = ref(null);
    const urlImage = ref(null);
    const archivo = ref(null);
    const urlArchivo = ref(null);
    const obtenerImagen = (event) => {
        image.value = event.target.files[0];
        if (image.value != null) {
            const reader = new FileReader();
            reader.onload = (e) => urlImage.value = e.target.result;
            reader.readAsDataURL(image.value);
        }
    }
    const obtenerArchivo = (event) => {
        archivo.value = event.target.files[0];
        if (archivo.value != null) {
            const reader = new FileReader();
            reader.onload = (e) => urlArchivo.value = e.target.result;
            reader.readAsDataURL(archivo.value);
        }
    }
    const almacenarPropuesta = async () => {
        errors.value = {};
        try {
            let formulario = new FormData();
            if(image.value != null) {
                formulario.append('imagen_oferta', image.value);
            }
            if(archivo.value != null) {
                formulario.append('descripcion_archivo', archivo.value);
            }
            formulario.append('empresa', datos_propuesta.value.empresa);
            formulario.append('email', datos_propuesta.value.email);
            formulario.append('contacto', datos_propuesta.value.contacto);
            formulario.append('puesto', datos_propuesta.value.puesto);
            formulario.append('modalidad', datos_propuesta.value.modalidad);
            formulario.append('descripcion', datos_propuesta.value.descripcion);
            formulario.append('fecha_limite_postulacion', datos_propuesta.value.fecha_limite_postulacion);
            const listaNulos = [];
            for (let [key, value] of formulario.entries()) {
                if (value == '' || value == 'null' || value == 'undefined') {
                    listaNulos.push(key);
                }
            }
            listaNulos.forEach(key => formulario.delete(key));
            console.log(formulario);
            const { data } = await guardarPropuesta(formulario);
            datos_propuesta.value = {};
            router.push({ path: "/" });
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Registro exitoso!",
            });
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
                console.log(errors.value);
            } else {
                console.log(error);
            }
        }
    }

</script>
<style>
.form {
    background-color: #303644;
}
</style>