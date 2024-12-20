<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fas fa-eye me-2"></i>
                        Detalles de Tecnologías
                        <span class="text-light ms-5">{{ tecnologia.nombre }}</span>
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
                                <p class="text-center">{{ tecnologia.nombre }}</p>
                            </div>
                            <div class="mt-4">
                                <p class="font-weight-bolder text-sm">Descripción:</p>
                                <p class="text-center">{{ tecnologia.descripcion }}</p>
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="font-weight-bolder text-sm">Creación:</p>
                                <p class="text-center">
                                    {{ new Date(tecnologia.created_at).toLocaleDateString('es-ES', {
                                        day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    }) }}
                                </p>
                            </div>
                            <div class="col-12 col-md-6 mb-4">
                                <p class="font-weight-bolder text-sm">Última Edición:</p>
                                <p class="text-center">
                                    {{ new Date(tecnologia.updated_at).toLocaleDateString('es-ES', {
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
                                    <img v-if="tecnologia.imagen"
                                        v-bind:src="`${urlBaseAsset}/img/img_tecnologias/${tecnologia.imagen}`"
                                        width="50%">
                                    <img v-else
                                        src="https://img.freepik.com/vector-premium/archivo-no-encontrado-ilustracion-plana_418302-62.jpg?w=1060"
                                        width="50%">
                                </figure>
                            </div>
                            <!-- <div>
                                <p class="font-weight-bolder text-sm">Módulos en los que se encuentra:</p>
                                <ul v-for="modulo in tecnologias.modulos" class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <p class="badge rounded-pill text-bg-secondary">
                                            {{ modulo.nombre }}
                                        </p>
                                    </li>
                                </ul>
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
    import { obtenerTecnologia } from '@/services/TecnologiasService';
    const tecnologia = ref({});
    const errors = ref([]);
    const router = useRouter();
    const route = useRoute();

    const obtenerItem = async () => {
        try {
            const id = route.params.id;
            const response = await obtenerTecnologia(id);
            tecnologia.value = response.data.datos;
            // console.log(response.data.datos);
        } catch (error) {
            // console.log(error.response.data.mensaje);
            errors.value = error.response.data.mensaje;
        }
    }
    const volver = () => {
        router.push('/tecnologias');
    };

    onMounted(
        obtenerItem
    )

</script>
<style></style>