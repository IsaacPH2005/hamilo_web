<template>
    <div class="row gy-3 justify-content-center">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Tarjeta</h5>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 mx-auto">
            <div class="gray rounded-3 p-5 my-3 mt-5">
                <div class="position-absolute translate-middle rounded-circle p-0">
                    <img class="position-absolute translate-middle rounded-circle p-1 text-light bg-dark" :src="formulario.icono" alt="" width="140x" />
                </div>
                <div class="d-flex align-items-center">
                    <div class="ps-5">
                        <p class="category-paragraph fw-bold text-uppercase mb-3 text-center">
                            {{ formulario.nombre }}
                        </p>
                        <p class="category-paragraph m-3">
                            {{ formulario.descripcion }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 text-center">
            <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Volver</button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { show } from "@/services/PostulacionPasosService";
const router = useRouter();
const idPostulacionPasosDet = router.currentRoute.value.params.idPostulacionPasosDet;
const formulario = ref({
    nombre: '',
    descripcion: '',
    icono: null,
});
const verDetalle = async () => {
    try {
        const { data } = await show(idPostulacionPasosDet);
        formulario.value = {
            nombre: data.datos.nombre,
            descripcion: data.datos.descripcion,
            icono: data.icono
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    verDetalle();
});
const volver = () => {
    router.push('/postulacion-pasos');
}
</script>
<style>
    
</style>