<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder">
            <i class="fas fa-users"></i> Estudiantes del Batch {{ batchId }}
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
                type="search"
                class="form-control me-4"
                placeholder="Buscar Estudiantes..."
                v-model="buscar"
                @input="fetchUsers"
              />
            </div>

            <div class="col-12 col-md-4 text-center">
              <button
                type="button"
                class="btn btn-danger me-2"
                @click="volver"
              >
                <i class="fas fa-reply me-2"></i> Volver
              </button>
            </div>
          </div>

          <div class="table-responsive" v-if="usuarios.length > 0">
            <table class="table align-items-center justify-content-center text-sm">
              <thead class="table-gray-personalizado">
                <tr class="text-white">
                  <th class="text-uppercase font-weight-bolder text-center">Item</th>
                  <th class="text-uppercase font-weight-bolder text-center">Nombre</th>
                  <th class="text-uppercase font-weight-bolder text-center">Apellido</th>
                  <th class="text-uppercase font-weight-bolder text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
                  <td class="text-center">
                    <p class="text-sm font-weight-bold">
                      {{ (paginacion.pagina - 1) * paginacion.items_per_page + index + 1 }}
                    </p>
                  </td>
                  <td class="text-center">{{ usuario.users.datos_generales?.nombre }}</td>
                  <td class="text-center">{{ usuario.users.datos_generales?.apellido }}</td>
                  <td class="text-center">
                    <div class="btn-group btn-group-sm">
                      <i class="fa-solid fa-arrows-rotate text-info fa-lg fs-5 btn-action cursor-pointer" @click="cambioEgresado(usuario.user_id, 'egresado')" v-if="
                              permisoStore.permisosUser.some(
                                (p) => p === 'gestion egresados'
                              )"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="col-12">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li class="page-item" :class="{ disabled: paginacion.pagina <= 1 }">
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
                  <li class="page-item" :class="{ disabled: paginacion.pagina >= paginacion.total }">
                    <button
                      type="button"
                      class="page-link"
                      aria-label="Next"
                      @click="pagina_siguiente"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p>No se encuentran datos disponibles</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { obtenerUsuariosEstudiantes, cambiarRolUsuario } from '@/services/EgresadosService';
import Swal from 'sweetalert2';
import { usePermisoStore } from "@/stores/PermisosStore";
const permisoStore = usePermisoStore();
const router = useRouter();
const route = useRoute();
const usuarios = ref([]);
const paginacion = ref({
  total: 1,
  pagina: 1,
  prev_page_url: null,
  next_page_url: null,
  items_per_page: 10,
});
const buscar = ref("");
const error = ref(null);
const loading = ref(true);
const batchId = ref(route.params.batchId);
const selectedUserId = ref(null);
const selectedUserRole = ref("");

const fetchUsers = async (page = 1) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await obtenerUsuariosEstudiantes(batchId.value, page, buscar.value);
  

    if (response && response.data && response.data.datos) {
      const { datos } = response.data;
      if (datos.data) {
        usuarios.value = datos.data;
        paginacion.value = {
          pagina: datos.current_page,
          total: datos.last_page,
          items_per_page: datos.per_page,
        };
      } else {
        error.value = 'No se encontraron datos en la respuesta.';
      }
    } else {
      error.value = 'La respuesta no contiene la propiedad "datos".';
    }
  } catch (err) {
    console.error('Error al solicitar datos:', err);
    error.value = 'Error al solicitar datos.';
  } finally {
    loading.value = false;
  }
};

const cambioEgresado = (userId, rol) => {
  selectedUserId.value = userId; 
  selectedUserRole.value = rol;
  cambiarRol(); 
};

const cambiarRol = async () => {

  if (!selectedUserId.value || !['estudiante', 'egresado'].includes(selectedUserRole.value)) {
    Swal.fire('Error', 'Rol inválido o usuario no seleccionado.', 'error');
    return;
  }

  const { isConfirmed } = await Swal.fire({
    title: '¿Estás seguro?',
    text: `Vas a cambiar el rol  a "${selectedUserRole.value}".`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, cambiar',
    cancelButtonText: 'Cancelar'
  });

  if (isConfirmed) {
    try {
     
      const { data } = await cambiarRolUsuario(selectedUserId.value, selectedUserRole.value);
      

      if (data.success) {
        Swal.fire('Éxito', data.success, 'success');
        await fetchUsers(); 
      } else {
        Swal.fire('Error', 'No se pudo cambiar el rol.', 'error');
      }
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      Swal.fire('Error', 'Error al actualizar el rol: ' + error.message, 'error');
    } finally {
 
      selectedUserId.value = null;
      selectedUserRole.value = "";
    }
  }
};

const pagina_anterior = () => {
  if (paginacion.value.pagina > 1) {
    fetchUsers(paginacion.value.pagina - 1);
  }
};

const pagina_siguiente = () => {
  if (paginacion.value.pagina < paginacion.value.total) {
    fetchUsers(paginacion.value.pagina + 1);
  }
};

const volver = () => {
  router.push('/estudiantes');
};

onMounted(() => {
  fetchUsers();
});

watch(buscar, () => {
  fetchUsers();
});
</script>
<style scoped>
</style>
