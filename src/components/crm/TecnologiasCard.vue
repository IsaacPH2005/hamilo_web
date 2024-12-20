<template>
    <div class="card shadow-lg">
        <div class="card-body">
            <h4 class="d-flex justify-content-between">{{ props.modulo.nombre }} <i class="fas fa-times cursor-pointer" @click="useEspecialidad.deleteModulo(props.indiceModulo)"></i></h4>
            <div class="row gy-3">
                <div class="col-12">
                    <div class="row gy-3">
                        <div class="col-12">
                            <label for="">Tecnologia</label>
                            <input type="search" class="form-control" placeholder="Buscar tecnologia..."
                                v-model="search" @change="mostrarTecnologias()">
                        </div>
                        <div class="col-12">
                            <ul class="list-group">
                            <span class="text-muted fw-bold mb-2">Tegnologias seleccionadas: </span>
                            <p class="ms-2"><span class="badge bg-info me-2 p-2 mb-2"
                                    v-for="(item) in useEspecialidad.cardModulos[props.indiceModulo].tecnologias" :key="item.id">{{ item.nombre }} <i class="fas fa-times cursor-pointer text-danger "  @click="useEspecialidad.deleteTecnologias(item,props.indiceModulo)" ></i>
                                </span>
                            </p>
                            <li class="list-group-item d-flex justify-content-between"
                                v-if="search != '' && tecnologias.length > 0" v-for="(item) in tecnologias"
                                :key="item.id">
                                {{ item.nombre }}
                                <div class="text-end">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-primary btn-xs"
                                            @click="useEspecialidad.addTecnologias(item,props.indiceModulo)"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { listarTecnologiasActivas } from '@/services/TecnologiasService';
import { useEspecialidadStore } from '@/stores/EspecialidadStore';
import { ref, onMounted, defineProps } from 'vue';

const tecnologias = ref([]);
const search = ref('');
const useEspecialidad = useEspecialidadStore();
const props = defineProps({
    modulo: {
        type: Object,
        required: true
    },
    indiceModulo:{
        type: Number,
        required: true
    }
});
onMounted(() => {
    mostrarTecnologias();
})
const mostrarTecnologias = async () => {
    try {
        const { data } = await listarTecnologiasActivas(search.value, '');
        tecnologias.value = data.datos
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>