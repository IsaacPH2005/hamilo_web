<template
    v-if="permisoStore.permisosUser.some(p => p === 'usuario editar') || permisoStore.permisosUser.some(p => p === 'usuario crear')">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border border-0 shadow-lg">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Entrevistas Resultados</h5>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <div class="row gy-2">
                            
                            <div class="col-12">
                                <div class="table-responsive"
                                    v-if="permisoStore.permisosUser.some(p => p === 'postulacion ver') || permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                    <table class="table align-items-center justify-content-center text-sm ">
                                        <thead class="table-gray-personalizado ">
                                            <tr class="text-white">
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Id</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Nombre</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Tipo</th>
                                                <th class="text-uppercase font-weight-bolder text-center text-center">
                                                    Fecha de Entrevista</th>
                                                <th class="text-uppercase font-weight-bolder text-center text-center">
                                                    Estado</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Accion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="entrevistas.length === 0">
                                                <td colspan="9" class="text-center">
                                                    No se encuentran datos disponibles
                                                </td>
                                            </tr>
                                            <tr v-for="(item, indice) in entrevistas" :key="item.id">

                                                <td class="text-center ">
                                                    {{ indice + 1 }}
                                                </td>
                                                <td class="text-center ">
                                                    {{ item.postulaciones.users.datos_generales.nombre + ` ` +
                                                        item.postulaciones.users.datos_generales.apellido }}
                                                </td>
                                                <td class="text-center">
                                                    {{ item.tipo }}
                                                </td>
                                                <td class="text-center">
                                                    {{ item.fecha }} <br>
                                                    {{ item.hora_inicio }} - {{ item.hora_fin }}
                                                </td>
                                                <td class="text-center">
                                                    <span class="badge"
                                                    :class="item.estado == 'aprobado' ? 'bg-info' : 'bg-danger'">{{
                                                        item.estado }}</span>
                                                </td>

                                                <td class="text-center">
                                                    <div class="btn-group">
                                                        <i class="fas fa-exchange-alt fa-lg fs-5 btn-action cursor-pointer disabled" @click="item.estado == 'pendiente'? abrirModal(item.id):''"></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                                v-for="item in paginacion.total" :key="item">
                                                <button type="button" class="page-link"
                                                    :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''"
                                                    @click="paginaCambio(item)">
                                                    {{ item }}
                                                </button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next"
                                                    @click="paginaNext()">
                                                    <span aria-hidden="true">&raquo;</span>
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


 <!-- Modal estados -->
 <div class="modal fade bd-example-modal-lg mx-5" id="modalEntrevista" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header modal-header-custom">
                    <h5 class="modal-title text-white" id="modalDemoLabel">Cambio Estado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center  ">
                    <h5>Seleccionar el estado de la Entrevista</h5>
                    <div class="  d-flex justify-content-evenly ">
                        <button type="button" class="btn btn-secondary" @click="aprobarYAgregarARegistros('reprobado')"><i
                                class="fa-solid fa-times"></i> Reprobado</button>
                        <button type="button" class="btn btn-info" @click="aprobarYAgregarARegistros('aprobado')"> <i class="fas fa-check"></i> Aprobado</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>
<script setup>
import { onMounted, ref } from 'vue';
import { usePermisoStore } from '@/stores/PermisosStore';
import { cambiarEstadoAgregarARegistros, indexentrevistas } from '@/services/EntrevistasServices';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

const permisoStore = usePermisoStore();
let modalEntrevista = null;
let instanciaModalE = null;
let idEntrevista=0;

//------------------- Variables Entrevistas --------------------------

const entrevistas = ref([]);

const paginacion = ref({
    total: null,
    pagina: 1
})
//------------------- onMounted --------------------------
onMounted(() => {
    listar();
});
//------------------- Funciones Entrevistas --------------------------
//* Listar Datos en Tablas 
const abrirModal = (id) => {
    modalEntrevista = document.getElementById("modalEntrevista");
    instanciaModalE = new Modal(modalEntrevista);
    instanciaModalE.show();
    idEntrevista = id;
}
function cerrarModal(){
    instanciaModalE.hide();
}
const listar = async () => {
    try {
        const { data } = await indexentrevistas(paginacion.value.pagina);
        entrevistas.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
};

//* Paginacion anterior *
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
//* Paginacion siguiente *
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
//* Paginacion por el nro *
const paginaCambio = (x) => {
    paginacion.value.pagina = x;
    listar();
}


async function aprobarYAgregarARegistros(param) {
    try {
        const formulario = {
            resultado: param
        }
        const { data } = cambiarEstadoAgregarARegistros(idEntrevista, formulario);
        Swal.fire({
            icon: 'success',
            title: 'Estado Cambiado',
            text: 'Aprobado',
            confirmButtonText: 'Aceptar',
            showCancelButton: false,
        });
        cerrarModal();
        listar();
    } catch (error) {
        console.log(error);
    }finally{
        idEntrevista=0;
    }
}
</script>
<style>
    
</style>