th<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Historial Fases</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-2">
            <div class="col-12  row d-flex align-items-center ">
              <div class="col-9">
                <input type="text" class="form-control" v-model="searchPersona"
                  placeholder="Nombre, Apellido, identificacion..."
                  v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')"
                  @change="filtrarPersona()">
              </div> <br>
              <div class="col-3 row">
                <div>
                  <div class="text-center">
                    <button type="button" class="btn btn-danger" @click="volver()"
                      v-if="permisoStore.permisosUser.some(p => p === 'postulacion crear')"><i
                      class="fas fa-reply me-2"></i>
                      Volver</button>
                  </div>
                </div>

              </div>
            </div>


            <div class="col-12 text-center" v-if="permisoStore.permisosUser.includes('postulacion ver') &&
              !permisoStore.permisosUser.includes('postulacion editar') &&
              !permisoStore.permisosUser.includes('postulacion crear')">
              <h1>{{ name }}</h1>
            </div>
            <div class="col-12">
              <div class="table-responsive"
                v-if="permisoStore.permisosUser.some(p => p === 'postulacion ver') || permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                <table class="table align-items-center justify-content-center text-sm ">
                  <thead class="table-gray-personalizado ">
                    <tr class="text-white">
                      <th class="text-uppercase font-weight-bolder text-center"
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        Id</th>
                      <th class="text-uppercase font-weight-bolder text-center"
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        Nombre</th>
                      <th class="text-uppercase font-weight-bolder text-center"
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        CI</th>
                      <th class="text-uppercase font-weight-bolder text-center"
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        Email</th>

                      <th class="text-uppercase font-weight-bolder text-center"
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, indice) in solicitudes" :key="indice">

                      <td class="text-center "
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        {{ item.user_id }}
                      </td>
                      <td class="text-center "
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        <span> {{ item.usuario.datos_generales.nombre + `
                          `+ item.usuario.datos_generales.apellido }}</span>
                      </td>
                      <td class="text-center "
                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                        <span> {{ item.usuario.datos_generales.ci }}</span>
                      </td>
                      <td class="text-center">
                        {{ item.usuario.email }}
                      </td>
                      <td class="text-center">
                        <div class="btn-group">
                          <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                            @click="listarmodal(item.user_id)"></i>

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
                      <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                      v-for="(item, indice) in paginacion.total" :key="indice">
                      <button type="button" class="page-link"
                        :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''" @click="paginaCambio(item)">
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
  <!-- Modal postulacionesFORM -->
  <div class="modal fade bd-example-modal-lg mx-5" id="modal_postulaciones" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header modal-header-custom">
          <h5 class="modal-title text-white" id="modalDemoLabel">Postulaciones en General</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
          <div class="col-12">
            <div class="card shadow-lg">
              <div class="card-body">
                <div class="row gy-2">
                  <div class="col-12 row">
                    <span><strong>User ID :</strong> {{ solicitudes3.id }}</span>

                    <h4 class="text-center">{{ solicitudes4.nombre + ` ` + solicitudes4.apellido }}</h4>



                    <div class="col-6">
                      <span><strong>CI: </strong> {{ solicitudes4.ci }}</span>
                    </div>

                    <div class="col-6">
                      <span><strong>Email: </strong>{{ solicitudes3.email }}</span>
                    </div>

                  </div>
                  <div class="row col-12 d-flex justify-content-center  py-3">
                    <div class="form-check form-check-inline col-6 col-md-2 ">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioTodos"
                        @change="showfasescambiopersonal('')" checked>
                      <label class="form-check-label" for="radioTodos">Todos</label>
                    </div>
                    <div class="form-check form-check-inline col-6 col-md-2">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioPrueba"
                        @change="showfasescambiopersonal('prueba')">
                      <label class="form-check-label" for="radioPrueba">Prueba</label>
                    </div>
                    <div class="form-check form-check-inline col-6 col-md-2">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioReprobado"
                        @change="showfasescambiopersonal('reprobado')">
                      <label class="form-check-label" for="radioReprobado">Reprobado</label>
                    </div>
                    <div class="form-check form-check-inline col-6 col-md-2">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioAprobado"
                        @change="showfasescambiopersonal('aprobado')">
                      <label class="form-check-label" for="radioAprobado">Aprobado</label>
                    </div>
                    <div class="form-check form-check-inline col-6 col-md-2">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radioEntrevista"
                        @change="showfasescambiopersonal('entrevista')">
                      <label class="form-check-label" for="radioEntrevista">Entrevista</label>
                    </div>
                  </div>


                  <div class="col-12 text-center" v-if="permisoStore.permisosUser.includes('postulacion ver') &&
                    !permisoStore.permisosUser.includes('postulacion editar') &&
                    !permisoStore.permisosUser.includes('postulacion crear')">
                    <h1>{{ name }}</h1>
                  </div>
                  <div class="col-12">
                    <div class="table-responsive"
                      v-if="permisoStore.permisosUser.some(p => p === 'postulacion ver') || permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                      <table class="table align-items-center justify-content-center text-sm ">
                        <thead class="table-gray-personalizado ">
                          <tr class="text-white">
                            <th class="text-uppercase font-weight-bolder text-center"
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              Id Postulacion</th>
                            <th class="text-uppercase font-weight-bolder text-center"
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              Especialidad</th>
                            <th class="text-uppercase font-weight-bolder text-center"
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              Versión</th>
                            <th class="text-uppercase font-weight-bolder text-center"
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              Fase</th>

                          </tr>
                        </thead>
                        <tr v-if="solicitudes5 == 1">
                          <td colspan="9" class="text-center">
                            No se encuentran datos disponibles
                          </td>
                        </tr>
                        <tbody v-for="(item, index) in solicitudes2" :key="index">

                          <tr>

                            <td class="text-center "
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              {{ item.id }}
                            </td>
                            <td class="text-center "
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              {{ item.batch.crm_especialidades.nombre }}
                            </td>
                            <td class="text-center "
                              v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                              {{ item.batch.version }}
                            </td>
                            <td class="text-center">
                              <span class="badge"
                                :class="item.estado == 'aprobado' ? 'badge-success-personalizado' : (item.estado == 'reprobado' ? 'badge-danger-personalizado' : 'badge-secondary-personalizado')">{{
                                  item.estado }}</span>
                            </td>



                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-12">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                          <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                            <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                              <span aria-hidden="true">&laquo;</span>
                            </button>
                          </li>
                          <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                            v-for="(item, indice) in paginacion.total" :key="indice">
                            <button type="button" class="page-link"
                              :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''"
                              @click="paginaCambio(item)">
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
        <div class=" d-flex justify-content-evenly">
          <button type="button" class="btn btn-danger" @click="closeModalpostulaciones()"><i
              class="fas fa-reply me-2"></i>Cerrar</button>
        </div>



      </div>
    </div>
  </div>



</template>
<script setup>

//------------------- Import Postulaciones --------------------------
import { onMounted, ref } from 'vue';
import { filtrofasesagrupado, filtrofasesagrupadoshow, indexsearchagrupado } from '../../../../services/Postulaciones';
import { Modal } from 'bootstrap';
//------------------- Import permisos --------------------------
import { usePermisoStore } from '@/stores/PermisosStore';
import { useRouter } from "vue-router";
//------------------- Import permisos --------------------------`
const permisoStore = usePermisoStore();
const router = useRouter();

//------------------- Variables Postulaciones --------------------------
const verbusqueda = ref(0);
const authe = ref(0);
const solicitudes = ref([]);
const name = ref([]);
const modalpostulaciones = ref(null);
const instanciamodalpostulaciones = ref(null);
const searchPersona = ref('');

//------------------- onMounted --------------------------
onMounted(() => {
  modalpostulaciones.value = document.getElementById('modal_postulaciones');
  instanciamodalpostulaciones.value = new Modal(modalpostulaciones.value);
  listar();
});

const selectporfasesa = ref('')
const selectporfasesb = ref('')
const showfasescambiopersonal = (a) => {
  selectporfasesb.value = a;
  paginacion1.value.pagina = 1;
  listarmodal(idshowmodal.value)
}
const paginacion = ref({
  total: null,
  pagina: 1
})
const paginacion1 = ref({
  total: null,
  pagina: 1
})
const listar = async () => {
  try {

    const { data } = await filtrofasesagrupado();


    if (data.datos.length > 0) {
      solicitudes.value = data.datos;
      verbusqueda.value = 0;
    } else {
      solicitudes.value = [];
    }
  } catch (error) {
    console.log(error);
  }
};
const idshowmodal = ref(0);
const solicitudes2 = ref([]);
const solicitudes3 = ref({});
const solicitudes4 = ref({});
const solicitudes5 = ref(0);
const listarmodal = async (id) => {
  instanciamodalpostulaciones.value.show();
  idshowmodal.value = id;
  try {
    const { data } = await filtrofasesagrupadoshow(idshowmodal.value, selectporfasesb.value, paginacion1.value.pagina);

    if (data.datos.data.length > 0) {
      solicitudes5.value = 0;
      paginacion.value.total = data.datos.last_page;
      solicitudes2.value = data.datos.data[0].postulaciones;
      solicitudes4.value = data.datos.data[0].usuario.datos_generales;
      solicitudes3.value = data.datos.data[0].usuario;
      verbusqueda.value = 0;
    } else {
      solicitudes5.value = 1;
      solicitudes2.value = [];
    }

  } catch (error) {
    console.log(error);
  }

};
const filtrarPersona = async () => {
  try {
    const { data } = await indexsearchagrupado(searchPersona.value);
    solicitudes.value = data.datos;
    verbusqueda.value = 0;
  } catch (error) {
    console.log(error);
  }
}

const closeModalpostulaciones = () => {
  instanciamodalpostulaciones.value.hide();
}

const volver = () => {
  router.push("/postulaciones");
}
</script>

<style>
/** ESTILOS PERSOANLIZADOS */
.text-warning-personalizado {
  color: rgb(255, 195, 0);
}

.badge-success-personalizado {
  color: #1aae6e;
  background-color: #b0eed3;
}

.badge-warning-personalizado {
  color: #c79c0f;
  background-color: rgb(255, 195, 0);
}


.badge-danger-personalizado {
  color: #f80031;
  background-color: #fdd1da;
}

.badge-secondary-personalizado {
  color: #646363;
  background-color: #bdbaba;
}

.table-gray-personalizado {
  background-color: #495057;
  color: white
}



.modal-header-custom {
  background-color: rgb(255, 195, 00);
  color: white;
}
</style>
