<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Solicitudes Administración</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12">
                            <div class="row mt-2">
                                <div class="col-12 col-md-6 pe-0">
                                    <input type="search" v-model="buscador" @keyup="buscarSolicitudes()" class="form-control" placeholder="Buscar...">
                                </div>
                                <div class="col-8 col-md-4 pe-0">
                                    <select v-model="estado_id" class="form-select" @change="buscarSolicitudesPorEstado()">
                                        <option value="0">Seleccione Estado Solicitud...</option>
                                        <option :value="estado_solicitud.id" v-for="estado_solicitud in estados">{{estado_solicitud.estado}}</option>
                                    </select>
                                </div>
                                <div class="col-2 col-md-2 ps-0">
                                    <div class="btn-group">
                                    <button type="button" class="btn btn-info" @click="abrirModal()"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                        <div class="col-12 col-md-8">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="isActivo" value="0" @change="buscador!=''?buscarSolicitudes():buscarSolicitudesPorEstado()">
                                <label class="form-check-label" for="inlineRadio1">Activos</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="isActivo" value="1" @change="buscador!=''?buscarSolicitudes():buscarSolicitudesPorEstado()">
                                <label class="form-check-label" for="inlineRadio2">Inactivos</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="isActivo" value="2" @change="buscador!=''?buscarSolicitudes():buscarSolicitudesPorEstado()">
                                <label class="form-check-label" for="inlineRadio2">Ambos</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <RouterLink type="button" to="/solicitudes-estados" class="btn btn-info"><i class="fa-solid fa-share-from-square me-2"></i>Estados Solicitudes</RouterLink>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm" >
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Nro</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Imagen</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center text-center">
                                                Nombre</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Empresa</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Cargo</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Etapa</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Fecha</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="resultados.length>0" v-for="(solicitud,cont) in resultados">
                                            <td class="text-center">{{cont+1}}</td>
                                            <td class="align-middle text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <button class="btn btn-info btn-xs" @click="mostrarImagen(solicitud.url_imagen)">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{{solicitud.nombre}} {{ solicitud.apellido }}</td>
                                            <td>{{solicitud.empresa}}</td>
                                            <td>{{solicitud.cargo_postulado}}</td>
                                            <td>{{solicitud.estado}}</td>
                                            <td class="text-center">
                                                <p class="badge" :class="{'bg-info':solicitud.is_deleted==0, 'bg-secondary':solicitud.is_deleted==1}">{{solicitud.is_deleted==0?'Activo':'Inactivo'}}</p>
                                            </td>
                                            <td>{{formatearFecha(solicitud.updated_at)}}</td>                                           
                                        </tr>
                                    </tbody>
                                </table>
                                <p v-if="resultados.length==0" class="text-center">
                                    No se encuentran datos disponibles.
                                </p>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()"><span
                                                        aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" v-for="(item, indice) in paginacion.total" :key="indice">
                                                <button type="button" class="page-link" :class="{ 'bg-gray-700 text-white': item == paginacion.pagina }" @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next" @click="paginaNext()"><span
                                                        aria-hidden="true">&raquo;</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalEstadoSolicitud" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Solicitud Estado</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span class="badge text-bg-warning ms-2 mb-1" v-for="estado_solicitud in estados">{{ estado_solicitud.estado }}</span>              
                <input v-model="solicitudEstado" type="text" class="form-control mt-3" :class="{'border-danger' : errors.estado}" placeholder="agregar estado solicitud">
                <small class="text-danger fst-italic text-xs" v-if="errors.estado"><i class="fas fa-times me-1 ms-2"></i>{{ errors.estado[0] }}</small>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-warning" @click="cerrarModal()">Cerrar</button>
                <button type="button" class="btn btn-info" @click="agregarEstadoSolicitud()">Agregar</button>
            </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalImagen" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <img :src="`${urlBaseAsset}img/img_solicitudes/${imagen}`" class="img-fluid w-100">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cerrarModal()">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { getBuscarSolicitudes } from '@/services/SolicitudesService';
import { addSolicitudEstado, deleteSolicitudEstado, getSolicitudEstadosActivos } from '@/services/SolicitudEstadosService';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import { urlBaseAsset } from '@/services/Http';
import Swal from 'sweetalert2';
    const buscador = ref('');
    const resultados = ref([]);
    const estados = ref([]);
    const estado_id = ref(0);
    const isActivo = ref(2);
    const paginacion = ref({
        total: null,
        pagina: 1
    });
    let modal = null;
    let instanciaModal = null;
    const imagen = ref("");
    const solicitudEstado = ref('');
    const errors = ref({});
    onMounted(()=>{
        listarEstados();
    });
    async function buscarSolicitudes() {
        try {
            estado_id.value=0;
            if(buscador.value.length > 2){
                const url = 'query=' + buscador.value + '&select_id=' + parseInt(estado_id.value) + '&estado_id=' + parseInt(isActivo.value);
                const { data } = await getBuscarSolicitudes(paginacion.value.pagina,url);
                resultados.value = data.datos.data;
                paginacion.value.total = data.datos.last_page;
            }else{
                resultados.value = [];
            }
        } catch (error) {
            console.log(error);
            resultados.value=[];
        }
    }
    async function buscarSolicitudesPorEstado() {
        try {
            buscador.value='';
            if(estado_id.value!=0){
                const url = 'query=' + buscador.value + '&select_id=' + parseInt(estado_id.value) + '&estado_id=' + parseInt(isActivo.value);
                const { data } = await getBuscarSolicitudes(paginacion.value.pagina,url);
                resultados.value = data.datos.data;
                paginacion.value.total = data.datos.last_page;
            }else{
                resultados.value = [];
            }
        } catch (error) {
            console.log(error);
            resultados.value=[];
        }
    }
    const listarEstados = async () => {
        try {
            const { data } = await getSolicitudEstadosActivos();
            estados.value = data.datos;
        } catch (error) {
            console.log(error)
        }
    }
    function formatearFecha(fecha) {
        const fechaObj = new Date(fecha);
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return fechaFormateada;
    }
    const mostrarImagen = (urlImagen) => {
        imagen.value = urlImagen;
        modal = document.getElementById('modalImagen');
        instanciaModal = new Modal(modal);
        instanciaModal.show();
    }
    const abrirModal = () => {
        modal = document.getElementById('modalEstadoSolicitud');
        instanciaModal = new Modal(modal);
        instanciaModal.show();
    }
    function cerrarModal(){
        instanciaModal.hide();
    }
    const paginaNext = () => {
        paginacion.value.pagina++;
        buscarSolicitudes();
    }
    const paginaPrev = () => {
        paginacion.value.pagina--;
        buscarSolicitudes();
    }
    const paginaCambio = param => {
        paginacion.value.pagina = param;
        buscarSolicitudes();
    }
    async function borrarEstadoSolicitud(id) {
        try {
            const { data } = await deleteSolicitudEstado(id);
            listarEstados();
        } catch (error) {
            console.log(error);
        }
    }
    async function agregarEstadoSolicitud() {
        let datos = {};
        datos.estado = solicitudEstado.value;
        try {
            const { data } = await addSolicitudEstado(datos);
            cerrarModal();
            Swal.fire({
            title: "Agregado",
            text: "Nuevo estado de solicitud agregado!",
            icon: "success"
            });
            listarEstados();
            solicitudEstado.value="";
        } catch (error) {
            if(error.response.status == 422){
                errors.value = error.response.data.errors;
            }else{
                console.log("contacte con soporte");
            }
        }
    }
</script>

<style>
    
</style>