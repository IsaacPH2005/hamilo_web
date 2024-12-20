<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-pencil me-2"></i>Nuevo Registro</h5>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4 mt-3">
            <label for="especialidad" class="form-label">Especialidad</label>
            <select class="form-select" :class="{ 'border-danger': errors.especialidad_id }" id="especialidad" aria-label="Default select example"
                v-model="formulario.especialidad_id">
                <option value="" selected>Seleccione</option>
                <option :value="item.id" v-for="(item) in especialidades" :key="item.id">
                    {{ item.nombre }}</option>
            </select>
            <small class="text-danger fst-italic text-xs" v-if="errors.especialidad_id"><i
                class="fas fa-times me-1"></i>{{ errors.especialidad_id[0] }}</small>
        </div>
        <div class="col-12 col-md-4">
            <label for="especialidad" class="form-label">Modulo</label>
            <select class="form-select" :class="{ 'border-danger': errors.modulo_id }" id="tecnologia" aria-label="Default select example"
                v-model="formulario.modulo_id">
                <option value="" selected>Seleccione</option>
                <option :value="item.id" v-for="(item) in modulos" :key="item.id">
                    {{ item.nombre }}</option>
            </select>
            <small class="text-danger fst-italic text-xs" v-if="errors.modulo_id"><i
                class="fas fa-times me-1"></i>{{ errors.modulo_id[0] }}</small>
        </div>
        <div class="col-12 col-md-4">
            <label for="tecnologia" class="form-label">Tecnologia</label>
            <select class="form-select" :class="{ 'border-danger': errors.tecnologia_id }" id="tecnologia" aria-label="Default select example"
                v-model="formulario.tecnologia_id">
                <option value="" selected>Seleccione</option>
                <option :value="item.id" v-for="(item) in tecnologias" :key="item.id">
                    {{ item.nombre }}</option>
            </select>
            <small class="text-danger fst-italic text-xs" v-if="errors.tecnologia_id"><i
                class="fas fa-times me-1"></i>{{ errors.tecnologia_id[0] }}</small>
        </div>
        <div class="col-12 text-center mt-5">
            <button type="button" class="btn btn-danger me-2" @click="volver()"><i
                    class="fas fa-reply me-2"></i>Volver</button>
            <button type="button" class="btn btn-warning ms-2" :class="{'disabled' : estadoBoton}" @click="editarRegistro()">Editar<i class="fas  ms-2" :class="estadoBoton ? 'fa-spinner fa-spin' : 'fa-save'"></i></button>
        </div>
    </div>
</template>
<script setup>
import { showCurricula, update } from '@/services/CurriculaService';
import { especialidadesActivas } from '@/services/EspecialidadService';
import { listarModulosActivos } from '@/services/ModulosService';
import { listarTecnologiasActivas } from '@/services/TecnologiasService';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref('');
const idCurricula = router.currentRoute.value.params.idCurricula;
const formulario = ref({
    especialidad_id: '',
    modulo_id: '',
    tecnologia_id: '',
});
const especialidades = ref([]);
const tecnologias = ref([]);
const modulos = ref([]);
const errors = ref({});
const estadoBoton = ref(false);
const volver = () => {
    router.push('/curricula');
}
onMounted(() => {
    verRegistro();
    listarActivosEspecialidades();
    listarModulos();
    listartecnologias();
})
const verRegistro = async () => {
    try {
        const { data } = await showCurricula(idCurricula);
        formulario.value = {
            especialidad_id: data.datos.especialidad_id,
            modulo_id: data.datos.modulo_id,
            tecnologia_id: data.datos.tecnologia_id,
        }
    } catch (error) {
        console.log(error);
    }
}
const listarActivosEspecialidades = async () => {
    try {
        const { data } = await especialidadesActivas('');
        especialidades.value = data.datos
    } catch (error) {
        console.log(error);
    }
}
const listarModulos = async () => {
    try {
        const { data } = await listarModulosActivos('');
        modulos.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const listartecnologias = async () => {
    try {
        const { data } = await listarTecnologiasActivas('');
        tecnologias.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const editarRegistro = async () => {
    errors.value = {};
    try {
        estadoBoton.value = true;
        const formData = new FormData();
        formData.append('especialidad_id', formulario.value.especialidad_id);
        formData.append('modulo_id', formulario.value.modulo_id);
        formData.append('tecnologia_id', formulario.value.tecnologia_id);
        formData.append('_method', "PUT");
        const {data} = await update(idCurricula, formData);
        Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Registro modificado correctamente!",
            });
            estadoBoton.value = true;
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
</script>
<style></style>