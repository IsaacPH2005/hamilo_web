<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-solid fa-comments me-2"></i>Testimonios de
                        nuestros Estudiantes</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">

                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" @click="formulario()"><i
                                        class="fas fa-plus-circle me-2"></i> Agregar</button>
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
                                                Titulo</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Usuario</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(testimonio, index) in testimonios" :key="testimonio.id">

                                            <td class="text-center">
                                                {{ index + 1 }}
                                            </td>
                                            <td>
                                                {{ testimonio.experiencia }}
                                            </td>
                                            <td>
                                                {{ testimonio.users.datos_generales.nombre }}
                                            </td>
                                            <td class="text-center">
                                                <span class="badge" :class="testimonio.is_deleted? 'badge-danger-personalizado':'badge-success-personalizado'"> {{testimonio.is_deleted? 'Inactivo':'Activo' }}</span>
                                            </td>

                                            <td class="text-center">
                                                <div class="btn-group">
                                                    
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="editar(testimonio.id)"
                                                        v-if="permisoStore.permisosUser.some((p) => p === 'testimonio editar')"></i>

                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                        :class="{ 'fa-check text-success': testimonio.is_deleted, 'fa-trash text-danger': !testimonio.is_deleted }"
                                                        @click="estado(testimonio.id)"
                                                        v-if="permisoStore.permisosUser.some((p) => p === 'testimonio borrar')"></i>
                                                </div>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                                <!--PAGINACION-->
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
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { index, destroy } from '@/services/TestimoniosService';
import { testimoniosStore } from '@/stores/TestimoniosStore';
import { usePermisoStore } from '@/stores/PermisosStore';
import { obtenerPermisos } from '@/services/UserService';

const permisoStore = usePermisoStore();
const router = useRouter();
const testimonios = ref({});
const testimonioActual = testimoniosStore();

const permisos = async () =>{
    try {
        const { data } = await obtenerPermisos();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const paginacion = ref({
        total: null,
        pagina: 1
    });

const estado = async param =>{
    try {
        const {data} = await destroy(param);
        listar()
    } catch (error) {
        console.log(error);        
    }
}

const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina);
        testimonios.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
        } catch (error) {
        console.log(error);
    }
};
const paginaPrev = () => {
        paginacion.value.pagina--;
        listar();
    }
    const paginaNext = () => {
        paginacion.value.pagina++;
        listar();
    }
    const paginaCambio = param => {
        paginacion.value.pagina = param;
        listar();
    }

onMounted(() => { listar(); });
    //permisos();

const formulario = () =>{
    router.push({path:'/testimonios-nuevo'});
}

const editar = (id) =>{
    router.push({path: `/testimonios-nuevo/${id}`})
}

</script>
<style>
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