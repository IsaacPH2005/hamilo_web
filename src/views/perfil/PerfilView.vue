<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <h3 class="mb-0 text-center mb-2">Editar perfil</h3>
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">INFORMACIÓN DE USUARIO</p>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Nombre(s)<span class="text-danger fst-italic">*</span></label>
                                    <input class="form-control" type="text" v-model="datos_generales.nombre">
                                    <small v-if="errors_datos_generales.nombre" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_datos_generales.nombre[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Apellido(s)</label>
                                    <input class="form-control" type="email" v-model="datos_generales.apellido">
                                    <small v-if="errors_datos_generales.apellido" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_datos_generales.apellido[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Dirección de correo electrónico<span class="text-danger fst-italic">*</span></label>
                                    <input class="form-control" type="text" v-model="user.email">
                                    <small v-if="errors_credenciales.email" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_credenciales.email[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Número de documento de identidad</label>
                                    <input class="form-control" type="text" v-model="datos_generales.ci">
                                    <small v-if="errors_datos_generales.ci" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_datos_generales.ci[0]}}</small>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Foto de perfil</label>
                                    <input class="form-control" type="file" @change="obtenerImagen($event)">                                    
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <p class="text-uppercase text-center">INFORMACIÓN DE CONTACTO</p>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Dirección</label>
                                    <input class="form-control" type="text" v-model="datos_generales.direccion">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Ciudad</label>
                                    <input class="form-control" type="text" v-model="datos_generales.ciudad">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">País</label>
                                    <input class="form-control" type="text" v-model="datos_generales.pais">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="nombre" class="form-label font-weight-bolder text-sm">Teléfono</label>
                                    <input class="form-control" type="text" v-model="datos_generales.telefono">
                                </div>
                            </div>
                        </div>
                        <hr class="horizontal dark">
                        <div class="row">
                            <div class="col-md-12 d-flex justify-content-center">
                                <button type="button" class="btn btn-primary me-2" @click="editarDatosGenerales()">Guardar cambios</button>
                                <button type="button" class="btn btn-primary ms-2" @click="mostrarModal()">Modificar contraseña</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <PerfilCardVue ref="perfilCard" v-if="user.id" :idUsuario="user.id" />
            </div>
        </div>
    </div>
    <div class="modal fade" id="cambioPasswordModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
        aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="modal-title-notification">Modificar contraseña</h6>
                        <button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="password" class="form-label font-weight-bolder text-sm">Nueva contraseña<span class="text-danger fst-italic">*</span></label>
                            <input type="password" class="form-control" v-model="credenciales.password">
                            <small v-if="errors_credenciales.password" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors_credenciales.password[0]}}</small>                          
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation" class="form-label font-weight-bolder text-sm">Confirme nueva contraseña<span class="text-danger fst-italic">*</span></label>
                            <input type="password" class="form-control" v-model="credenciales.password_confirmation">                            
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="cerrarModal()">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="editarCredenciales()">Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup>
    import { onMounted, ref } from "vue";
    import { mostrarUsuario, actualizarCredenciales, actualizarDatosGenerales } from "@/services/UserService.js";
    import PerfilCardVue from '@/components/crm/PerfilCard.vue';
    import { Modal } from 'bootstrap';
    import Swal from 'sweetalert2';

    const user = ref({});
    const image = ref(null);
    const urlImage = ref(null);
    const perfilCard = ref(null);
    const datos_generales = ref({});
    let modal = null;
    let instanciaModal = null;
    const isModalVisible = ref(false);
    const credenciales = ref({
        email: null,
        password: '',
        password_confirmation: ''
    });
    const errors_datos_generales = ref({});
    const errors_credenciales = ref({});
    const backgroundImage = ref(null);
    const especialidad = ref("Full Stack Developer");
    const mostrarDatosUsuario = async () => {
        let usuario = JSON.parse(localStorage.getItem('usuario'));
        try {
            const { data } = await mostrarUsuario(usuario.id);
            user.value = data.datos;
            credenciales.value.email = user.value.email;
            datos_generales.value = data.datos.datos_generales;
        } catch (error) {
            console.log(error);
        }
    }

    const obtenerImagen = (event) => {
        image.value = event.target.files[0];
        if (image.value != null) {
            const reader = new FileReader();
            reader.onload = (e) => urlImage.value = e.target.result;
            reader.readAsDataURL(image.value);
        }
    }
    const editarDatosGenerales = async () => {
        errors_datos_generales.value = {};
        try {
            let formulario = new FormData();
            if(image.value != null) {
                formulario.append('foto_perfil', image.value);
            }
            formulario.append('nombre', datos_generales.value.nombre);
            formulario.append('apellido', datos_generales.value.apellido);
            formulario.append('ci', datos_generales.value.ci);
            formulario.append('direccion', datos_generales.value.direccion);
            formulario.append('ciudad', datos_generales.value.ciudad);
            formulario.append('pais', datos_generales.value.pais);
            formulario.append('telefono', datos_generales.value.telefono);
            formulario.append('_method', 'PUT');
            const listaNulos = [];
            for (let [key, value] of formulario.entries()) {
                if (value == '' || value == 'null') {
                    listaNulos.push(key);
                }
            }
            listaNulos.forEach(key => formulario.delete(key));
            const { data } = await actualizarDatosGenerales(formulario);
            await editarCredenciales();
            let datosUsuario = {
                id: data.datos.id,
                nombre: data.datos.nombre,
                apellido: data.datos.apellido,
                email: user.value.email,
                image: data.datos.foto_perfil
            }            
            localStorage.setItem('usuario', JSON.stringify(datosUsuario));
            perfilCard.value.mostrarDatosUsuario();
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Datos actualizados correctamente!",
            });
        } catch (error) {
            if (error.response.status == 422) {
                errors_datos_generales.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    const editarCredenciales = async () => {
        try {
            if(credenciales.value.password == '') {
                const { data } = await actualizarCredenciales({ email: user.value.email });
            } else {
                const { data } = await actualizarCredenciales(credenciales.value);
            }
            credenciales.value.password = '';
            credenciales.value.password_confirmation = '';
            if(isModalVisible) {
            Swal.fire({
                icon: "success",
                title: "Bien",
                text: "Contraseña actualizada correctamente!",
            });
            }
            cerrarModal();            
        } catch (error) {
            if (error.response.status == 422) {
                errors_credenciales.value = error.response.data.errors;
            } else {
                console.log(error);
            }
        }
    }
    const mostrarModal = () => {
        errors_credenciales.value = {};
        instanciaModal.show();
        isModalVisible.value = true;
    }
    const cerrarModal = () => {
        credenciales.value.password = '';
        credenciales.value.password_confirmation = '';
        instanciaModal.hide();
        isModalVisible.value = false;
    }
    onMounted(() => {
        modal = document.getElementById('cambioPasswordModal');
        instanciaModal = new Modal(modal);
        mostrarDatosUsuario();
    })
</script>

<style>
</style>