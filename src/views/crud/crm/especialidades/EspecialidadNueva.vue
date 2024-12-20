<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2"
                            :class="idEspecialidad != '' ? 'fa-pencil' : 'fa-save'"></i>{{ idEspecialidad != "" ?
                                'Editar registro' : 'Agregar registro' }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" :class="{ 'border-danger': errors.nombre }"
                                placeholder="Escriba..." id="nombre" v-model="formulario.nombre">
                            <small class="text-danger fst-italic text-xs" v-if="errors.nombre"><i
                                    class="fas fa-times me-1"></i>{{ errors.nombre[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="imagen" class="form-label font-weight-bolder text-sm">imagen<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="file" class="form-control" placeholder="Escriba..." id="imagen"
                                :class="{ 'border-danger': errors.imagen }" @change="obtenerImagen($event)"
                                accept=".png, .jpg, .jpeg">
                            <small class="text-danger fst-italic text-xs" v-if="errors.imagen"><i
                                    class="fas fa-times me-1"></i>{{ errors.imagen[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion_corta"
                                class="form-label font-weight-bolder text-sm">Descripcion<span
                                    class="text-info text-xs fst-italic">(Corta)</span></label>
                            <input type="text" class="form-control" placeholder="Escriba..." id="descripcion_corta"
                                v-model="formulario.descripcion_corta">
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion_larga"
                                class="form-label font-weight-bolder text-sm">Descripcion<span
                                    class="text-info text-xs fst-italic">(Larga)</span></label>
                            <textarea id="descripcion_larga" class="form-control" placeholder="Escriba..."
                                v-model="formulario.descripcion_larga"></textarea>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="col-12 col-md-3" v-show="previewImagen">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12 text-center" v-if="previewImagen">
                                                <img :src="previewImagen" alt="" width="150px" height="85px">
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
        <div class="col-12 col-md-4">
            <div class="card shadow-lg">
                <div class="card-body">
                    <h4>Modulos</h4>
                    <div class="row gy-3">
                        <div class="col-12 col-md-12">
                            <input type="search" class="form-control" placeholder="Buscar..." v-model="search"
                                @change="mostrarModulos()">
                        </div>
                        <div class="col-12">
                            <ul class="list-group" v-if="search != ''">
                                <li class="list-group-item d-flex justify-content-between"
                                    v-for="(item, index) in modulos" :key="item.id">
                                    {{ item.nombre }}
                                    <div class="text-end">
                                        <button type="button" class="btn btn-primary btn-xs"
                                            @click="useEspecialidad.addModulo(item)"><i
                                                class="fas fa-plus"></i></button>
                                    </div>
                                </li>
                                <p v-if="search === ''">No hay resultados</p>
                                <p v-else>Cargando...</p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-8">
            <div class="row">
                <div class="col-12 col-md-6" v-for="(item, indice) in useEspecialidad.cardModulos" :key="item.id">
                    <TecnologiasCard :modulo="item" :indiceModulo="indice"></TecnologiasCard>
                </div>
            </div>
        </div>
        <div class="col-12 text-center">
            <button type="button" class="btn btn-danger me-2" @click="volver()"><i
                    class="fas fa-reply me-2"></i>Volver</button>
            <button type="button" class="btn ms-2" :class="estadoBoton ? 'disabled' : (idEspecialidad != '' ? 'btn-warning' : 'btn-primary')"
                @click="guardar()">{{ idEspecialidad != "" ? 'Editar' : 'Guardar' }}<i class="fas ms-2"
                    :class="estadoBoton ? 'fa-spinner fa-spin' : (idEspecialidad != '' ? 'fa-pencil' : 'fa-save')"></i></button>
        </div>
    </div>
</template>
<script setup>
import { show, store, update } from '@/services/EspecialidadService';
import { listarModulosActivos } from '@/services/ModulosService';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TecnologiasCard from '@/components/crm/TecnologiasCard.vue';
import { useEspecialidadStore } from '@/stores/EspecialidadStore';
import { listarTecnologiasActivas } from '@/services/TecnologiasService';
import Swal from 'sweetalert2';
const useEspecialidad = useEspecialidadStore();
const router = useRouter();
const idEspecialidad = router.currentRoute.value.params.idEspecialidad;
const errors = ref({});
const search = ref('');
const search2 = ref('');
const tecnologias = ref([]);
const paginacion = ref({
    total: null,
    pagina: 1
})
const modulos = ref([]);
const formulario = ref({
    nombre: '',
    descripcion_corta: '',
    descripcion_larga: '',
    imagen: null,
    imagenPrevisual: null
});
const estadoBoton = ref(false);
const obtenerImagen = (event) => {
    formulario.value.imagen = event.target.files[0];
};
onMounted(() => {
    if (idEspecialidad != "") {
        verRegistro();
    }
    mostrarModulos();
    mostrarTecnologias();

})
const guardar = async () => {
    errors.value = {};
    try {
        estadoBoton.value = true;
        const formData = new FormData();
        formData.append('nombre', formulario.value.nombre);
        formData.append('descripcion_corta', formulario.value.descripcion_corta);
        formData.append('descripcion_larga', formulario.value.descripcion_larga);
        formData.append('cardModulos', JSON.stringify(useEspecialidad.cardModulos));
        formData.append('imagen', formulario.value.imagen);
        if (idEspecialidad != "") {
            formData.append('_method', "PUT");
            const { data } = await update(idEspecialidad, formData);
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Registro modificado correctamente!",
            });
            useEspecialidad.cardModulos = [];
            estadoBoton.value = true;
            router.push({ path: '/especialidad' });
        } else {
            const { data } = await store(formData);
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Registro guardado correctamente!",
            });
            useEspecialidad.cardModulos = [];
            estadoBoton.value = true;
            router.push({ path: '/especialidad' });
        }
    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            if (error.response.status == 406) {
                Swal.fire({
                    icon: "error",
                    title: 'Error',
                    text: error.response.data.mensaje,
                });
            }else{
                console.log(error);
            }
        }
    }finally{
        estadoBoton.value = false;
    }
}
const verRegistro = async () => {
    try {
        const { data } = await show(idEspecialidad);
        formulario.value = {
            nombre: data.dato.nombre,
            descripcion_corta: data.dato.descripcion_corta,
            descripcion_larga: data.dato.descripcion_larga,
        }
        useEspecialidad.cardModulos = data.curriculas;
    } catch (error) {
        console.log(error);
    }
}
const volver = () => {
    useEspecialidad.cardModulos = [];
    router.push({ path: '/especialidad' })
}
const previewImagen = computed(() => {
    if (formulario.value.imagen) {
        return URL.createObjectURL(formulario.value.imagen);
    } else {
        return null;
    }
})
const mostrarModulos = async () => {
    try {
        const { data } = await listarModulosActivos(search.value, paginacion.value.pagina);
        modulos.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const mostrarTecnologias = async () => {
    try {
        const { data } = await listarTecnologiasActivas(search2.value, '');
        tecnologias.value = data.datos
    } catch (error) {
        console.log(error);
    }
}
</script>
<style></style>