<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">                
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas fa-walking me-2"></i>Actividades</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-body pb-1">
          <div class="row">
            <div class="col-12 col-md-8 d-flex align-items-center">
              <input type="search" class="form-control me-4" placeholder="Buscar..." v-model="buscar"
              @change="listar()">
            </div>
            <div class="col-12 col-md-4 text-center">
              <button v-if="permisoStore.permisosUser.some(p=>p==='actividad crear')" type="button" class="btn btn-primary mt-3" @click="nueva()"><i class="fas fa-plus-circle me-2"></i> Agregar</button>
            </div>
          </div>
          <div class="table-responsive p-0">
            <table class="table align-items-center justify-content-center text-sm">
              <thead class="table-gray-personalizado">
                <tr class="text-white">
                  <th
                    class="text-uppercase font-weight-bolder text-center"
                  >
                    Item
                  </th>
                  <th
                    class="text-uppercase font-weight-bolder text-center"
                  >
                    Titulo
                  </th>
                  <th
                    class="text-uppercase font-weight-bolder text-center"
                  >
                    Fecha
                  </th>
                  <th
                    class="text-uppercase font-weight-bolder text-center"
                  >
                    Estado
                  </th>
                  <th v-if="permisoStore.permisosUser.some(p=>p==='actividad ver') || permisoStore.permisosUser.some(p=>p==='actividad editar') || permisoStore.permisosUser.some(p=>p==='actividad borrar')" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="datos.length == 0">
                  <td colspan="5" class="text-danger text-center"> No existen Actividades Registradas</td>
                </tr>
                <tr v-if="datos.length > 0" v-for="(dato,index) in datos" :key="dato.id">
                  <td class="text-center">
                    <p class="text-sm font-weight-bold ms-3">
                      {{ index+1 }}
                    </p>
                  </td>
                  <td class="text-center">
                    <p class="text-sm font-weight-bold mb-0">
                      {{ dato.titulo }}
                    </p>
                  </td>
                  <td class="text-center">
                    <p class="text-sm font-weight-bold ms-3">
                      {{ dato.fecha ? dato.fecha : "Sin fecha" }}
                    </p>
                  </td>
                  <td class="text-center">
                    <span
                      class="badge"
                      :class="
                        dato.is_deleted
                          ? 'badge-danger-personalizado'
                          : 'badge-success-personalizado'
                      "
                      >{{ dato.is_deleted ? "Inactivo" : "Activo" }}</span
                    >
                  </td>
                  <td class="text-center" v-if="permisoStore.permisosUser.some(p=>p==='actividad ver') || permisoStore.permisosUser.some(p=>p==='actividad editar') || permisoStore.permisosUser.some(p=>p==='actividad borrar')">
                    <div class="btn-group btn-group-sm">
                      <i v-if="permisoStore.permisosUser.some(p=>p==='actividad ver')" class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer" @click="mostrar(dato.id)"></i>
                      <i v-if="permisoStore.permisosUser.some(p=>p==='actividad editar')" class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="editor(dato.id)"></i>
                      <i v-if="permisoStore.permisosUser.some(p=>p==='actividad borrar')" class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer" :class="dato.is_deleted ? 'fa-check text-success' : 'fa-trash text-danger'" @click="cambiarEstado(dato.id)"
                      ></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="col-12">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      :class="paginacion.pagina_actual <= 1 ? 'disabled' : ''"
                      aria-label="Previous"
                      @click="pagina_anterior()"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li v-if="paginacion.pagina_actual>1" class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      @click="pagina_actual(paginacion.pagina_actual-1)"
                    >
                      {{ paginacion.pagina_actual-1 }}
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      type="button"
                      class="page-link bg-gray-700 text-white"
                      @click="pagina_actual(paginacion.pagina_actual)"
                    >
                      {{ paginacion.pagina_actual }}
                    </button>
                  </li>
                  <li v-if="paginacion.pagina_actual<paginacion.limit"  class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      @click="pagina_actual(paginacion.pagina_actual+1)"
                    >
                      {{ paginacion.pagina_actual+1 }}
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      type="button"
                      class="page-link"
                      :class="
                        paginacion.pagina_actual >= paginacion.limit
                          ? 'disabled'
                          : ''
                      "
                      @click="pagina_siguiente()"
                      aria-label="Next"
                    >
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
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary-subtle">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalle actividad</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card border bodrder-5" :class="actividad.is_deleted?'border-danger':'border-success'" style="width: 100%;">
            <img :src="urlBaseAsset + 'img/img_actividad/banners/' + actividad.url_banner" class="card-img-top" :alt="actividad.url_banner">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <h3 class="card-title">{{actividad.titulo}}</h3>
                  <h6><span class="badge " :class="actividad.is_deleted?'text-bg-danger':'text-bg-success'">{{actividad.is_deleted?'Eliminada':'Disponible'}}</span></h6>
                  <p class="card-text">{{actividad.detalle}}</p>
                </div>
                <div class="col-12">
                  <h5 class="card-title">Imagenes de apoyo</h5>
                  <div class="row">
                    <div class="col-6 col-md-4" v-for="imagen in actividad.imagenes" key="imagen.id">
                      <div class="card text-bg-dark">
                        <img :src="urlBaseAsset + 'img/img_actividad/imagenes/' + imagen.url_imagenes" class="card-img border border-4" :class="imagen.is_deleted?'border-danger':'border-success'" alt="imagen.url_imagenes">
                        <div class="card-img-overlay">
                          <p class="card-text">{{imagen.descripcion?imagen.descripcion:''}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { urlBaseAsset } from "@/services/Http";
import { useRouter } from "vue-router";
import { index, changeStatus, show } from "@/services/ActividadesService";
import { useActividadStore } from "@/stores/ActividadStore";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import Swal from "sweetalert2";
import { usePermisoStore } from "@/stores/PermisosStore";

const permisoStore =usePermisoStore();
const useStore = useActividadStore();
const router = useRouter();
const buscar = ref("");
const datos = ref({});
const actividad = ref({});
let modal = null;
let instanciaModal = null;
const paginacion = ref({
  total: null,
  skip: 0,
  limit: 0,
  pagina_actual: 1,
});
onMounted(() => {
  listar();
  modal = document.getElementById('staticBackdrop');
  instanciaModal = new Modal(modal);
});
const listar = async () => {
  try {
    let formularioBusqueda = {
      search: buscar.value,
      page: paginacion.value.pagina_actual,
    };
    const { data } = await index(formularioBusqueda);
    if (paginacion.value.total == null) {
      paginacion.value.pagina_actual = data.datos.current_page;
      paginacion.value.total = data.datos.total;
      paginacion.value.skip = data.datos.per_page;
      paginacion.value.limit = Math.ceil(
        data.datos.total / data.datos.per_page
      );
    }
    datos.value = data.datos.data;
  } catch (error) {
    console.log(error);
  }
};
const nueva = () => {
  useStore.id_actividad = 0;
  router.push({ path: "/actividad-form" });
};
const pagina_siguinte = () => {
  paginacion.value.pagina_actual++;
  listar();
};
const pagina_anterior = () => {
  paginacion.value.pagina_actual--;
  listar();
};
const pagina_actual = (pagina) =>{
  if(paginacion.pagina_actual != pagina){
    paginacion.pagina_actual = pagina;
    listar();
  }
};
const cambiarEstado = async (id) => {
  try {
    Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta a punto de modificar el estado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificar!",
      cancelButtonText: "No, cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await changeStatus(id);
        listar();
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
};
const editor = (id) => {
  useStore.id_actividad = id;
  router.push({ path: "/actividad-form" });
};
const mostrar = async (id) => {
  try{
    const {data} = await show(id);
    actividad.value = data.datos;
    instanciaModal.show();
  }
  catch(error){
    console.log(error);
  }
};
</script>
<style></style>
