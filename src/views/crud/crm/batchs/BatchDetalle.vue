<template>
    <div class="row">
        <div class="col-12 mt-4">
            <div class="card border border-0 shadow-lg mb-4">
                <div class="card-header pb-0 mt-2">
                    <h5 class="fw-bold">Detalle del Batch</h5>
                </div>
                <div class="card-body px-0 pt-0 pb-1 mt-5">
                    <div class="card mb-3">
                        <div class="row g-0 d-flex justify-content-center">
                            <div class="col-md-4 d-flex justify-content-center">
                                <img :src="formulario.imagen" class="rounded-center" alt="..." width="350px">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h3 class="card-title">{{ formulario.version }} <span
                                            class="text-info">(Version)</span></h3>
                                    <h5>Especialidad</h5>
                                    <div class="col-12 col-md-4">
                                        <select class="form-select text-center fs-5"
                                        id="especialidad" aria-label="Default select example"
                                        v-model="formulario.especialidad_id" disabled>
                                        <option value="" selected>Seleccione</option>
                                        <option :value="item.id" v-for="(item) in especialidades" :key="item.id">
                                            {{ item.nombre }}</option>
                                    </select>
                                    </div>
                                    <h5>Descripcion</h5>
                                    <p class="card-text">{{ formulario.descripcion }}</p>
                                    <div v-if="formulario.descripcion == null">
                                        <p class="text-danger">No se envio ninguna descripcion.</p>
                                    </div>
                                    <h5>Fecha <span class="text-info">(Inicio)</span></h5>
                                    <p>{{ formulario.fecha_inicio }}</p>
                                    <h5>Fecha <span class="text-info">(fin)</span></h5>
                                    <p>{{ formulario.fecha_fin }}</p>
                                    <h5>REQUISITOS <span class="text-danger">*</span></h5>
                                    <p>{{ formulario.requisitos }}</p>
                                    <p class="fw-bold">Fecha de creacion</p>
                                    <p class="card-text"><small class="text-body-secondary">{{
                                            formatDate(formulario.creacion) }}</small></p>
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
import { show } from '@/services/BatchService';
import { especialidadesActivas } from '@/services/EspecialidadService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const idDetalle = router.currentRoute.value.params.idDetalle;
const especialidades = ref([]);
const formulario = ref({
    version: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    requisitos: '',
    especialidad_id: '',
    imagen: null
});
const verDetalle = async () => {
    try {
        const { data } = await show(idDetalle);
        formulario.value = {
            version: data.datos.version,
            fecha_inicio: data.datos.fecha_inicio,
            fecha_fin: data.datos.fecha_fin,
            descripcion: data.datos.descripcion,
            requisitos: data.datos.requisitos,
            especialidad_id: data.datos.especialidad_id,
            creacion: data.datos.created_at,
            imagen: data.imagen
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    verDetalle();
    mostrarEspecialidades();
})
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
const mostrarEspecialidades = async () => {
    try {
        const { data } = await especialidadesActivas('');
        especialidades.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>