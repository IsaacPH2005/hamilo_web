<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Curriculas</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-8 d-flex align-items-center">
                            <input type="search" class="form-control" placeholder="Buscar..." v-model="search"
                                @change="listar()">
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Item</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Especialidad</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Modulo</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Tecnologia</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="9" class="text-center">No se encuentran datos disponibles</td>
                                        </tr>
                                        <tr v-for="(item, index) in datos" :key="item.id">
                                            <td class="text-center">
                                                {{ datos.length - index }}
                                            </td>
                                            <td>
                                                {{ item.especialidad?.nombre }}
                                            </td>
                                            <td>
                                                {{ item.modulo?.nombre }}
                                            </td>
                                            <td>
                                                {{ item.tecnologia?.nombre }}
                                            </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="item.is_deleted ? 'bg-gradient-danger' : 'bg-gradient-success'">{{
                                                        item.is_deleted
                                                    ? 'Inactivo' : 'Activo'}}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="editar(item.id)"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                        :class="{ 'fa-check text-success': item.is_deleted, 'fa-trash text-danger': !item.is_deleted }"
                                                        @click="estado(item.id)"></i>
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
</template>
<script setup>
import { changeStatusCurricula, index } from '@/services/CurriculaService';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const datos = ref([]);
const router = useRouter();
const search = ref('');
const paginacion = ref({
    total: null,
    pagina: 1
})
const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina, search.value);
        datos.value = data.datos.data.sort((a, b) => b.id - a.id);
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listar();
})
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
const estado = async (param) => {
    try {
        const { data } = await changeStatusCurricula(param);
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
const editar = async (param) => {
    router.push({ path: `/curricula-nueva/${param}` });
}
</script>
<style></style>