<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <span v-if="posicion != ''"><i class="fas fa-pencil me-2"></i>Editar Registro</span>
                        <span v-else> <i class="fas fa-pencil me-2"></i>Nuevo Registro</span>
                    </h5>
                </div>
            </div>
        </div>
            <div class="col-12">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 ">
                                <label class="form-label font-weight-bolder text-sm" for="nombre">Nombre <span
                                        class="text-danger fst-italic"> * </span></label>
                                <input :class="datos.nombre==''?'form-control border-danger':'form-control'" type="text" placeholder="Escriba..."
                                    v-model="datos.nombre">
                                <small class="text-danger fst-italic text-xs" v-if="errors.nombre"><i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                            </div>
                            <div class="col-12 text-center d-flex justify-content-center">

                                <div :class="posicion != '' ? 'd-none' : ''">
                                    <button type="button" class="btn btn-danger me-2" @click="cancelar()"><i
                                        class="fas fa-reply me-2"></i>Volver</button>
                                    <button type="button" class="btn btn-primary ms-2" @click="guardar()">Guardar<i
                                            class="fas fa-save ms-2"></i></button>
                                </div>
                                
                                <div :class="posicion != '' ? '' : 'd-none'">
                                    <button type="button" class="btn btn-primary ms-2" @click="editar()">Guardar <i class="fas fa-save ms-2"></i></button>
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
import { showTipoPruebas, storeTipoPruebas, updateTipoPruebas } from '@/services/TipoPruebaService'
import { ref, onMounted } from 'vue';
const router = useRouter();

const datos = ref({})
onMounted(() => {
    mostrar()
})
let errors=ref({})
const guardar = async () => {
   

    try {
        const { data } = await storeTipoPruebas(datos.value)
        router.push({ path: `/tipo-pruebas` })
       
      
    } catch (error) {
        if(error.response.status==422){
            errors.value=error.response.data.errors
            
            
        }
        
        
    }
}


const cancelar = () => {
    router.push({ path: `/tipo-pruebas` })
}

const posicion = ref(router.currentRoute.value.params.idTipoPruebas)
const mostrar = async () => {
    try {
        const { data } = await showTipoPruebas(posicion.value)
        datos.value.nombre = data[0].nombre
        datos.value.nombre = data.datos.nombre




    } catch (error) {
        
        
    }
}


const editar = async () => {

    try {
        const { data } = await updateTipoPruebas(posicion.value, datos.value)
        router.push({ path: `/tipo-pruebas` })
        data[0].nombre = datos.value.nombre;


    } catch (error) {

    }
}


</script>
<style></style>