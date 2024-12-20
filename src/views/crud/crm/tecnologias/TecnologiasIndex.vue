<template>
    <main class="row gy-3">
        <header class="col-12">
            <div class="card border border-0 shadow-lg">
                <article class="card-body">
                    <div class="col-md-8 col-lg-10 d-flex justify-content-start">
                        <h5 class="card-title font-weight-bolder fs-3 m-0 mt-3">
                            <i class="fa-solid fa-microchip fa-lg me-2"></i>
                            Tecnologías
                        </h5>
                    </div>
                </article>
            </div>
        </header>
        <section class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <!-- <div class="row"> -->
                        <div class="row justify-content-center align-items-center">
                            <div class="col-12 col-md-8 d-flex justify-content-between align-items-center">
                                <input type="search" class="form-control me-4" placeholder="Buscar..." v-model="search"
                                    v-on:keyup="buscarTecnologias();" v-on:blur="buscarTecnologias();"
                                    v-on:input="buscarTecnologias();" v-on:search="buscarTecnologias();">
                                <router-link to="/tecnologias/crear"
                                    v-if="permisoStore.permisosUser.some(p => p === 'tecnologia crear')"
                                    class="btn btn-primary d-flex align-items-center mt-3">
                                    <i class="fas fa-plus-circle me-2"></i> Agregar
                                </router-link>
                            </div>
                            <div class="col-md-4 col-lg-2 d-flex justify-content-end my-0 py-0">
                                <div class="d-flex flex-md-column align-items-start my-0 py-0">
                                    <div class="form-check form-check-sm">
                                        <input class="form-check-input" type="radio" name="filtroTecnologias"
                                            id="filtroTodos" value="todos" v-model="filtroSeleccionado"
                                            @change="resetPage(); buscarTecnologias();">
                                        <label class="form-check-label" for="filtroTodos">
                                            Mostrar todos
                                        </label>
                                    </div>
                                    <div class="form-check form-check-sm ms-2">
                                        <input class="form-check-input" type="radio" name="filtroTecnologias"
                                            id="filtroActivos" value="activos" v-model="filtroSeleccionado"
                                            @change="resetPage(); buscarTecnologias();">
                                        <label class="form-check-label" for="filtroActivos">
                                            Solo activos
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- </div> -->
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
                                                Descripción</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'tecnologia ver' || p === 'tecnologia editar' || p === 'tecnologia borrar')">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="tecnologias.length > 0">
                                        <tr v-for="(tecnologia, index) in tecnologias" v-bind:key="tecnologia.id">
                                            <th class="text-center">
                                                {{ (6 * (page - 1)) + (index + 1) }}
                                            </th>
                                            <td class="text-center">
                                                <img v-if="tecnologia.imagen"
                                                    :src="`${urlBaseAsset}/img/img_tecnologias/${tecnologia.imagen}`"
                                                    height="53px">
                                                <img v-else
                                                    src="https://img.freepik.com/vector-premium/archivo-no-encontrado-ilustracion-plana_418302-62.jpg?w=1060"
                                                    height="53px">
                                            </td>
                                            <td class="text-start">
                                                {{ tecnologia.nombre }}
                                            </td>
                                            <td v-if="tecnologia.descripcion.length < 80">
                                                {{ tecnologia.descripcion }}
                                            </td>
                                            <td v-else
                                                style="max-width: 250px; word-wrap: break-word; white-space: normal;">
                                                <p v-if="tecnologia.truncado">
                                                    {{ tecnologia.descripcion.substring(0, 80) }}...
                                                    <!-- <div class="text-end"> -->
                                                    <small class="text-secondary cursor-pointer"
                                                        v-on:click="truncar(tecnologia.id)">(ver más)</small>
                                                    <!-- </div> -->
                                                </p>
                                                <p v-if="!tecnologia.truncado">
                                                    {{ tecnologia.descripcion }}
                                                <div class="text-end">
                                                    <small class="text-secondary cursor-pointer"
                                                        v-on:click="truncar(tecnologia.id)">(menos)</small>
                                                </div>
                                                </p>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    v-bind:class="{ 'badge-danger-personalizado': tecnologia.is_deleted, 'badge-success-personalizado': !tecnologia.is_deleted }">
                                                    {{ tecnologia.is_deleted ? 'Inactivo' : 'Activo' }}
                                                </span>
                                            </td>
                                            <td class="text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'tecnologia ver' || p === 'tecnologia editar' || p === 'tecnologia borrar')">
                                                <div class="d-flex justify-content-center">
                                                    <router-link v-bind:to="`/tecnologias/${tecnologia.id}`"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'tecnologia ver')">
                                                        <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action"></i>
                                                    </router-link>
                                                    <router-link v-bind:to="`/tecnologias/${tecnologia.id}/edit`"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'tecnologia editar')">
                                                        <i
                                                            class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action"></i>
                                                    </router-link>
                                                    <a
                                                        v-if="permisoStore.permisosUser.some(p => p === 'tecnologia borrar')">
                                                        <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                            v-bind:class="{ 'fa-check text-success': tecnologia.is_deleted, 'fa-trash text-danger': !tecnologia.is_deleted }"
                                                            v-on:click="eliminar(tecnologia.id)">
                                                        </i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" class="text-center fs-5">No existen registros.</td>
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
    import { eliminarTecnologia, listarTecnologias, listarTecnologiasActivas } from '@/services/TecnologiasService';
    import { urlBaseAsset } from '@/services/Http';
    import { usePermisoStore } from '@/stores/PermisosStore';
    import { mensajeExitoso } from '@/stores/alertas';

    const filtroSeleccionado = ref('todos');
    const tecnologias = ref([]);
    const search = ref('');
    const page = ref(1);
    const totalPages = ref(1);
    const permisoStore = usePermisoStore();

    const resetPage = () => { page.value = 1; };
    const buscarTecnologias = async () => {
        try {
            if (filtroSeleccionado.value == 'activos') {
                const response = await listarTecnologiasActivas(search.value);
                tecnologias.value = response.data.datos;
            } else {
                const response = await listarTecnologias(search.value, page.value);
                tecnologias.value = response.data.datos.data;
                page.value = response.data.datos.current_page;
                totalPages.value = response.data.datos.last_page;
            }
            for (const tecnologia of tecnologias.value) {
                tecnologia.truncado = true;
            }
        } catch (error) {
            console.error('Error al obtener los Módulos:', error);
        }
    };
    const truncar = (param) => {
        const tec = tecnologias.value.find(t => t.id == param);
        if (tec) {
            tec.truncado = !tec.truncado;
        }
    };
    const cambiarPagina = (param) => {
        page.value = param;
        buscarTecnologias();
    };
    const eliminar = async (param) => {
        try {
            const response = await eliminarTecnologia(param);
            mensajeExitoso();
        } catch (error) {
            console.error('Error al obtener los Módulos:', error);
        }
        buscarTecnologias();
    };

    onMounted(buscarTecnologias);

</script>

<style>
    .btn-action {
        transition: transform 0.2s ease-in-out;
    }

    .btn-action:hover {
        transform: scale(1.35);
    }


    /** ESTILOS PERSONALIZADOS */
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