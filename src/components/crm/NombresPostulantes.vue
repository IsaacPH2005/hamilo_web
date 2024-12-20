<template>
    <div class="col-12 col-md-9">
        <div class="card ">
            <div class="card-header text-center">
                <h3 class="card-title"><i class="fa-solid fa-users"></i> Seleccionar Postulación para entrevista</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="col-12">
                            <label class="form-label font-weight-bolder  text-sm">Buscador</label>
                            <input type="text" class="form-control" v-model="searchPersona"
                                placeholder="Nombre, Apellido, CI..." @change="filtrarPersona()">
                        </div>
                        <br>
                        <div class="table-responsive">
                            <table class="table align-items-center justify-content-center text-sm ">
                                <thead class="table-gray-personalizado ">
                                    <tr class="text-white">
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Id</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            User Id</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Nombre</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            CI</th>
                                        <th class="text-uppercase font-weight-bolder text-center text-center">
                                            Batch</th>
                                        <th class="text-uppercase font-weight-bolder text-center text-center">
                                            Especialidad</th>
                                        <th class="text-uppercase font-weight-bolder text-center text-center">
                                            Estado</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Descripcion</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="nombrepostu.length === 0">
                                        <td colspan="9" class="text-center">
                                            No se encuentran datos disponibles
                                        </td>
                                    </tr>
                                    <tr v-for="(item, indice) in nombrepostu">

                                        <td class="text-center ">
                                            {{ item.id }}
                                        </td>
                                        <td class="text-center ">
                                            {{ item.user_id }}
                                        </td>
                                        <td class="text-center ">
                                            <span> {{ item.users.datos_generales.nombre + `
                                                `+ item.users.datos_generales.apellido }}</span>
                                        </td>
                                        <td class="text-center">
                                            {{ item.users.datos_generales.ci }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.batch.version }}
                                        </td>
                                        <td class="text-center">
                                            {{ item.batch.crm_especialidades.nombre }}
                                        </td>
                                        <td class="text-center">
                                            <span class="badge"
                                                :class="item.estado == 'aprobado' ? 'badge-success-personalizado' : (item.estado == 'reprobado' ? 'badge-danger-personalizado' : 'badge-secondary-personalizado')">{{
                                                    item.estado }}</span>
                                        </td>
                                        <td class="text-center">
                                            {{ item.descripcion }}
                                        </td>

                                        <td class="text-center">
                                            <button type="button" class="btn btn-primary btn-sm"
                                                @click="mostrarpostulante(item)"><i
                                                    class="fa-solid fa-plus"></i></button>
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-12">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                        <button type="button" class="page-link" aria-label="Previous"
                                            @click="paginaPrev()">
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>
                                    <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                        v-for="item in paginacion.total">
                                        <button type="button" class="page-link"
                                            :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''"
                                            @click="paginaCambio(item)">
                                            {{ item }}
                                        </button>
                                    </li>
                                    <li class="page-item"
                                        :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
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
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { index, indexsearch } from '../../../src/services/Postulaciones';
import { useEntrevistaStore } from '@/stores/entrevistas';
const { entrevistapostulante, mostrarpostulante } = useEntrevistaStore();
onMounted(() => {
    listar();
});

const paginacion = ref({
    total: null,
    pagina: 1
})
const nombrepostu = ref([]);
const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina);
        paginacion.value.total = data.datos.last_page;
        nombrepostu.value = data.datos.data;
    } catch (error) {
        console.log(error);
    }
};
const searchPersona = ref('');
const filtrarPersona = async () => {
    try {
        const { data } = await indexsearch(searchPersona.value);
        nombrepostu.value = data.datos.data;
    } catch (error) {
        console.log(error);
    }
}

const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
//* Paginacion siguiente *
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
//* Paginacion por el nro *
const paginaCambio = (x) => {
    paginacion.value.pagina = x;
    listar();
}

</script>
<style></style>