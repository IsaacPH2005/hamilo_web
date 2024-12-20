<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas me-2"
                            :class="idBatch != '' ? 'fa-pencil' : 'fa-save'"></i>{{ idBatch != "" ? 'Editar registro' :
                                'Agregar registro' }}</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-3">
                        <div class="col-12 col-md-6">
                            <label for="especialidad" class="form-label font-weight-bolder text-sm">Especialidad<span
                                    class="text-danger fst-italic">*</span></label>
                            <select class="form-select" :class="{ 'border-danger': errors.especialidad_id }"
                                id="especialidad" aria-label="Default select example"
                                v-model="formulario.especialidad_id">
                                <option value="" selected>Seleccione</option>
                                <option :value="item.id" v-for="(item) in especialidades" :key="item.id">
                                    {{ item.nombre }}</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errors.especialidad_id"><i
                                    class="fas fa-times me-1"></i>{{ errors.especialidad_id[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="version" class="form-label font-weight-bolder text-sm">Version<span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="text" class="form-control" :class="{ 'border-danger': errors.version }"
                                placeholder="Escriba..." id="version" v-model="formulario.version">
                            <small class="text-danger fst-italic text-xs" v-if="errors.version"><i
                                    class="fas fa-times me-1"></i>{{ errors.version[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="fecha_inicio" class="form-label font-weight-bolder text-sm">Fecha <span
                                    class="text-info">(Inicio)</span><span
                                    class="text-danger fst-italic">*</span></label>
                            <input type="date" class="form-control" :class="{ 'border-danger': errors.fecha_inicio }"
                                placeholder="Escriba..." id="fecha_inicio" v-model="formulario.fecha_inicio">
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha_inicio"><i
                                    class="fas fa-times me-1"></i>{{ errors.fecha_inicio[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="fecha_fin" class="form-label font-weight-bolder text-sm">Fecha <span
                                    class="text-info">(Fin)</span><span class="text-danger fst-italic">*</span></label>
                            <input type="date" class="form-control" :class="{ 'border-danger': errors.fecha_fin }"
                                placeholder="Escriba..." id="fecha_fin" v-model="formulario.fecha_fin">
                            <small class="text-danger fst-italic text-xs" v-if="errors.fecha_fin"><i
                                    class="fas fa-times me-1"></i>{{ errors.fecha_fin[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion_larga"
                                class="form-label font-weight-bolder text-sm">Descripcion<span
                                    class="text-info text-xs fst-italic">(Larga)</span></label>
                            <textarea id="descripcion_larga" class="form-control" placeholder="Escriba..."
                                v-model="formulario.descripcion"></textarea>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="descripcion_larga"
                                class="form-label font-weight-bolder text-sm">Requisitos</label>
                            <textarea id="descripcion_larga" class="form-control" placeholder="Escriba..."
                                v-model="formulario.requisitos"></textarea>
                        </div>
                        <div class="col-12 col-md-6">
                            <label for="imagen" class="form-label font-weight-bolder text-sm">imagen<span
                                class="text-danger fst-italic">*</span></label>
                            <input type="file" class="form-control" :class="{ 'border-danger': errors.especialidad_id }"
                                placeholder="Escriba..." id="imagen" @change="obtenerImagen($event)"
                                accept=".png, .jpg, .jpeg">
                            <small class="text-danger fst-italic text-xs" v-if="errors.imagen"><i
                                    class="fas fa-times me-1"></i>{{ errors.imagen[0] }}</small>
                        </div>
                        <div class="col-12 col-md-6 text-center" v-if="previewImagen">
                            <div class="card">
                                <div class="card-header">
                                    <h5>Previo Imagen</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12 text-center">
                                            <img :src="previewImagen" alt="Preview de la imagen" width="120px"
                                                height="100px">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <button type="button" class="btn btn-danger me-2" @click="volver()"><i
                                    class="fas fa-reply me-2"></i>Volver</button>
                            <button type="button" class="btn ms-2"
                                :class="estadoBoton ? 'disabled' : (idBatch != '' ? 'btn-warning' : 'btn-primary')" @click="guardar()">{{ idBatch !=
                                    "" ? 'Editar' : 'Guardar' }}<i class="fas ms-2" :class="estadoBoton ? 'fa-spinner fa-spin' : (idBatch ? 'fa-pencil' : 'fa-save')
                                    "></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { show, store, update } from '@/services/BatchService';
import { especialidadesActivas } from '@/services/EspecialidadService';
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const idBatch = router.currentRoute.value.params.idBatch;
const especialidades = ref([]);
const errors = ref({});
const formulario = ref({
    version: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    requisitos: '',
    especialidad_id: '',
    imagen: ''
});
const estadoBoton = ref(false);
onMounted(() => {
    mostrarEspecialidades();
    if (idBatch != "") {
        verRegistro();
    }
})
const obtenerImagen = (event) => {
    formulario.value.imagen = event.target.files[0];
};
const guardar = async () => {
    errors.value = {};
    try {
        estadoBoton.value = true;
        const formData = new FormData();
        formData.append('version', formulario.value.version);
        formData.append('fecha_inicio', formulario.value.fecha_inicio);
        formData.append('fecha_fin', formulario.value.fecha_fin);
        formData.append('descripcion', formulario.value.descripcion);
        formData.append('requisitos', formulario.value.requisitos);
        formData.append('especialidad_id', formulario.value.especialidad_id);
        formData.append('imagen', formulario.value.imagen);
        console.log(formulario.value);
        if (idBatch != "") {
            formData.append('_method', 'PUT');
            const { data } = await update(idBatch, formData);
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Registro modificado correctamente!",
            });
            estadoBoton.value = true;
            router.push({ path: '/batch' });
        } else {
            const { data } = await store(formData);
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Registro guardado correctamente!",
            });
            estadoBoton.value = true;
            router.push({ path: '/batch' });
        }

    } catch (error) {
        if (error.response.status == 422) {
            errors.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    } finally {
        estadoBoton.value = false;
    }
}
const mostrarEspecialidades = async () => {
    try {
        const { data } = await especialidadesActivas('');
        especialidades.value = data.datos;
    } catch (error) {
        console.log(error);
    }
}
const verRegistro = async () => {
    try {
        const { data } = await show(idBatch);
        formulario.value = {
            version: data.datos.version,
            fecha_inicio: data.datos.fecha_inicio,
            fecha_fin: data.datos.fecha_fin,
            especialidad_id: data.datos.especialidad_id,
            descripcion: data.datos.descripcion,
            requisitos: data.datos.requisitos
        }
    } catch (error) {
        console.log(error);
    }
}
const previewImagen = computed(() => {
    if (formulario.value.imagen) {
        return URL.createObjectURL(formulario.value.imagen);
    } else {
        return null;
    }
});
const volver = () => {
    router.push({ path: '/batch' })
}
</script>
<style></style>