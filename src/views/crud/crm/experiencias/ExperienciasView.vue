<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i class="fas fa-business-time"></i> Experiencias registradas
          </h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="row gy-2">
                <div class="col-12 col-md-8 d-flex align-items-center">
              <input
                  type="text"
                  class="form-control"
                  placeholder="Buscar experiencia..."
                  aria-label="Buscar experiencia"
                  aria-describedby="addon-wrapping"
                  v-model="buscar"
                  @input="getExperiencias"
                />
                
            </div>
            <div class="col-12 col-md-4 text-center">
              <button
                  type="button"
                  class="btn btn-primary me-2"
                  @click="nueva"
                  v-if="
                    permisoStore.permisosUser.some(
                      (p) => p === 'experiencia crear'
                    )
                  "
                >
                  <i class="fas fa-plus-circle me-2"></i> Agregar
                </button>
            </div>
            <div class="col-12">
              <div class="table-responsive">
                <table
                  class="table align-items-center justify-content-center text-sm"
                >
                  <thead class="table-gray-personalizado">
                    <tr class="text-white">
                      <th class="text-uppercase font-weight-bolder text-center">
                        Item
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                      Usuario
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Nombre de la experiencia
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Descripción
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Fecha de Inicio
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Fecha de Fin
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
                    <tr v-if="experiencias.length === 0">
                      <td colspan="7" class="text-center">
                        No se encuentran datos disponibles
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(dato, index) in experiencias"
                      :key="dato.id"
                    >
                      <td class="text-center">
                        <p class="text-sm font-weight-bold">
                          {{
                            (paginacion.pagina - 1) *
                              paginacion.items_per_page +
                            index +
                            1
                          }}
                        </p>
                      </td>
                      <td class="text-center">
      <p class="text-sm font-weight-bold">
        {{ dato.user.datos_generales.nombre }} {{ dato.user.datos_generales.apellido }}
      </p>
    </td>
                      <td class="text-center">
                        <div class="description-container">
                          <p
                            class="description-text"
                            :class="{ expanded: nameExpanded[dato.id] }"
                          >
                            {{
                              dato.nombre && dato.nombre.length > 20
                                ? formatText(dato.nombre, nameExpanded[dato.id])
                                : dato.nombre
                            }}
                          </p>
                          <button
                            v-if="dato.nombre && dato.nombre.length > 20"
                            class="btn btn-link description-toggle"
                            @click="toggleName(dato.id)"
                          >
                            {{
                              nameExpanded[dato.id] ? "Ver menos" : "Ver más"
                            }}
                          </button>
                        </div>
                      </td>
                      <td class="text-center">
                        <div class="description-container">
                          <p
                            class="description-text"
                            :class="{ expanded: descriptionExpanded[dato.id] }"
                          >
                            {{
                              dato.descripcion && dato.descripcion.length > 20
                                ? formatText(
                                    dato.descripcion,
                                    descriptionExpanded[dato.id]
                                  )
                                : dato.descripcion
                            }}
                          </p>
                          <button
                            v-if="
                              dato.descripcion && dato.descripcion.length > 20
                            "
                            class="btn btn-link description-toggle"
                            @click="toggleDescription(dato.id)"
                          >
                            {{
                              descriptionExpanded[dato.id]
                                ? "Ver menos"
                                : "Ver más"
                            }}
                          </button>
                        </div>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold">
                          {{ formatDate(dato.fecha_inicio) }}
                        </p>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold">
                          {{
                            getFechaFinDisplay(dato.fecha_fin, dato.actualidad)
                          }}
                        </p>
                      </td>
                      <td class="text-center">
                        <span
                          :class="
                            dato.is_deleted
                              ? 'badge badge-danger-personalizado'
                              : 'badge badge-success-personalizado'
                          "
                        >
                          {{ dato.is_deleted ? "Inactivo" : "Activo" }}
                        </span>
                      </td>
                      <td>
                        <div class="btn-group">
                          <i
                            class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                            @click="toggleDescription(dato.id)"
                            v-if="
                              permisoStore.permisosUser.some(
                                (p) => p === 'experiencia ver'
                              )
                            "
                          ></i>

                          <i
                            class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                            @click="editar(dato.id)"
                            v-if="
                              permisoStore.permisosUser.some(
                                (p) => p === 'experiencia editar'
                              )
                            "
                          ></i>

                          <i
                            class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                            :class="{
                              'fa-check text-success': dato.is_deleted,
                              'fa-trash text-danger': !dato.is_deleted,
                            }"
                            @click="cambiarEstadoExperiencia(dato.id)"
                            v-if="
                              permisoStore.permisosUser.some(
                                (p) => p === 'experiencia borrar'
                              )
                            "
                          ></i>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="col-12">
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                      <li
                        class="page-item"
                        :class="{ disabled: paginacion.pagina <= 1 }"
                      >
                        <button
                          type="button"
                          class="page-link"
                          aria-label="Previous"
                          @click="pagina_anterior"
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      <li class="page-item">
                        <button type="button" class="page-link bg-gray-700 text-white">
                          {{ paginacion.pagina }}
                        </button>
                      </li>
                      <li
                        class="page-item"
                        :class="{
                          disabled: paginacion.pagina >= paginacion.total,
                        }"
                      >
                        <button
                          type="button"
                          class="page-link"
                          aria-label="Next"
                          @click="pagina_siguinte"
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
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="descripcionModal"
    tabindex="-1"
    aria-labelledby="descripcionModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="descripcionModalLabel">
            {{ nombreModal }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p v-html="descripcionModal" class="modal-description"></p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getAllExperiencias,
  deleteExperiencia,
} from "@/services/ExperienciasService";
import { useRouter, useRoute } from "vue-router";
import { Modal } from "bootstrap";
import { usePermisoStore } from "@/stores/PermisosStore";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const permisoStore = usePermisoStore();
const userId = ref(route.params.userId);

const experiencias = ref([]);
const paginacion = ref({
  total: 1,
  pagina: 1,
  prev_page_url: null,
  next_page_url: null,
  items_per_page: 10,
});
const descriptionExpanded = ref({});
const nameExpanded = ref({});
const buscar = ref("");
const descripcionModal = ref("");
const nombreModal = ref("");

const formatDate = (dateString) => {
  if (!dateString) return "No disponible";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getFechaFinDisplay = (fechaFin, actualidad) => {
  if (actualidad && !fechaFin) {
    return "Actualidad";
  }
  return formatDate(fechaFin);
};

const formatText = (text, expanded) => {
  const maxLineLength = 20;
  const lines = [];
  for (let i = 0; i < text.length; i += maxLineLength) {
    lines.push(text.slice(i, i + maxLineLength));
  }
  return expanded
    ? lines.join("\n")
    : lines.slice(0, 1).join("\n") + (text.length > maxLineLength ? "..." : "");
};

const toggleDescription = (id) => {
  const experiencia = experiencias.value.find((exp) => exp.id === id);
  if (experiencia) {
    nombreModal.value = experiencia.nombre;
    descripcionModal.value = experiencia.descripcion;
    const descripcionModalElement = document.getElementById("descripcionModal");
    const modal = new Modal(descripcionModalElement);
    modal.show();
  }
};

const toggleName = (id) => {
  nameExpanded.value[id] = !nameExpanded.value[id];
};

const getExperiencias = async () => {
  try {
    const response = await getAllExperiencias(
      
      paginacion.value.pagina,
      buscar.value
    );

    if (response && response.data && response.data.datos) {
      const {
        data,
        current_page,
        last_page,
        prev_page_url,
        next_page_url,
        per_page,
      } = response.data.datos;

      if (Array.isArray(data)) {
        experiencias.value = data;
      } else {
        console.error(
          "La propiedad 'data' no es un arreglo:",
          response.data.datos
        );
        experiencias.value = [];
      }

      paginacion.value = {
        total: last_page,
        pagina: current_page,
        prev_page_url,
        next_page_url,
        items_per_page: per_page,
      };

      descriptionExpanded.value = experiencias.value.reduce((acc, exp) => {
        acc[exp.id] = false;
        return acc;
      }, {});

      nameExpanded.value = experiencias.value.reduce((acc, exp) => {
        acc[exp.id] = false;
        return acc;
      }, {});
    } else {
      console.error("Datos no están en el formato esperado:", response);
      experiencias.value = [];
    }
  } catch (error) {
    console.error("Error al obtener experiencias:", error);
    experiencias.value = [];
  }
};

const cambiarEstadoExperiencia = async (id) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "El estado se modificará.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, modificar",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    try {
      const response = await deleteExperiencia(id);
      await getExperiencias();
      Swal.fire("¡Modificado!", "Estado modificado correctamente.", "success");
    } catch (error) {
      console.error("Error al modificar el estado del registro:", error);
      Swal.fire("Error", "Hubo un problema al modificar el estado.", "error");
    }
  }
};

const nueva = () => {
  router.push("/experiencias-form");
};

const editar = (id) => {
  router.push({ path: `/experiencias-form/${id} ` });
};

const verExperiencia = (id) => {
  router.push({ path: `/experiencias/${id}` });
};

const pagina_anterior = () => {
  if (paginacion.value.pagina > 1) {
    paginacion.value.pagina -= 1;
    getExperiencias();
  }
};

const pagina_siguinte = () => {
  if (paginacion.value.pagina < paginacion.value.total) {
    paginacion.value.pagina += 1;
    getExperiencias();
  }
};

onMounted(getExperiencias);
</script>

<style scoped>
.description-container {
  position: relative;
}

.description-text {
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.description-text.expanded {
  white-space: pre-wrap;
  display: block;
}

.description-toggle {
  margin-top: 0.5rem;
  padding: 0;
}

.modal-description {
  white-space: pre-wrap;
}
</style>
