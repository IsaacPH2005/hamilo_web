<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas fa-camera me-2"></i>Imagenes Web</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-body pb-1">
          <div class="row g-3">
            <div class="col-12 col-md-4 d-flex align-items-center">
              <div class="form-floating w-100">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                  v-model="paginaDD" @change="listar()">
                  <option value="" selected>Todos</option>
                  <option v-for="pagina in paginas" :key="pagina.id" :value="pagina.id">
                    {{ pagina.pagina }}
                  </option>
                </select>
                <label for="floatingSelect">Página</label>
              </div>
            </div>
            <div class="col-12 col-md-4 d-flex align-items-center">
              <div class="form-floating w-100">
                <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                  v-model="seccionDD" @change="listar()">
                  <option value="" selected>Todos</option>
                  <option v-for="seccion in secciones" :key="seccion.id" :value="seccion.id">
                    {{ seccion.seccion }}
                  </option>
                </select>
                <label for="floatingSelect">Sección</label>
              </div>
            </div>
            <div class="col-12 col-md-4 text-center">
              <button v-if="permisoStore.permisosUser.some(p => p === 'web imagenes crear')" type="button"
                class="btn btn-primary" @click="nueva()"><i class="fas fa-plus-circle me-2"></i> Agregar</button>
            </div>
            <div class="col-12">
              <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center text-sm">
                  <thead class="table-gray-personalizado">
                    <tr class="text-white">
                      <th class="text-uppercase font-weight-bolder text-center">
                        Item
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Página
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Sección
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Tipo de presentación
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Cantidad de imagenes
                      </th>
                      <th
                        v-if="permisoStore.permisosUser.some(p => p === 'web imagenes ver') || permisoStore.permisosUser.some(p => p === 'web imagenes editar')"
                        class="text-uppercase font-weight-bolder text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="datos.length == 0">
                      <td colspan="5" class="text-danger text-center">
                        No existen imagenes registradas para ninguna sección
                        dentro de las páginas
                      </td>
                    </tr>
                    <tr v-if="datos.length > 0" v-for="(dato, index) in datos" :key="dato.id">
                      <td class="text-center">
                        <p class="text-sm font-weight-bold ms-3">
                          {{ index + 1 }}
                        </p>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold ms-3">
                          {{ dato.pagina }}
                        </p>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold ms-3">
                          {{ dato.seccion }}
                        </p>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold ms-3">
                          {{ dato.tipo_presentacion }}
                        </p>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold ms-3">
                          {{ dato.cantidad_imagenes }}
                        </p>
                      </td>
                      <td class="text-center"
                        v-if="permisoStore.permisosUser.some(p => p === 'web imagenes ver') || permisoStore.permisosUser.some(p => p === 'web imagenes editar')">
                        <div class="btn-group btn-group-sm">
                          <i v-if="permisoStore.permisosUser.some(p => p === 'web imagenes ver')"
                            class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                            @click="mostrar(dato.id)"></i>
                          <i v-if="permisoStore.permisosUser.some(p => p === 'web imagenes editar')"
                            class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                            @click="editar(dato.id)"></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="col-12">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                      <li class="page-item">
                        <button type="button" class="page-link" :class="paginacion.pagina_actual <= 1 ? 'disabled' : ''
                          " aria-label="Previous" @click="pagina_anterior()">
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li v-if="paginacion.pagina_actual > 1" class="page-item">
                        <button type="button" class="page-link" @click="pagina_actual(paginacion.pagina_actual - 1)">
                          {{ paginacion.pagina_actual - 1 }}
                        </button>
                      </li>
                      <li class="page-item">
                        <button type="button" class="page-link bg-gray-700 text-white"
                          @click="pagina_actual(paginacion.pagina_actual)">
                          {{ paginacion.pagina_actual }}
                        </button>
                      </li>
                      <li v-if="paginacion.pagina_actual < paginacion.limit" class="page-item">
                        <button type="button" class="page-link" @click="pagina_actual(paginacion.pagina_actual + 1)">
                          {{ paginacion.pagina_actual + 1 }}
                        </button>
                      </li>
                      <li class="page-item">
                        <button type="button" class="page-link" :class="paginacion.pagina_actual >= paginacion.limit
                            ? 'disabled'
                            : ''
                          " @click="pagina_siguiente()" aria-label="Next">
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
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary-subtle">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Imagenes página
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card text-center mb-3" style="width: 100%;">
            <div class="card-body">
              <div class="row g-3">
                <div class="col-12">
                  <h3 class="card-title">{{ paginaSeccion.pagina?.pagina + ' - ' + paginaSeccion.seccion?.seccion }}</h3>
                  <h6><span
                      class="badge text-bg-success">{{ paginaSeccion.tipo_presentacion == 'c' ? 'Carrusel' : 'Estático' }}</span>
                  </h6>
                  <h5 class="card-title">Imagenes</h5>
                </div>
                <div class="col-12">
                  <div class="row gy-3">
                    <div class="col-6" v-for="imagen in paginaSeccion.imagenes" :key="imagen.id">
                      <div class="card border border-4" :class="imagen.is_deleted ? 'border-danger' : 'border-success'"
                        style="width: 100%;">
                        <div class="card-body">
                          <h6 class="card-title">{{ imagen.detalle }}</h6>
                        </div>
                        <img :src="urlBaseAsset + 'img/img_pagina/' + imagen.url_imagen" class="card-img-bottom"
                          alt="..." style="height: 100px;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { urlBaseAsset } from "@/services/Http";
import { useRouter } from "vue-router";
import { indexPaginas } from "@/services/PaginasService";
import { indexSecciones } from "@/services/SeccionesService";
import { index, show } from "@/services/PaginaSeccionService";
import { Modal } from "bootstrap";
import { usePaginaSeccionStore } from "@/stores/PaginaSeccionStore";
import { usePermisoStore } from "@/stores/PermisosStore";

const permisoStore = usePermisoStore();
const router = useRouter();
const useStore = usePaginaSeccionStore();
const datos = ref({});
const paginas = ref([]);
const secciones = ref([]);
const paginaDD = ref("");
const seccionDD = ref("");
let modal = null;
let instanciaModal = null;
const paginaSeccion = ref({});
const paginacion = ref({
  total: null,
  skip: 0,
  limit: 0,
  pagina_actual: 1,
});
onMounted(() => {
  cargarPaginas();
  cargarSecciones();
  listar();
  modal = document.getElementById('staticBackdrop');
  instanciaModal = new Modal(modal);
});

const cargarPaginas = async () => {
  const { data } = await indexPaginas();
  paginas.value = data.datos;
};

const cargarSecciones = async () => {
  const { data } = await indexSecciones();
  secciones.value = data.datos;
};

const listar = async () => {
  try {
    let formularioFiltro = {
      pagina: paginaDD.value,
      seccion: seccionDD.value,
    };
    const { data } = await index(formularioFiltro);
    datos.value = data.datos.data;
    console.log(datos.value);
  } catch (error) { }
};

const nueva = () => {
  useStore.id_pagina_seccion = 0;
  router.push({ path: "/pagina-imagenes-form" });
};

const pagina_siguinte = () => {
  paginacion.value.pagina_actual++;
  listar();
};
const pagina_anterior = () => {
  paginacion.value.pagina_actual--;
  listar();
};
const pagina_actual = (pagina) => {
  if (paginacion.pagina_actual != pagina) {
    paginacion.pagina_actual = pagina;
    listar();
  }
};
const mostrar = async (id) => {
  try {
    const { data } = await show(id);
    paginaSeccion.value = data.datos;
    instanciaModal.show();
  }
  catch (error) {
    console.log(error);
  }
};
const editar = (id) => {
  useStore.id_pagina_seccion = id;
  router.push({ path: "/pagina-imagenes-form" });
}
</script>
<style></style>
