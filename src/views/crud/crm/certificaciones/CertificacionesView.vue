<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i class="fas fa-graduation-cap"></i> Certificaciones registradas
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
                placeholder="Buscar certificación..."
                aria-label="Buscar certificacion"
                aria-describedby="addon-wrapping"
                v-model="buscar"
                @input="getCertificaciones"
              />
            </div>
            <div class="col-12 col-md-4 text-center">
              <button
                type="button"
                class="btn btn-primary mt-3"
                @click="nueva"
                v-if="
                  permisoStore.permisosUser.some(
                    (p) => p === 'certificacion crear'
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
                        Nombre de la certificación
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Archivo
                      </th>
                      <th class="text-uppercase font-weight-bolder text-center">
                        Fecha de Modificación
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
                    <tr v-if="certificaciones.length === 0">
                      <td colspan="6" class="text-center">
                        No se encuentran datos disponibles
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="(dato, index) in certificaciones"
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
                          {{ dato.user.datos_generales.nombre }}
                          {{ dato.user.datos_generales.apellido }}
                        </p>
                      </td>
                      <td>
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
                        <div>
                          <template v-if="dato.storage_url">
                            <template
                              v-if="isFileType(dato.storage_url, 'pdf')"
                            >
                              <i
                                class="fa-solid fa-file-pdf file-icon clickable-icon"
                                @click="openModal(dato.storage_url)"
                              ></i>
                            </template>
                            <template
                              v-if="
                                isFileType(dato.storage_url, 'doc') ||
                                isFileType(dato.storage_url, 'docx')
                              "
                            >
                              <i
                                class="fa-solid fa-file-word file-icon clickable-icon"
                                @click="openModal(dato.storage_url)"
                              ></i>
                            </template>
                            <template
                              v-if="
                                isFileType(dato.storage_url, 'jpg') ||
                                isFileType(dato.storage_url, 'png')
                              "
                            >
                              <i
                                class="fa-solid fa-file-image file-icon clickable-icon"
                                @click="openModal(dato.storage_url)"
                              ></i>
                            </template>
                            <template
                              v-if="
                                isFileType(dato.storage_url, 'xls') ||
                                isFileType(dato.storage_url, 'xlsx')
                              "
                            >
                              <i
                                class="fa-solid fa-file-excel file-icon clickable-icon"
                                @click="openModal(dato.storage_url)"
                              ></i>
                            </template>
                          </template>
                          <template v-else>
                            <span class="text-italic">Sin archivo</span>
                          </template>
                        </div>
                      </td>
                      <td class="text-center">
                        <p class="text-sm font-weight-bold">
                          {{ formatDate(dato.updated_at) }}
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
                      <td class="text-center">
                        <i
                          class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                          @click="openModal(dato.storage_url)"
                          v-if="
                            permisoStore.permisosUser.some(
                              (p) => p === 'certificacion ver'
                            )
                          "
                        >
                        </i>
                        <i
                          class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                          @click="editar(dato.id)"
                          v-if="
                            permisoStore.permisosUser.some(
                              (p) => p === 'certificacion editar'
                            )
                          "
                        >
                        </i>
                        <i
                          class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                          :class="{
                            'fa-check text-success': dato.is_deleted,
                            'fa-trash text-danger': !dato.is_deleted,
                          }"
                          @click="cambiarEstadoCertificacion(dato.id)"
                          v-if="
                            permisoStore.permisosUser.some(
                              (p) => p === 'certificacion borrar'
                            )
                          "
                        >
                        </i>
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
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary-subtle">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Vista Previa del Archivo
          </h1>
          <div>
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleFullscreen"
            >
              <i :class="fullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
            </button>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
        <div class="modal-body">
          <div v-if="modalFileType === 'image'">
            <img
              :src="`${urlBaseAsset}${modalFileUrl}`"
              alt="Vista previa de la imagen"
              class="img-fluid"
              style="max-width: 100%; height: auto"
            />
          </div>
          <div v-if="modalFileType === 'pdf'">
            <embed
              :src="`${urlBaseAsset}${modalFileUrl}`"
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
          <div v-if="modalFileType === 'unknown'">
            <p>Tipo de archivo no soportado para vista previa.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            v-if="modalFileUrl"
            type="button"
            class="btn btn-primary"
            @click="descargarArchivo(`${urlBaseAsset}${modalFileUrl}`)"
          >
            Descargar <i class="fas fa-file-download"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getAllCertificaciones,
  deleteCertificacion,
} from "@/services/CertificacionesService";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import { urlBaseAsset } from "@/services/Http";
import { usePermisoStore } from "@/stores/PermisosStore";
import Swal from "sweetalert2";

const router = useRouter();
const permisoStore = usePermisoStore();
const certificaciones = ref([]);
const paginacion = ref({
  total: 1,
  pagina: 1,
  prev_page_url: null,
  next_page_url: null,
  items_per_page: 10,
});
const nameExpanded = ref({});
const buscar = ref("");
const modalFileUrl = ref("");
const modalFileType = ref("");
const fullscreen = ref(false);
let instanciaModal = null;

const formatDate = (dateString) => {
  if (!dateString) return "No disponible";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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

const toggleName = (id) => {
  nameExpanded.value[id] = !nameExpanded.value[id];
};

const isFileType = (url, type) => {
  if (!url) return false;
  return url.toLowerCase().endsWith(`.${type}`);
};

const openModal = (fileUrl) => {
  const extension = fileUrl.split(".").pop().toLowerCase();
  modalFileUrl.value = fileUrl;

  if (["jpg", "jpeg", "png"].includes(extension)) {
    modalFileType.value = "image";
  } else if (["pdf"].includes(extension)) {
    modalFileType.value = "pdf";
  } else {
    modalFileType.value = "unknown";
  }

  if (instanciaModal) {
    instanciaModal.show();
  }
};

const closeModal = () => {
  if (instanciaModal) {
    instanciaModal.hide();
  }
};

const toggleFullscreen = () => {
  fullscreen.value = !fullscreen.value;
  const modalDialog = document.querySelector("#staticBackdrop .modal-dialog");
  if (fullscreen.value) {
    modalDialog.classList.add("modal-fullscreen");
  } else {
    modalDialog.classList.remove("modal-fullscreen");
  }
};

const getCertificaciones = async () => {
  try {
    const response = await getAllCertificaciones(
      paginacion.value.pagina,
      buscar.value
    );

    if (response && response.datos) {
      certificaciones.value = response.datos.data || [];
      paginacion.value = {
        total: response.datos.last_page,
        pagina: response.datos.current_page,
        prev_page_url: response.datos.prev_page_url,
        next_page_url: response.datos.next_page_url,
        items_per_page: response.datos.per_page,
      };

      nameExpanded.value = certificaciones.value.reduce((acc, exp) => {
        acc[exp.id] = false;
        return acc;
      }, {});
    } else {
      console.error("Datos no están en el formato esperado:", response);
      certificaciones.value = [];
    }
  } catch (error) {
    console.error("Error al obtener certificaciones:", error);
    certificaciones.value = [];
  }
};

const cambiarEstadoCertificacion = async (id) => {
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
      const response = await deleteCertificacion(id);
      await getCertificaciones();
      Swal.fire("¡Modificado!", "Estado modificado correctamente.", "success");
    } catch (error) {
      console.error("Error al modificar el estado del registro:", error);
      Swal.fire("Error", "Hubo un problema al modificar el estado.", "error");
    }
  }
};

const nueva = () => {
  router.push("/certificaciones-form");
};

const editar = (id) => {
  router.push({ path: `/certificaciones-form/${id}` });
};

const descargarArchivo = (url) => {
  if (url) {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();

    const newWindow = window.open("", "_blank");
    newWindow.document.body.appendChild(link);
    link.click();
    newWindow.document.body.removeChild(link);
  }
};

const pagina_anterior = () => {
  if (paginacion.value.pagina > 1) {
    paginacion.value.pagina -= 1;
    getCertificaciones();
  }
};

const pagina_siguinte = () => {
  if (paginacion.value.pagina < paginacion.value.total) {
    paginacion.value.pagina += 1;
    getCertificaciones();
  }
};

onMounted(() => {
  getCertificaciones();
  const modalElement = document.getElementById("staticBackdrop");
  instanciaModal = new Modal(modalElement);
});
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

.file-icon {
  font-size: 4rem;
  margin-right: 0.5rem;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

.modal-image {
  width: 100%;
  height: auto;
}

.modal-pdf {
  width: 100%;
  height: 600px;
}

.btn-download {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn-download:hover {
  background-color: #0056b3;
}
.modal-fullscreen {
  max-width: 100%;
  margin: 0;
  height: 100%;
}

.modal-fullscreen .modal-dialog {
  height: calc(100% - 1rem);
  margin: 0;
}

.modal-fullscreen .modal-content {
  height: 100%;
  border-radius: 0;
}

.modal-fullscreen .modal-header {
  padding: 1rem;
}

.modal-fullscreen .modal-body {
  overflow-y: auto;
}
</style>
