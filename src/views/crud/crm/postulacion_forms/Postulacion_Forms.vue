<template>
    <div class="container-fluid py-4">
        <div class="row gy-3 ">
            <div class="col-12">
                <div class="card">
                    <div class="card-body te">
                        <p class="text-uppercase font-weight-bolder ">Postulacion Número: {{ nropost }}</p>
                        <div class="row">
                            <div class="col-12">
                                <select class="form-select form-select-lg mb-3 text-center fs-5"
                                    aria-label="Large select example" id="titulo" v-model="selectpostdato"
                                    @click="datosextra()">
                                    <option v-for="(item, indice) in usuariosid" :key="indice" :value="indice">
                                        {{ item.id + ` - ` + item.users.datos_generales.apellido + `
                                        `+ item.users.datos_generales.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Nombre(s)</label>
                                    <input class="form-control text-center fs-4 fw-bold" type="text"
                                        v-model="nombresusuarios.nombre" readonly>

                                </div>
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Apellidos(s)</label>
                                    <input class="form-control text-center fs-4" type="text"
                                        v-model="nombresusuarios.apellido" readonly>

                                </div>
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">CI</label>
                                    <input class="form-control text-center fs-4" type="text"
                                        v-model="nombresusuarios.ci" readonly>

                                </div>
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Estado</label>
                                    <input class="form-control text-center fs-4" type="text" v-model="postu.estado"
                                        readonly>

                                </div>
                            </div>

                            <div class="col-md-3 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Disposición Tiempo</label> <br>

                                    <span class="badge  badge-success-personalizado fs-5"
                                        :class="datospostulacion.disposicion_tiempo != '0' ? 'badge-success-personalizado' : 'badge-danger-personalizado'">{{
                                            datospostulacion.disposicion_tiempo
                                                != '0' ? 'Si' : 'No' }}</span> <br>
                                    <button class="btn  btn-xs mt-2"
                                        :class="datospostulacion.disposicion_tiempo != '0' ? 'btn-success' : 'btn-danger'"
                                        @click="cambioEstado(1)">
                                        <i class="fa-sharp fa-solid fa-rotate"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="col-md-3 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Servicio de Interet</label>
                                    <br>
                                    <span class="badge  badge-success-personalizado fs-5"
                                        :class="datospostulacion.servicio_internet != '0' ? 'badge-success-personalizado' : 'badge-danger-personalizado'">{{
                                            datospostulacion.servicio_internet
                                                != '0' ? 'Si' : 'No' }}</span> <br>
                                    <button class="btn  btn-xs mt-2"
                                        :class="datospostulacion.servicio_internet != '0' ? 'btn-success' : 'btn-danger'"
                                        @click="cambioEstado(2)">
                                        <i class="fa-sharp fa-solid fa-rotate"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-3 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Programador</label> <br>
                                    <span class="badge  badge-success-personalizado fs-5"
                                        :class="datospostulacion.programador != '0' ? 'badge-success-personalizado' : 'badge-danger-personalizado'">{{
                                            datospostulacion.programador
                                                != '0' ? 'Si' : 'No' }}</span> <br>
                                    <button class="btn  btn-xs mt-2"
                                        :class="datospostulacion.programador != '0' ? 'btn-success' : 'btn-danger'"
                                        @click="cambioEstado(3)">
                                        <i class="fa-sharp fa-solid fa-rotate"></i>
                                    </button>

                                </div>
                            </div>
                            <div class="col-md-3 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Idioma Extranjero</label> <br>
                                    <span class="badge  badge-success-personalizado fs-5"
                                        :class="datospostulacion.idioma_extranjero != '0' ? 'badge-success-personalizado' : 'badge-danger-personalizado'">{{
                                            datospostulacion.idioma_extranjero
                                                != '0' ? 'Si' : 'No' }}</span> <br>
                                    <button class="btn  btn-xs mt-2"
                                        :class="datospostulacion.idioma_extranjero != '0' ? 'btn-success' : 'btn-danger'"
                                        @click="cambioEstado(4)">
                                        <i class="fa-sharp fa-solid fa-rotate"></i>
                                    </button>

                                </div>
                            </div>

                            <div class="col-md-6 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Ocupacion</label>
                                    <input class="form-control text-center fs-4" type="text"
                                        v-model="datospostulacion.ocupacion">

                                </div>
                            </div>
                            <div class="col-md-6 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Nivel Académico</label>
                                    <input class="form-control text-center fs-4" type="text"
                                        v-model="datospostulacion.nivel_academico">

                                </div>
                            </div>
                            <div class="col-md-12 text-center">
                                <div class="form-group">
                                    <label class="form-label font-weight-bolder text-sm">Descripción</label>
                                    <input class="form-control text-center fs-4" type="text" v-model="postu.descripcion"
                                        readonly>

                                </div>
                            </div>

                        </div>

                        <hr class="horizontal dark">
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i
                                    class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn btn-primary ms-2" @click="guardar()">Guardar<i
                                    class="fas fa-save ms-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


</template>
<script setup>
import { onMounted, ref } from 'vue';
import { vernopost } from '../../../../services/Postulaciones';
import { useRouter } from "vue-router";
import { store } from '@/services/PostulacionForms';
const router = useRouter();
const usuariosid = ref([])
const selectpostdato = ref();
const nombresusuarios = ref([]);
const postu = ref([]);
const nropost = ref();
const datospostulacion = ref({
    postulaciones_id: 0,
    disposicion_tiempo: 1,
    servicio_internet: 1,
    programador: 1,
    ocupacion: '',
    idioma_extranjero: 1,
    nivel_academico: ''
});
onMounted(() => {

    listar();

});
const listar = async () => {
    try {
        const { data } = await vernopost();
        usuariosid.value = data.datos;

    } catch (error) {
        console.log(error);
    }
};

const datosextra = async () => {
    if (selectpostdato.value != null) {
        nombresusuarios.value = usuariosid.value[selectpostdato.value].users.datos_generales;
        postu.value = usuariosid.value[selectpostdato.value];
        nropost.value = usuariosid.value[selectpostdato.value].id;
    }
};
const volver = () => {
    router.push({ path: "/postulaciones" });
};

const cambioEstado = (dato) => {

    if (dato == 1) {
        datospostulacion.value.disposicion_tiempo = datospostulacion.value.disposicion_tiempo === 0 ? 1 : 0;
    }
    if (dato == 2) {
        datospostulacion.value.servicio_internet = datospostulacion.value.servicio_internet === 0 ? 1 : 0;
    }
    if (dato == 3) {
        datospostulacion.value.programador = datospostulacion.value.programador === 0 ? 1 : 0;
    }
    if (dato == 4) {
        datospostulacion.value.idioma_extranjero = datospostulacion.value.idioma_extranjero === 0 ? 1 : 0;
    }
};

const guardar = async () => {
    datospostulacion.value.postulaciones_id = nropost.value;
    try {
        const { data } = await store(datospostulacion.value);

        volver();
    } catch (error) {

        console.log(error);

    }
}
</script>

<style scoped>
 

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

