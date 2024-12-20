<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i class="fas fa-regular fa-handshake me-2"></i>Beneficios
          </h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-2">

            <div class="col-12 text-center">
                <button type="button" class="btn btn-primary" @click="agregar()">
                  <i class="fas fa-plus-circle me-2"></i>
                  Agregar
                </button>
            </div>
            <div class="col-12">
              <div class="table-responsive">
                <table class="table align-items-center justify-content-center text-sm">
                  <thead class="table-gray-personalizado">
                    <tr class="text-black">
                      <th class="text-uppercase font-weight-bolder text-center">
                        item
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Icono
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Titulo
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center text-center">
                        Descripción
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
                    <tr v-for="(item, indice) in datos" :key="item.id">
                      <td class="text-center">
                        {{ indice + 1 }}
                      </td>
                      <td>
                        <img :src="urlBaseAsset + 'img/img_beneficios/' + item.icono" alt="" width="80px">

                      </td>
                      <td>
                        {{ item.tipo }}
                      </td>
                      <td>
                        {{ item.descripcion }}
                      </td>
                      <td class="text-center">
                        <span class="badge badge-success-personalizado"
                          :class="item.is_deleted ? 'bg-danger' : 'bg-success'">{{ item.is_deleted ? "Inactivo" :
                          "Activo" }}</span>
                      </td>

                      <td>
                        <div class="btn-group btn-group-sm">
                          <button class="btn btn-warning btn-xs" @click="editar(item.id)">
                            <i class="fas fa-pencil"></i>
                          </button>
                          <button class="btn btn-danger btn-xs" @click="estado(item.id)">
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="col-12">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                      <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                        <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li class="page-item" v-for="(item, index) in paginacion.total" :key="index"><button type="button"
                          class="page-link" :class="{ 'active': item == paginacion.pagina }"
                          @click="paginaCambio(item)">{{ item }}</button>
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
</template>
<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { cambioEstado, index } from "@/services/BeneficiosServicios";
import { urlBaseAsset } from "@/services/Http";

const datos = ref([]);
const router = useRouter();
const idBeneficio = ref('');
const paginacion = ref({
  total: null,
  pagina: 1,
});


const agregar = () => {
  router.push({ path: `beneficios-form` });
};
const editar = (param) => {
  router.push({ path: `beneficios-form/${param}` });
};
const estado = async (id) => {
  try {
    const { data } = await cambioEstado(id);
    listar();
  } catch (error) {
    console.log(error);
  }
};


onMounted(() => {
  listar();
});
const listar = async () => {
  try {
    const { data } = await index(paginacion.value.pagina);
    datos.value = data.datos.data;
    paginacion.value.total = data.datos.last_page;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const paginaNext = () => {
  paginacion.value.pagina++;
  listar();
};
const paginaPrev = () => {
  paginacion.value.pagina--;
  listar();
};
const paginaCambio = (param) => {
  paginacion.value.pagina = param;
  listar();
};
</script>
<style></style>
