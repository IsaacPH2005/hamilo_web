<template>
    <h1 class="text-center">Agregar Postulación Form</h1>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title">
                    <i class="fas fa-edit me-2"></i>Agregar Postulación Form
                </h5>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-12 col-md-6">
                        <label for="postulacionesid" class="form-label">Postulaciones_id</label>
                        <input :class="{ 'border-danger': errors.postulaciones_id }" type="text" id="postulacionesid"
                            class="form-control" placeholder="postulacionesid..."
                            v-model="formulario.postulaciones_id" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="disposiciontiempo" class="form-label">Disposicion_tiempo</label>
                        <input :class="{ 'border-danger': errors.disposicion_tiempo }" type="text"
                            id="disposiciontiempo" class="form-control" placeholder="disposiciontiempo..."
                            v-model="formulario.disposicion_tiempo" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="serviciointernet" class="form-label">Servicio_internet</label>
                        <input :class="{ 'border-danger': errors.servicio_internet }" type="text" id="serviciointernet"
                            class="form-control" placeholder="serviciointernet..."
                            v-model="formulario.servicio_internet" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="programador" class="form-label">Programador</label>
                        <input :class="{ 'border-danger': errors.programador }" type="text" id="programador"
                            class="form-control" placeholder="programador..." v-model="formulario.programador" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="ocupacion" class="form-label">Ocupacion</label>
                        <input :class="{ 'border-danger': errors.ocupacion }" type="text" id="ocupacion"
                            class="form-control" placeholder="ocupacion..." v-model="formulario.ocupacion" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="idiomaextranjero" class="form-label">Idioma_extranjero</label>
                        <input :class="{ 'border-danger': errors.idioma_extranjero }" type="text" id="idiomaextranjero"
                            class="form-control" placeholder="idiomaextranjero..."
                            v-model="formulario.idioma_extranjero" />
                    </div>
                    <div class="col-12 col-md-6">
                        <label for="nivelacademico" class="form-label">Nivel_academico</label>
                        <input :class="{ 'border-danger': errors.idioma_extranjero }" type="text" id="nivelacademico"
                            class="form-control" placeholder="nivelacademico..." v-model="formulario.nivel_academico" />
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <button type="button" class="btn btn-danger me-3">
                    <i class="fas fa-reply me-2" @click="volver()"> Cancelar</i>
                </button>
                <button type="button" class="btn me-1">
                    <i class="fas fa-save ms-2 " @click="guardar()"> Guardar</i>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { store } from '../../../../services/PostulacionForms';

import { useRouter } from "vue-router";
const router = useRouter();
const formulario = ref({});
const errors = ref({});

const guardar = async () => {
    errors.value = {};
    try {
        let mensaje = null;
        const { data } = await store(formulario.value);
        mensaje = data.mensaje;
        volver();
    } catch (error) {
        console.log(error);
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;

        }
    }
};
const volver = () => {
    router.push({ path: "/postulacionesform" });
};
</script>


<style>
.sidenav-toggle {
    position: absolute;
    top: 50px;
    right: -20px;
    z-index: 1000;
}

.btn-circle {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: #afa04c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-circle:hover {
    background-color: #f0a503;
}

.sidenav-open .btn-circle i {
    transform: rotate(180deg);
}

#sidenav-main {
    overflow: visible;
}

.total {
    height: 100vh;
}

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

.badge-secondary-personalizado {
    color: #646363;
    background-color: #bdbaba;
}

.table-gray-personalizado {
    background-color: #495057;
    color: white
}
</style>
