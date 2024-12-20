<template>

    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-pencil me-2"></i>Nuevo Registro</h5>
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">

                        <div class="col-12 col-md-6">
                            <label for="tipo_prueba" class="form-label font-weight-bolder text-sm">Tipo Prueba<span
                                    class="text-danger fst-italic">*</span></label>
                            <select class="form-select" name="tipoPrueba" id="tipoPrueba" v-model="tipoPrueba">
                                <option value="">Seleccione</option>
                                <option :value="item.id" v-for="(item, i) in objetoTipoPruebas" :key="i">{{ item.nombre
                                    }}</option>
                            </select><small class="text-danger fst-italic text-xs" v-if="errors.tipo_prueba_id"><i class="fas fa-times me-1"></i>El tipo de prueba es obligatorio</small>
                        </div>



                        <div class="col-12 col-md-6">
                            <label for="fecha" class="form-label font-weight-bolder text-sm">Fecha<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="date" class="form-control" placeholder="Escriba..." id="fecha" v-model="fecha"><small class="text-danger fst-italic text-xs" v-if="errors.fecha"><i class="fas fa-times me-1"></i>{{ errors.fecha[0] }}</small>
                        </div><br>
                        <div class="col-12 col-md-6">
                            <label for="email" class="form-label font-weight-bolder text-sm">Email<span
                                    class="text-danger fst-italic">* </span></label><span class="badge bg-info ms-2" style="border-radius: 50%;" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviará informacion a este Email">
                                                <i class="text-white fas fa-info"></i>
                                            </span>
                            <input type="email" class="form-control" placeholder="Ingrese Email..." id="email" v-model="email">
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="enlace" class="form-label font-weight-bolder text-sm">Enlace<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="url" class="form-control" placeholder="Ingrese URL..." id="enlace"
                                v-model="enlace"><small class="text-danger fst-italic text-xs" v-if="errors.enlace"><i class="fas fa-times me-1"></i>El enlace es obligatorio</small>
                        </div>
                        <div class="col-12 ">
                            <label for="enlace" class="form-label font-weight-bolder text-sm">Enlace Alternativo</label>
                            <input type="text" class="form-control" placeholder="Ingrese URL..." id="enlace"
                                v-model="enlace_alternativo">
                        </div>

                        <div class="col-12 text-center d-flex justify-content-center">
                            <button type="button" class="btn btn-danger me-2" @click="cancelar()"><i
                                    class="fas fa-reply me-2"></i>Volver</button>

                            <div>
                                <button :class="{'disabled':estadoBoton}" type="button" class="btn btn-primary ms-2" @click="guardar()">Guardar<i class="fas" :class="estadoBoton? 'fa-spinner fa-spin ms-2':'fa-save'"></i></button>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="col-4">
            <div class="card shadow-lg">
                <div class="card border-0 shadow">
                    <div class="card-header bg-white">
                        <h5 class="card-title text-center">Informacion del Postulante</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12">
                                <label for="form-label ">
                                    Persona seleccionada
                                </label>
                                <p class="m-0"><span class="fw-bold">Nombre:</span> {{ datosPostulante.nombre}} </p>
                                <p class="m-0"><span class="fw-bold">Apellido:</span> {{ datosPostulante.apellido}}
                                </p>
                                <p class="m-0"><span class="fw-bold">CI:</span> {{ datosPostulante.ci }} </p>
                                <p class="m-0"><span class="fw-bold">Telefono:</span> {{ datosPostulante.telefono }}
                                </p>
                                <p class="m-0"><span class="fw-bold">Pais:</span> {{ datosPostulante.pais }} </p>
                                <p class="m-0"><span class="fw-bold">Ciudad:</span> {{ datosPostulante.ciudad }} </p>
                                <p class="m-0"><span class="fw-bold">Direccion:</span> {{ datosPostulante.direccion }}
                                </p>


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
import { BuscadorPruebas, enviarCorreoPruebas, IndexPruebas, seleccionarPresona, ShowPruebasId, StorePruebas } from '@/services/PruebasService';
import { ref, onMounted } from 'vue';
import { indexTipoPruebas, obtenerTodosTiposPruebas } from '@/services/TipoPruebaService';
import { show } from '@/services/Postulaciones'
import { Tooltip } from 'bootstrap';
const router = useRouter();

const datos = ref({})
onMounted(() => {

    obtenerTiposPrueba()
    mostrarInformacionPostulante()    

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
})

//nuevo implementacion
let datosPostulante = ref({
   nombre:"",
   apellido:"",
   ci:"",
   telefono:"",
   pais:"",
   ciudad:"",
   direccion:""
})

let idPersonaSeleccionada = ref("")
let email=ref("")
const posicion = ref(router.currentRoute.value.params.idPruebas)
const mostrarInformacionPostulante = async () => {
    try {
        const { data } = await show(posicion.value) 
        datosPostulante.value.nombre = data.datos[0].users.datos_generales.nombre
        datosPostulante.value.apellido = data.datos[0].users.datos_generales.apellido
        datosPostulante.value.ci = data.datos[0].users.datos_generales.ci
        datosPostulante.value.telefono = data.datos[0].users.datos_generales.telefono
        datosPostulante.value.pais = data.datos[0].users.datos_generales.pais
        datosPostulante.value.ciudad = data.datos[0].users.datos_generales.ciudad
        datosPostulante.value.direccion = data.datos[0].users.datos_generales.direccion
        email.value=data.datos[0].users.email
        
        
        


    } catch (error) {

    }
}


//fin nueva implemetacion

const cancelar = () => {
    router.push({ path: `/pruebas` })
}

const objetoTipoPruebas = ref([])
const obtenerTiposPrueba = async () => {
    try {
        const { data } = await obtenerTodosTiposPruebas()
        objetoTipoPruebas.value = data.datos
    } catch (error) {

    }
}

const tipoPrueba = ref("")
const postulacion_id = ref("")
const tipo_prueba_id = ref("")
const enlace = ref("")
const enlace_alternativo = ref("")
const rendimiento = ref("")
const fecha = ref("")

const formulario = ref({})
let errors=ref({})
const estadoBoton=ref(false)
const guardar =  () => {
    Swal.fire({
  title: "Esta seguro/a?",
  text: "Se enviará el enlace de prueba al correo correspondiente!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si,envíar!"
}).then(async(result) => {
  if (result.isConfirmed) {
    try {
        estadoBoton.value=true
        let objeto = {
            postulacion_id: posicion.value,
            tipo_prueba_id: tipoPrueba.value,
            enlace: enlace.value,
            enlace_alternativo: enlace_alternativo.value,
            fecha: fecha.value,
            email:email.value
        }



        const { data } = await StorePruebas(objeto)
        estadoBoton.value=false
        router.push({ path: `/pruebas` })
    Swal.fire({
      title: "Enviado!",
      text: "Se ha enviado correctamente la prueba",
      icon: "success"
    });
  }
   catch (error) {
        if(error.response.status==422){
            errors.value=error.response.data.errors
           
            
            
            
        }
    }finally{
        estadoBoton.value=false
    }
}
});
    
        

    
}
</script>
<style></style>