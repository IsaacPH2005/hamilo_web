<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-globe me-2"></i>Redes Sociales</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 text-center">
                                <button type="button" class="btn btn-primary" @click="agregar()"><i
                                        class="fas fa-plus-circle me-2"
                                        v-if="permisoStore.permisosUser.some(element => element === 'red social crear')"></i>
                                    Agregar</button>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase">
                                                Red Social
                                            </th>
                                            <th class="text-uppercase">
                                                Url
                                            </th>
                                            <th class="text-uppercase">
                                                Estado
                                            </th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="4" class="text-center">
                                                No se encuentran datos disponibles
                                            </td>
                                        </tr>
                                        <tr v-for="dato in datos" :key="dato.id" v-else>
                                            <td class="text-center">
                                                <i :class="dato.logo_img" style="font-size: 30px;"></i>
                                                <span class="ms-3 text-sm">{{ dato.nombre }}</span>
                                            </td>
                                            <td>
                                                <a :href="dato.url" class="link-primary" target="_blank">{{ dato.url }}</a>
                                            </td>
                                            <td class="text-center"><span class="badge" :class="dato.is_deleted ? 'badge-danger-personalizado':'badge-success-personalizado'">{{ dato.is_deleted?'Inactivo':'Activo'}}</span></td>  
                                            <td class="text-center">
                                                <!-- Botón con icono para acciones adicionales -->
                                                <div class="btn-group">
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="editar(dato.id)" v-if="permisoStore.permisosUser.some( p=> p === 'red social editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer" :class="{ 'fa-check text-success': dato.is_deleted, 'fa-trash text-danger': !dato.is_deleted }" @click="estado(dato.id)" v-if="permisoStore.permisosUser.some( p=> p === 'red social borrar')"></i>
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
                                                    @click="paginaPrev()"><span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" 
                                                v-for="(item, indice) in paginacion.total" :key="indice">
                                                <button type="button" class="page-link"
                                                    :class="{ 'text-white bg-gray-700': item == paginacion.pagina }"
                                                    @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled': paginacion.total <= paginacion.pagina }">
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
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { index, changeStatus } from "@/services/RedesSocialesService";
import Swal from 'sweetalert2';
import { usePermisoStore } from '@/stores/PermisosStore';
const permisoStore = usePermisoStore();
const router = useRouter();
const datos = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
});
onMounted(() => {
    listar();
})

const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina);
        if (data.datos.data.length > 0) {
            datos.value = data.datos.data;
            paginacion.value.total = data.datos.last_page;
        }
    } catch (error) {
        console.log(error);
    }
}
const estado = async param => {
    try {
        const { data } = await changeStatus(param);
        Swal.fire({
            title: "Estado modificado",
            text: "Estado modificado correctamente",
            icon: "success"
        });
        listar();
    } catch (error) {
        console.log(error);
    }
}
const agregar = () => {
    router.push({ path: '/redes-sociales-form/' });
};
const editar = param => {
    router.push({ path: `/redes-sociales-form/${param}` });
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

.badge-danger-personalizado {
    color: #f80031;
    background-color: #fdd1da;
}

.table-gray-personalizado {
    background-color: #495057;
    color: white
}
</style>
