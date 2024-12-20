<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Batchs</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8 d-flex align-items-center">
                            <input type="search" class="form-control" placeholder="Buscar..." v-model="search"
                                @change="listar()">
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" @click="agregar()"
                                    v-if="permisoStore.permisosUser.some(p => p === 'batch crear')"><i
                                        class="fas fa-plus-circle me-2"></i>
                                    Agregar</button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Item</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Imagen</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                fecha</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                especialidad</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                version</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                fecha <span class="text-info">(Inicio)</span></th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                fecha <span class="text-info">(fin)</span></th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Requisitos</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                descripción</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="12" class="text-center">No se encuentran datos disponibles</td>
                                        </tr>
                                        <tr v-for="(item, index) in datos" :key="item.id">
                                            <td class="text-center fw-bold">
                                                {{ index + 1 }}
                                            </td>
                                            <td class="text-center">
                                                <img v-if="item.imagen != null" :src="item.imagen" alt="" width="70px"
                                                    height="60px">
                                                <p v-else>No hay imagen</p>
                                            </td>
                                            <td class="text-center">
                                                {{ formatDate(item.created_at) }}
                                            </td>
                                            <td>
                                                {{ item.crm_especialidades.nombre }}
                                            </td>
                                            <td>
                                                {{ item.version }}
                                            </td>
                                            <td>
                                                {{ item.fecha_inicio }}
                                            </td>
                                            <td>
                                                {{ item.fecha_fin }}
                                            </td>
                                            <td>
                                                <div v-if="item.requisitos != null">{{ item.requisitos }}</div>
                                                <div v-else>No hay requisitos</div>
                                            </td>
                                            <td>
                                                <span v-if="item.descripcion != null">{{ truncarDescripción(item.descripcion, 20) + '...' }}</span>
                                                <span v-else>No hay descripción</span>
                                                <span v-if="item.descripcion && item.descripcion.length > 20">
                                                    <a href="#" @click="mostrarDescripcion(item.id)">Ver
                                                        más</a>
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="item.is_deleted ? 'badge-danger-personalizado' : 'badge-success-personalizado'">{{
                                                        item.is_deleted
                                                    ? 'Inactivo' : 'Activo'}}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'batch ver')"
                                                        @click="verDetalle(item.id)"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="editar(item.id)"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'batch editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                        :class="{ 'fa-check text-success': item.is_deleted, 'fa-trash text-danger': !item.is_deleted }"
                                                        @click="estado(item.id)"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'batch borrar')"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12" v-show="datos != ''">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()"><span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" v-for="(item, indice) in paginacion.total"
                                                :key="indice">
                                                <button type="button" class="page-link"
                                                    :class="{ 'bg-gray-700 text-white': item == paginacion.pagina }"
                                                    @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next"
                                                    @click="paginaNext()"><span aria-hidden="true">&raquo;</span>
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
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Descripción</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ verDescripcionModal.descripcion }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { changeStatus, index, show } from '@/services/BatchService';
import { usePermisoStore } from '@/stores/PermisosStore';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const permisoStore = usePermisoStore();
const router = useRouter();
const datos = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
})
const search = ref('');
const verDescripcionModal = ref({});
let modal = null;
let instanciaModal = null;
onMounted(() => {
    modal = document.getElementById('staticBackdrop');
    instanciaModal = new Modal(modal);
    listar();
})
const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina, search.value.trim(), { especialidad_id: search.value.trim() });
        datos.value = data.datos.data.sort((a, b) => b.id - a.id); // Ordenar en orden descendente según la propiedad id
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}
const estado = async (param) => {
    try {
        const { data } = await changeStatus(param);
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Estado modificado correctamente!",
        });
        listar();
    } catch (error) {
        console.log(error);
    }
}
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
const paginaCambio = param => {
    paginacion.value.pagina = param;
    listar();
}
const agregar = () => {
    router.push({ path: `/batch-nueva` })
}
const editar = param => {
    router.push({ path: `/batch-nueva/${param}` });
}
const verDetalle = param => {
    router.push({ path: `/batch-detalle/${param}` })
}
const truncarDescripción = (description, length) => {
    if (description === null) {
        return '';
    }
    return description.substring(0, length);
}
const abrirModal = () => {
    instanciaModal.show();
}
const mostrarDescripcion = async (param) => {
    try {
        const { data } = await show(param);
        verDescripcionModal.value = {
            descripcion: data.datos.descripcion,
        }
        abrirModal();
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>