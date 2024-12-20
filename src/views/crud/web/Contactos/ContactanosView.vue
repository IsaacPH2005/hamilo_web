<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-envelope me-2"></i>Mensajes - Contactos / Página Web</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8">
                            <input type="search" class="form-control" placeholder="Buscar..." v-model="searchMensaje" @change="buscarMensaje(searchMensaje)">
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm" >
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">Item</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Nombres </th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Apellidos</th>
                                            <th class="text-uppercase font-weight-bolder text-center">Email</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Teléfono</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Mensaje</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Fase</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="9" class="text-center">
                                                No se encuentran datos disponibles
                                            </td>
                                        </tr>
                                        <tr v-for="(item, indice) in datos" :key="item.id" class="text-center">
                                            <td>{{ indice + 1 }}</td>
                                            <td>{{ item.nombres }}</td>
                                            <td>{{ item.apellidos }}</td>
                                            <td>{{ item.email }}</td>
                                            <td>{{ item.telefono }}</td>
                                            <td>{{ item.mensaje }}</td>
                                            <td><span class="badge" :class="item.is_deleted ? 'badge-danger-personalizado' : 'badge-success-personalizado'">{{
                                                item.is_deleted?'Inactivo':'Activo'}}</span></td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer" @click="estado(item.id)" :class="item.is_deleted ? 'fa-check text-success':'fa-trash text-danger'">
                                                    </i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()"><span
                                                        aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" :class="{ 'active': item == paginacion.pagina }" v-for="(item, indice) in paginacion.total" :key="indice">
                                                <button type="button" class="page-link" :class="{ 'text-white': item == paginacion.pagina }" @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item" :class=" { 'disabled': paginacion.total <= paginacion.pagina }" >
                                                <button type="button" class="page-link" aria-label="Next" @click="paginaNext()"><span
                                                        aria-hidden="true">&raquo;</span>
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
import { cambiarEstado, index, indexSearchContactos } from '@/services/ContactosService';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const searchMensaje = ref('');
const datos = ref([]);
const verbusqueda = ref(0);
const nombres = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
});
const router = useRouter();
onMounted(() => {
    listar();
})

const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina);
        if (data.datos.data.length > 0) {
            datos.value = data.datos.data;
            paginacion.value.total = data.datos.last_page;
            }
    } catch (error) {
        console.log(error);
    }
}
const buscarMensaje = async param => {
    try {
        const { data } = await indexSearchContactos(param);
        datos.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
        verbusqueda.value = 0;
    } catch (error) {
        console.log(error);
    }
}
const estado = async param => {
    try {
        const { data } = await cambiarEstado(param);
        Swal.fire({
            title: "Estado modificado",
            text: "Estado modificado correctamente",
            icon: "success"
        });
        listar();
    } catch (error) {
        console.log(error);
    }
}
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
</script>
<style >
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
