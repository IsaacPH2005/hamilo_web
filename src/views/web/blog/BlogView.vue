<template>
  <BannerPagina pagina="blog"/>
  <div class="blogs pb-5 pt-3">
    <div class="container mt-5">
        <div class="subforum ">
            <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
              <div class="btn-group" role="group" aria-label="First group">
                <button type="button" class="btn btn-outline-secondary" :class="menu==0?'active':''" @click="listar()">Todos</button>
                <button type="button" class="btn btn-outline-secondary" :class="menu==1?'active':''" @click="listar_activas()">Abiertos</button>
                <button type="button" class="btn btn-outline-secondary" :class="menu==2?'active':''" @click="listar_inactivas()">Cerrados</button>
              </div>
              <div class="input-group">
                <div class="input-group-text" id="btnGroupAddon2">🔎</div>
                <input type="text" class="form-control" placeholder="Buscar Foros" v-model="buscado" @change="buscar(buscado)" aria-label="Input group example" aria-describedby="btnGroupAddon2">
              </div>
            </div>
            <hr style="background-color: yellow;">
            <div class="text-center">
              <button type="button" v-if="idUsuario" class="button-yellow px-5" @click="preguntar()">Realizar Pregunta <i class="fas fa-edit ms-3"></i></button>
              <button type="button" v-if="!idUsuario" class="button-yellow sm px-3" @click="iniciar()"><i class="fas fa-sign-in-alt me-3"></i>Iniciar Sesión</button>
            </div>
            <div class="" v-for="(item, index) in datos" :key="item.id">
              <div class="row mt-3">
                  <div class="col-12 col-md-7 border rounded">
                      <button type="button" class="btn btn-outline-light p-0 border border-0" @click="irBlog(item.id)">
                        <h4 style="color: #303644;">{{ item.titulo }}</h4>
                        <p style="color: #303644;" class="monserrat-regular">{{ cortarMensaje(item.contenido) }}</p>
                      </button>
                  </div>
                  <div class="col-6 col-md-2 center" style="color: #303644;">
                      <p>{{ item.comentarios_count }} Posts <br> {{ item.views }} Views <br> <span class="badge" :class="item.is_deleted == 0 ? 'text-bg-warning' : 'text-bg-secondary'">{{ item.is_deleted == 0 ? "OPEN" : "CLOSE" }}</span></p>
                  </div>
                  <div class="col-6 col-md-3 center">
                      <p style="color: #303644;">
                        <b class="text-info">Posteado</b> por 
                        <a class="enlace" href="">{{ item.datos_users.nombre+" "+item.datos_users.apellido}}</a> 
                        <br>on <small>12 Dec 2020</small>
                      </p>
                  </div>
                  <div class="col-12">
                    <button type="button"  v-if="idUsuario==item.datos_users.id || rolAdmin" class="btn btn-dark sm p-2" @click="cerrarForo(item.id)">{{ item.is_deleted == true ? 'Abrir Pregunta':'Cerrar Pregunta'}}</button>
                  </div>
                   
              </div>
              <hr style="background-color: yellow;">
            </div>
        </div>
    </div>
  </div>
  <div class="modal fade" id="blogModal" tabindex="-1" role="dialog" data-bs-backdrop="static"
			aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content" style="background-color: #303644;">
						<div class="modal-header">
							<h5 class="modal-title text-white" id="modal-title-notification"><i class="far fa-edit me-3"></i> Realiza tu consulta</h5>
							<button type="button" class="btn-close text-dark" aria-label="Close" @click="cerrarModal()">
							</button>
						</div>
						<div class="modal-body ">
							<p></p>
							<div class="form-group">
								<label for="titulo" class="form-label font-weight-bolder text-sm text-white">Titulo<span class="text-danger fst-italic">*</span></label>
                <input type="text" class="form-control" name="titulo" v-model="blog.titulo">
								<small v-if="errors.titulo" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.titulo[0]}}</small>
							</div>
							<div class="form-group">
								<label for="contenido" class="form-label font-weight-bolder text-sm text-white">Consulta<span class="text-danger fst-italic">*</span></label>
								<textarea id="contenido" class="form-control textarea-blog" placeholder="Escribe aquí tu código o mensaje..." v-model="blog.contenido"></textarea>
								<small v-if="errors.contenido" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>{{ errors.contenido[0]}}</small>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-danger" @click="cerrarModal()">Cancelar</button>
							<button type="button" class="btn btn-primary" @click="registrar()">Guardar</button>
						</div>
					</div>
			</div>
	</div>
</template>
<script setup>
import { activas, buscador, changeStatus, inactivas, index, store, vistas } from '@/services/BlogService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import Swal from "sweetalert2";
import BannerPagina from '@/components/web/BannerPagina.vue';
const router = useRouter();
let modal = null;
let instanciaModal = null;
const blog = ref({});
const errors = ref({});
const datos = ref({});
const menu = ref(0);
const buscado = ref("");
const paginacion = ref({
  total: null,
  pagina: 1
});
let idUsuario=ref(null);
let rolAdmin=ref(false);
const Usuario=JSON.parse(localStorage.getItem('usuario'));
if (Usuario != null){
    idUsuario.value=Usuario.id;
    if(Usuario.role == 'Super admin'){  
        rolAdmin.value = true; 
    }
}
onMounted(() => {
  listar();
  modal = document.getElementById('blogModal');
  instanciaModal = new Modal(modal);
});
const listar = async () => {
  try {
    const { data } = await index();
    datos.value = data.datos.data;
    paginacion.value.total = data.datos.last_page;
    menu.value=0;
  } catch (error) {
    console.log(error);
  }
}
const listar_activas = async () => {
  try {
    const { data } = await activas();
    datos.value = data.datos;
    paginacion.value.total = data.datos.last_page;
    menu.value=1;
  } catch (error) {
    console.log(error);
  }
}
const listar_inactivas = async () => {
  try {
    const { data } = await inactivas();
    datos.value = data.datos;
    paginacion.value.total = data.datos.last_page;
    menu.value=2;
  } catch (error) {
    console.log(error);
  }
}
const buscar = async param =>{
  try {
    const { data } = await buscador(param);
    datos.value = data.datos.data;
    paginacion.value.total = data.datos.last_page;
  } catch (error) {
    console.log(error);
  }
}
const cerrarForo = async param =>{
  try {
    const { data } = await changeStatus(param);
    listar(); 
  } catch (error) {
    console.log(error);
  }
}
const irBlog = async (id) =>{
  try {
    const { data } = await vistas(id);
  } catch (error) {
    console.log(error);
  }
  router.push({path: `/blogs-form/${id}`});
}
const cortarMensaje = (mensaje) =>{
      return mensaje.length > 200
        ? mensaje.substring(0, 200) + '...' // Agrega puntos suspensivos si el texto es mayor a 200 caracteres
        : mensaje;
    }
const registrar = async () => {
  errors.value={};
  try {
    const { data } = await store(blog.value);
    console.log(data);
    
	  Swal.fire({
        icon: "success",
        title: "Bien",
        text: "Registro Correcto!",
    });
	  cerrarModal();
    listar();
  } catch (error) {
    if (error.response.status == 422) {
        errors.value = error.response.data.errors;
    } else {
        console.log(error);
    }
  }
};
const iniciar = () => {
    router.push({path: '/login'});
}
const preguntar= () => {
  instanciaModal.show();    
}
const cerrarModal = () => {
    instanciaModal.hide();
    errors.value = ref({});
    blog.value = {};
}
const formatoFecha = (fecha) => {
    // Solo toma los primeros 10 caracteres de la cadena que representan la fecha
    return fecha.split('T')[0];
}
</script>
<style>
  .enlace{
    color:white;
  }
  .enlace:hover {
    color:#FFCC01;
  }

  
/*------------ Foro -----------------*/

.blogs{
    background-color:white;
}

.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.textarea-blog {
      width: 100%;
      height: 400px; /* Ajusta la altura como desees */
      resize: vertical; /* Permitir que el usuario ajuste la altura */
      padding: 10px;
      font-family: monospace; /* Estilo tipo código */
      font-size: 12px;
      border: 1px solid #ced4da;
      border-radius: 5px;
    }
</style>