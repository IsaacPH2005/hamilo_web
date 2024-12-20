<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fas fa-pencil me-2"></i>Nuevo Registro
                        <span class="ms-5 text-light">Módulo</span>
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
                                    <i class="fas fa-times me-1"></i>Este campo es requerido
                                </small>
                            </div>
                            <div>
                                <label for="objetivo" class="form-label font-weight-bolder text-sm">Objetivo
                                    <span class="text-danger fst-italic">*</span>
                                </label>
                                <input type="text" class="form-control"
                                    v-bind:class="{ ' border-danger': errors.objetivo }" placeholder="Escriba..."
                                    id="objetivo" v-model="objetivo">
                                <small class="text-danger fst-italic text-xs" v-if="errors.objetivo">
                                    <i class="fas fa-times me-1"></i>Este campo es requerido
                                </small>
                            </div>
                            <div>
                                <label for="entregable" class="form-label font-weight-bolder text-sm">
                                    Entregable
                                </label>
                                <textarea id="entregable" class="form-control" placeholder="Escriba..."
                                    v-model="entregable"></textarea>
                            </div>
                            <!-- <div>
                                <label class="form-label font-weight-bolder text-sm">Tecnologías</label>
                                <div class="row ms-2">
                                    <div v-for="tecnologia in tecnologiasDisponibles" :key="tecnologia.id"
                                        class="form-check col-12 col-sm-6 col-md-4 col-lg-3">
                                        <input class="form-check-input" type="checkbox"
                                            :id="'tecnologia-' + tecnologia.id" :value="tecnologia.id"
                                            v-model="tecnologiasSeleccionadas">
                                        <label class="form-check-label" :for="'tecnologia-' + tecnologia.id">
                                            {{ tecnologia.nombre }}
                                        </label>
                                    </div>
                                </div>
                                <small class="text-danger fst-italic text-xs" v-if="errors.tecnologias">
                                    <i class="fas fa-times me-1"></i>Debes seleccionar al menos una tecnología.
                                </small>
                            </div> -->
                        </div>
                        <div class="col-12 col-md-6">
                            <div>
                                <label for="imagen" class="form-label font-weight-bolder text-sm">
                                    Imagen
                                </label>
                                <input class="form-control" type="file" @change="obtenerImagen($event)" id="imagen"
                                    name="imagen" v-bind:class="{ 'border-danger': errors.imagen }">
                                <small class="text-danger fst-italic text-xs" v-if="errors.imagen">
                                    <i class="fas fa-times me-1"></i>
                                    {{ errors.imagen[0] }}
                                </small>
                                <figure v-if="imagenPreview" class="my-3 col-6 offset-3">
                                    <img v-bind:src="imagenPreview" alt="Previsualización de la imagen"
                                        class="img-fluid">
                                </figure>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()">
                                <i class="fas fa-reply me-2"></i>Volver
                            </button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()"
                                v-if="permisoStore.permisosUser.some(p => p === 'modulo crear')">
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
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { crearModulo } from '@/services/ModulosService';
    // import { listarTecnologiasActivas } from '@/services/TecnologiasService';
    import { usePermisoStore } from '@/stores/PermisosStore';
    import { mensajeExitoso } from '@/stores/alertas';

    const nombre = ref('');
    const objetivo = ref('');
    const entregable = ref('');
    const imagen = ref(null);
    const errors = ref([])
    const router = useRouter();
    // const tecnologiasDisponibles = ref([]);
    // const search = ref('')
    const imagenPreview = ref(null);
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
        router.push('/modulos');
    };

    // const obtenerTecnologias = async () => {
    //     try {
    //         const response = await listarTecnologiasActivas(search.value);
    //         tecnologiasDisponibles.value = response.data.datos;
    //     } catch (error) {
    //         errors.value = error.response.data.errors;
    //     }
    // };
    const guardar = async () => {
        const formData = new FormData();
        formData.append('nombre', nombre.value);
        formData.append('objetivo', objetivo.value);
        formData.append('entregable', entregable.value);
        if (imagen.value) {
            formData.append('imagen', imagen.value);
        }
        try {
            const response = await crearModulo(formData);
            if (response.status === 201) {
                mensajeExitoso();
                router.push('/modulos');
            }
        } catch (error) {
            errors.value = error.response.data.errors;
            console.log(errors);
        }
    };

    // onMounted(
    //     // obtenerTecnologias
    // );
</script>
<style></style>