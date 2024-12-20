<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Solicitudes</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="isActivo" value="0" @change="getSolicitudesByUser()">
                                <label class="form-check-label" for="inlineRadio1">Activos</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="isActivo" value="1" @change="getSolicitudesByUser()">
                                <label class="form-check-label" for="inlineRadio2">Inactivos</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="isActivo" value="2" @change="getSolicitudesByUser()">
                                <label class="form-check-label" for="inlineRadio2">Ambos</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <RouterLink to="/solicitudes-form" type="button" class="btn btn-info" v-if="permisoStore.permisosUser.some( p=> p === 'solicitud crear')"><i class="fas fa-plus-circle me-2"></i> Agregar</RouterLink>
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
                                                Descripcion</th>
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
                                            <th
                                                class="text-uppercase font-weight-bolder text-center" v-if="permisoStore.permisosUser.some( p=> p === 'solicitud editar' || p === 'solicitud borrar')">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="solicitudes.length>0" v-for="(solicitud,cont) in solicitudes">
                                            <td class="text-center">{{cont+1}}</td>
                                            <td class="align-middle text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <button class="btn btn-info btn-xs" @click="mostrarImagen(solicitud.url_imagen)">
                                                        <i class="fas fa-eye"></i>
                                                    </button>
                                                </div>
                                                <!--<button type="button" class="btn btn-primary" @click="mostrarImagen(solicitud.url_imagen)">
                                                    <img :src="`${urlBaseAsset}/img/img_solicitudes/${solicitud.url_imagen}`" width="100px" height="100px">
                                                </button>-->
                                            </td>
                                            <td>{{solicitud.descripcion_estado}}</td>
                                            <td>{{solicitud.empresa}}</td>
                                            <td>{{solicitud.cargo_postulado}}</td>
                                            <td>{{solicitud.estado}}</td>
                                            <td class="text-center">
                                                <p class="badge" :class="{'bg-info':solicitud.is_deleted==0, 'bg-secondary':solicitud.is_deleted==1}">{{solicitud.is_deleted==0?'Activo':'Inactivo'}}</p>
                                            </td>
                                            <td>{{formatearFecha(solicitud.updated_at)}}</td>
                                            <td class="text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" v-if="permisoStore.permisosUser.some( p=> p === 'solicitud editar')" @click="editarSolicitud(solicitud.id)"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer fa-trash text-danger"
                                                    v-if="permisoStore.permisosUser.some( p=> p === 'solicitud borrar')" @click="setStatusSolicitud(solicitud.id)"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p v-if="solicitudes.length==0" class="text-center">
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
    <div class="modal fade" id="modalImagen" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <img :src="`${urlBaseAsset}img/img_solicitudes/${imagen}`" class="img-fluid w-100">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { cambiarEstado, obtenerSolicitudes, obtenerSolicitudesByUser } from '@/services/SolicitudesService';
import { useRouter } from 'vue-router';
import { usePermisoStore } from '@/stores/PermisosStore';
import { urlBaseAsset } from '@/services/Http';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
const solicitudes = ref([]);
const router = useRouter();
const permisoStore = usePermisoStore();
const paginacion = ref({
    total: null,
    pagina: 1
});
const isActivo = ref(2);
let modal = null;
let instanciaModal = null;
const imagen = ref("");
onMounted(()=>{
    getSolicitudesByUser();
    modal = document.getElementById('modalImagen');
    instanciaModal = new Modal(modal);
});
async function getSolicitudes() {
    try {
        const { data } = await obtenerSolicitudes();
        solicitudes.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
async function getSolicitudesByUser() {
    try {
        const { data } = await obtenerSolicitudesByUser(paginacion.value.pagina+"&estado_id="+parseInt(isActivo.value));
        solicitudes.value = data.datos.data.sort((a, b) => b.id - a.id);
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
const editarSolicitud = id => {
    router.push({path: 'solicitudes-form/'+id});
}
function setStatusSolicitud(id) {
    try {
        Swal.fire({   
            title: "Estas seguro?",   
            text: "Estas a punto de modificar el estado!",   
            icon: "warning",   
            showCancelButton: true,    
            confirmButtonText: "Si, modificar!!"
        }).then(async (result) => {   
            if (result.isConfirmed) {   
                const { data } = await cambiarEstado(id);
                getSolicitudesByUser();
                Swal.fire({       
                    title: "Bien!",       
                    text: data.mensaje,       
                    icon: "success",  
                });   
            } 
        });
    } catch (error) {
        console.log(error);
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
    instanciaModal.show();
}
const paginaNext = () => {
    paginacion.value.pagina++;
    getSolicitudesByUser();
}
const paginaPrev = () => {
    paginacion.value.pagina--;
    getSolicitudesByUser();
}
const paginaCambio = param => {
    paginacion.value.pagina = param;
    getSolicitudesByUser();
}
</script>
<style>
    
</style>