<template>
    <div class="blogs pb-5 pt-3 ">
        <div class="container mt-5">
            <div class="row" v-for="item in blog" :key="item.id">
                <div class="col-12 mt-5">
                    <figure class="text-center" style="color: #303644;">
                        <blockquote class="">
                            <p>
                                <b class="monserrat-bold">Posteado</b> por 
                                <a class="enlace" href="">{{ item.datos_users.nombre+" "+item.datos_users.apellido}}</a>
                            </p>
                        </blockquote>
                        <figcaption class="monserrat-regular">
                            Modificado : <cite title="Source Title">{{ formatoFecha(item.updated_at)}}</cite> 
                             - Creado : <cite title="Source Title">{{ formatoFecha(item.created_at)}}</cite>
                        </figcaption>
                        <figcaption class="monserrat-regular">
                            Vista : <cite title="Source Title">{{ item.views}}</cite> veces
                        </figcaption>
                        <blockquote class="blockquote">
                            <p class="monserrat-regular fw-bold" style="color: #303644;" >
                                {{ item.titulo }}
                            </p>
                        </blockquote>
                    </figure>
                </div>
                <div class="col-12 border border-black rounded">
                    <div class="card">
                        <div class="card-body p-2 px-3" >
                            <pre class="monserrat-regular text-content" style="color: #303644;">{{ item.contenido }}</pre>
                        </div>
                    </div>   
                </div>
                <div class="col-6 mt-2">
                    <p class="monserrat-regular" style="color: #303644;">{{ item.comentarios_count }} Respuestas</p>
                </div>
                <div class="col-12 border border-black rounded" style="color: #303644;" v-for="item2 in comentarios" :key="item2.id">
                    <div class="card">
                        <div class="card-body p-2 px-3">
                            <pre class="monserrat-regular text-content" >{{ item2.detalle }}</pre>
                        </div>
                    </div>
                    <button type="button" v-if="item2.user_id == idUsuario || rolAdmin" class="btn btn-dark p-2 mt-2" @click="cerrarResp(item2.id)" style="position: absolute;">Eliminar Respuesta</button>
                    <figure class="text-end">
                        <blockquote>
                            <p  class="monserrat-regular" >{{ item2.users.email }}</p>
                        </blockquote>
                        <figcaption class="blockquote-footer monserrat-regular">
                            Respondido el <cite title="Source Title">{{ formatoFecha(item2.created_at) }}</cite>
                        </figcaption>
                    </figure>
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label mt-3 h5">Tu respuesta</label>
                    <textarea class="form-control textarea-blog" id="exampleFormControlTextarea1" rows="3" v-model="blogResp.detalle"></textarea>
                    <small v-if="errors.detalle" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i> Respuesta es requerida</small>
                </div>
                <div class="col-12 text-center">
                    <button type="button" class="button-yellow px-5 m-3" @click="volver()"><i class="fas fa-reply me-3"></i>Volver</button>
                    <button type="button" class="button-yellow px-5 m-3" style="color: #303644;" v-if="!idUsuario" @click="iniciar()"><i class="fas fa-sign-in-alt me-3"></i>Inicia sesión</button>
                    <button type="button" class="button-yellow px-5" v-if="idUsuario" @click="responder()">Responder <i class="fas fa-edit ms-3"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { changeStatusResp, show, storeResp } from '@/services/BlogService';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const blog = ref({});
const blogResp = ref({});
const comentarios = ref({});
const router = useRouter();
const route = useRoute();
const errors = ref({});
const idBlog = ref(null);
let idUsuario=ref(null);
let rolAdmin=ref(false); 
const Usuario=JSON.parse(localStorage.getItem('usuario'));
if (Usuario != null){
    idUsuario.value=Usuario.id;
    if(Usuario.role == 'Super admin'){  
        rolAdmin.value = true; 
    }
}
idBlog.value=route.params.id
onMounted(() => {
    listar();
    
});
const formatoFecha = (fecha) => {
    // Solo toma los primeros 10 caracteres de la cadena que representan la fecha
    return fecha.split('T')[0];
}
const listar = async () => {
    if (idBlog.value) {
        try {
            const { data } = await show(idBlog.value);
            blog.value = data.datos;
            comentarios.value = data.datos[0].comentarios;                
        } catch (error) {
            console.log(error);
        }
    }
}
const responder = async () => {
  errors.value={};
  try {
    blogResp.value.blog_id = idBlog.value;
    blogResp.value.user_id = idUsuario.value;
    const { data } = await storeResp(blogResp.value);
    console.log(data);
    Swal.fire({
        icon: "success",
        title: "Bien",
        text: "Registro Correcto!",
    });
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
const cerrarResp = async param =>{
  try {
    const { data } = await changeStatusResp(param);
    listar(); 
  } catch (error) {
    console.log(error);
  }
}
const volver = () => {
    router.push({path: '/blogs'});
}
</script>
<style>
.enlace {
    color: #303644;;
}

.enlace:hover {
    color: #FFCC01;
}

/*------------ Foro -----------------*/
.blogs {
    background-color: white;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.text-content {
  white-space: pre-wrap; /* Esto asegura que el texto se ajuste y preserve saltos de línea */
  word-wrap: break-word; /* Asegura que las palabras largas se rompan al final del contenedor */
}
</style>