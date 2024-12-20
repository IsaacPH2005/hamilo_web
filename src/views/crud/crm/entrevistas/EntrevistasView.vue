<template
    v-if="permisoStore.permisosUser.some(p => p === 'usuario editar') || permisoStore.permisosUser.some(p => p === 'usuario crear')">
        <div class="row gy-3">
            <div class="col-12">
                <div class="card border border-0 shadow-lg">
                    <div class="card-body">
                        <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Entrevistas</h5>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="card shadow-lg">
                    <div class="card-body">
                        <div class="row gy-2">
                            <div class="col-6 text-center">
                                <button type="button" class="btn btn-primary" @click="agregar()"
                                    v-if="permisoStore.permisosUser.some(p => p === 'entrevista crear')"><i
                                        class="fas fa-plus-circle me-2"></i>
                                    Agregar</button>
                            </div>
                            <div class="col-6 text-center">
                                    <button type="button" class="btn btn-success" @click="calendario()"
                                        v-if="permisoStore.permisosUser.some(p => p === 'entrevista ver')"><i
                                            class="fas fa-calendar me-2"></i>
                                        Ver Calendario</button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive"
                                    v-if="permisoStore.permisosUser.some(p => p === 'entrevista ver') || permisoStore.permisosUser.some(p => p === 'entrevista editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                    <table class="table align-items-center justify-content-center text-sm ">
                                        <thead class="table-gray-personalizado ">
                                            <tr class="text-white">
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Id</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Nombre</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Tipo</th>
                                                <th class="text-uppercase font-weight-bolder text-center text-center">
                                                    Fecha de Entrevista</th>
                                                <th class="text-uppercase font-weight-bolder text-center text-center">
                                                    Estado</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Rendimiento</th>
                                                <th class="text-uppercase font-weight-bolder text-center">
                                                    Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="entrevistas.length === 0">
                                                <td colspan="9" class="text-center">
                                                    No se encuentran datos disponibles
                                                </td>
                                            </tr>
                                            <tr v-for="(item, indice) in entrevistas" :key="item.id">

                                                <td class="text-center ">
                                                    {{ indice + 1 }}
                                                </td>
                                                <td class="text-center ">
                                                    {{ item.postulaciones.users.datos_generales.nombre + ` ` +
                                                        item.postulaciones.users.datos_generales.apellido }}
                                                </td>
                                                <td class="text-center">
                                                    {{ item.tipo }}
                                                </td>
                                                <td class="text-center">
                                                    {{ item.fecha }} <br>
                                                    {{ item.hora_inicio }} - {{ item.hora_fin }}
                                                </td>
                                                <td class="text-center">
                                                    <span class="badge"
                                                    :class="item.estado == 'Aprobado' ? 'bg-info' : 'bg-danger'">{{
                                                        item.estado }}</span>
                                                </td>
                                                <td class="text-center">
                                                    {{ item.rendimiento }}
                                                </td>


                                                <td class="text-center">
                                                    <div class="btn-group">
                                                        <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                                                            @click="entrevistadetalle(item.id)"
                                                            v-if="permisoStore.permisosUser.some(p => p === 'postulacion ver')"></i>
                                                        <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                            @click="editar(item.id)"></i>
                                                        <!--<i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer fa-trash text-danger" @click="cambiarEstadoDeFa(item.id)"
                                                            v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar')"></i>-->
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                                v-for="item in paginacion.total">
                                                <button type="button" class="page-link"
                                                    :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''"
                                                    @click="paginaCambio(item)">
                                                    {{ item }}
                                                </button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next"
                                                    @click="paginaNext()">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--Modal Entrevistas Detalle-->
        <div class="modal fade bd-example-modal-lg mx-5" id="modal_entrevistas" tabindex="-1" role="dialog"
            aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header modal-header-custom">
                        <h5 class="modal-title text-white" id="modalDemoLabel"> Detalles de Entrevista </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="col-12" v-for="(item, indice) in datosentrevistasid">
                            <div class="row">
                                <div class="col-8">
                                    <div class="card shadow-lg">
                                        <div class="card-body">
                                            <div class=" row gy-3">
                                                <div class="col-12 col-md-6">
                                                    <label for="email"
                                                        class="form-label font-weight-bolder text-sm">Email</label>
                                                    <input type="email" class="form-control"
                                                        placeholder="Ingrese Email..." id="email"
                                                        v-model=propiedades.email readonly>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <label for="enlace"
                                                        class="form-label font-weight-bolder text-sm">Enlace</label>
                                                    <input type="text" class="form-control" placeholder="Ingrese URL..."
                                                        id="enlace" v-model=propiedades.enlace readonly>
                                                </div>
                                                <div class="col-12 col-md-4">
                                                    <label for="fecha"
                                                        class="form-label font-weight-bolder text-sm">Fecha</label>
                                                    <input type="date" class="form-control" placeholder="Escriba..."
                                                        id="fecha" v-model=propiedades.fecha readonly>
                                                </div><br>
                                                <div class="col-12 col-md-4">
                                                    <label for="hora_inicio"
                                                        class="form-label font-weight-bolder text-sm">Hora
                                                        Inicio</label>
                                                    <input type="time" class="form-control" placeholder="Escriba..."
                                                        id="hora_inicio" v-model=propiedades.hora_inicio readonly>
                                                </div><br>
                                                <div class="col-12 col-md-4">
                                                    <label for="hora_final"
                                                        class="form-label font-weight-bolder text-sm">Hora Final</label>
                                                    <input type="time" class="form-control" placeholder="Escriba..."
                                                        id="hora_final" v-model=propiedades.hora_final readonly>
                                                </div><br>
                                                <div class="col-12 col-md-6">
                                                    <label for="tipoprueba"
                                                        class="form-label font-weight-bolder text-sm">Tipo
                                                        Prueba</label>
                                                    <input type="text" class="form-control" placeholder="Ingrese URL..."
                                                        id="tipoprueba" v-model=propiedades.tipoprueba readonly>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <label for="entrevistador"
                                                        class="form-label font-weight-bolder text-sm">Entrevistador</label>
                                                    <input type="text" class="form-control" placeholder="Ingrese URL..."
                                                        id="entrevistador" v-model=propiedades.entrevistador readonly>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="descripcion_larga"
                                                        class="form-label font-weight-bolder text-sm">Observación
                                                        Entrevista
                                                    </label>
                                                    <textarea id="descripcion_larga" class="form-control"
                                                        placeholder="Escriba..."
                                                        v-model=propiedades.observacionentrevista readonly></textarea>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="descripcion_larga"
                                                        class="form-label font-weight-bolder text-sm">Observación
                                                        Entrevista Detalle
                                                    </label>
                                                    <textarea id="descripcion_larga" class="form-control"
                                                        placeholder="Escriba..."
                                                        v-model=propiedades.observacionentrevistadetalle
                                                        readonly></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>



                                <div class="col-12 col-md-4">
                                    <div class="card card-profile">
                                        <img src="/public/plantilla_argon/assets/img/bg-profile.jpg"
                                            alt="Image placeholder" class="card-img-top">

                                        <div class="row justify-content-center">
                                            <div class="col-4 col-lg-4 order-lg-2">
                                                <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                                                    <a href="#">
                                                        <img :src="item.entrevistas.postulaciones.users.datos_generales.foto_perfil != null ? urlBaseAsset + 'img/img_users/' + item.entrevistas.postulaciones.users.datos_generales.foto_perfil : 'https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg'"
                                                            class="rounded-circle img-fluid border border-2 border-white">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <div class="row gy-3">
                                                <div class="col-12">
                                                    <label for="form-label ">
                                                        Persona seleccionada
                                                    </label>
                                                    <p class="m-0"><span class="fw-bold">Nombre:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.nombre
                                                    }} </p>
                                                    <p class="m-0"><span class="fw-bold">Apellido:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.apellido
                                                    }}
                                                    </p>
                                                    <p class="m-0"><span class="fw-bold">CI:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.ci }}
                                                    </p>
                                                    <p class="m-0"><span class="fw-bold">Telefono:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.telefono
                                                    }}
                                                    </p>
                                                    <p class="m-0"><span class="fw-bold">Pais:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.pais }}
                                                    </p>
                                                    <p class="m-0"><span class="fw-bold">Ciudad:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.ciudad
                                                    }} </p>
                                                    <p class="m-0"><span class="fw-bold">Direccion:</span> {{
                                                        item.entrevistas.postulaciones.users.datos_generales.direccion
                                                    }}
                                                    </p>


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class=" d-flex justify-content-evenly">
                            <button type="button" class="btn btn-danger" @click="closeModalheo()"><i
                                    class="fas fa-reply me-2"></i>Cerrar</button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
 <!-- Modal estados -->
 <div class="modal fade bd-example-modal-lg mx-5" id="modalEntrevista" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header modal-header-custom">
                    <h5 class="modal-title text-white" id="modalDemoLabel">Cambio Estado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center  ">
                    <h5>Seleccionar el estado de la Entrevista</h5>
                    <div class="  d-flex justify-content-evenly ">
                        <button type="button" class="btn btn-secondary" @click="cerrarModal()"><i
                                class="fa-solid fa-arrow-right"></i> Cancelar</button>
                        <button type="button" class="btn btn-danger" @click="aprobarYAgregarARegistros()"> <i
                                class="fa-solid fa-xmark"></i> Aprobado</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
        <!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
    </template>
<script setup>

//------------------- Import Entrevistas --------------------------
import { onMounted, ref } from 'vue';
import { usePermisoStore } from '@/stores/PermisosStore';
import { indexentrevistas } from '@/services/EntrevistasServices';
import { showentrevista } from '@/services/EntrevistaDetalleServices';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

const modalpostulaciones = ref(null);
const modalheo = ref(null);
const router = useRouter();
const permisoStore = usePermisoStore();
const propiedades = ref({
    email: '',
    enlace: '',
    fecha: '',
    hora_inicio: '',
    hora_final: '',
    tipoprueba: '',
    entrevistador: '',
    observacionentrevista: '',
    observacionentrevistadetalle: '',
});
let modal = null;
let instanciaModal = null;

//------------------- Variables Entrevistas --------------------------

const entrevistas = ref([]);
const datosentrevistasid = ref([]);

const paginacion = ref({
    total: null,
    pagina: 1
})
let errorsentrevistas = ref({})
let errorsentrevistadetalle = ref({})
//------------------- onMounted --------------------------
onMounted(() => {
    modalpostulaciones.value = document.getElementById('modal_entrevistas');
    modalheo.value = new Modal(modalpostulaciones.value);
    modal = document.getElementById('staticBackdrop');
    instanciaModal = new Modal(modal);
    listar();
});
//------------------- Funciones Entrevistas --------------------------
//* Listar Datos en Tablas 

const listar = async () => {
    try {
        const { data } = await indexentrevistas(paginacion.value.pagina);
        entrevistas.value = data.datos.data;
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
};
const entrevistadetalle = async (id) => {
    try {
        const { data } = await showentrevista(id);
        console.log(data);
        datosentrevistasid.value = data.datos;
        propiedades.value.email = datosentrevistasid.value[0].entrevistas.postulaciones.users.email,

            propiedades.value.enlace = datosentrevistasid.value[0].entrevistas.enlace,
            propiedades.value.fecha = datosentrevistasid.value[0].entrevistas.fecha,
            propiedades.value.hora_inicio = datosentrevistasid.value[0].entrevistas.hora_inicio,
            propiedades.value.hora_final = datosentrevistasid.value[0].entrevistas.hora_fin,
            propiedades.value.tipoprueba = datosentrevistasid.value[0].entrevistas.tipo,
            propiedades.value.entrevistador = datosentrevistasid.value[0].usuario.datos_generales.nombre + ' ' + datosentrevistasid.value[0].usuario.datos_generales.apellido,
            propiedades.value.observacionentrevista = datosentrevistasid.value[0].entrevistas.observacion,
            propiedades.value.observacionentrevistadetalle = datosentrevistasid.value[0].observacionentrevistadetalle,

        modalheo.value.show();
    } catch (error) {
        console.log(error);
    }
};

//* Paginacion anterior *
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
//* Paginacion siguiente *
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
//* Paginacion por el nro *
const paginaCambio = (x) => {
    paginacion.value.pagina = x;
    listar();
}
//* Sweet Alert *
function sweetver(ic, tt, tx) {
    Swal.fire({

        icon: ic,
        title: tt,
        text: tx,
        confirmButtonText: 'Aceptar',
        showCancelButton: false,
    });
}
function closeModalheo() {
    modalheo.value.hide();
}
const agregar = () => {
    router.push({ path: `/nuevaentrevista` })
}
const calendario = () => {
    router.push({ path: `/entrevista-calendario` })
}

const editar = (param) => {
    router.push({path: `/editar-entrevista/${param}` })
}
/*const cambiarEstadoDeFa = async (param) => {
    try {
        const { data } = await cambiarEstadoDeFase(param);
        abrirModal();
    } catch (error) {
        console.log(error);
    }
}*/
const abrirModal = () => {
    instanciaModal.show();
}
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

.badge-warning-personalizado {
    color: #c79c0f;
    background-color: rgb(255, 195, 0);
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

.modal-header-custom {
    background-color: rgb(255, 195, 00);
    color: white;
}
</style>
