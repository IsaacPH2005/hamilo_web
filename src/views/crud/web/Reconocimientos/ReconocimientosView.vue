<template>
  <div class="row">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-body pb-3">
          <h5 class="fw-bold"><i class="fa-solid fa-trophy"></i> Reconocimientos</h5>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-body px-0 pt-0 pb-2">
          <div class="row gy-2 p-3">
            <div class="col-12 col-md-8">
              <input type="search" class="form-control" placeholder="Reconocimiento..." v-model="search"
                @input="buscar" />
            </div>
            <div class="col-12 col-md-4">
              <div class="text-center">
                <button type="button" class="btn btn-primary" @click="agregar()"
                  v-if="permisoStore.permisosUser.some((p) => p === 'reconocimiento crear')">
                  <i class="fas fa-plus-circle"></i> Agregar
                </button>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="table-responsive px-2">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                  <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Indice
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Imagen
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Titulo
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Id empresa
                    </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Estado
                    </th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(dato, indice) in datos" :key="dato.id">
                    <td>
                      {{ indice + 1 }}
                    </td>
                    <td>
                        <img :src="urlBaseAsset+'img/img_reconocimientos/'+dato.imagen" class="rounded-circle me-2" alt="imagen" style="width: 80px; height: 80px;"/>
                    </td>
                    <td>
                      <div class="my-auto">
                        <h6 class="mb-0 text-sm">{{ dato.titulo }}</h6>
                      </div>
                    </td>
                    <td>
                      <p class="text-sm font-weight-bold mb-0">
                        {{ dato.empresa_id }}
                      </p>
                    </td>
                    <td>
                      <span class="badge" :class="dato.is_deleted
                        ? 'bg-gradient-danger'
                        : 'bg-gradient-success'
                        ">
                        {{ dato.is_deleted ? "Inactivo" : "Activo" }}
                      </span>
                    </td>
                    <td class="align-middle">
                      <!-- Botón con icono para acciones adicionales -->
                      <div class="btn-group">
                        <!-- Botón con icono para ver galardón -->
                        <button type="button" class="btn btn-link text-info mb-0" @click="verGalardon(dato.id)"
                          style="cursor: pointer" v-if="permisoStore.permisosUser.some(
                            (p) => p === 'reconocimiento ver'
                          )
                          " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          <i class="fas fa-eye text-info-personalizado"></i>
                        </button>
                        <button type="button" class="btn btn-link text-secondary mb-0" @click="editar(dato.id)"
                          style="cursor: pointer" v-if="permisoStore.permisosUser.some(
                            (p) => p === 'reconocimiento editar'
                          )
                          ">
                          <i class="fas fa-pencil text-warning-personalizado"></i>
                        </button>
                        <button type="button" class="btn btn-link text-secondary mb-0" @click="estado(dato.id)"
                          style="cursor: pointer" v-if="permisoStore.permisosUser.some(
                            (p) => p === 'reconocimiento borrar'
                          )
                          ">
                          <i class="fas" :class="dato.is_deleted
                            ? 'fa-check text-success'
                            : 'fa-trash text-danger'
                            "></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-12 d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item" :class="{ disabled: paginacion.pagina <= 1 }">
                  <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li class="page-item" :class="{ active: item == paginacion.pagina }"
                  v-for="(item, indice) in paginacion.total" :key="indice">
                  <button type="button" class="page-link" @click="paginaCambio(item)">
                    {{ item }}
                  </button>
                </li>
                <li class="page-item" :class="{ disabled: paginacion.pagina >= paginacion.total }">
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
  <!------- Modal ------------------->
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" :class="galardones.is_deleted
          ? 'bg-gradient-danger'
          : 'bg-gradient-success'
          ">
          <h5 class="modal-title text-white" id="staticBackdropLabel">
            <b>{{ galardones.titulo }}</b>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <img :src="urlBaseAsset+'img/img_reconocimientos/'+galardones.imagen" alt="" class="rounded-circle border border-5" :class="galardones.is_deleted
              ? 'border-danger'
              : 'border-success'
              " style="width: 150px; height: 150px" />
            <br />
            <span class="badge rounded-pill" :class="galardones.is_deleted
              ? 'bg-gradient-danger'
              : 'bg-gradient-success'
              ">
              {{ galardones.is_deleted ? "Inactivo" : "Activo" }}
            </span>
            <h3 class="mt-3">{{ galardones.titulo }}</h3>
          </div>
          <div class="container text-start mt-3">
            <div class="row">
              <div class="col-2">
                <span class="text-dark fs-6"><b>Detalle</b></span>
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
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { show, index, changeStatus } from "@/services/ReconocimientosService";
import { usePermisoStore } from "@/stores/PermisosStore";
import { urlBaseAsset } from "@/services/Http";
const permisoStore = usePermisoStore();
const router = useRouter();
const datos = ref({});
const search = ref("");
const galardones = ref({
  titulo: "",
  imagen: "",
  detalle: "",
  is_deleted: "",
});
const paginacion = ref({
  total: 0,
  pagina: 1,
});
const listar = async () => {
  try {
    const pagina = paginacion.value.pagina;
    const titulo = search.value;
    const { data } = await index(pagina, titulo);
    datos.value = data.datos.data || {};
    paginacion.value.total = data.datos.last_page;
  } catch (error) {
    console.log(error);
    datos.value = {}; // Manejo de error
  }
};
onMounted(() => {
  listar();
});
const estado = async (id) => {
  try {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Estás a punto de modificar el estado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, modificar!",
      cancelButtonText: "No, cancelar!",
    });
    if (result.isConfirmed) {
      // Encuentra el objeto en el array datos.value
      const dato = datos.value.find((item) => item.id === id);
      if (dato) {
        const nuevoEstado = !dato.is_deleted; // Cambia el estado actual
        const changeStatusResponse = await changeStatus(id, nuevoEstado);
        // Verifica que la respuesta de changeStatus contiene 'data'
        if (changeStatusResponse && changeStatusResponse.data) {
          dato.is_deleted = nuevoEstado; // Actualiza el estado en la lista
          Swal.fire({
            title: "¡Bien!",
            text: changeStatusResponse.data.mensaje,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          throw new Error(
            "La respuesta de cambio de estado no contiene datos esperados."
          );
        }
      } else {
        throw new Error("Dato no encontrado");
      }
    }
  } catch (error) {
    console.error("Error al cambiar el estado:", error);
    Swal.fire({
      title: "¡Error!",
      text: "Ocurrió un error al modificar el estado.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};
const verGalardon = async (id) => {
  try {
    const { data } = await show(id);
    // Asigna los datos del galardón a galardones.value
    if (data && data.datos) {
      galardones.value = data.datos; // Asigna el objeto datos a galardones.value
    } else {
      console.error("El objeto data no tiene la estructura esperada:", data);
    }
  } catch (error) {
    console.error("Error al obtener el galardón:", error);
    Swal.fire({
      title: "¡Error!",
      text: "No se pudo cargar la información del galardón.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};
const buscar = () => {
  console.log("Buscar con término:", search.value);
  datos.value = [];
  paginacion.value.pagina = 1;
  listar();
};
const paginaNext = () => {
  if (paginacion.value.pagina < paginacion.value.total) {
    paginacion.value.pagina++;
    listar();
  }
};
const paginaPrev = () => {
  if (paginacion.value.pagina > 1) {
    paginacion.value.pagina--;
    listar();
  }
};
const paginaCambio = (param) => {
  paginacion.value.pagina = param;
  listar();
};
const agregar = () => {
  router.push({ path: "/reconocimientos-form/" });
};
const editar = (param) => {
  router.push({ path: `/reconocimientos-form/${param}` });
};
</script>
<style>
.img-large {
  width: 200px;
  /* Ajusta el ancho */
  height: 200px;
  /* Ajusta la altura para mantener la proporción */
  object-fit: cover;
  /* Asegura que la imagen no se deforme */
  transition: transform 0.3s ease;
  /* Transición suave al agrandar */
}

.img-large:hover {
  transform: scale(2);
  /* Agrandar la imagen al pasar el mouse */
}
</style>