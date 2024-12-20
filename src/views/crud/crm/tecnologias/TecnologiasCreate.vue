<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-pencil me-2"></i>Nuevo Registro</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre
                                <span class="text-danger fst-italic">*</span>
                            </label>
                            <input type="text" class="form-control" v-bind:class="{ ' border-danger': errors.nombre }"
                                placeholder="Escriba..." id="nombre" v-model="nombre">
                            <small class="text-danger fst-italic text-xs" v-if="errors.nombre">
                                <i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}
                            </small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion" class="form-label font-weight-bolder text-sm">Descripcion
                                <span class="text-danger fst-italic">*</span>
                            </label>
                            <input type="text" class="form-control"
                                v-bind:class="{ ' border-danger': errors.descripcion }" placeholder="Escriba..."
                                id="descripcion" v-model="descripcion">
                            <small class="text-danger fst-italic text-xs" v-if="errors.descripcion">
                                <i class="fas fa-times me-1"></i>{{ errors.descripcion[0] }}
                            </small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="imagen" class="form-label font-weight-bolder text-sm">
                                Imagen
                            </label>
                            <input class="form-control" type="file" @change="obtenerImagen($event)" id="imagen"
                                name="imagen">
                        </div>
                        <div v-if="imagenPreview" class="col-12 col-md-6">
                            <label for="imagen" class="form-label font-weight-bolder text-sm">
                                Previsualización:
                            </label>
                            <figure class="my-3 col-6 offset-3">
                                <img v-bind:src="imagenPreview" alt="Previsualización de la imagen" class="img-fluid">
                            </figure>
                        </div>
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()">
                                <i class="fas fa-reply me-2"></i>Volver
                            </button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()"
                                v-if="permisoStore.permisosUser.some(p => p === 'tecnologia crear')">
                                Guardar<i class="fas fa-save ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { crearTecnologia } from '@/services/TecnologiasService';
    import { usePermisoStore } from '@/stores/PermisosStore';
    import { mensajeExitoso } from '@/stores/alertas';

    const nombre = ref('');
    const descripcion = ref('');
    const imagen = ref(null);
    const errors = ref([])
    const router = useRouter();
    const imagenPreview = ref();
    const permisoStore = usePermisoStore();

    const obtenerImagen = (event) => {
        imagen.value = event.target.files[0];
        if (imagen.value) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagenPreview.value = e.target.result;
            }
            reader.readAsDataURL(imagen.value);
        }
    };

    const volver = () => {
        router.push('/tecnologias');
    };

    const guardar = async () => {
        const formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        if (imagen.value) {
            formData.append('imagen', imagen.value);
        }
        try {
            const response = await crearTecnologia(formData);
            if (response.status === 201) {
                mensajeExitoso();
                router.push('/tecnologias');
            }
        } catch (error) {
            errors.value = error.response.data.errors;
        }
    };
</script>
<style></style>