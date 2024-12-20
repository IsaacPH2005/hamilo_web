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
                        <div class="col-12">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="nombre" v-model="nombreRol">
                            <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.nombre[0]}}</small>
                        </div>
                        <div class="col-12">
                            <h4 class="text center">Permisos</h4>
                            <div class="card mb-3 shadow" v-for="(permisos, grupo) in grupos" :key="grupo">
                                <div class="card-header p-2 z-index-1 align-middle">
                                    <h5 class="d-flex justify-content-between"> {{ grupo }} 
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" @change="seleccionarTodos(grupo, $event)">
                                        </div>
                                    </h5>
                                </div>
                                <div class="card-body pt-2">
                                    <div class="row mt-3">
                                        <div class="col-6 col-md-3 my-2" v-for="(permiso) in permisos" :key="permiso.id">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" :value="permiso.name" v-model="permisosSeleccionados[grupo]">
                                                <label class="form-check-label" for="flexSwitchCheckDefault">{{ permiso.name }}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <small v-if="errors.permisos" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.permisos[0]}}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i
                                    class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()">Guardar<i
                                    class="fas fa-save ms-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { mostrarPermisos, agregarRol } from "@/services/RolesPermisosService.js";
    import { onMounted, onBeforeMount, ref } from "vue";
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';

    const router = useRouter();
    const grupos = ref(null);
    const permisosSeleccionados = ref({});
    const nombreRol = ref("");
    const opcionesSeleccionadas = ref([]);
    const errors = ref({});
    const listarPermisos = async () => {
        try {
            const { data } = await mostrarPermisos();
            grupos.value = data.datos;
            for (let grupoNombre in grupos.value) {
                permisosSeleccionados.value[grupoNombre] = [];
            }
        } catch (error) {
            console.log(error)
        }
    }
    const volver = () => {
        router.push('/roles');
    }
    const seleccionarTodos = (grupoNombre, event) => {
        if (event.target.checked) {
            permisosSeleccionados.value[grupoNombre] = grupos.value[grupoNombre].map(permiso => permiso.name);
        } else {        
            permisosSeleccionados.value[grupoNombre] = [];
        }
    }
    const guardar = async () => {
        errors.value = {};
        let seleccionados = Object.values(permisosSeleccionados.value).flat();
        try {
            let formulario = {
                nombre: nombreRol.value,
                permisos: seleccionados
            };
            const { data } = await agregarRol(formulario);
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Datos actualizados correctamente!",
            });
            volver();
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    onMounted(() => {
        listarPermisos();
    })
</script>
<style>
</style>