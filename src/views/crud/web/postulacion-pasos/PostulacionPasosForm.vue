<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2" :class="idPostulacionPasos != ''? 'fa-pencil': 'fa-save'"></i>{{ idPostulacionPasos != ''?'Editar Registro':'Nuevo Registro' }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" :class="{ 'border-danger': errors.nombre }" placeholder="Escriba..." v-model="formulario.nombre" id="nombre">
                            <small class="text-danger fst-italic text-xs" v-if="errors.nombre"><i class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion" class="form-label font-weight-bolder text-sm">Descripcion</label>
                            <input type="text" class="form-control" :class="{ 'border-danger': errors.descripcion }" placeholder="Escriba..." v-model="formulario.descripcion" id="descripcion">
                            <small class="text-danger fst-italic text-xs" v-if="errors.descripcion"><i class="fas fa-times me-1"></i>{{ errors.descripcion[0] }}</small>
                        </div>                        
                        <div class="col-12 col-md-6">
                            <label for="numero_paso" class="form-label font-weight-bolder text-sm">Numero de Paso<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" :class="{ 'border-danger': errors.numero_paso }" placeholder="Escriba..." v-model="formulario.numero_paso" id="numero_paso">
                            <small class="text-danger fst-italic text-xs" v-if="errors.numero_paso"><i class="fas fa-times me-1"></i>{{ errors.numero_paso[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="icono" class="form-label font-weight-bolder text-sm">Imagen<span class="text-danger fst-italic">*</span></label>
                            <input type="file" class="form-control" @change="obtenerImagen($event)">
                        </div>
                        <div class="col-12 text-center">
                            <img :src="image" alt="" width="150px" />
                        </div>
                        <div class="col-12 text-center">                            
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn ms-2" :class="estadoBoton ? 'disabled' : (idPostulacionPasos != '' ? 'btn-warning' : 'btn-primary')" @click="guardar()">{{ idPostulacionPasos != "" ? 'Editar' : 'Guardar' }}<i class="fas ms-2" :class="estadoBoton ? 'fa-spinner fa-spin' : (idPostulacionPasos != '' ? 'fa-pencil' : 'fa-save')"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import { store, update, show } from '@/services/PostulacionPasosService';
    import { urlBaseAsset } from "@/services/Http";
    import Swal from 'sweetalert2';
    const formulario = ref({});
    const router = useRouter();
    const errors = ref({});
    const idPostulacionPasos = router.currentRoute.value.params.idPostulacionPasos;
    const image = ref(null);
    const estadoBoton = ref(false);
    const obtenerImagen = (event) => {
        image.value = URL.createObjectURL(event.target.files[0]);
        formulario.value.icono = event.target.files[0];
    }
    onMounted(()=>{
        if(idPostulacionPasos != ""){
            verRegistro();
        }
    });
    formulario.value = {
        nombre: '',
        descripcion: '',
        numero_paso: '',
        icono: ''
    }
    const verRegistro = async () => {
        try {
            const { data } = await show(idPostulacionPasos);
            formulario.value = {
                nombre: data.datos.nombre,
                descripcion: data.datos.descripcion,
                numero_paso: data.datos.numero_paso,
                icono: data.datos.icono
            }
            image.value = urlBaseAsset + 'img/img_postulacionPasos/'+formulario.value.icono;
        } catch (error) {
            console.log(error);
        }
    }
    const guardar = async () => {
        errors.value = {};
        try {
            let mensaje = null;
            const formData = new FormData();
            formData.append('nombre', formulario.value.nombre);
            formData.append('descripcion', formulario.value.descripcion);
            formData.append('numero_paso', formulario.value.numero_paso);
            if(formulario.value.icono instanceof File){
                formData.append('icono', formulario.value.icono);
            }
            if (idPostulacionPasos != ""){
                formData.append('_method', "put");
                estadoBoton.value = true;
                const { data } = await update( idPostulacionPasos, formData );
                mensaje = data.mensaje;
                Swal.fire({
                    title: "Bien",
                    text: "Registro modificado correctamente.",
                    icon: "success"
                });
            } else {
                estadoBoton.value = true;
                const { data } = await store( formData );
                mensaje = data.mensaje;
                Swal.fire({
                    title: "Bien",
                    text: "Registro guardado correctamente.",
                    icon: "success"
                });
            }
            router.push('/postulacion-pasos');
            volver();
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors;
                console.log(error);
            } else {
                console.log(error);
            }
        } finally {
        estadoBoton.value = false;
        }
    }
    const volver = () => {
        router.push('/postulacion-pasos');
    }
</script>
<style>
</style>