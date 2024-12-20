<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fa-solid fa-user-lock me-2"></i>Permisos
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8">
                            <input type="search" class="form-control" placeholder="Buscar..." v-model="busqueda" @input="listarUsuarios()">
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
                                                Nombre
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Correo electrónico
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Contacto
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado
                                            </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(usuario, index) in usuarios" :key="index">
                                            <td class="text-center"> {{ index + 1 }}</td>
                                            <td class="text-center"> {{ usuario.datos_generales?.apellido }} {{
                                                usuario.datos_generales?.nombre }} </td>
                                            <td class="text-center"> {{ usuario.email }}</td>
                                            <td class="text-center"> {{ usuario.datos_generales?.telefono }} </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="{'badge-danger-personalizado': usuario.is_deleted, 'badge-success-personalizado': !usuario.is_deleted}">
                                                    {{ usuario.is_deleted ? 'Inactivo' : 'Activo' }}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer" @click="mostrarModalDetalle(usuario.id)"
                                                        v-if="permisoStore.permisosUser.some(element=> element === 'rol ver')"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="mostrarModalEdicion(usuario.id)"
                                                        v-if="permisoStore.permisosUser.some(element=> element === 'rol editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                        :class="{ 'fa-check text-success': usuario.is_deleted, 'fa-trash text-danger': !usuario.is_deleted }"
                                                        @click="borrarUser(usuario)"
                                                        v-if="permisoStore.permisosUser.some(element=> element === 'usuario borrar')"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item">
                                                <button type="button" class="page-link"
                                                    :class="paginacion.paginaAnterior==null ? 'disabled':''"
                                                    aria-label="Previous" @click="paginaAnterior">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item">
                                                <button type="button" class="page-link bg-gray-700 text-white">
                                                    {{ paginacion.paginaActual }}
                                                </button>
                                            </li>
                                            <li class="page-item">
                                                <button type="button" class="page-link"
                                                    :class="paginacion.paginaSiguiente==null ? 'disabled':''"
                                                    aria-label="Next" @click="paginaSiguiente">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade modal-lg" id="permisosModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="modal-title-notification">{{ tituloModal }}</h6>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body pt-2">
                                <div class="table-responsive">
                                    <table class="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th class="text-uppercase text-xs font-weight-bolder ps-2 pe-2 text-center me-2">
                                                    Rol</th>
                                                <th class="text-uppercase text-xs font-weight-bolder ps-2 text-center">
                                                    Permisos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(rol, index) in roles" :key="index">
                                                <td>
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input" type="checkbox" :value="rol.name" v-model="opcionesSeleccionadas" :disabled="isDisabled">
                                                        <label class="form-check-label" for="flexSwitchCheckDefault">{{ rol.name}}</label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="badge-personalizado" v-for="(permiso, index) in rol.permissions" :key="index">{{ permiso.name }}</span>
                                                </td>
                                            </tr><br>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" v-show="isDisabled"
                            @click="cerrarModal()">Cerrar</button>
                        <button type="button" class="btn btn-danger" v-show="!isDisabled"
                            @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" v-show="!isDisabled"
                            @click="editarRolesUsuario()">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { mostrarUsuariosPaginados, borrarUsuario } from "@/services/UserService.js"
    import { mostrarPermisos, mostrarRoles, mostrarRolesUsuario, asignarRolesUsuario } from "@/services/RolesPermisosService.js";
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { Modal } from 'bootstrap';
    import { usePermisoStore } from "@/stores/PermisosStore";
    import Swal from 'sweetalert2';

    const permisoStore = usePermisoStore();
    const router = useRouter();
    const roles = ref(null);
    const usuarios = ref({});
    const paginacion = ref({
        paginaActual: 1,
        paginaAnterior: null,
        paginaSiguiente: null
    });
    let modal = null;
    let instanciaModal = null;
    let usuario_id = null;
    const tituloModal = ref("");
    const isDisabled = ref(true);
    const opcionesSeleccionadas = ref([]);
    const errors = ref({});
    const busqueda = ref('');
    const listarUsuarios = async () => {
        try {
            if(busqueda.value != '') {
                paginacion.value.paginaActual = 1;
            }
            const { data } = await mostrarUsuariosPaginados(paginacion.value.paginaActual, busqueda.value);
            usuarios.value = data.datos.data;
            paginacion.value.paginaAnterior = data.datos.prev_page_url;
            paginacion.value.paginaSiguiente = data.datos.next_page_url;
        } catch (error) {
            console.log(error)
        }
    }
    const listarRoles = async () => {
        try {
            const { data } = await mostrarRoles();
            roles.value = data.datos;
        } catch (error) {
            console.log(error)
        }
    }
    const paginaSiguiente = async () => {
        if (paginacion.value.paginaSiguiente != null) {
            paginacion.value.paginaActual++;
            listarUsuarios();
        }
    }
    const paginaAnterior = async () => {
        if (paginacion.value.paginaAnterior != null) {
            paginacion.value.paginaActual--;
            listarUsuarios();
        }
    }
    const borrarUser = async (usuario) => {
        try {
            const { data } = await borrarUsuario(usuario.id);
            usuario.is_deleted = !usuario.is_deleted;
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Estado modificado correctamente!",
            });
        } catch (error) {
            console.log(error);
        }
    }
    const mostrarModalDetalle = async(id) => {
        errors.value = {};
        tituloModal.value = "Roles";
        isDisabled.value = true;
        try {
            const { data } = await mostrarRolesUsuario(id);
            opcionesSeleccionadas.value = data.roles;
        } catch (error) {
            console.log(error);
        }
        instanciaModal.show();
    }
    const mostrarModalEdicion = async(id) => {
        errors.value = {};
        tituloModal.value = "Editar roles de usuario";
        isDisabled.value = false;
        usuario_id = id;
        try {
            const { data } = await mostrarRolesUsuario(id);
            opcionesSeleccionadas.value = data.roles;
        } catch (error) {
            console.log(error);
        }
        instanciaModal.show();    
    }
    const editarRolesUsuario = async() => {
        try {
            let formulario = {
                user_id: usuario_id,
                roles: opcionesSeleccionadas.value
            };
            const { data } = await asignarRolesUsuario(formulario);
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Datos actualizados correctamente!",
            });
            cerrarModal();
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    const cerrarModal = () => {
        instanciaModal.hide();
    }    
    onMounted(() => {
        listarUsuarios();
        listarRoles();
        modal = document.getElementById('permisosModal');
        instanciaModal = new Modal(modal);
    })
</script>
<style>
    .badge-success-personalizado {
        color: #1aae6e;
        background-color: #b0eed3;
    }

    .badge-danger-personalizado {
        color: #f80031;
        background-color: #fdd1da;
    }
    .badge-personalizado {
        color: #080808;
        background-color: #fafafa;
        font-size: 0.8rem;
        font-weight: 100;
        text-transform: none;
        padding: 0.25em 0.5em;
        border: 1px solid #8f8f8f;
        border-radius: 0.5rem;
    }
</style>