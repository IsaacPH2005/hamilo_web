<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2" :class="idConvocatoria !== ''? 'fa-pencil': 'fa-save'"></i>{{ idConvocatoria !== ''?'Editar Registro':'Nuevo Registro' }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="fecha_inicio" class="form-label font-weight-bolder text-sm">Fecha Inicio<span class="text-danger fst-italic">*</span></label>
                            <input type="date" class="form-control" id="fecha_inicio" :class="{ 'border-danger': errors.fecha_inicio }" v-model="formulario.fecha_inicio">
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha_inicio" ><i class="fas fa-times me-1"></i>{{ errors.fecha_inicio[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="fecha_fin" class="form-label font-weight-bolder text-sm">Fecha Fin<span class="text-danger fst-italic">*</span></label>
                            <input type="date" class="form-control" id="fecha_fin" :class="{ 'border-danger': errors.fecha_fin }" v-model="formulario.fecha_fin">
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha_fin"><i class="fas fa-times me-1"></i>{{ errors.fecha_fin[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="convocatoria" class="form-label font-weight-bolder text-sm">Batchs Activos<span class="text-danger fst-italic">*</span></label>
                            <select id="batchs_id" class="form-select" :class="{ 'border-danger': errors.batch_id }" aria-label="Default select example" v-model="formulario.batch_id">
                                <option value="" selected>Seleccione</option>
                                <option v-for="(item,index) in convocatorias" :key="item.id" :value="item.id">{{ item.id+' - '+item.crm_especialidades.nombre  }} </option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errors.batch_id"><i class="fas fa-times me-1"></i>{{ errors.batch_id[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="url_imagen" class="form-label font-weight-bolder text-sm">Imagen<span class="text-danger fst-italic">*</span></label>
                            <input type="file" class="form-control" id="url_imagen" :class="{ 'border-danger': errors.url_imagen }" @change="obtenerImagen($event)" accept="image/*">
                            <small class="text-danger fst-italic text-xs" v-if="errors.url_imagen"><i class="fas fa-times me-1"></i>{{ errors.url_imagen[0] }}</small>
                            <div v-if="url_imagen">
                                <p>Vista previa:</p>
                                <img :src="url_imagen" alt="imagePreview" width="200" />
                            </div>
                        </div>                     
                        <div class="col-12 text-center">                            
                            <button type="submit" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn ms-2" :class="{'btn-warning': idConvocatoria !== '','btn-primary': idConvocatoria === '','disabled': estadoBoton}" @click="guardar()">{{ idConvocatoria != "" ? 'Editar': 'Guardar'}}   <i class="fas" :class="estadoBoton? 'fa-spinner fa-spin':'fa-save'"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { show, store, update } from '@/services/ConvocatoriasService';
import { batchActivos } from '@/services/ConvocatoriasService';
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const formulario = ref({
    fecha_inicio: '',
    fecha_fin: '',
    batch_id: '',
    url_imagen: null
});
const router = useRouter();
const idConvocatoria = router.currentRoute.value.params.idConvocatoria;
const convocatorias = ref([]);
const errors = ref({});
const estadoBoton = ref(false);
const url_imagen = ref(null);
const obtenerImagen = (event) => {
            url_imagen.value = URL.createObjectURL(event.target.files[0]);
            formulario.value.url_imagen = event.target.files[0];
    }
const listarBatch = async () => {
    try {
        const { data } = await batchActivos('');
        convocatorias.value = data.datos;   
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    listarBatch();
    if (idConvocatoria != "") {
        verRegistro();
    }
});

const volver = () => {
    router.push({path: '/convocatorias'});
}
const guardar = async () => {
    errors.value = {};
    try {
        estadoBoton.value = true;
        let mensaje = null;
        const formData = new FormData();
            formData.append('batch_id', formulario.value.batch_id);
            formData.append('fecha_inicio', formulario.value.fecha_inicio);
            formData.append('fecha_fin', formulario.value.fecha_fin);
            if(formulario.value.url_imagen instanceof File){
                formData.append('url_imagen', formulario.value.url_imagen);
            } 
        if (idConvocatoria != "") { 
            formData.append('_method', "PUT");
            const { data } = await update(idConvocatoria, formData);
            mensaje = data.mensaje;
            Swal.fire({
            title: "Registro editado",
            text: "Registro modificado correctamente.",
            icon: "success"
        });
        } else {
            const { data } = await store(formData);   
            mensaje = data.mensaje; 
            estadoBoton.value = true;
            Swal.fire({
            title: "Registro guardado",
            text: "Registro guardado correctamente.",
            icon: "success"
        });        
        }
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }finally {
        estadoBoton.value = false;
    }
}
const verRegistro = async () => {
    try {
        const { data } = await show(idConvocatoria);
        formulario.value = {
            fecha_inicio: data.datos.fecha_inicio,
            fecha_fin: data.datos.fecha_fin,
            batch_id: data.datos.batch_id,
            url_imagen: data.datos.url_imagen
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
