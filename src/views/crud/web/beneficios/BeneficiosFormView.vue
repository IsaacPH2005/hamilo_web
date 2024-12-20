<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2" :class="idBeneficio != ''? 'fa-pencil': 'fa-save'"></i>{{ idBeneficio != ''?'Editar Registro':'Nuevo Registro' }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="titulo" class="form-label font-weight-bolder text-sm">Icono<span class="text-danger fst-italic">*</span></label>
                            <input @change="obtenerImagen($event)" type="file" class="form-control border-danger" placeholder="Escriba..." id="titulo">
                            <small class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>Este campo es requerido</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Titulo<span class="text-danger fst-italic"></span></label>
                            <input v-model="formulario.tipo" type="text" class="form-control" placeholder="Escriba..." id="nombre">
                        </div>                                                
                        <div class="col-12 col-md-6">
                            <label for="descripcion_larga" class="form-label font-weight-bolder text-sm">Descripcion<span class="text-danger fst-italic">*</span></label>
                            <textarea v-model="formulario.descripcion" id="descripcion_larga" class="form-control border-danger" placeholder="Escriba..."></textarea><small class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>Este campo es requerido</small>
                        </div>
                        <div class="col-12 text-center">
                            <img :src="image" alt="" width="150px" />
                        </div>
                        <div class="col-12 text-center">                            
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()" >{{ idBeneficio != ''?'Modificar':'Guardar' }}<i class="fas fa-save ms-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { store, update, show } from '@/services/BeneficiosServicios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { urlBaseAsset } from '@/services/Http';

const router = useRouter();
const formulario=ref({});
const image = ref(null);
const errors = ref([]);
const idBeneficio = router.currentRoute.value.params.idBeneficio; 

    const volver = () => {
        router.push('/beneficios');
    }
    const obtenerImagen = (event) => {
        image.value = URL.createObjectURL(event.target.files[0]);
        formulario.value.icono = event.target.files[0];
    }

    const guardar = async () => {
        errors.value = {};
        try {
            let mensaje = null;
            const formData = new FormData();
            formData.append('tipo', formulario.value.tipo);
            formData.append('descripcion', formulario.value.descripcion);
            if(formulario.value.icono instanceof File){
                formData.append('icono', formulario.value.icono);
            }
            if (idBeneficio != ""){
                formData.append('_method', "put");
                const { data } = await update( idBeneficio, formData );
                mensaje = data.mensaje;
            } else {
                const { data } = await store( formData );
                mensaje = data.mensaje;
            }
            /*Swal.fire({
                title: "Bien",
                text: mensaje,
                icon: "success"
            })*/
            volver();
        } catch (error) {
            console.log(error);
        }
        
    };

    onMounted(()=>{
        if(idBeneficio != ""){
            verRegistro();
        }
    });

        const verRegistro = async()=>{
            try {
                const { data } = await show(idBeneficio);
                console.log(data);
                
                formulario.value = {
                    tipo: data.datos.tipo,
                    descripcion: data.datos.descripcion,
                    icono: data.datos.icono
                }
                image.value = urlBaseAsset + 'img/img_beneficios/'+formulario.value.icono;
            } catch (error) {
                console.log(error);
                
            }
        } 

    
</script>
<style>
</style>