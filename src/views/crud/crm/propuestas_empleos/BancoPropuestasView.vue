<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fa-solid fa-person-circle-check me-2"></i>Propuestas de empleo
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-4" v-for="(propuesta, index) in propuestas" :key="index">
                            <div class="card">                                
                                <div class="modal-body">
                                    <p class="text-uppercase text-center">INFORMACIÓN DE EMPRESA</p>
                                    <div class="form-group">
                                        <label for="empresa" class="form-label">Empresa <span class="text-danger fst-italic">*</span></label>
                                        <input type="text" class="form-control" id="empresa" placeholder="Escriba su respuesta" v-model="propuesta.empresa">
                                    </div>
                                    <div class="form-group">
                                        <label for="email" class="form-label">Correo electrónico <span class="text-danger fst-italic">*</span></label>
                                        <input type="email" class="form-control" id="email" placeholder="Escriba su respuesta" v-model="propuesta.email">                                   
                                    </div>
                                    <div class="form-group">
                                        <label for="telefono" class="form-label">Contacto</label>
                                        <input type="text" class="form-control" id="telefono" placeholder="Escriba su respuesta" v-model="propuesta.contacto">
                                    </div>                            
                                    <hr class="horizontal dark">
                                    <p class="text-uppercase text-center">INFORMACIÓN DE LA VACANTE</p>
                                    <div class="form-group">
                                        <label for="puesto" class="form-label">Puesto <span class="text-danger fst-italic">*</span></label>
                                        <input type="text" class="form-control" id="puesto" placeholder="Escriba su respuesta" v-model="propuesta.puesto">
                                    </div>
                                    <div class="form-group">
                                        <label for="modalidad" class="form-label">Modalidad <span class="text-danger fst-italic">*</span></label>
                                        <input type="text" class="form-control" id="puesto" placeholder="Escriba su respuesta" v-model="propuesta.modalidad">
                                    </div>
                                    <div class="form-group">
                                        <label for="fecha_postulacion" class="form-label">Fecha límite de postulación<span class="text-danger fst-italic">*</span></label>
                                        <input type="text" class="form-control" id="fecha_postulacion" :value="propuesta.fecha_limite_postulacion">                                
                                    </div> 
                                    <div class="row">
                                        <div class="col-6">
                                            <button v-if="propuesta.imagen_oferta" type="button" class="btn btn-danger" @click="descargarImagen(propuesta)">Descargar imagen</button>
                                        </div>
                                        <div class="col-6">
                                            <button v-if="propuesta.descripcion_archivo" type="button" class="btn btn-danger" @click="descargarArchivo(propuesta)">Descargar descripcion</button>
                                        </div>                     
                                    </div>                        
                                    <figure class="my-3" v-if="propuesta.imagen_oferta">
                                        <img :src="imagenPropuesta" alt="Imagen" class="img-fluid">
                                    </figure>
                                </div>
                            </div>
                        </div>                                                
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { mostrarPropuestasActivas, guardarPropuesta, cambiarEstadoPropuesta } from "@/services/PropuestasEmpleoService.js"
    import { urlBaseAsset } from '@/services/Http';
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { Modal } from 'bootstrap';
    import { usePermisoStore } from "@/stores/PermisosStore";
    import Swal from 'sweetalert2';

    const permisoStore = usePermisoStore();
    const datos_propuesta = ref({});
    const router = useRouter();
    const propuestas = ref(null);
    const isDisabled = ref(true);
    const errors = ref({});
    const image = ref(null);
    const urlImage = ref(null);
    const archivo = ref(null);
    const urlArchivo = ref(null);
    const propuestaSeleccionada = ref({});
    const imagenPropuesta = ref(null);
    const paginacion = ref({
        paginaActual: 1,
        paginaAnterior: null,
        paginaSiguiente: null
    });
    const listarPropuestas = async () => {
        try {
            const { data } = await mostrarPropuestasActivas(paginacion.value.paginaActual);
            propuestas.value = data.datos.data;
            paginacion.value.paginaAnterior = data.datos.prev_page_url;
            paginacion.value.paginaSiguiente = data.datos.next_page_url;
        } catch (error) {
            console.log(error)
        }
    }

    const mostrarFecha = (fecha) => {
        const date = new Date(fecha);
        const optionsWithDayName = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedWithDayName = new Intl.DateTimeFormat('es', optionsWithDayName).format(date);
        return formattedWithDayName;
    }

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
    const descargarImagen = (propuesta) => {
        const documento = `${urlBaseAsset}/propuestas/imagenes/${propuesta.imagen_oferta}`;
        window.open(documento, '_blank');
    }
    const descargarArchivo = (propuesta) => {
        const documento = `${urlBaseAsset}/propuestas/documentos/${propuesta.descripcion_archivo}`;
        window.open(documento, '_blank');
    }
    onMounted(() => {      
        listarPropuestas();
    })
</script>
<style></style>