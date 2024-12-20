<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-solid fa-shoe-prints me-2"></i>Pasos Postulación</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8 d-flex align-items-center">
                            <input type="search" class="form-control me-4" placeholder="Buscar..." v-model="buscado" @change="busqueda(buscado)">
                        </div>
                        <div class="col-12 col-md-4 text-center">
                            <button type="button" class="btn btn-primary mt-3" @click="agregar()" v-if="permisoStore.permisosUser.some( p=> p === 'paso postulacion crear')"><i class="fas fa-plus-circle me-2"></i> Agregar</button>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm" >
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">Item</th>
                                            <th class="text-uppercase font-weight-bolder text-center">Icono</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">Nombre</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">Descripción</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">Numero de Paso</th>
                                            <th class="text-uppercase font-weight-bolder text-center">Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="9" class="text-center">
                                                No se encuentran datos disponibles
                                            </td>
                                        </tr>
                                        <tr v-for="(item, indice) in datos" :key="item.id">
                                            <td class="text-center">{{ indice+1 }}</td>
                                            <td class="text-center"><img :src="item.icono" width="100px" height="100px" alt=""></td>
                                            <td class="text-center">{{ item.nombre }}</td>
                                            <td>{{ item.descripcion.substring(0, 80) }}</td>
                                            <td class="text-center">{{ item.numero_paso }}</td>
                                            <td class="text-center"><span class="badge" :class="item.is_deleted ? 'badge-danger-personalizado':'badge-success-personalizado'">{{ item.is_deleted?'Inactivo':'Activo'}}</span></td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer" @click="detalle(item.id)" v-if="permisoStore.permisosUser.some( p=> p === 'paso postulacion ver')"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="editar(item.id)" v-if="permisoStore.permisosUser.some( p=> p === 'paso postulacion editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer" :class="{ 'fa-check text-success': item.is_deleted, 'fa-trash text-danger': !item.is_deleted }" @click="estado(item.id)" v-if="permisoStore.permisosUser.some( p=> p === 'paso postulacion borrar')"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled' : paginacion.pagina <= 1}">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" v-for="(item, index) in paginacion.total" :key="index"><button type="button"
                                                    class="page-link"
                                                    :class="{'active' : item == paginacion.pagina}"
                                                    @click="paginaCambio(item)">{{item}}</button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled' : paginacion.pagina >= paginacion.total}">
                                                <button type="button" class="page-link" aria-label="Next"
                                                    @click="paginaNext()">
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
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import { buscador, changeStatus, index } from '@/services/PostulacionPasosService'
    import { useRouter } from 'vue-router';
    import { usePermisoStore } from '@/stores/PermisosStore';
    const permisoStore = usePermisoStore();
    import Swal from 'sweetalert2';
    const datos = ref([]);
    const router = useRouter();
    const buscado = ref('');
    onMounted(() => {
        listar();
    })
    const listar = async () => {
        try {
            const { data } = await index(paginacion.value.pagina);
            datos.value = data.datos.data; 
            paginacion.value.total = data.datos.last_page;           
        } catch (error) {
            console.log(error);
        }
    }
    const agregar = () => {
        router.push({path: '/postulacion-pasos-formulario'});
    }
    const estado = param => {
        try {
            Swal.fire({
                title: "¿Esta seguro?",
                text: "Esta a punto de modificar el estado!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, modificar!",
                cancelButtonText:   "No, cancelar!"
                }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await changeStatus(param);
                    listar();
                    Swal.fire({
                        title: "Bien!",
                        text: "Estado modificado correctamente.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const editar = param => {
        router.push({path: `postulacion-pasos-formulario/${param}`})
    }
    const detalle = async param => {
        router.push({path: `postulacion-pasos-detalle/${param}`})
    }
    const paginacion = ref({
        total: null,
        pagina: 1
    })
    const paginaNext = () => {
        paginacion.value.pagina++;
        listar();
    }
    const paginaPrev = () => {
        paginacion.value.pagina--;
        listar();
    }
    const paginaCambio = param => {
        paginacion.value.pagina = param;
        listar();
    }
    const busqueda = async param => {
        try {
            const { data } = await buscador(param);
            datos.value = data.datos.data;
            paginacion.value.total = data.datos.last_page;
        } catch (error) {
            console.log(error);
        }
    }
</script>
<style>
</style>