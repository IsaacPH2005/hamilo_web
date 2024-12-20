<template>
    <h3 class="text-center">Batch:</h3>
    <div class="row">
        <div class="col-12 col-md-8">
            <div class="card mb-4">
                <div class="card-header pb-0 text-center">
                    <h6>Usuarios registrados</h6>
                </div>
                <div class="card-body px-0 pt-0 pb-1">
                    <div class="col-12 col-md-8 text-center">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="filtro_user" value="1" >
                                <label class="form-check-label" for="inlineRadio1">Activos</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="filtro_user" value="0" >
                                <label class="form-check-label" for="inlineRadio2">Inactivos</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" v-model="filtro_user" value="3" >
                                <label class="form-check-label" for="inlineRadio2">Ambos</label>
                            </div>
                        </div>
                    <div class="table-responsive p-0">
                        <table class="table align-items-center justify-content-center mb-0 text-center">
                            <thead>
                                <tr>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7">
                                        Nro</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Usuario</th>
                                        <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                        Estado
                                    </th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Contratos</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                        Documentos
                                    </th>

                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, indice) in users.filter(a => {return (a.is_deleted != filtro_user)})">
                                    <td class="text-center">{{ indice + 1 }}</td>
                                    <td>{{ user.users.datos_generales.nombre }} {{ user.users.datos_generales.apellido
                                        }}</td>
                                    <td>
                                        <span class="badge"
                                                    :class="user.is_deleted == 0 ? 'badge-success-personalizado' : 'badge-danger-personalizado'">{{user.is_deleted == 0 ? 'ACTIVO' : 'INACTIVO' }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <div class="btn-group">
                                                <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="adicionar_contrato(user.id)"></i>
                                                <i @click="ver_contratos_usuarios(user.id)" class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"></i>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <div class="btn-group">
                                                <i @click="adicionar_documento(user.id)" class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"></i>
                                                <i @click="ver_documentos_usuarios(user.id)" class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"></i>
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <div class="btn-group">
                                                <i class="fas fa-arrows-rotate text-success-personalizado fa-lg fs-5 btn-action cursor-pointer" @click="modal_cambiar_batch(user.id, user.users.datos_generales.nombre, user.users.datos_generales.apellido)"></i>
                                                <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer fa-trash text-danger" @click="modal_dar_de_baja(user.id, user.users.datos_generales.nombre, user.users.datos_generales.apellido)"></i>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="col-12">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item">
                                        <button type="button" class="page-link" aria-label="Previous"><span
                                                aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>
                                    <li class="page-item">
                                        <button type="button" class="page-link"></button>
                                    </li>
                                    <li class="page-item">
                                        <button type="button" class="page-link" aria-label="Next"><span
                                                aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="card">
                <div class="card-body px-0 pt-0 pb-1">
                    <label for="">Postulantes No Inscritos</label>
                    <input type="text" class="form-control" v-model="searchPersona"
                        placeholder="Nombre, Apellido, identificacion..." @change="filtrarRegistros()">
                    <div class="table-responsive">
                        <table class="table align-items-center justify-content-center mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Postulante</th>
                                    <th>Añadir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(solicitud) in solicitudes">
                                    <td>{{ solicitud.users.datos_generales.nombre }} {{
                                        solicitud.users.datos_generales.apellido }}</td>
                                    <td><button class="btn btn-success btn-xs"
                                            @click="registrar_postulante(solicitud.user_id)">+</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </div>
    </div>

    <!-- Modal -->
    <div v-show="show_modal" class="modal fade" id="Modal_Contrato" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar Contrato</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3" v-show="!agregar_estado">
                        <label for="estado" class="form-label">Estado</label>
                        <div class="input-group mb-3">

                            <select class="form-select" aria-label="Default select example"
                                v-model="formulario_contrato.estado">
                                <option v-for="(estado) in list_estados" :value="estado.estado">{{ estado.estado }}
                                </option>
                            </select>
                            <button class="btn btn-info" @click="cambiar_estado()"> + </button>
                        </div>
                        <div id="emailHelp" class="form-text">Escoger estado del contrato</div>
                    </div>
                    <!-- Agregar Estado-->
                    <div class="mb-3" v-show="agregar_estado">
                        <label for="estado" class="form-label">Registrar Nuevo Estado</label>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="numero" aria-describedby="numero_help"
                            v-model="new_estado">
                            <button class="btn btn-success" @click="registrar_estado()"> Registrar </button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="numero" class="form-label">Numero de Contrato</label>
                        <input type="text" class="form-control" id="numero" aria-describedby="numero_help"
                            v-model="formulario_contrato.numero_contrato">
                        <div id="numero_help" class="form-text">Ingresar numero de contrato</div>
                    </div>
                    <input type="text" class="form-control" id="numero" aria-describedby="numero_help" v-show="false"
                        value="{{registro_id}}" v-model="formulario_contrato.registro_id">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Documento</label>
                        <input class="form-control" type="file" id="formFile" @change="obtener_contrato($event)"
                            accept=".pdf, .csv, .doc,.docx">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                        @click="registrar_contrato(registro_id)">Registrar</button>
                    <button type="button" class="btn btn-danger" @click="cerrar_modal_documento()">Cancel</button>
                </div>
            </div>
        </div>
    </div>


    <div v-show="show_modal_detalle_documento" class="modal fade" id="Modal_detalle_Documento" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle Documentos</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table align-items-center justify-content-center mb-0 text-center">
                            <thead>
                                <tr>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Documento</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Fecha</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(documento, indice) in lista_documentos">
                                    <td> <a class="btn btn-success btn-xs" target="_blank"
                                            :href="urlBaseAsset + 'Documentos/Documentos/' + documento.registro_id + '/' + documento.storage_url"><i
                                                class="fa-solid fa-download"> {{ documento.nombre }}</i></a> </td>
                                    <td>{{ formatDate(documento.created_at) }}</td>
                                    <td><button type="button" class="btn btn-danger btn-xs"
                                            @click="eliminar_documento(documento.id, documento.registro_id)"><i
                                                class="fa-solid fa-trash"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="cerrar_modal_documento()">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <div v-show="show_modal_detalle_contrato" class="modal fade" id="Modal__detalle_Contrato" tabindex="-1"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Detalle Contratos</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table align-items-center justify-content-center mb-0 text-center">
                            <thead>
                                <tr>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Contrato</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Fecha</th>
                                    <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(contrato, indice) in lista_contratos">
                                    <td> <a class="btn btn-success btn-xs" target="_blank"
                                            :href="urlBaseAsset + 'Documentos/Contratos/' + contrato.registro_id + '/' + contrato.storage_url"><i
                                                class="fa-solid fa-download"> {{ contrato.storage_url }}</i></a> </td>
                                    <td>{{ formatDate(contrato.created_at) }}</td>
                                    <td><button type="button" class="btn btn-danger btn-xs"
                                            @click="eliminar_contrato(contrato.id, contrato.registro_id)"><i
                                                class="fa-solid fa-trash"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="cerrar_modal_documento()">Cancel</button>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div v-show="show_modal" class="modal fade" id="Modal_Documento" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Registrar Documento</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="estado" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="estado" aria-describedby="emailHelp"
                            v-model="formulario_documento.nombre">
                        <div id="emailHelp" class="form-text">Ingresar nombre del contrato</div>
                    </div>
                    <div class="mb-3">
                        <label for="numero" class="form-label">Numero de Contrato</label>
                        <input type="text" class="form-control" id="numero" aria-describedby="numero_help"
                            v-model="formulario_documento.numero_referencia">
                        <div id="numero_help" class="form-text">Ingresar numero de referencia</div>
                    </div>
                    <input type="text" class="form-control" id="numero" aria-describedby="numero_help" v-show="false"
                        value="{{registro_id}}" v-model="formulario_contrato.registro_id">
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Documento</label>
                        <input class="form-control" type="file" id="formFile" @change="obtener_documento($event)"
                            accept=".pdf, .csv, .doc,.docx">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                        @click="registrar_documento(registro_id)">Registrar</button>
                    <button type="button" class="btn btn-danger" @click="cerrar_modal_documento()">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal DAR DEBAJA -->
    <div v-show="show_modal_baja" class="modal fade" tabindex="-1" id="Modal_dar_de_Baja">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Dar de Baja</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Estas seguro de dar de baja al usuario {{ postulante }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="cerrar_modal_documento()">Cerrar</button>
                    <button type="button" class="btn btn-success" @click="dar_de_baja()">Si</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal CAMBIAR BATCH -->
    <div v-show="show_modal_cambiar" class="modal fade" tabindex="-1" id="Modal_cambiar">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cambiar de Batch</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <b></b>
                    <p>Estas seguro cambiar de Batch al usuario: <b> {{ postulante }} </b></p>
                    <p>Del Batch actual:<b>{{ registro?.batch.crm_especialidades.nombre }}</b></p>
                    <p>En su version:<b>{{ registro?.batch.version }}</b></p>
                    <select class="form-select" aria-label="Default select example" v-model="new_batch_id">
                        <option  :value="item.id" v-for="item in batchs.filter(a => {return (a.id != registro.batch_id)})" >{{ item.crm_especialidades.nombre}} Version: {{ item.version}}</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="cerrar_modal_documento()">Cerrar</button>
                    <button type="button" class="btn btn-success" @click="cambiar_batch()">Si</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { listar_users_batch, postulantes_no_registrados, registrar_postulante_api, soft_delete_registro, listar_registro, listarBatchs, update_batch } from '@/services/RegistrosService';
import { contratos_registro, agregar_contrato, eliminar_contrato_api, contratos_estados } from '@/services/ContratosService';
import { agregar_documento, eliminar_documento_api, documentos_registro } from '@/services/DocumentosService';
import { index } from '@/services/BatchService';
import { useRoute, useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import { urlBaseAsset } from '@/services/Http';
import Swal from 'sweetalert2';


const Modal_Contrato = ref();
const Modal_Detalle_Contrato = ref();
const Modal_Detalle_Documento = ref();
const Modal_Cambiar_Batch = ref();
const Modal_Baja = ref();
const Modal_Documento = ref();
const users = ref([]);
const route = useRoute();
const show_modal = ref(false);
const show_modal_documento = ref(false);
const show_modal_baja = ref(false);
const show_modal_cambiar = ref(false);
const show_modal_detalle_contrato = ref(false);
const show_modal_detalle_documento = ref(false);
const registro_id = ref()
const formulario_contrato = ref({});
const formulario_documento = ref({});
const lista_contratos = ref({});
const lista_documentos = ref({});
const searchPersona = ref();
let batch_id;
const solicitudes = ref();
const postulante = ref();
const registro = ref();
const list_batchs = ref({});
const list_estados = ref();
const agregar_estado = ref(false);
const new_estado = ref();
const batchs = ref([])
const filtro_user = ref(3)
const new_batch_id = ref()

onMounted(() => {

    batch_id = route.params.id;
    Modal_Contrato.value = new Modal(document.getElementById("Modal_Contrato"));
    Modal_Documento.value = new Modal(document.getElementById("Modal_Documento"));
    Modal_Detalle_Contrato.value = new Modal(document.getElementById("Modal__detalle_Contrato"));
    Modal_Detalle_Documento.value = new Modal(document.getElementById("Modal_detalle_Documento"));
    Modal_Baja.value = new Modal(document.getElementById("Modal_dar_de_Baja"));
    Modal_Cambiar_Batch.value = new Modal(document.getElementById("Modal_cambiar"));
    listar_users(route.params.id);
});

const batchs_listar = async () => {
    try {
        const { data } = await listarBatchs();
        batchs.value = data.datos.data;
        console.log(batchs.value);
    } catch (error) {
        console.log(error);
    }
}; 

const cambiar_estado = () => {
    agregar_estado.value = !agregar_estado.value
}
const registrar_estado = () =>{
    list_estados.value.push ({estado: new_estado.value});
    cambiar_estado();
}
const listar_users = async (param) => {
    try {
        console.log(param)
        const { data } = await listar_users_batch(param);
        users.value = data.datos.data;
        console.log(users.value);
    } catch (error) {
        console.log(error);
    }
};
const adicionar_contrato = (id) => {
    show_modal.value = true;
    generar_estados();
    registro_id.value = id;
    Modal_Contrato.value.show();
    console.log(id);
}

const generar_estados = async () => {
    try {
        const { data } = await contratos_estados();
        list_estados.value = data.datos;
        console.log(list_estados.value);
    } catch (error) {
        console.log(error);
    }
}

const modal_dar_de_baja = (id, nombre, apellido) => {
    show_modal_baja.value = true;
    postulante.value = nombre + " " + apellido;
    registro_id.value = id;
    Modal_Baja.value.show();
    console.log(id);
}

const modal_cambiar_batch = async (id, nombre, apellido) => {
    try {
        show_modal_cambiar.value = true;
        registro_id.value = id;
        postulante.value = nombre + " " + apellido;
        const { data } = await listar_registro(registro_id.value);
        registro.value = data.datos;
        //{ data } = await index();
        console.log(registro.value);
        batchs_listar();
        Modal_Cambiar_Batch.value.show();
    } catch (error) {
        console.log(error)
    }

}


const cambiar_batch = async() => {
    try {
        let formulario = {
            'estado': 'aceptado',
            'batch_id': new_batch_id.value,
            'user_id': registro.value.user_id,
            'is_deleted':0,
            '_method':'PUT'
        };
        const { data } = await update_batch(registro.value.id,formulario);
        console.log(data.datos);
        Modal_Cambiar_Batch.value.hide();
        Swal.fire({
      title: "Cambiado!",
      text: "Se ha Cambiado al usuario a otro Batch correctamente",
      icon: "success"
    });
        listar_users(route.params.id);
    } catch (error) {
        console.log(error);
    }
}
const dar_de_baja = async () => {
    try {
        const { data } = await (soft_delete_registro(registro_id.value));
        console.log(data.datos);
        Modal_Baja.value.hide();
        listar_users(batch_id);
    } catch (error) {
        console.log(error);
    }
}

const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}

const ver_contratos_usuarios = async (id) => {
    try {
        const { data } = await contratos_registro(id);
        lista_contratos.value = data.datos;
        registro_id.value = id;
        console.log(lista_contratos.value);
        Modal_Detalle_Contrato.value.show();
    } catch (error) {
        console.log(error);
    }
}

const eliminar_contrato = async (id, registro_id) => {
    try {
        const { data } = await eliminar_contrato_api(id);
        console.log(data);
        Swal.fire({
      title: "Eliminado!",
      text: "Se ha Eliminado el Contrato Correctamente",
      icon: "success"
    });
        ver_contratos_usuarios(registro_id);
    } catch (error) {
        console.log(error);
    }
}

const filtrarRegistros = async () => {
    try {
        const { data } = await postulantes_no_registrados(searchPersona.value, batch_id);
        solicitudes.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const eliminar_documento = async (id, registro_id) => {
    try {
        const { data } = await eliminar_documento_api(id);
        console.log(data);
        Swal.fire({
      title: "Eliminado!",
      text: "Se ha Eliminado el Documento Correctamente",
      icon: "success"
    });
        ver_documentos_usuarios(registro_id);
    } catch (error) {
        console.log(error);
    }
}

const ver_documentos_usuarios = async (id) => {
    try {
        const { data } = await documentos_registro(id);
        lista_documentos.value = data.datos;
        registro_id.value = id;
        console.log(lista_documentos.value);
        show_modal_detalle_documento.value = true;
        Modal_Detalle_Documento.value.show();
    } catch (error) {
        console.log(error);
    }

}

const adicionar_documento = id => {
    show_modal_documento.value = true;
    registro_id.value = id;
    Modal_Documento.value.show();
    console.log(id);
}

const cerrar_modal_documento = () => {
    Modal_Documento.value.hide();
    Modal_Contrato.value.hide();
    Modal_Detalle_Contrato.value.hide();
    Modal_Detalle_Documento.value.hide();
    Modal_Baja.value.hide();
}

const registrar_contrato = async (id) => {
    try {

        const formdata = new FormData();
        formdata.append('estado', formulario_contrato.value.estado);
        formdata.append('registro_id', id);
        formdata.append('numero_contrato', formulario_contrato.value.numero_contrato);
        formdata.append('documento', formulario_contrato.value.documento);
        const { data } = await agregar_contrato(formdata);
        formulario_contrato.value = ref({});
        Swal.fire({
      title: "Adicionado!",
      text: "Se ha Adicionado el Contrato Correctamente",
      icon: "success"
    });
        listar_users(route.params.id);
    } catch (error) {
        console.log(error);
    }
}

const registrar_documento = async (id) => {
    try {

        const formdata = new FormData();
        formdata.append('nombre', formulario_documento.value.nombre);
        formdata.append('registro_id', id);
        formdata.append('numero_referencia', formulario_documento.value.numero_referencia);
        formdata.append('documento', formulario_documento.value.documento);
        const { data } = await agregar_documento(formdata);
        formulario_documento.value = ref({});
        Swal.fire({
      title: "Adicionado!",
      text: "Se ha Adicionado el Documento Correctamente",
      icon: "success"
    });
        listar_users(route.params.id);

    } catch (error) {
        console.log(error);
    }
}

const registrar_postulante = async (id) => {
    try {
        let registro = {
            'estado': 'aceptado',
            'batch_id': batch_id,
            'user_id': id
        };
        const { data } = await registrar_postulante_api(registro);
        filtrarRegistros();
        listar_users(batch_id);
    } catch (error) {
        console.log(error);
    }
}
const obtener_contrato = (event) => {
    formulario_contrato.value.documento = event.target.files[0];
}
const obtener_documento = (event) => {
    formulario_documento.value.documento = event.target.files[0];
}
</script>