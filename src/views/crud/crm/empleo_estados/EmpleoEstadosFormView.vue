<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder">
                        <i class="fas fa-pencil me-2"></i>Editar registro
                    </h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <div class="row">
                                <div class="col-8">
                                    <label for="curriculum" class="form-label font-weight-bolder text-sm">Curriculum
                                        Actualizado<span class="text-danger fst-italic"></span></label>
                                    <input type="file" class="form-control" placeholder="Escriba..." id="curriculum"
                                        :class="{ 'border-danger': errors.curriculum }"
                                        @change="obtenerCurriculum($event)" accept=".pdf" />
                                    <small class="text-danger" v-if="errors.curriculum">{{
                                        errors.curriculum[0]
                                        }}</small>
                                </div>
                                <div class="col-4" v-if="curriculum">
                                    <a class="btn btn-info btn-xs" :href="urlBaseAsset +
                                        'Documentos/Curriculums/' +
                                        curriculum
                                        " target="_blank"><i class="fas fa-eye"> Ver curriculum </i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="url_portafolio" class="form-label font-weight-bolder text-sm">URL
                                Portafolio<span class="text-danger fst-italic"></span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="url_portafolio"
                                :class="{ 'border-danger': errors.url_portafolio }"
                                v-model="formulario.url_portafolio" />
                            <small class="text-danger" v-if="errors.url_portafolio">{{
                                errors.url_portafolio[0]
                                }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="url_linkedin" class="form-label font-weight-bolder text-sm">URL LinkedIn<span
                                    class="text-info text-xs fst-italic"></span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="url_linkedin"
                                :class="{ 'border-danger': errors.url_linkedin }" v-model="formulario.url_linkedin" />
                            <small class="text-danger" v-if="errors.url_linkedin">{{
                                errors.url_linkedin[0]
                                }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="url_github" class="form-label font-weight-bolder text-sm">URL Github<span
                                    class="text-info text-xs fst-italic"></span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="url_github"
                                :class="{ 'border-danger': errors.url_github }" v-model="formulario.url_github" />
                            <small class="text-danger" v-if="errors.url_github">{{
                                errors.url_github[0]
                                }}</small>
                        </div>
                        <div class="col-12">
                            <label for="presentacion" class="form-label font-weight-bolder text-sm">Presentacion<span
                                    class="text-danger text-xs fst-italic">*</span></label>
                            <textarea  id="presentacion" class="form-control" placeholder="Escriba su presentacion..." :class="{ 'border-danger': errors.presentacion }" v-model="formulario.presentacion"></textarea>
                            <small class="text-danger" v-if="errors.presentacion">{{
                                errors.presentacion[0]
                                }}</small>
                        </div>

                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-primary ms-2" v-if="permisoStore.permisosUser.some(p=>p === 'empleo estados editar')" :class="{'disabled' : estadoBoton}" @click="guardar()">
                                Editar<i :class="estadoBoton? 'fa-solid fa-spinner' : 'fa-save'"  class="fas fa-save ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { show, store, update } from "@/services/EmpleoEstadosServices";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { urlBaseAsset } from "@/services/Http";
import { usePermisoStore } from '@/stores/PermisosStore';
const formulario = ref({});
const errors = ref({});
const router = useRouter();
const permisoStore = usePermisoStore();
const estadoBoton = ref(false);
const curriculum = ref(null);
onMounted(() => {
    verRegistro();
});

const verRegistro = async () => {
    try {
        const { data } = await show();
        formulario.value = {
            curriculum: "",
            url_portafolio: data.datos.url_portafolio,
            url_linkedin: data.datos.url_linkedin,
            url_github: data.datos.url_github,
            presentacion: data.datos.presentacion,
        };
        curriculum.value = data.datos.curriculum;
    } catch (error) {
        console.log(error);
    }
};

const obtenerCurriculum = (event) => {
    formulario.value.curriculum = event.target.files[0];
};

const guardar = async () => {
    try {
       estadoBoton.value = true;
        errors.value = {};
        const formData = new FormData();
        if (formulario.value.curriculum != "") {
            formData.append("curriculum", formulario.value.curriculum);
        }
        formData.append("url_portafolio", formulario.value.url_portafolio);
        formData.append("url_linkedin", formulario.value.url_linkedin);
        formData.append("url_github", formulario.value.url_github);
        formData.append("presentacion", formulario.value.presentacion);
        formData.append("_method", 'put');
        const { data } = await update(formData);
       estadoBoton.value = false;
        Swal.fire({
            title: "Registro correcto!",
            text: data.message,
            icon: "success",
        });
    } catch (error) {
        if (error.response.status === 422) {
            errors.value = error.response.data.errors;
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
            });
        } else {
            console.log(error);
        }
    }
    finally{
        estadoBoton.value = false;
    }
   
};
</script>
<style>
/** ESTILOS PERSOANLIZADOS */
.text-warning-personalizado {
    color: rgb(255, 195, 0);
}

.badge-success-personalizado {
    color: #1aae6e;
    background-color: #b0eed3;
}

.badge-danger-personalizado {
    color: #f80031;
    background-color: #fdd1da;
}

.table-gray-personalizado {
    background-color: #495057;
    color: white;
}
</style>
