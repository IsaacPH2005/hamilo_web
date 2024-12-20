<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i> Pruebas
                        Revision</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body ">
                    <div class="row gy-2">

                        <div class="table-responsive p-0">
                            <table class="table align-items-center justify-content-center text-sm">
                                <thead class="table-gray-personalizado">
                                    <tr class="text-white">
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Item</th>

                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Postulante</th>

                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Tipo Prueba</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Responsable</th>
                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Estado</th>

                                        <th class="text-uppercase font-weight-bolder text-center">
                                            Fecha</th>
                                        <th class="text-uppercase font-weight-bolder text-center" v-if="permisoStore.permisosUser.some( p=> p === ' prueba ver' || p=== 'prueba editar')">
                                            Acciones</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="datos.length === 0">
                                        <td colspan="7" class="text-center">No se encontraron registros aun</td>
                                    </tr>
                                    <tr class="text-center" v-for="(item, i) in datos" :key="i">
                                        <td>{{ i=i + 1 }}</td>
                                        <td>
                                            <span class="text-center text-sm font-weight-bold mb-0">{{ item.postulaciones.users.datos_generales?.nombre }} {{ item.postulaciones.users.datos_generales?.apellido }}</span>
                                        </td>

                                        <td>
                                            <span class="text-center text-sm font-weight-bold mb-0">{{
                                                item.tipo_pruebas.nombre }}</span>
                                        </td>
                                        <td>
                                            <p class="text-center text-sm font-weight-bold mb-0">{{ item.users.email }}
                                            </p>
                                        </td>
                                        <td><p :class="item.rendimiento==null?'text-info':''" class="text-center text-sm font-weight-bold mb-0" v-if="item.rendimiento==null">En proceso
                                        </p>
                                            <p :class="item.rendimiento=='aprobado'?'text-success':'text-danger'" class="text-center text-sm font-weight-bold mb-0" v-else>{{ item.rendimiento }}
                                            </p>
                                            
                                            
                                            
                                        </td>

                                        <td>
                                            <p class="text-center text-sm font-weight-bold mb-0">{{ item.fecha }}</p>
                                        </td>

                                        <td>
                                            <div  class="btn-group btn-group-sm" >
                                                

                                                <div >
                                                    <button :class="{'disabled':item.rendimiento !=null}"  
                                                        class="btn btn-info btn-xs" @click="ver(item.id)">
                                                        <i class="fas fa-tasks"></i>
                                                    </button>
                                                </div>


                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <div class="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item">
                                            <button :class="paginacion.pagina<=1?'d-none':''"   @click="paginaBefore()" type="button" class="page-link" aria-label="Previous"><span
                                                    aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item">
                                            <button type="button" class="page-link">{{ paginacion.pagina }}</button>
                                        </li>
                                        <li class="page-item">
                                            <button :class="paginacion.pagina>=paginacion.total?'d-none':''" @click="paginaNext()" type="button" class="page-link" aria-label="Next"><span
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

    <!-- Modal -->
    <div class="modal fade show " id="staticBackdrop"   tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title " >Revision</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12">
                        <div class="card ">
                            <div class="card-body">
                                <div class="row gy-3">

                                    <div class="col-12 col-md-6">
                                        <label for="tipo_prueba"
                                            class="form-label font-weight-bolder text-sm">Puntaje<span
                                                class="text-danger fst-italic">*</span></label>
                                        <input type="text" class="form-control" placeholder="Escriba" v-model="formulario.puntaje"><small class="text-danger fst-italic text-xs" v-if="errors.puntaje"><i class="fas fa-times me-1"></i>El Puntaje es obligatorio</small>

                                    </div>

                                    <div class="col-12 col-md-6">
                                        <label for="enlace"
                                            class="form-label font-weight-bolder text-sm">Rendimiento<span
                                                class="text-danger fst-italic">*</span></label>
                                        <select class="form-select" v-model="formulario.rendimiento" name="rendimiento" id="rendimiento">
                                            <option value="">Seleccione</option>
                                            <option value="aprobado">Aprobado</option>
                                            <option value="reprobado">Reprobado</option>
                                        </select><small class="text-danger fst-italic text-xs" v-if="errors.rendimiento"><i class="fas fa-times me-1"></i>El Rendimiento es obligatorio</small>
                                    </div>

                                    


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="col-12 text-center d-flex justify-content-center">
                        <button  data-bs-dismiss="modal" type="button" class="btn btn-danger me-2" @click="cancelar()"><i
                            class="fas fa-reply me-2"></i>Volver</button>

                        <div>
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
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { ref, onMounted } from 'vue';
import { IndexPruebas, ShowPruebasId, UpdatePruebasId } from '@/services/PruebasService';
import { useRouter } from 'vue-router';
import { index } from '@/services/Postulaciones';
import { usePermisoStore } from '@/stores/PermisosStore';
const router = useRouter()
const permisoStore=usePermisoStore()
let modal = ref(null)
let instanciaModal =ref(null) 
onMounted(() => {
    listarPruebas()
    
    
    modal = document.getElementById('staticBackdrop')
    instanciaModal = new Modal(modal);
})

let datos = ref([])
const listarPruebas = async () => {
    try {
        const { data } = await IndexPruebas(paginacion.value.pagina)
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
    listarPruebas()
}
const paginaBefore=()=>{
    paginacion.value.pagina--
    listarPruebas()
}


const cancelar=()=>{
    router.push({ path: `/pruebas-revision` })
}
let posicion=ref(null)
const ver=async(param)=>{
    
instanciaModal.show()

    try {
        const{data}=await ShowPruebasId(param)
        formulario.value.puntaje=data.datos.puntaje
        formulario.value.rendimiento=data.datos.rendimiento
        posicion.value=data.datos.id
        
    } catch (error) {  
    }
}
const formulario=ref({})
let errors=ref({})
const guardar=async()=>{
    

try {

    const{data}=await UpdatePruebasId(posicion.value,formulario.value)
    data.datos.puntaje=formulario.value.puntaje
    data.datos.rendimiento=formulario.value.rendimiento
    listarPruebas()
    instanciaModal.hide()
    errors.value=""
   
    
} catch (error) {
    if(error.response.status==422){
            errors.value=error.response.data.errors
               
        }
}
  }


</script>
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}
.modal-image {
  width: 100%;
  height: auto;
}

.modal-pdf {
  width: 100%;
  height: 600px;
}
</style>