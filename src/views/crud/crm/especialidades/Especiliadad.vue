<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Especialidades</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-8 d-flex align-items-center">
                            <input type="search" class="form-control" placeholder="Buscar..." v-model="search"
                                @change="listar()">
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" @click="agregar()"
                                    v-if="permisoStore.permisosUser.some(p => p === 'especialidad crear')"><i
                                        class="fas fa-plus-circle me-2"></i> Agregar</button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm">
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Item</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Imagen</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Fecha de Creacion</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Nombre</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Descripcion <span class="text-info">(corta)</span></th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Descripcion <span class="text-info">(larga)</span></th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Estado</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="datos.length === 0">
                                            <td colspan="9" class="text-center">No se encuentran datos disponibles</td>
                                        </tr>
                                        <tr v-for="(item, index) in datos" :key="item.id">
                                            <td class="text-center">
                                                {{ index + 1 }}
                                            </td>
                                            <td class="text-center">
                                                <img :src="item.imagen" alt="" width="70px" height="60px">
                                            </td>
                                            <td class="text-center">
                                                {{ formatDate(item.created_at) }}
                                            </td>
                                            <td>
                                                {{ item.nombre }}
                                            </td>
                                            <td>
                                                <div v-if="item.descripcion_corta != null"> {{truncarDescripción(item.descripcion_corta, 20 ) + '...' }} </div>
                                                <div v-else>No hay descripcion</div>
                                                <span
                                                    v-if="item.descripcion_corta && item.descripcion_corta.length > 20">
                                                    <a href="#" @click="verDescripcion2(item.id)">Ver más</a>
                                                </span>
                                            </td>
                                            <td>
                                                <div v-if="item.descripcion_larga != null"> {{truncarDescripción(item.descripcion_larga, 20) + '...' }}</div>
                                                <div v-else>No hay descripcion</div>
                                                <span
                                                    v-if="item.descripcion_larga && item.descripcion_larga.length > 20">
                                                    <a href="#" @click="verDescripcion(item.id)">Ver
                                                        más</a>
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span class="badge "
                                                    :class="item.is_deleted ? 'badge-danger-personalizado' : 'badge-success-personalizado'">{{
                                                        item.is_deleted
                                                            ? 'Inactivo' : 'Activo' }}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'especialidad ver')"
                                                        @click="verDetalle(item.id)"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="editar(item.id)"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'especialidad editar')"></i>
                                                    <i class="fas mx-1 fa-lg fs-5 btn-action cursor-pointer"
                                                        :class="{ 'fa-check text-success': item.is_deleted, 'fa-trash text-danger': !item.is_deleted }"
                                                        @click="estado(item.id)"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'especialidad borrar')"></i>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()"><span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" v-for="(item, indice) in paginacion.total"
                                                :key="indice">
                                                <button type="button" class="page-link"
                                                    :class="{ 'bg-gray-700 text-white': item == paginacion.pagina }"
                                                    @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next"
                                                    @click="paginaNext()"><span aria-hidden="true">&raquo;</span>
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
    </div>

    <!-- Modal -->
    <div class="modal fade modal-xl" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalle</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="nombre"
                                v-model="formulario.nombre" readonly>
                        </div>
                        <div class="col-12 col-md-2">
                            <label for="imagen" class="form-label font-weight-bolder text-sm">imagen<span
                                    class="text-danger fst-italic">*</span></label>
                        </div>
                        <div class="col-12 col-md-4">
                            <img :src="formulario.imagen" width="140px" height="110px" alt="">
                        </div>
                        <div class="col-12 col-md-6" v-show="formulario.descripcion_corta != ''">
                            <label for="descripcion_corta"
                                class="form-label font-weight-bolder text-sm">Descripcion<span
                                    class="text-info text-xs fst-italic">(Corta)</span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="descripcion_corta"
                                v-model="formulario.descripcion_corta" readonly>
                        </div>
                        <div class="col-12 col-md-6" v-show="formulario.descripcion_larga != ''">
                            <label for="descripcion_larga"
                                class="form-label font-weight-bolder text-sm">Descripcion<span
                                    class="text-info text-xs fst-italic">(Larga)</span></label>
                            <textarea id="descripcion_larga" class="form-control" placeholder="Escriba..."
                                readonly>{{ formulario.descripcion_larga }}</textarea>
                        </div>
                    </div>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalle Curricula</h1>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-striped">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Modulo</th>
                                        <th>Tecnologias</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in useEspecialidad.cardModulos" :key="item.id">
                                        <td>{{ item.nombre }}</td>
                                        <td colspan="2"><span v-for="(tecnologia, tecnologiaIndex) in item.tecnologias"
                                                :key="tecnologia.id">{{ tecnologia.nombre + ',' + ' ' }} </span> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
<div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Descripción</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{ descripcionView.descripcion }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Descripción</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{descripcionView2.descripcion }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { changeStatusCurricula, showCurricula } from '@/services/CurriculaService';
import { changeStatus, index, show } from '@/services/EspecialidadService';
import { Modal } from 'bootstrap';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePermisoStore } from '@/stores/PermisosStore';
import { useEspecialidadStore } from '@/stores/EspecialidadStore';
import Swal from 'sweetalert2';
const useEspecialidad = useEspecialidadStore();
const permisoStore = usePermisoStore();
const datos = ref([]);
const showFullDescription = ref(false)
const showFullDescriptionLarga = ref(false)
const paginacion = ref({
    total: null,
    pagina: 1
})
const search = ref('');
const router = useRouter();
let modal = null;
let instanciaModal = null;
let modal2 = null;
let instanciaModal2 = null;
let modal3 = null;
let instanciaModal3 = null;
const formulario = ref({
    nombre: '',
    descripcion_corta: '',
    descripcion_larga: '',
    creacion: '',
    imagen: null,
});
const descripcionView = ref({});
const descripcionView2 = ref({});
onMounted(() => {
    modal = document.getElementById('staticBackdrop');
    instanciaModal = new Modal(modal);
    modal2 = document.getElementById('staticBackdrop2');
    instanciaModal2 = new Modal(modal2);
    modal3 = document.getElementById('staticBackdrop3');
    instanciaModal3 = new Modal(modal3);
    listar();
})
const agregar = () => {
    router.push({ path: `/especialidad-nueva` })
}
const truncarDescripción = (description, length) => {
    if (description === null) {
        return '';
    }
    return description.substring(0, length);
}
const listar = async () => {
    try {
        const { data } = await index(paginacion.value.pagina, search.value.trim());
        datos.value = data.datos.data.sort((b, a) => b.id - a.id); // Ordenar en orden descendente según la propiedad id
        paginacion.value.total = data.datos.last_page;
    } catch (error) {
        console.log(error);
    }
}
const formatDate = (date) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
const paginaCambio = param => {
    paginacion.value.pagina = param;
    listar();
}
const estado = async (param) => {
    try {
        const { data } = await changeStatus(param);
        Swal.fire({
            icon: "success",
            title: "Bien",
            text: "Estado modificado correctamente!",
        });
        listar();
    } catch (error) {
        console.log(error);
    }
}
const editar = param => {
    router.push({ path: `/especialidad-nueva/${param}` });
}
const verDetalle = async param => {
    try {
        const { data } = await show(param);
        formulario.value = {
            nombre: data.dato.nombre,
            descripcion_corta: data.dato.descripcion_corta,
            descripcion_larga: data.dato.descripcion_larga,
            creacion: data.dato.created_at,
            imagen: data.imagen,
        }
        console.log(formulario.value);
        useEspecialidad.cardModulos = data.curriculas;
        abrirModal();
    } catch (error) {
        console.log(error);
    }
}
const abrirModal = () => {
    instanciaModal.show();
}
const abrirModal2 = () => {
    instanciaModal2.show();
}
const abrirModal3 = () => {
    instanciaModal3.show();
}
const verDescripcion = async (param) => {
    try {
        const {data} = await show(param);
        descripcionView.value = {
            descripcion: data.dato.descripcion_larga
        }
        abrirModal2();
    } catch (error) {
        console.log(error);
    }
}
const verDescripcion2 = async (param) => {
    try {
        const {data} = await show(param);
        descripcionView2.value = {
            descripcion: data.dato.descripcion_larga
        }
        abrirModal3();
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>