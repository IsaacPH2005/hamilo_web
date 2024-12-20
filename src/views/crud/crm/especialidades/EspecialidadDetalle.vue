<template>
    <div class="row d-flex justify-content-center">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Detalle</h5>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 mt-5">
            <div class="card border border-0 shadow-lg mb-3">
                        <div class="row g-0">
                            <div class="col-12 col-md-4 d-flex justify-content-center">
                                <img :src="formulario.imagen" alt="" width="180px">
                            </div>
                            <div class="col-12 col-md-8">
                                <div class="card-body">
                                    <h3 class="card-title">{{ formulario.nombre }}</h3>
                                    <h5>Descripcion <span class="text-info">(Corta)</span></h5>
                                    <p class="card-text">{{ formulario.descripcion_corta }}</p>
                                    <div v-if="formulario.descripcion_corta == null">
                                        <p class="text-danger">No se envio ninguna descripcion.</p>
                                    </div>
                                    <h5>Descripcion <span class="text-info">(Larga)</span></h5>
                                    <p class="card-text">{{ formulario.descripcion_larga }}</p>
                                    <div v-if="formulario.descripcion_larga == null">
                                        <p class="text-danger">No se envio ninguna descripcion.</p>
                                    </div>
                                    <p class="card-text"><small class="text-body-secondary">{{
                                            formatDate(formulario.creacion) }}</small></p>
                                </div>
                                <div class="card-footer">
                                    <div class="text-end">
                                        <button type="button" class="btn btn-danger btn-lg" @click="volver()">Volver</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
</template>
<script setup>
import { showCurricula } from '@/services/CurriculaService';
import { show } from '@/services/EspecialidadService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const idDetalle = router.currentRoute.value.params.idDetalle;
const formulario = ref({
    nombre: '',
    descripcion_corta: '',
    descripcion_larga: '',
    creacion: '',
    imagen: null,
});
const verDetalle = async () => {
    try {
        const { data } = await show(idDetalle);
        console.log(data);
        formulario.value = {
            nombre: data.dato.nombre,
            descripcion_corta: data.dato.descripcion_corta,
            descripcion_larga: data.dato.descripcion_larga,
            creacion: data.dato.created_at,
            imagen: data.imagen
        }
    } catch (error) {
        console.log(error);
    }
}
const verCurricula = async () => {
    try {
        const {data} =await showCurricula(idDetalle);
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    verDetalle();
    verCurricula();
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
const volver = () => {
    router.push({path: '/especialidad'})
}
</script>
<style></style>