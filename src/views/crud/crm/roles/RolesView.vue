<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fa-solid fa-users-gear me-2"></i>Roles
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8 d-flex align-items-center">
                            <input type="search" class="form-control me-4" placeholder="Buscar...">
                        </div>
                        <div class="col-12 col-md-4 text-center">
                            <button type="button" class="btn btn-primary" @click="agregarRol()" v-if="permisoStore.permisosUser.some(element=> element === 'rol crear')">
                                <i class="fas fa-plus-circle me-2"></i> Agregar
                            </button>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Item
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Rol
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center" v-if="permisoStore.permisosUser.some(element=> element === 'rol ver' || element ==='rol editar' || element === 'rol borrar')">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(rol, index) in roles" :key="index">
                                            <td class="text-center">{{ index + 1 }}</td>
                                            <td class="text-center">{{ rol.name }}</td>
                                            <td class="text-center">
                                                <span class="badge badge-success-personalizado">Activo</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer" @click="mostrarModalDetalle(rol.id)"
                                                        v-if="permisoStore.permisosUser.some(element=> element === 'rol ver')"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="mostrarModalEdicion(rol.id)"
                                                        v-if="permisoStore.permisosUser.some(element=> element === 'rol editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer fa-trash text-danger"
                                                        @click="eliminaRol(rol.id)"
                                                        v-if="permisoStore.permisosUser.some(element=> element === 'rol borrar')"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="roleModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-title-notification">{{ tituloModal }}</h5>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Nombre<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" v-model="rol.nombre" :disabled="isDisabled || !rol.modificacion">
                            <small v-if="!rol.modificacion" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>Este nombre de rol no se puede modificar</small>
                            <small v-if="errors.nombre" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.nombre[0]}}</small>
                        </div>
                        <h4 class="text-center py-2">Permisos</h4>
                        <div class="card mb-3 shadow" v-for="(permisos, grupo) in grupos" :key="grupo">
                            <div class="card-header p-2 z-index-1 align-middle">
                                <h5 class="d-flex justify-content-between"> {{ grupo }} 
                                    <div class="form-check form-switch">
                                        <input class="form-check-input" type="checkbox" @change="seleccionarTodos(grupo, $event)" :disabled="isDisabled">
                                    </div>
                                </h5>
                            </div>
                            <div class="card-body pt-2">
                                <div class="row mt-3">
                                    <div class="col-6 my-2" v-for="(permiso) in permisos" :key="permiso.id">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" :value="permiso.name" v-model="permisosSeleccionados[grupo]" :disabled="isDisabled">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">{{ permiso.name }}</label>
                                        </div>
                                    </div>
                                </div>
                                <small v-if="errors.permisos" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.permisos[0]}}</small>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" v-show="isDisabled" @click="cerrarModal()">Cerrar</button>
                        <button type="button" class="btn btn-danger" v-show="!isDisabled" @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" v-show="!isDisabled" @click="editarRol()">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { mostrarRoles, eliminarRol, mostrarPermisos, mostrarRolConPermisos, actualizarRolConPermisos } from "@/services/RolesPermisosService.js"
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { Modal } from 'bootstrap';
    import { usePermisoStore } from "@/stores/PermisosStore";
    import Swal from 'sweetalert2';

    const permisoStore = usePermisoStore();
    let modal = null;
    let instanciaModal = null;
    const router = useRouter();
    const roles = ref(null);
    const tituloModal = ref("");
    const rol = ref("");
    const grupos = ref(null);
    const permisosSeleccionados = ref({});
    const isDisabled = ref(true);
    const errors = ref({});
    const listarRoles = async () => {
        try {
            const { data } = await mostrarRoles();
            roles.value = data.datos;
        } catch (error) {
            console.log(error)
        }
    }
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
    const seleccionarTodos = (grupoNombre, event) => {
        if (event.target.checked) {
            permisosSeleccionados.value[grupoNombre] = grupos.value[grupoNombre].map(permiso => permiso.name);
        } else {        
            permisosSeleccionados.value[grupoNombre] = [];
        }
    }
    const agregarRol = () => {
        router.push('/roles-form');
    }
    const eliminaRol = async(id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Estas seguro de eliminar este registro?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar"
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await eliminarRol(id);
                    listarRoles();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }
    const mostrarModalEdicion = async(id) => {
        errors.value = {};
        tituloModal.value = "Editar rol";
        isDisabled.value = false;
        try {
            const { data } = await mostrarRolConPermisos(id);
            rol.value = data.datos;
            let permisosRol = data.datos.permisos;
            for (let grupo in permisosRol) {
                let nombres = permisosRol[grupo].map(permiso => permiso.name);
                permisosSeleccionados.value[grupo] = nombres;
            }
        } catch (error) {
            console.log(error);
        }
        instanciaModal.show();    
    }
    const editarRol = async() => {
        let seleccionados = Object.values(permisosSeleccionados.value).flat();
        try {
            let formulario = {
                nombre: rol.value.nombre,
                permisos: seleccionados
            };
            const { data } = await actualizarRolConPermisos(rol.value.id, formulario);
            cerrarModal();
            listarRoles();
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Datos actualizados correctamente!",
            });
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    const mostrarModalDetalle = async(id) => {
        errors.value = {};
        tituloModal.value = "Detalle rol";
        isDisabled.value = true;
        try {
            const { data } = await mostrarRolConPermisos(id);
            rol.value = data.datos;
            let permisosRol = data.datos.permisos;
            for (let grupo in permisosRol) {
                let nombres = permisosRol[grupo].map(permiso => permiso.name);
                permisosSeleccionados.value[grupo] = nombres;
            }
        } catch (error) {
            console.log(error);
        }
        instanciaModal.show();
    }
    const cerrarModal = () => {
        instanciaModal.hide();
    }
    onMounted(() => {
        modal = document.getElementById('roleModal');
        instanciaModal = new Modal(modal);
        listarRoles();
        listarPermisos();
    })
</script>
<style></style>