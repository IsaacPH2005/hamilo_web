<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-solid fa-window-restore me-2"></i>Modelos</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12">
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" @click="nuevoRegistro()" v-if="permisoStore.permisosUser.some( p=> p === 'modelo crear')"><i class="fas fa-plus-circle me-2"></i> Agregar</button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm" >
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Item</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Imagen</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Titulo</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Descripción</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="6" class="text-center">
                                                No se encuentran datos disponibles
                                            </td>
                                        </tr>
                                        <tr v-for="(dato, indice) in datos" :key="indice">
                                            <td class="text-center">
                                                {{indice + 1}}
                                            </td>
                                            <td class="text-center">
                                                <img :src="urlBaseAsset+'img/img-modelos/'+ dato.icono " :alt="dato.icono" width="60px" height="60px">                                                
                                            </td>
                                            <td class="text-center">
                                                {{dato.nombre}}
                                            </td>
                                            <td class="text-center">
                                                {{truncarDescripción(dato.descripcion, 50) }}...
                                            </td>
                                            <td class="text-center">
                                                <span class="badge" :class="dato.is_deleted ? 'bg-gradient-danger' : 'bg-gradient-success'" >{{ dato.is_deleted ? "Inactivo" : "Activo" }}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer" v-if="permisoStore.permisosUser.some(p=>p==='modelo ver')" @click="verDetalle(dato.id)"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="editar(dato.id)" v-if="permisoStore.permisosUser.some( p=> p === 'modelo editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer" :class="{ 'fa-check text-success': dato.is_deleted, 'fa-trash text-danger': !dato.is_deleted }" @click="estado(dato.id)" v-if="permisoStore.permisosUser.some( p=> p === 'modelo borrar')"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                            <button type="button" class="page-link" aria-label="Previous"
                                                @click="paginaPrev()">
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item" :class="{ 'active': item == paginacion.pagina }" v-for="(item, indice) in paginacion.total" :key="indice">
                                            <button type="button" class="page-link" :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''" @click="paginaCambio(item)" >
                                                {{ item }}
                                            </button>
                                        </li>
                                        <li class="page-item" :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                            <button type="button" class="page-link" aria-label="Next" @click="paginaNext()">
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
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-primary-subtle">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalle modelo</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card border border-5">
              <img :src="urlBaseAsset+'img/img-modelos/'+ modelo.icono " :alt="modelo.icono" class="card-img-top">
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <h6><span class="badge" :class="modelo.is_deleted ? 'bg-gradient-danger' : 'bg-gradient-success'" >{{ modelo.is_deleted ? "Inactivo" : "Activo" }}</span></h6>
                    <h3 class="card-title">{{modelo.nombre}}</h3>                    
                    <p class="card-text">{{modelo.descripcion}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { index, changeStatus, show} from "@/services/ModelosServices";
import { urlBaseAsset } from "@/services/Http";
import Swal from "sweetalert2";
import { usePermisoStore } from '@/stores/PermisosStore';
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
const permisoStore = usePermisoStore();
const router = useRouter();
const datos = ref([]);
const modelo= ref({});
const paginacion = ref({
    total: null,
    pagina: 1
})
let modal = null;
let instanciaModal = null;
const formulario = ref({
    nombre: '',
    descripcion: '',
    icono: null,
});

onMounted(() => {
  listar();
  modal = document.getElementById('staticBackdrop');
  instanciaModal = new Modal(modal);
});
const listar = async () => {
  try {
    const { data } = await index(paginacion.value.pagina);
    datos.value = data.datos;
    if (data.datos.length > 0) {
            paginacion.value.total = data.meta.last_page;
        }
    } catch (error) {
    //console.log(error);
  }
}

const nuevoRegistro = () => {
    router.push({ path: '/modelos-form' });
}

const estado = async param => {
  try {
    Swal.fire({
      title: "¿Está seguro de cambiar el estado?",
      text: "Está a punto de cambiar el estado del registro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar.",
      cancelButtonText: "¡No, cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await changeStatus(param);
        Swal.fire({
          title: "¡Bien!",
          text: "Estado cambiado.",
          icon: "success",
        });
    }
    listar();
    });
  } catch (error) {
    //console.log(error);
  }
}

const editar = param => {
    router.push({ path: `/modelos-form/${param}` });
}

const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
const paginaCambio = (x) => {
    paginacion.value.pagina = x;
    listar();
}

const verDetalle = async param => {
    try{
    const {data} = await show(param);
    modelo.value = data.datos;
    instanciaModal.show();
  }
  catch(error){
    //console.log(error);
  }
}

const truncarDescripción = (description, length) => {
    if (description === null) {
        return '';
    }
    return description.substring(0, length);
}

</script>
<style>
</style>