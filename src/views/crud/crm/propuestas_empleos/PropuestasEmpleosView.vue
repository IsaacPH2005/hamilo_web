<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fa-solid fa-person-circle-check me-2"></i>Ofertas laborales
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" @click="agregarPropuesta()">
                                    <i class="fas fa-plus-circle me-2"></i> Agregar
                                </button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Item
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Empresa
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Vacante
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Fecha límite de postulación
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(propuesta, index) in propuestas" :key="index">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ propuesta.empresa }}</td>
                                            <td class="text-center">{{ propuesta.puesto }}</td>
                                            <td class="text-center">{{ mostrarFecha(propuesta.fecha_limite_postulacion) }}</td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="{'badge-danger-personalizado': propuesta.is_deleted, 'badge-success-personalizado': !propuesta.is_deleted}">
                                                    {{ propuesta.is_deleted ? 'Inactivo' : 'Activo' }}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"                                                        
                                                        @click="mostrarDescripcion(propuesta)"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                        :class="{ 'fa-check text-success': propuesta.is_deleted, 'fa-trash text-danger': !propuesta.is_deleted }"
                                                        @click="eliminaPropuesta(propuesta)"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="agregarPropuestaModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center">
                        <h5 class="modal-title" id="modal-title-notification">Nueva Propuesta</h5>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                            <i class="fa-regular fa-circle-xmark"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="text-uppercase text-center">INFORMACIÓN DE EMPRESA</p>
                            <div class="form-group">
                                <label for="empresa" class="form-label">Empresa <span class="text-danger fst-italic">*</span></label>
                                <input type="text" class="form-control" id="empresa" placeholder="Escriba su respuesta" v-model="datos_propuesta.empresa">
                                <small v-if="errors.empresa" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.empresa[0]}}</small>
                            </div>
                            <div class="form-group">
                                <label for="email" class="form-label">Correo electrónico <span class="text-danger fst-italic">*</span></label>
                                <input type="email" class="form-control" id="email" placeholder="Escriba su respuesta" v-model="datos_propuesta.email">
                                <small v-if="errors.email" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.email[0]}}</small>                                    
                            </div>
                            <div class="form-group">
                                <label for="telefono" class="form-label">Contacto (incluye el código del país)</label>
                                <input type="text" class="form-control" id="telefono" placeholder="Escriba su respuesta" v-model="datos_propuesta.contacto">
                            </div>                            
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">INFORMACIÓN DE LA VACANTE</p>
                            <div class="form-group">
                                <label for="puesto" class="form-label">Puesto <span class="text-danger fst-italic">*</span></label>
                                <input type="email" class="form-control" id="puesto" placeholder="Escriba su respuesta" v-model="datos_propuesta.puesto">
                                <small v-if="errors.puesto" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.puesto[0]}}</small>
                            </div>
                            <div class="form-group">
                                <label for="modalidad" class="form-label">5. Modalidad <span class="text-danger fst-italic">*</span></label>
                                <select class="form-select" v-model="datos_propuesta.modalidad">
                                    <option value="remoto">Remoto</option>
                                    <option value="hibrido">Híbrido</option>                                        
                                    <option value="presencial">Presencial</option>
                                </select>
                                <small v-if="errors.modalidad" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.modalidad[0]}}</small>
                            </div>
                            <div class="form-group">
                                <label for="fecha_postulacion" class="form-label">7. Fecha límite de postulación<span class="text-danger fst-italic">*</span></label>
                                <input type="date" class="form-control" id="fecha_postulacion" v-model="datos_propuesta.fecha_limite_postulacion">
                                <small v-if="errors.fecha_limite_postulacion" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.fecha_limite_postulacion[0]}}</small>
                            </div>
                            <div class="form-group">
                                <label for="descripcion_file" class="form-label">8. Adjuntar archivo de descripción de puesto</label>
                                <input type="file" class="form-control" id="descripcion_file" accept=".pdf,.xls,.xlsx,.doc,.docx" placeholder="Escriba su respuesta" @change="obtenerArchivo($event)">
                            </div>
                            <div class="form-group">
                                <label for="imagen_file" class="form-label">9. Imagen de la oferta <span class="text-danger fst-italic">*</span></label>
                                <input type="file" class="form-control" id="imagen_file" accept="image/*" placeholder="Escriba su respuesta" @change="obtenerImagen($event)">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="almacenarPropuesta()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <div class="modal fade" id="verPropuestaModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header d-flex align-items-center">
                        <h5 class="modal-title" id="modal-title-notification">Detalle Propuesta</h5>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModalVer()">
                            <i class="fa-regular fa-circle-xmark"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p class="text-uppercase text-center">INFORMACIÓN DE EMPRESA</p>
                        <div class="form-group">
                            <label for="empresa" class="form-label">Empresa <span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" id="empresa" placeholder="Escriba su respuesta" v-model="propuestaSeleccionada.empresa">
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Correo electrónico <span class="text-danger fst-italic">*</span></label>
                            <input type="email" class="form-control" id="email" placeholder="Escriba su respuesta" v-model="propuestaSeleccionada.email">                                   
                        </div>
                        <div class="form-group">
                            <label for="telefono" class="form-label">Contacto</label>
                            <input type="text" class="form-control" id="telefono" placeholder="Escriba su respuesta" v-model="propuestaSeleccionada.contacto">
                        </div>                            
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">INFORMACIÓN DE LA VACANTE</p>
                        <div class="form-group">
                            <label for="puesto" class="form-label">Puesto <span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" id="puesto" placeholder="Escriba su respuesta" v-model="propuestaSeleccionada.puesto">
                        </div>
                        <div class="form-group">
                            <label for="modalidad" class="form-label">Modalidad <span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" id="puesto" placeholder="Escriba su respuesta" v-model="propuestaSeleccionada.modalidad">
                        </div>
                        <div class="form-group">
                            <label for="fecha_postulacion" class="form-label">Fecha límite de postulación<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" id="fecha_postulacion" :value="propuestaSeleccionada.fecha_limite_postulacion">                                
                        </div> 
                        <div class="row">
                            <div class="col-6">
                                <button v-if="propuestaSeleccionada.imagen_oferta" type="button" class="btn btn-danger" @click="descargarImagen(propuestaSeleccionada)">Descargar imagen</button>
                            </div>
                            <div class="col-6">
                                <button v-if="propuestaSeleccionada.descripcion_archivo" type="button" class="btn btn-danger" @click="descargarArchivo(propuestaSeleccionada)">Descargar descripcion</button>
                            </div>                     
                        </div>                        
                        <figure class="my-3" v-if="propuestaSeleccionada.imagen_oferta">
                            <img :src="imagenPropuesta" alt="Imagen" class="img-fluid">
                        </figure>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cerrarModalVer()">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { mostrarPropuestas, guardarPropuesta, cambiarEstadoPropuesta } from "@/services/PropuestasEmpleoService.js"
    import { urlBaseAsset } from '@/services/Http';
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { Modal } from 'bootstrap';
    import { usePermisoStore } from "@/stores/PermisosStore";
    import Swal from 'sweetalert2';

    const permisoStore = usePermisoStore();
    const datos_propuesta = ref({});
    let modal = null;
    let instanciaModal = null;
    let modalVer = null;
    let instanciaModalVer = null;
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
            const { data } = await mostrarPropuestas(paginacion.value.paginaActual);
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

    const eliminaPropuesta = async(propuesta) => {
        try {
            const { data } = await cambiarEstadoPropuesta(propuesta.id);
            propuesta.is_deleted = !propuesta.is_deleted;
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Estado modificado correctamente!",
            });
        } catch (error) {
            console.log(error);
        }
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
    const agregarPropuesta = () => {
        instanciaModal.show();
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
            const { data } = await guardarPropuesta(formulario);
            datos_propuesta.value = {};
            instanciaModal.hide();
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
    const mostrarDescripcion = (propuesta) => {
        instanciaModalVer.show();
        propuestaSeleccionada.value = propuesta;
        imagenPropuesta.value = `${urlBaseAsset}/propuestas/imagenes/${propuesta.imagen_oferta}`;
    }
    const descargarImagen = (propuesta) => {
        const documento = `${urlBaseAsset}/propuestas/imagenes/${propuesta.imagen_oferta}`;
        window.open(documento, '_blank');
    }
    const descargarArchivo = (propuesta) => {
        const documento = `${urlBaseAsset}/propuestas/documentos/${propuesta.descripcion_archivo}`;
        window.open(documento, '_blank');
    }
    const cerrarModal = () => {
        instanciaModal.hide();
        datos_propuesta.value = {};
    }
    const cerrarModalVer = () => {
        instanciaModalVer.hide();
    }
    onMounted(() => {
        modal = document.getElementById('agregarPropuestaModal');
        instanciaModal = new Modal(modal);
        modalVer = document.getElementById('verPropuestaModal');
        instanciaModalVer = new Modal(modalVer);        
        listarPropuestas();
    })
</script>
<style></style>