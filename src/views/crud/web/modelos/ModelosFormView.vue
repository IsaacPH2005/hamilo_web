<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2" :class="idModelo !== ''? 'fa-pencil': 'fa-save'"></i>{{ idModelo !== ''?'Editar Registro':'Nuevo Registro' }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control border" :class="{ 'border-danger': errors.nombre }" placeholder="Escriba..." id="nombre" v-model="formulario.nombre">
                            <small class="text-danger fst-italic text-xs" v-if="errors.nombre"><i class="fas fa-times me-1"></i>{{errors.nombre[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion" class="form-label font-weight-bolder text-sm">Descripción<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control border" :class="{ 'border-danger': errors.descripcion }" placeholder="Escriba..." id="descripcion" v-model="formulario.descripcion">
                            <small class="text-danger fst-italic text-xs" v-if="errors.descripcion"><i class="fas fa-times me-1"></i>{{ errors.descripcion[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="icono" class="form-label font-weight-bolder text-sm">Inserte un icono <span v-show="idModelo==''" class="text-danger fst-italic">*</span></label>
                            <input type="file" class="form-control border" :class="{ 'border-danger': errors.icono }" id="icono" accept=".png, .jpg .jpeg" @change="obtenerIcono($event)">
                            <small class="text-danger fst-italic text-xs" v-if="errors.icono"><i class="fas fa-times me-1"></i>{{ errors.icono[0] }}</small>
                        </div>   
                        <div class="col-12 col-md-12 text-center" v-if="previewIcono">
                            <div class="card">
                                <div class="card-header">
                                    <h5>Vista previa de icono</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <img :src="previewIcono" alt="preview_icono" width="60px" height="60px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
        
                        <div class="col-12 text-center">                            
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()">{{ idModelo != "" ? 'Editar': 'Guardar'}}<i class="fas ms-2" :class="{ 'fa-pencil': idModelo != '', 'fa-save': idModelo === '', 'fa-spinner fa-spin': estadoBoton === true}"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { show, update, store } from "@/services/ModelosServices";
import Swal from "sweetalert2";
const router = useRouter();
const idModelo = router.currentRoute.value.params.idModelo;
const errors = ref({});
const estadoBoton=ref(false);
const formulario = ref({
    nombre: '',
    descripcion: '',
    icono: null,
});

onMounted(() => {
    if (idModelo != "") {
        verRegistro();
    }
});

const obtenerIcono= (event)=>{
    formulario.value.icono=event.target.files[0];
}
const previewIcono = computed(() => {
    if (formulario.value.icono) {
        return URL.createObjectURL(formulario.value.icono);
    } else {
        return null;
    }
});
const guardar = async () => {
    errors.value = {};
    estadoBoton.value=true;
    try {
        const formData = new FormData();
        formData.append('nombre', formulario.value.nombre);
        formData.append('descripcion', formulario.value.descripcion);
        if(formulario.value.icono instanceof File){
            formData.append('icono', formulario.value.icono);
        }
        if (idModelo != "") {
            formData.append('_method', "PUT");
            const { data } = await update(idModelo, formData);
            
            Swal.fire({
                title: "Modificado",
                text: "Registro modificado.",
                icon: "success"
            });
            volver();
        } else {
            const { data } = await store(formData);
            Swal.fire({
                title: "Guardado",
                text: "Nuevo registro guardado",
                icon: "success"
            });
            volver(); 
        }
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
            console.log(error);
        } else {
            console.log(error);
        }
    }finally{
        estadoBoton.value=false;
    }
}
const verRegistro = async () => {
    try {
        const { data } = await show(idModelo);
        formulario.value = {
            nombre: data.datos.nombre,
            descripcion: data.datos.descripcion
        };
    } catch (error) {
        console.log(error);
    }
}
const volver = () => {
    router.push('/modelos');
}
</script>
<style>
</style>