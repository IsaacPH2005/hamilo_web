<template>
    <h1 class="text-center">Registros</h1>
    <div class="row">
        <div class="col-12 col-md-12">
            <h3 class="text-center">Lista de Batchs</h3>
        </div>
        <div class="col-md-4 mt-4 col-12" v-for="(batch, indice) in batchs.filter(a => {return (a.is_deleted != 1)})">
            <div class="card " style="width: 18rem;">
                <img :src="batch.imagen" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title text-center">{{ batch.crm_especialidades.nombre }}</h5>
                    <p class="card-text"><b>Version:</b>{{ batch.version }}</p>
                    <div class="text-center">
                        <RouterLink :to="'/batch_registros/'+batch.id"  type="button" class="btn btn-info"><i
                                class="fas fa-plus-circle"></i> Detalle</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { listarBatchs } from '@/services/RegistrosService';
import { useRouter } from 'vue-router';
const batchs = ref([]);

onMounted(() => {
    listar();
});
const listar = async () => {
    try {
        const { data } = await listarBatchs();
        batchs.value = data.datos.data;
        console.log(batchs.value);
    } catch (error) {
        console.log(error);
    }
};

</script>