<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-pencil me-2"></i>Editar Entrevista</h5>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class=" row gy-3">
                        <div class="col-12 col-md-6">
                            <p><b>Nombre del postulante:</b> {{ entrevista.postulante }}</p>
                        </div>
                        <div class="col-12 col-md-6">
                            <p><b>Nombre del entrevistador:</b> {{ entrevista.usuario }}</p>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="fecha" class="form-label font-weight-bolder text-sm">Fecha</label>
                            <input type="date" class="form-control" placeholder="Escriba..." id="fecha"
                                v-model=entrevista.fecha>
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha"><i
                                    class="fas fa-times me-1"></i>{{ errors.fecha[0] }}</small>
                        </div><br>
                        <div class="col-12 col-md-6">
                            <label for="tipo" class="form-label font-weight-bolder text-sm">Tipo de
                                entrevista</label>
                            <input type="text" class="form-control" placeholder="Escribe..." id="tipo"
                                v-model=entrevista.tipo>
                            <small class="text-danger fst-italic text-xs" v-if="errors.tipo"><i
                                    class="fas fa-times me-1"></i>{{ errors.tipo[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="hora_inicio" class="form-label font-weight-bolder text-sm">Hora
                                Inicio</label>
                            <input type="time" class="form-control" placeholder="Escriba..." id="hora_inicio"
                                v-model=entrevista.hora_inicio>
                            <small class="text-danger fst-italic text-xs" v-if="errors.hora_inicio"><i
                                    class="fas fa-times me-1"></i>{{ errors.hora_inicio[0] }}</small>
                        </div><br>
                        <div class="col-12 col-md-6">
                            <label for="hora_final" class="form-label font-weight-bolder text-sm">Hora
                                Final</label>
                            <input type="time" class="form-control" placeholder="Escriba..." id="hora_final"
                                v-model=entrevista.hora_fin>
                            <small class="text-danger fst-italic text-xs" v-if="errors.hora_fin"><i
                                    class="fas fa-times me-1"></i>{{ errors.hora_fin[0] }}</small>
                        </div><br>                        
                        <div class="col-12 col-md-6">
                            <label for="email" class="form-label font-weight-bolder text-sm">Email<span
                                    class="text-danger fst-italic">* </span></label><span class="badge bg-info ms-2" style="border-radius: 50%;" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviará informacion a este Email">
                                <i class="text-white fas fa-info"></i>
                            </span>
                            <input type="email" class="form-control" placeholder="Ingrese Email..." id="email" v-model="entrevista.email">
                            <small class="text-danger fst-italic text-xs" v-if="errors.email"><i
                                class="fas fa-times me-1"></i>{{ errors.email[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="enlace" class="form-label font-weight-bolder text-sm">Enlace</label>
                            <input type="text" class="form-control" placeholder="Ingrese URL..." id="enlace"
                                v-model=entrevista.enlace>
                            <small class="text-danger fst-italic text-xs" v-if="errors.enlace"><i
                                    class="fas fa-times me-1"></i>{{ errors.enlace[0] }}</small>
                        </div>
                        <div class="col-12 text-center mt-5">
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i
                                    class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn btn-warning ms-2" :class="{'disabled':estadoBoton}" @click="editarEntrevista()">Editar<i
                                class="fas ms-2" :class="estadoBoton? 'fa-spin fa-spinner' : 'fa-pencil'"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { entrevistadores, showentrevista } from '@/services/EntrevistaDetalleServices';
import { update } from '@/services/EntrevistasServices';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Tooltip } from 'bootstrap';
import Swal from 'sweetalert2';
const router = useRouter();
const idEntrevista = router.currentRoute.value.params.idEntrevista;
const entrevista = ref([]);
const errors = ref({})
const estadoBoton = ref(false);
onMounted(() => {
    verRegistro();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
})
const verRegistro = async () => {
    try {
        const { data } = await showentrevista(idEntrevista);
        entrevista.value = {
            postulaciones_id: data.datos[0].entrevistas.postulaciones_id,
            tipo: data.datos[0].entrevistas.tipo,
            fecha: data.datos[0].entrevistas.fecha,
            hora_inicio: data.datos[0].entrevistas.hora_inicio,
            hora_fin: data.datos[0].entrevistas.hora_fin,
            enlace: data.datos[0].entrevistas.enlace,
            usuario: data.datos[0].usuario.datos_generales.nombre + ' ' + data.datos[0].usuario.datos_generales.apellido,
            postulante: data.datos[0].entrevistas.postulaciones.users.datos_generales.nombre + ' ' + data.datos[0].entrevistas.postulaciones.users.datos_generales.apellido,
            email: data.datos[0].entrevistas.postulaciones.users.email
        }
        
    } catch (error) {
        console.log(error);
    }
}
/*const listarEntrevistadores = async () => {
    try {
        const { data } = await entrevistadores();
    } catch (error) {
    }
};*/
const editarEntrevista = async () => {
    errors.value = {};
    estadoBoton.value = true;
    try {
        const { data } = await update(idEntrevista, entrevista.value);
        Swal.fire({
            icon: "success",
            title: "Bien!",
            text: "Registro modificado exitosamente!",
        });
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);            
        }
    }finally{
        estadoBoton.value = false;
    }
}
const volver = () => {
    router.push({ path: '/entrevistas' });
}
</script>
<style></style>