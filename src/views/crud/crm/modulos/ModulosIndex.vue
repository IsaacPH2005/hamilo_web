<template>
    <main class="row gy-3">
        <header class="col-12">
            <div class="card border border-0 shadow-lg">
                <article class="card-body">
                    <div class="row">
                        <div class="col-md-8 col-lg-10 d-flex justify-content-start">
                            <h5 class="card-title font-weight-bolder fs-3 m-0 mt-3">
                                <i class="fa-solid fa-window-restore fa-lg me-2"></i>
                                Módulos
                            </h5>
                        </div>
                    </div>
                </article>
            </div>
        </header>
        <section class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-md-8 d-flex justify-content-between align-items-center">
                                <input type="search" class="form-control me-4" placeholder="Buscar..." v-model="search"
                                    v-on:keyup="buscarModulos()" v-on:blur="buscarModulos();"
                                    v-on:input="buscarModulos();" v-on:search="buscarModulos();">
                                <router-link to="/modulos/crear" class="btn btn-primary d-flex align-items-center mt-3"
                                    v-if="permisoStore.permisosUser.some(p => p === 'modulo crear')">
                                    <i class="fas fa-plus-circle me-2"></i> Agregar
                                </router-link>
                            </div>
                            <div class="col-md-4 col-lg-2 d-flex justify-content-end my-0 py-0">
                                <div class="d-flex flex-md-column align-items-start my-0 py-0">
                                    <div class="form-check form-check-sm">
                                        <input class="form-check-input" type="radio" name="filtroModulos"
                                            id="filtroTodos" value="todos" v-model="filtroSeleccionado"
                                            @change="resetPage(); buscarModulos();">
                                        <label class="form-check-label" for="filtroTodos">
                                            Mostrar todos
                                        </label>
                                    </div>
                                    <div class="form-check form-check-sm ms-2">
                                        <input class="form-check-input" type="radio" name="filtroModulos"
                                            id="filtroActivos" value="activos" v-model="filtroSeleccionado"
                                            @change="resetPage(); buscarModulos();">
                                        <label class="form-check-label" for="filtroActivos">
                                            Solo activos
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Item</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Imagen</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Nombre</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'modulo ver' || p === 'modulo editar' || p === 'modulo borrar')">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(modulo, index) in modulos" v-bind:key="modulo.id">
                                            <th class="text-center">
                                                {{ (6 * (page - 1)) + (index + 1) }}
                                            </th>
                                            <td class="text-center">
                                                <img v-if="modulo.imagen"
                                                    :src="`${urlBaseAsset}/img/img_modulos/${modulo.imagen}`"
                                                    height="53px">
                                                <img v-else
                                                    src="https://www.seolog.com.tr/wp-content/uploads/2023/04/Google-EAT-Nasil-Daha-Iyi-Seviyelere-Gelebilirsiniz-289x300.png"
                                                    height="53px">
                                            </td>
                                            <td>
                                                {{ modulo.nombre }}
                                            </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    v-bind:class="{ 'badge-danger-personalizado': modulo.is_deleted, 'badge-success-personalizado': !modulo.is_deleted }">
                                                    {{ modulo.is_deleted ? 'Inactivo' : 'Activo' }}
                                                </span>
                                            </td>
                                            <td class="text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'modulo ver' || p === 'modulo editar' || p === 'modulo borrar')">
                                                <div class="d-flex justify-content-center">
                                                    <router-link v-bind:to="`/modulos/${modulo.id}`"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'modulo ver')">
                                                        <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action"></i>
                                                    </router-link>
                                                    <router-link v-bind:to="`/modulos/${modulo.id}/edit`"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'modulo editar')">
                                                        <i
                                                            class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action"></i>
                                                    </router-link>
                                                    <a
                                                        v-if="permisoStore.permisosUser.some(p => p === 'modulo borrar')">
                                                        <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                            v-bind:class="{ 'fa-check text-success': modulo.is_deleted, 'fa-trash text-danger': !modulo.is_deleted }"
                                                            v-on:click="eliminar(modulo.id)">
                                                        </i>
                                                    </a>
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
        </section>
        <footer class="row mt-3">
            <div v-if="filtroSeleccionado == 'todos'" class="col-12">
                <nav aria-label="Page navigation">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" v-bind:class="{ 'disabled': page == 1 }">
                            <button type="button" class="page-link" aria-label="Previous"
                                v-on:click="cambiarPagina(page - 1)">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li class="page-item" v-for="currentPage in totalPages" v-bind:key="currentPage">
                            <button type="button" class="page-link"
                                v-bind:class="{ 'bg-gray-700 text-white': currentPage === page }"
                                v-on:click="cambiarPagina(currentPage)">
                                {{ currentPage }}
                            </button>
                        </li>
                        <li class="page-item" v-bind:class="{ 'disabled': page == totalPages }">
                            <button type="button" class="page-link" aria-label="Next"
                                v-on:click="cambiarPagina(page + 1)">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    </main>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { eliminarModulo, listarModulos, listarModulosActivos } from '@/services/ModulosService';
    import { urlBaseAsset } from '@/services/Http';
    import { usePermisoStore } from '@/stores/PermisosStore';
    import { mensajeExitoso } from '@/stores/alertas';

    const filtroSeleccionado = ref('todos');
    const modulos = ref([]);
    const search = ref('');
    const page = ref(1);
    const totalPages = ref(1);
    const permisoStore = usePermisoStore();

    const buscarModulos = async () => {
        try {
            if (filtroSeleccionado.value == 'activos') {
                const response = await listarModulosActivos(search.value);
                modulos.value = response.data.datos;
            } else {
                const response = await listarModulos(search.value, page.value);
                modulos.value = response.data.datos.data;
                page.value = response.data.datos.current_page;
                totalPages.value = response.data.datos.last_page;
            }
        } catch (error) {
            console.error('Error al obtener los Módulos:', error);
        }
    };
    const resetPage = () => { page.value = 1; };
    const cambiarPagina = (param) => {
        page.value = param;
        buscarModulos();
    };
    const eliminar = async (param) => {
        try {
            const response = await eliminarModulo(param);
            mensajeExitoso();
        } catch (error) {
            console.error('Error al obtener los Módulos:', error);
        }
        // eliminarModulo(param);
        buscarModulos();
    };

    onMounted(buscarModulos);

</script>

<style>
    .btn-action {
        transition: transform 0.2s ease-in-out;
    }

    .btn-action:hover {
        transform: scale(1.35);
    }

    /** ESTILOS PERSOANLIZADOS */
    .text-warning-personalizado {
        color: rgb(255, 195, 0);
    }

    .badge-success-personalizado {
        color: #1aae6e;
        background-color: #b0eed3;
    }

    .badge-danger-personalizado {
        color: #f80031;
        background-color: #fdd1da;
    }

    .table-gray-personalizado {
        background-color: #495057;
        color: white
    }
</style>