<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fas fa-pencil me-2"></i>Editar Registro
                        <span class="ms-5 text-light">Tecnología</span>
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <div>
                                <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre
                                    <span class="text-danger fst-italic">*</span>
                                </label>
                                <input type="text" class="form-control"
                                    v-bind:class="{ ' border-danger': errors.nombre }" placeholder="Escriba..."
                                    id="nombre" v-model="nombre">
                                <small class="text-danger fst-italic text-xs" v-if="errors.nombre">
                                    <i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}
                                </small>
                            </div>
                            <div>
                                <label for="descripcion" class="form-label font-weight-bolder text-sm">Descripción
                                    <span class="text-danger fst-italic">*</span>
                                </label>
                                <input type="text" class="form-control"
                                    v-bind:class="{ ' border-danger': errors.descripcion }" placeholder="Escriba..."
                                    id="descripcion" v-model="descripcion">
                                <small class="text-danger fst-italic text-xs" v-if="errors.descripcion">
                                    <i class="fas fa-times me-1"></i>{{ errors.descripcion[0] }}
                                </small>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div>
                                <label for="imagen" class="form-label font-weight-bolder text-sm">
                                    Imagen
                                </label>
                                <input class="form-control" type="file" @change="obtenerImagen($event)" id="imagen"
                                    name="imagen" v-bind:class="{ ' border-danger': errors.imagen }">
                                <small class="text-danger fst-italic text-xs" v-if="errors.imagen">
                                    <i class="fas fa-times me-1"></i>{{ errors.imagen[0] }}
                                </small>
                                <figure class="my-3 col-6 offset-3">
                                    <img v-if="imagenPreview" v-bind:src="imagenPreview"
                                        alt="Previsualización de la imagen" class="img-fluid">
                                    <img v-else
                                        src="https://img.freepik.com/vector-premium/archivo-no-encontrado-ilustracion-plana_418302-62.jpg?w=1060"
                                        class="img-fluid">
                                </figure>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()">
                                <i class="fas fa-reply me-2"></i>Volver
                            </button>
                            <button type="button" class="btn btn-primary ms-2" @click="actualizar()"
                                v-if="permisoStore.permisosUser.some(p => p === 'tecnologia editar')">
                                Actualizar<i class="fas fa-save ms-2"></i>
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
    import { useRouter, useRoute } from 'vue-router';
    import { obtenerTecnologia, editarTecnologia } from '@/services/TecnologiasService';
    import { urlBaseAsset } from '@/services/Http';
    import { usePermisoStore } from '@/stores/PermisosStore';
    import { mensajeExitoso } from '@/stores/alertas';

    const nombre = ref('');
    const descripcion = ref('');
    const detalles = ref('');
    const imagen = ref(null);
    const errors = ref([]);
    const router = useRouter();
    const route = useRoute();
    const imagenPreview = ref(null);
    const permisoStore = usePermisoStore();

    const obtenerImagen = (event) => {
        imagen.value = event.target.files[0];

        if (imagen.value) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagenPreview.value = e.target.result;
            };
            reader.readAsDataURL(imagen.value);
        }
    };

    const volver = () => {
        router.push('/tecnologias');
    };

    const cargarTecnologia = async () => {
        const tecnologiaId = route.params.id;
        try {
            const response = await obtenerTecnologia(tecnologiaId);
            nombre.value = response.data.datos.nombre;
            descripcion.value = response.data.datos.descripcion;
            detalles.value = response.data.datos.detalles;
            if (response.data.datos.imagen) {
                imagenPreview.value = `${urlBaseAsset}/img/img_tecnologias/${response.data.datos.imagen}`;
            }
        } catch (error) {
            console.error('Error al cargar la tecnología:', error);
        }
    };

    const actualizar = async () => {
        const tecnologiaId = route.params.id;
        const formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        if (detalles.value) {
            formData.append('detalles', detalles.value);
        }
        if (imagen.value) {
            formData.append('imagen', imagen.value);
        }
        formData.append('_method', 'PUT');
        try {
            const response = await editarTecnologia(tecnologiaId, formData);
            console.log(response);
            if (response.status === 200) {
                mensajeExitoso();
                router.push('/tecnologias');
            }
        } catch (error) {
            errors.value = error.response.data.errors;
            console.log(error);

        }
    };

    onMounted(() => {
        cargarTecnologia();
    });
</script>

<style></style>
