<template>

    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Nueva Entrevista</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg ">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12">
                            <div class="  d-flex justify-content-evenly ">

                                <button type="button" class="btn btn-danger" @click="volver()"><i
                                        class="fas fa-reply me-2"></i>Volver</button>
                                <button type="button" class="btn btn-primary" :class="{'disabled':estadoBoton}" @click="guardar()">Guardar cambios<i
                                        class="fas ms-2" :class="estadoBoton? 'fa-spin fa-spinner' : 'fa-save'"></i></button>

                            </div>
                        </div>

                        <Nombrespostulantes />
                        <div class="col-12 col-md-3">
                            <div class="card shadow-lg card-profile">
                                <img src="/public/plantilla_argon/assets/img/bg-profile.jpg" alt="Image placeholder"
                                    class="card-img-top">

                                <div class="row justify-content-center">
                                    <div class="col-4 col-lg-4 order-lg-2">
                                        <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                                            <a href="#">
                                                <img :src="useStore.entrevistapostulante.foto_perfil != null ? urlBaseAsset + 'img/img_users/' + useStore.entrevistapostulante.foto_perfil : 'https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg'"
                                                    class="rounded-circle img-fluid border border-2 border-white">
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body" v-for="(item) in useStore.entrevistapostulante" :key="item.id">
                                    <div class="row gy-3">
                                        <div class="col-12">
                                            <div class="text-center">
                                                <small class="text-danger fst-italic text-xs"
                                                    v-if="errorsentrevistas.postulaciones_id"><i
                                                        class="fas fa-times me-1"></i>Seleccionar una
                                                    postulación</small>
                                            </div>


                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">Nombre:</label>
                                                <input type="text" class="form-control fs-4 w-50" v-model="item.nombre"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">Apellido:</label>
                                                <input type="text" class="form-control  w-50" v-model="item.apellido"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">CI:</label>
                                                <input type="text" class="form-control  w-50" v-model="item.ci"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">Teléfono:</label>
                                                <input type="text" class="form-control  w-50" v-model="item.telefono"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">País:</label>
                                                <input type="text" class="form-control  w-50" v-model="item.pais"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">Ciudad:</label>
                                                <input type="text" class="form-control  w-50" v-model="item.ciudad"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">Dirección:</label>
                                                <input type="text" class="form-control  w-50" v-model="item.direccion"
                                                    readonly>
                                            </div>

                                            <div class="form-group d-flex align-items-center">
                                                <label class="fw-bold me-2 mb-0">Email:</label>
                                                <input type="email" class="form-control  w-50" v-model="item.email"
                                                    readonly>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="card shadow-lg">
                                <div class="card-body">
                                    <div class=" row gy-3">
                                        <div class="col-12 col-md-6">
                                            <label for="fecha"
                                                class="form-label font-weight-bolder text-sm">Fecha</label>
                                            <input type="date" class="form-control" placeholder="Escriba..." id="fecha"
                                                v-model=propiedades.fecha>
                                            <small class="text-danger fst-italic text-xs"
                                                v-if="errorsentrevistas.fecha"><i
                                                    class="fas fa-times me-1"></i>Seleccionar una fecha</small>
                                        </div><br>
                                        <div class="col-12 col-md-6">
                                            <label for="tipo" class="form-label font-weight-bolder text-sm">Tipo de
                                                entrevista</label>
                                            <input type="text" class="form-control" placeholder="Escribe..." id="tipo"
                                                v-model=propiedades.tipo>
                                            <small class="text-danger fst-italic text-xs"
                                                v-if="errorsentrevistas.tipo"><i class="fas fa-times me-1"></i>Ingresar
                                                el tipo de prueba</small>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <label for="hora_inicio" class="form-label font-weight-bolder text-sm">Hora
                                                Inicio</label>
                                            <input type="time" class="form-control" placeholder="Escriba..."
                                                id="hora_inicio" v-model=propiedades.hora_inicio>
                                            <small class="text-danger fst-italic text-xs"
                                                v-if="errorsentrevistas.hora_inicio"><i
                                                    class="fas fa-times me-1"></i>Seleccionar hora de inicio</small>
                                        </div><br>
                                        <div class="col-12 col-md-6">
                                            <label for="hora_final" class="form-label font-weight-bolder text-sm">Hora
                                                Final</label>
                                            <input type="time" class="form-control" placeholder="Escriba..."
                                                id="hora_final" v-model=propiedades.hora_fin>
                                            <small class="text-danger fst-italic text-xs"
                                                v-if="errorsentrevistas.hora_fin"><i
                                                    class="fas fa-times me-1"></i>Seleccionar hora fin</small>
                                        </div><br>
                                        <div class="col-12">
                                            <label for="enlace"
                                                class="form-label font-weight-bolder text-sm">Enlace</label>
                                            <input type="text" class="form-control" placeholder="Ingrese URL..."
                                                id="enlace" v-model=propiedades.enlace>
                                            <small class="text-danger fst-italic text-xs"
                                                v-if="errorsentrevistas.enlace"><i class="fas fa-times me-1"></i>Agregar
                                                enlace</small>
                                        </div>
                                        <div class="col-12">
                                            <label for="email" class="form-label font-weight-bolder text-sm">Email<span
                                                    class="text-danger fst-italic">* </span></label><span class="badge bg-info ms-2" style="border-radius: 50%;" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Enviará informacion a este Email">
                                                <i class="text-white fas fa-info"></i>
                                            </span>
                                            <input type="email" class="form-control" placeholder="Ingrese Email..." id="email" v-model="email">                                            
                                            <small class="text-danger fst-italic text-xs" v-if="errorsentrevistas.email"><i
                                                class="fas fa-times me-1"></i>{{ errorsentrevistas.email[0] }}</small>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <Nombresadmin class="col-12 col-md-4" />
                        <div class="col-12 col-md-4">
                            <div class="card shadow-lg ">
                                <div class="card-header text-center">
                                    <h3><i class="fa-solid fa-clipboard-question"></i>
                                        Entrevistadores a Cargo</h3>
                                    <small class="text-danger fst-italic text-xs"
                                        v-if="errorsentrevistas.postulaciones_id"><i
                                            class="fas fa-times me-1"></i>Seleccionar un entrevistador</small>
                                </div>
                                <div class="card-body">
                                    <div class="row gy-3">
                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <thead class="text-center">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Entrevistador</th>
                                                        <th>Acción</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="text-center">
                                                    <tr v-for="(item, indice) in useStore.entrevistaadmin"
                                                        :key="indice">
                                                        <td>{{ item.id }}</td>
                                                        <td>{{ item.apellido? item.apellido : ''}} {{ item.nombre }}</td>
                                                        <td><button type="button" class="btn btn-danger btn-sm"
                                                                @click="useStore.eliminarAdmin(item.id)"><i
                                                                    class="fa-solid fa-minus"></i></button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { indexentrevistas } from '@/services/EntrevistasServices'
import Nombrespostulantes from '@/components/crm/NombresPostulantes.vue';
import Nombresadmin from '@/components/crm/Nombresadmin.vue';
import { useEntrevistaStore } from '@/stores/entrevistas';
import { useRouter } from 'vue-router';
import { store } from '@/services/EntrevistasServices';
import { Tooltip } from 'bootstrap';
import Swal from 'sweetalert2';
const router = useRouter();
const useStore = useEntrevistaStore();
const veridentre = ref(0);
const email = ref('')
const propiedades = ref({
    tipo: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    /* enlace: '',
    estado: '',
    observacion: '', */
    entrevista_detalle: [],
});
const estadoBoton = ref(false);
onMounted(() => {
    verid();
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))
});

watch(useStore.entrevistapostulante, () =>{    
    if(useStore.entrevistapostulante.length > 0){
        email.value = useStore.entrevistapostulante[0]?.email
    }
})
const verid = async () => {
    try {
        const { data } = await indexentrevistas(15);
        if (data.datos.data.length != 0) {
            veridentre.value = data.datos.data[data.datos.data.length - 1].id;

        } else {
            veridentre.value = 0;
        }
    } catch (error) {
        console.error(error);
    }
}

const volver = () => {
    router.push({ path: `/entrevistas` })
}
let errorsentrevistas = ref({})
let errorsentrevistas2 = ref({})
const guardar = () => {

    if (useStore.entrevistapostulante.length == 0) {

        useStore.entrevistapostulante.push({ id: '' });
    }

    entrevistasg();


}

const entrevistasg = async () => {
    estadoBoton.value = true;
    propiedades.value = {
        postulaciones_id: useStore.entrevistapostulante[0].id,
        tipo: propiedades.value.tipo,
        fecha: propiedades.value.fecha,
        hora_inicio: propiedades.value.hora_inicio,
        hora_fin: propiedades.value.hora_fin,
        enlace: propiedades.value.enlace,
        /* estado: propiedades.value.estado,
        observacion: propiedades.value.observacion,*/
        entrevista_detalle: useStore.entrevistaadmin,
        email: email.value
    };    
    try {
        const { data } = await store(propiedades.value);
        Swal.fire({
            icon: "success",
            title: "Bien!",
            text: "Registro agregado exitosamente!",
        });
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            errorsentrevistas.value = error.response.data.errors
            console.log(errorsentrevistas.value);
        }
    }finally{
        estadoBoton.value = false;
    }
}
</script>
<style></style>