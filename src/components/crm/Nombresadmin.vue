<template>
    <div class="col-12 col-md-3">
        <div class="card ">
            <div class="card-header text-center">
                <h3 class="card-title"><i class="fa-solid fa-clipboard-question"></i> Entrevistadores</h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12">
                        <div class="col-12 ">
                            <label class="form-label font-weight-bolder  text-sm">Buscador</label>
                            <input type="text" class="form-control" v-model="searchPersona"
                                placeholder="Nombre, Apellido, CI..." @change="filtrarPersona()">
                        </div>
                        <br>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead class="text-center">
                                    <tr>
                                        <th>ID</th>
                                        <th>Entrevistador</th>
                                        <th>Agregar</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-if="nombrepostu.length === 0">
                                        <td colspan="9" class="text-center">
                                            No se encuentran datos disponibles
                                        </td>
                                    </tr>
                                    <tr v-for="(item, indice) in nombrepostu" :key="indice">
                                        <td>{{ item.id }}</td>
                                        <td>{{ item.datos_generales.apellido? item.datos_generales.apellido : ''}} {{ item.datos_generales.nombre }}</td>
                                        <td><button type="button" class="btn btn-primary btn-sm"
                                                @click="mostraradmin(item)"><i class="fa-solid fa-plus"></i></button>
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
                                        v-for="item in paginacion.total" :key="item.id">
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
import { entrevistadores, entrevistasearch } from '@/services/EntrevistaDetalleServices.js';
import { useEntrevistaStore } from '@/stores/entrevistas';
const { entrevistaadmin, mostraradmin } = useEntrevistaStore();
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
        const { data } = await entrevistadores(paginacion.value.pagina);
        paginacion.value.total = data.datos.last_page;
        nombrepostu.value = data.datos.data;        
    } catch (error) {
        console.log(error);
    }
};
const searchPersona = ref('');
const filtrarPersona = async () => {
    try {
        const { data } = await entrevistasearch(searchPersona.value);
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