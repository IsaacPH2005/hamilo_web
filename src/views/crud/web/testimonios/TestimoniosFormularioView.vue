<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2" :class="idTestimonio !=''?'fa-pencil':'fa-save' " ></i> {{ idTestimonio !=''?'Editar Registro':'Nuevo Registro'  }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">

                        <div class="col-12">
                            <label for="user_id" class="form-label font-weight-bolder text-sm">Seleccionar Usuario<span class="text-danger fst-italic">*</span></label>
                           <select name="user_id" id="user_id" class="form-select" :class="{'border-danger': errors.user_id}"  v-model="idUsuario">
                                <option value="">Seleccione</option>
                                <option  v-for="item in listaUsuario" :key="item.id" :value="item.id">{{ item.datos_generales.nombre+' '+item.datos_generales.apellido }}</option>
                           </select>
                           <small class="text-danger fst-italic text-ts" v-if="errors.user_id"><i class="fas fa-times me-1"></i>{{ errors.user_id }}</small>
                        </div>

                        <div class="col-12">
                            <label for="titulo" class="form-label font-weight-bolder text-sm">Referencia del TESTIMONIO<span class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="titulo" :class="{'border-danger':errors.experiencia}" v-model="testimonio.titulo">
                            <small class="text-danger fst-italic tet-xs" v-if="errors.experiencia" ><i class="fas fa-times me-1"></i>{{ errors.experiencia }}</small>
                            
                        </div>

                        <div class="col-12">
                            <label for="descripcion_larga" class="form-label font-weight-bolder text-sm">TESTIMONIO<span class="text-info text-xs fst-italic">  (Descripcion Larga)</span></label>
                            <textarea id="descripcion_larga" class="form-control border-dark" placeholder="Escriba..." v-model="testimonio.experiencia"></textarea>
                           
                        </div>
                        
                        <div class="col-12 text-center">                            
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()">{{ idTestimonio !=''?'Editar':'Guardar' }} <i class="fas fa-save ms-2"></i></button>
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
import { show, store, update } from '@/services/TestimoniosService';
import { useUserStore } from '@/stores/usuario';
import { testimoniosStore } from '@/stores/TestimoniosStore';
import { mostrarUsueriosActivos } from '@/services/UserService';

    const router = useRouter();
    const errors = ref({});
    const testimonio = ref({});
    const idTestimonio = router.currentRoute.value.params.idTestimonio;
    const idUsuario = ref('');
    const listaUsuario = ref([]);

    onMounted(()=>{
        if(idTestimonio !=""){
            cargar();
        }
        listaUsuarios();
    });

    const volver = () => {
        router.push('/testimonios');
    }
    const guardar = async() => {
        try {
            let objeto = {
                user_id: idUsuario.value,
                titulo: testimonio.value.titulo,
                experiencia: testimonio.value.experiencia
            }

            if(idTestimonio == ''){
                const { data } = await store(objeto);
            }else{
                console.log(objeto);
                const { data } = await update(idTestimonio, objeto);
            }
            volver();
        } catch (error) {
            errors.value = error.response.data.errors;
            console.log(error);
        }
    }
    const cargar = async() =>{
        try {
            const {data} = await show(idTestimonio);
            testimonio.value = data.datos;
            listaUsuario.value = data.datos.user_id;
            console.log(testimonio.value);
        } catch (error) {
            errors.value = error.response.data.errors;
            console.log(error);
            
        }
    }
    const listaUsuarios = async() =>{
        try {
            const {data} = await mostrarUsueriosActivos();
            listaUsuario.value = data.datos;
            console.log(data);

        } catch (error) {
            errors.value = error.response.data.errors;
            console.log(error)
        }
    }


</script>

<style>
</style>