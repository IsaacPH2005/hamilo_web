<template>

    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Tipos De Pruebas
                        Registradas</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body ">
                    <div class="row gy-2">
                        <div class="col-12 d-flex ">
                            <div class="col-12 col-md-8 d-flex align-items-center ">

                                <input type="search" class="form-control" placeholder="Buscar..." v-model="search">
                            </div>
                            <div class="col-12 col-md-4 text-center">
                                <button  type="button" class="btn btn-primary" @click="agregar()" v-if="permisoStore.permisosUser.some( p=> p === 'tipo pruebas crear')"><i
                                        class="fas fa-plus-circle me-2"></i> Agregar</button>
                            </div>


                        </div>

                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center text-sm">
                                <thead class="table-gray-personalizado">
                                    <tr class="text-white">
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Item</th>
                                        
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Nombre</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Estado</th>
                                        <th class="text-uppercase font-weight-bolder text-center" v-if="permisoStore.permisosUser.some(element => element ==='tipo pruebas ver' || element==='tipo pruebas editar ' || element==='tipo pruebas borrar')">
                                            Acciones </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody class="text-center">
                                    <tr v-if="datos.length === 0">
                        <td colspan="7" class="text-center">No se encontraron registros aun</td>
                      </tr>
                                    <tr v-for="(item, i) in filteredDatos" :key="i">
                                        <td>
                                            <p class="text-center text-sm font-weight-bold ms-3">{{ i=i + 1 }}</p>
                                        </td>
                                        
                                        <td>
                                            <p class="text-center text-sm font-weight-bold mb-0">{{ item.nombre }}</p>
                                        </td>
                                        <td>
                                            <span
                                                :class="item.is_deleted ? 'badge badge-danger-personalizado' : 'badge badge-success-personalizado'">{{
                                                    item.is_deleted ? 'Inactivo' : 'Activo' }}</span>
                                        </td>

                                        <td class="text-center">
                                            <div class="btn-group btn-group-sm">
                                               
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointe"@click="ver(item.id)"></i>
                                                
                                                
                                               
                                                    <i class="fas fa-trash mx-1 text-danger fa-lg fs-5 btn-action cursor-pointe " @click="estado(item.id)"></i>
                                               
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div class="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item">
                                            <button :class="paginacion.pagina<=1?'d-none':''" @click="paginaBefore()" type="button" class="page-link" aria-label="Previous"><span
                                                    aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item">
                                            <button  type="button" class="page-link">{{ paginacion.pagina }}</button>
                                        </li>
                                        <li class="page-item">
                                            <button :class="paginacion.pagina>=paginacion.total?'d-none':''"  @click="paginaNext()" type="button" class="page-link" aria-label="Next"><span
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


</template>
<script setup>
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { indexTipoPruebas, destroyTipoPruebas } from '@/services/TipoPruebaService'
import { ref, onMounted, computed } from 'vue';
import { usePermisoStore } from '@/stores/PermisosStore';
const permisoStore=usePermisoStore()
const router = useRouter()
onMounted(() => {
    listarDatos();
})
const agregar = () => {
    router.push({ path: `/tipo-pruebas-form` })
}
const datos = ref([])
const listarDatos = async () => {
    try {
        const { data } = await indexTipoPruebas(paginacion.value.pagina);
        datos.value = data.datos.data
        paginacion.value.total=Math.ceil(data.datos.total/data.datos.to)
        
    } catch (error) {

    }
}

const paginacion=ref({
    total:null,
    pagina:1
})
const paginaNext=()=>{
    paginacion.value.pagina++
    listarDatos()
}
const paginaBefore=()=>{
    paginacion.value.pagina--
    listarDatos()
}

const ver = async (param) => {
    try {

        router.push({ path: `/tipo-pruebas-form/${param}` })

    } catch (error) {

    }
}

const estado = async (param) => {
    Swal.fire({
  title: "Esta seguro/a?",
  text: "Se actualizará el estado del tipo de prueba!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si,actualizar!"
}).then(async(result) => {
    if (result.isConfirmed) {
    try {
        const { data } = await destroyTipoPruebas(param);
        listarDatos()
        Swal.fire({
      title: "Actualizado!",
      text: "Se ha actualizado el estado",
      icon: "success"
    });
    } catch (error) {

    }
}
})
}



const search = ref("")
const filteredDatos = computed(() => {
    return datos.value.filter(item => item.nombre.toLowerCase().includes(search.value.toLowerCase()));
})


</script>
<style></style>