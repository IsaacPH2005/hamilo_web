<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fas fa-eye me-2"></i>
                        Detalles de Módulo
                        <span class="text-light ms-5">{{ modulo.nombre }}</span>
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <div class="mt-4">
                                <p class="font-weight-bolder text-sm">Nombre:</p>
                                <p class="ms-4">{{ modulo.nombre }}</p>
                            </div>
                            <div class="mt-4">
                                <p class="font-weight-bolder text-sm">Objetivo:</p>
                                <p class="ms-4">{{ modulo.objetivo }}</p>
                            </div>
                            <div class="mt-4">
                                <p class="font-weight-bolder text-sm">Entregable:</p>
                                <p class="ms-4" v-if="modulo.entregable"> {{ modulo.entregable }}</p>
                                <p class="text-center" v-else><small> No especificado. </small></p>
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="font-weight-bolder text-sm">Creación:</p>
                                <p class="ms-4">
                                    {{ new Date(modulo.created_at).toLocaleDateString('es-ES', {
                                        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    }) }}
                                </p>
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="font-weight-bolder text-sm">Última Edición:</p>
                                <p class="ms-4">
                                    {{ new Date(modulo.updated_at).toLocaleDateString('es-ES', {
                                        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    }) }}
                                </p>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 mb-4">
                            <div class="mt-4">
                                <p class="font-weight-bolder text-sm">
                                    Imagen:
                                </p>
                                <figure class="text-center">
                                    <img v-if="modulo.imagen"
                                        v-bind:src="`${urlBaseAsset}/img/img_modulos/${modulo.imagen}`" width="50%">
                                    <img v-else
                                        src="https://www.seolog.com.tr/wp-content/uploads/2023/04/Google-EAT-Nasil-Daha-Iyi-Seviyelere-Gelebilirsiniz-289x300.png"
                                        width="50%">
                                </figure>
                            </div>
                            <div>
                                <p class="font-weight-bolder text-sm">Tecnologías:</p>
                                <p v-for="tecnologia in modulo.tecnologias">
                                    <span class="badge rounded-pill text-bg-secondary ms-4">
                                        {{ tecnologia.nombre }}
                                    </span>
                                </p>
                            </div>
                            <!-- <div>
                                <p class="font-weight-bolder text-sm">Especialidades:</p>
                                <p v-for="especialidad in modulo.especialidades">
                                    <samp class="badge rounded-pill text-bg-secondary me-2">
                                        {{ especialidad.nombre }}
                                    </samp>
                                </p>
                            </div> -->
                        </div>
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()">
                                <i class="fas fa-reply me-2"></i>Volver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { urlBaseAsset } from '@/services/Http';
    import { obtenerModulo } from '@/services/ModulosService';

    const modulo = ref({});
    const errors = ref([]);
    const router = useRouter();
    const route = useRoute();

    const obtenerItem = async () => {
        try {
            const id = route.params.id;
            const response = await obtenerModulo(id);
            modulo.value = response.data.datos;
            console.log(response.data.datos);
        } catch (error) {
            // console.log(error.response.data.mensaje);
            errors.value = error.response.data.mensaje;
        }
    }
    const volver = () => {
        router.push('/modulos');
    };

    onMounted(
        obtenerItem
    )

</script>
<style></style>