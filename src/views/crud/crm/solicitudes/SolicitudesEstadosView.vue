<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Solicitudes Estados</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8">
                            
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <button type="button" class="btn btn-info" v-if="permisoStore.permisosUser.some( p=> p === 'solicitud estado crear')" @click="agregarEstado()"><i class="fas fa-plus-circle me-2"></i> Agregar</button>
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
                                                Estado Solicitud</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center" v-if="permisoStore.permisosUser.some( p=> p === 'solicitud estado editar' || p === 'solicitud estado borrar')">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="estados.length>0" v-for="(estado,cont) in estados">
                                            <td class="text-center">{{cont+1}}</td>
                                            <td class="text-center">{{estado.estado}}</td>
                                            <td class="text-center">
                                                <p class="badge" :class="{'bg-info':estado.is_deleted==0, 'bg-secondary':estado.is_deleted==1}">{{estado.is_deleted==0?'Activo':'Inactivo'}}</p>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" v-if="permisoStore.permisosUser.some( p=> p === 'solicitud estado editar')" @click="mostrarModal(estado.id)"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer fa-trash text-danger"
                                                    v-if="permisoStore.permisosUser.some( p=> p === 'solicitud estado borrar')" @click="setStatusEstado(estado.id)"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p v-if="estados.length==0" class="text-center">
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
<div class="modal fade" id="modalEstados" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"><i class="fas fa-edit me-2"></i>{{idEstado!=0? "Editar Solicitud":"Agregar Solicitud"}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" v-model="estadoInput" :class="{'border-danger' : errors.estado}" class="form-control" placeholder="ingrese estado solicitud">
        <small class="text-danger fst-italic text-xs" v-if="errors.estado"><i class="fas fa-times me-1 ms-2"></i>{{ errors.estado[0] }}</small>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger me-2" @click="cerrarModal()"><i class="fas fa-reply me-2"></i>Cerrar</button>
        <button type="button" class="btn btn-primary" @click="guardarEstado()">Guardar <i class="fas ms-2" :class="{'fa-save': idEstado == 0, 'fa-edit': idEstado!=0, 'fa-spinner fa-spin': bandera != 0}"></i></button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { addSolicitudEstado, deleteSolicitudEstado, editarSolicitudEstado, getSolicitudEstado, getSolicitudEstados } from '@/services/SolicitudEstadosService';
import { usePermisoStore } from '@/stores/PermisosStore';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
const estados = ref([]);
const permisoStore = usePermisoStore();
const paginacion = ref({
    total: null,
    pagina: 1
});
let modal = null;
let instanciaModal = null;
const idEstado = ref(0);
const errors = ref({});
const estadoInput = ref('');
const bandera = ref(0);
onMounted(()=>{
    listarEstados();
    modal = document.getElementById('modalEstados');
    instanciaModal = new Modal(modal);
});

const listarEstados = async () => {
    try {
        const { data } = await getSolicitudEstados(paginacion.value.pagina);
        estados.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
async function mostrarModal(id) {
    idEstado.value=id;
    abrirModal();
    try {
        const { data } = await getSolicitudEstado(id);
        estadoInput.value = data.datos.estado;
    } catch (error) {
        console.log(error);
    }
    
}
function agregarEstado(){
    idEstado.value=0;
    abrirModal();
}
async function guardarEstado() {
    bandera.value=1;
    try {
        let formulario = {};
        formulario.estado = estadoInput.value;
        if(idEstado.value!=0){
            const { data } = await editarSolicitudEstado(idEstado.value,formulario);
        }else{
            const { data } = await addSolicitudEstado(formulario);
        }
        cerrarModal();
        Swal.fire({
            title: "Información Guardada",
            text: "Se guardo el registro conrrectamente",
            icon: "success"
        });
        listarEstados();
    } catch (error) {
        if(error.response.status == 422){
            errors.value = error.response.data.errors;
        }else{
            console.log("contacte con soporte");
        }
    }finally{
        bandera.value=0;
    }
}
function setStatusEstado(id) {
    try {
        Swal.fire({   
            title: "Estas seguro?",   
            text: "Estas a punto de modificar el estado!",   
            icon: "warning",  
            showCancelButton: true,   
            confirmButtonText: "Si, modificar!!"
        }).then(async (result) => {   
            if (result.isConfirmed) {   
                const { data } = await deleteSolicitudEstado(id);
                listarEstados();
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
const abrirModal = () => {
    instanciaModal.show();
}
function cerrarModal(){
    instanciaModal.hide();
    errors.value={};
    estadoInput.value="";
}
const paginaNext = () => {
    paginacion.value.pagina++;
    listarEstados();
}
const paginaPrev = () => {
    paginacion.value.pagina--;
    listarEstados();
}
const paginaCambio = param => {
    paginacion.value.pagina = param;
    listarEstados();
}
</script>
<style>
    
</style>