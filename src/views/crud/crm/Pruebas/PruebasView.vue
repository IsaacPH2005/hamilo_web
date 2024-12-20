<template>

    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i> Pruebas
                        Registradas</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body ">
                    <div class="row gy-2">
                        <div class="text-center">
                            
                        </div>
                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center text-sm">
                                <thead class="table-gray-personalizado">
                                    <tr class="text-white">
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Item</th>
                                        
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Postulante</th>

                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Especialidad</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Fase</th>
                                        <th class="text-uppercase font-weight-bolder text-center" v-if="permisoStore.permisosUser.some( p => p === 'prueba crear')">
                                            Acciones</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="usuario.length === 0">
                        <td colspan="7" class="text-center">No se encontraron registros aun</td>
                      </tr>
                                    <tr class="text-center" v-for="(item, i) in usuario" :key="item.id">
                                        <td>{{ i=i+1 }}</td>
                                        

                                        <td>
                                            <span class="text-center text-sm font-weight-bold mb-0">{{item.users.datos_generales.nombre}} {{item.users.datos_generales.apellido}}</span>
                                        </td>
                                        <td>
                                            <p class="text-center text-sm font-weight-bold mb-0">{{ item.batch.crm_especialidades.nombre }}</p>
                                        </td>
                                        <td>
                                            <p class="text-center text-sm font-weight-bold mb-0">{{
                                                item.estado }}</p>
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm">

                                                
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="ver(item.id)"></i>
                                                

                                            </div>
                                        </td>



                                    </tr>

                                </tbody>
                            </table>
                            <div class="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item">
                                            <button :class="paginacion.pagina<=1?'d-none':''" @click="paginaBefore()"  type="button" class="page-link" aria-label="Previous"><span
                                                    aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item">
                                            <button type="button" class="page-link">{{ paginacion.pagina }}</button>
                                        </li>
                                        <li class="page-item">
                                            <button :disabled="paginacion.pagina >= paginacion.total" @click="paginaNext()" type="button" class="page-link" aria-label="Next">
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


</template>
<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { index,show } from '@/services/Postulaciones'
import { usePermisoStore } from '@/stores/PermisosStore';
import { listarEstadoPrueba } from '@/services/PruebasService';
const permisoStore=usePermisoStore()
const router = useRouter()
onMounted(() => {
    
    listarPostulaciones()
})

const datos = ref([])



const usuario = ref([]);
const listarPostulaciones = async () => {
    try {
        const { data } = await listarEstadoPrueba(paginacion.value.pagina)
        usuario.value = data.datos.data
        paginacion.value.total=Math.ceil(data.datos.total/data.datos.per_page)
          
    } catch (error) {

    }
}
const paginacion=ref({
    total:null,
    pagina:1
})
const paginaNext=()=>{
    paginacion.value.pagina++
    listarPostulaciones()
}
const paginaBefore=()=>{
    paginacion.value.pagina--
    listarPostulaciones()
}

const ver=async(param)=>{
    try {
        const{data}=await show(param)
        router.push({ path: `/pruebas-form/${param}` })
        
        
    } catch (error) {
        
    }
}
</script>
<style></style>