<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-edit me-2"></i>{{idSolicitud!=""? "Editar Solicitud":"Agregar Solicitud"}}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="titulo" class="form-label font-weight-bolder text-sm">Descripcion Solicitud<span class="text-danger fst-italic">*</span></label>
                            <input type="text" :class="{'border-danger' : errors.descripcion_estado}" class="form-control" placeholder="Ej: Programador php fullstack..." v-model="solicitud.descripcion_estado">
                            <small class="text-danger fst-italic text-xs" v-if="errors.descripcion_estado"><i class="fas fa-times me-1 ms-2"></i>{{ errors.descripcion_estado[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Empresa Solicitud<span class="text-danger fst-italic">*</span></label>
                            <input type="text" :class="{'border-danger' : errors.empresa}" class="form-control" placeholder="Ej: Digital Harbor..." v-model="solicitud.empresa">
                            <small class="text-danger fst-italic text-xs" v-if="errors.empresa"><i class="fas fa-times me-1 ms-2"></i>{{ errors.empresa[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Cargo Postulado<span class="text-danger fst-italic">*</span></label>
                            <input type="text" :class="{'border-danger' : errors.cargo_postulado}" class="form-control" placeholder="Ej: FullStack..." v-model="solicitud.cargo_postulado">
                            <small class="text-danger fst-italic text-xs" v-if="errors.cargo_postulado"><i class="fas fa-times me-1 ms-2"></i>{{ errors.cargo_postulado[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Estado Solicitud<span class="text-danger fst-italic">*</span></label>
                            <div class="row">
                                <div class="col-12 pe-0">
                                    <select v-model="estado_id" class="form-select" :class="{'border-danger' : errors.estado_id}">
                                        <option value="" disabled>Seleccione...</option>
                                        <option :value="estado_solicitud.id" v-for="estado_solicitud in estados">{{estado_solicitud.estado}}</option>
                                    </select>
                                    <small class="text-danger fst-italic text-xs" v-if="errors.estado_id"><i class="fas fa-times me-1 ms-2"></i>{{ errors.estado_id[0] }}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6" v-if="idSolicitud==''">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Foto Solicitud<span class="text-danger fst-italic">*</span></label>
                            <input type="file" :class="{'border-danger' : errors.url_imagen}" class="form-control" @change="onFileChange">
                            <small class="text-danger fst-italic text-xs" v-if="errors.url_imagen"><i class="fas fa-times me-1 ms-2"></i>{{ errors.url_imagen[0] }}</small>
                        </div>   
                        <div class="col-12 text-center">                            
                            <RouterLink to="/solicitudes" type="button" class="btn btn-danger me-2"><i class="fas fa-reply me-2"></i>Volver</RouterLink>
                            <button type="button" class="btn btn-primary ms-2" @click="guardarSolicitud()">Guardar<i class="fas ms-2" :class="{'fa-edit': idSolicitud != '', 'fa-save': idSolicitud == '', 'fa-spinner fa-spin': bandera != 0}"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { obtenerSolicitud, postSolicitud, putSolicitud } from '@/services/SolicitudesService';
import { getSolicitudEstadosActivos } from '@/services/SolicitudEstadosService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const router = useRouter();
const idSolicitud = router.currentRoute.value.params.idSolicitud;
const errors = ref({});
const solicitud = ref({
    descripcion_estado: '',
    empresa: '',
    cargo_postulado: ''
});
const estados = ref([]);
const estado_id = ref('');

let estadoSolicitudInicial=0;
const archivo = ref(null);
const bandera = ref(0);
onMounted(()=>{
    listarEstados();
    if(idSolicitud!=""){
        verRegistro();
    }
});
const listarEstados = async () => {
    try {
        const { data } =  await getSolicitudEstadosActivos();
        estados.value = data.datos;
    } catch (error) {
        console.log(error)
    }
}
async function guardarSolicitud() {
    bandera.value=1;
    errors.value={};
    const formData = new FormData();
    formData.append('descripcion_estado', solicitud.value.descripcion_estado);
    formData.append('empresa', solicitud.value.empresa);
    formData.append('cargo_postulado', solicitud.value.cargo_postulado);
    if(archivo.value){
        formData.append('url_imagen', archivo.value);
    }
    formData.append('estado_id', estado_id.value);
    try {
        let mensaje = null;
        if(idSolicitud!=""){
            formData.append('estado_id_inicial',estadoSolicitudInicial);
            formData.append('_method', "put");
            const { data } = await putSolicitud(idSolicitud, formData);
            mensaje= data.mensaje;
            Swal.fire({
            title: "Editado",
            text: "Registro Editado con exito!",
            icon: "success"
            });
        }else{
            const { data } = await postSolicitud(formData);
            mensaje=data.mensaje;
            Swal.fire({
            title: "Agregado",
            text: "Registro Guardado con exito!",
            icon: "success"
            });
        }
        router.push({path: '/solicitudes'});
    } catch (error) {
        if(error.response.status == 422){
            errors.value = error.response.data.errors;
            console.log(error.response.data);
        }else{
            console.log("contacte con soporte");
        }
    }finally{
        bandera.value=0;
    }
}
const onFileChange = (event) => {
    archivo.value = event.target.files[0];
}
async function verRegistro(){
    try {
        const { data } = await obtenerSolicitud(idSolicitud);
        solicitud.value = {
            descripcion_estado: data.datos.descripcion_estado,
            empresa: data.datos.empresa,
            cargo_postulado: data.datos.cargo_postulado
        };
        let aux = data.datos.detalles;
        estado_id.value = aux[aux.length-1].solicitud_estado_id;
        estadoSolicitudInicial = estado_id.value;
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    
</style>