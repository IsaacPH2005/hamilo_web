<template>
    <div class="form pb-5 pt-3">
        <div class="container mt-7">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header" style="background-color: #FFCC01;">
                            <h3 class="text-center mt-4">Registro bootcamp Hamilo</h3>
                            <p class="px-5">Creemos en tu talento, impulsamos tu educación. ¡Cambia tu futuro con Hamilo, estudia de forma intensiva, remota y a costo cero! <br>Inscripciones abiertas al bootcamp de programación</p>
                        </div>
                        <div class="card-body diagonal-gradient">
                            <p class="text-center"><span class="text-danger fst-italic h4">*</span> Datos requeridos</p>
                            <div class="row mt-3">
                                <div class="col-12 pb-2">
                                    <label for="convocatoria" class="form-label font-weight-bolder text-sm">Batchs Activos<span class="text-danger fst-italic">*</span></label>
                                    <select id="batchs_id" class="form-select" aria-label="Default select example" v-model="datosForm.batch_id" @change="revisar(datosForm.batch_id)">
                                        <option value="" selected>Seleccione</option>
                                        <option v-for="(item,index) in convocatoria" :key="item.id" :value="item.batch_id">{{ item.batch_id+' - '+item.batch.crm_especialidades.nombre }} </option>
                                    </select>
                                    <p class="text-danger" v-if="message">{{ message }}</p>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="nombre" class="form-label">1. Nombre(s) <span class="text-danger fst-italic">*</span></label>
                                    <input type="text" class="form-control" id="nombre" placeholder="Escriba su respuesta" v-model="datosUser.nombre" readonly required>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="apellido" class="form-label">2. Apellido(s) <span class="text-danger fst-italic">*</span></label>
                                    <input type="text" class="form-control" id="apellido" v-model="datosUser.apellido" readonly placeholder="Escriba su respuesta">
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="telefono" class="form-label">3. Celular (incluye el código del país) <span class="text-danger fst-italic">*</span></label>
                                    <input type="text" class="form-control" id="telefono" v-model="datosUser.telefono" placeholder="Escriba su respuesta" required>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="email" class="form-label">4. Email <span class="text-danger fst-italic">*</span></label>
                                    <input type="email" class="form-control" id="email" v-model="email" placeholder="Escriba su respuesta" readonly required >
                                </div>
                                <div class="col-12 col-md-4 pb-2">
                                    <label for="nacimiento" class="form-label">5. Fecha Nacimiento <span class="text-danger fst-italic">*</span></label>
                                    <input type="date" class="form-control" id="nacimiento" v-model="datosUser.fecha_nacimiento" required>
                                </div>
                                <div class="col-12 col-md-4 pb-2">
                                    <label for="pais" class="form-label">6. Pais <span class="text-danger fst-italic">*</span></label>
                                    <input type="text" class="form-control" id="pais" v-model="datosUser.pais" placeholder="Escriba su respuesta" required>
                                </div>
                                <div class="col-12 col-md-4 pb-2">
                                    <label for="ciudad" class="form-label">7. Ciudad <span class="text-danger fst-italic">*</span></label>
                                    <input type="text" class="form-control" id="ciudad"  v-model="datosUser.ciudad" placeholder="Escriba su respuesta" required>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="genero" class="form-label pt-0">8.Genero <span class="text-danger fst-italic">*</span></label>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="genero" id="male" value="1" v-model="datosUser.genero">
                                                <label class="form-check-label" for="male">Masculino</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="genero" id="female" value="2" v-model="datosUser.genero">
                                                <label class="form-check-label" for="female">Femenino</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="genero" id="others" value="3" v-model="datosUser.genero">
                                                <label class="form-check-label" for="others">Otro</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="nivel_academico" class="form-label pt-0">9. Nivel de estudios <span class="text-danger fst-italic">*</span></label>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_estudios" id="male" value="1" v-model="datosForm.nivel_estudios">
                                                <label class="form-check-label" for="male">Primaria</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_estudios" id="secundaria" value="2" v-model="datosForm.nivel_estudios">
                                                <label class="form-check-label" for="secundaria">Secundaria</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_estudios" id="bachillerato" value="3" v-model="datosForm.nivel_estudios">
                                                <label class="form-check-label" for="bachillerato">Bachillerato - no continué con estudios</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_estudios" id="bachilleratoa" value="4" v-model="datosForm.nivel_estudios">
                                                <label class="form-check-label" for="bachilleratoa">Bachillerato - cursando estudios superiores</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_estudios" id="licenciatura" value="5" v-model="datosForm.nivel_estudios">
                                                <label class="form-check-label" for="licenciatura">Licenciatura</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_estudios" id="especial" value="6" v-model="datosForm.nivel_estudios">
                                                <label class="form-check-label" for="especial">Especialización</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="rama" class="form-label pt-0">10. Si egresaste o estudias en la universidad, selecciona la rama que e asemeje a tu carrera</label>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_academico" id="social" value="1" v-model="datosForm.nivel_academico">
                                                <label class="form-check-label" for="social">Social y económicas (Economía, Marketing, Psicologia, etc.)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_academico" id="exacta" value="2" v-model="datosForm.nivel_academico">
                                                <label class="form-check-label" for="exacta">Exactas (Ingenierias, Informatica, etc.)</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="programador" class="form-label pt-0">11. ¿Tienes conocimentos previos en programación? <span class="text-danger fst-italic">*</span></label>
                                        <br><small> En Hamilo, no consideramos necesario que tengas conocimientos previos en programación para participar en nuestro bootcamp, este dato no será determinante en el proceso de postulación. La selección se basará en aptitudes, motivación y compromiso.</small>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_programacion" id="nuloIdioma" value="1" v-model="datosForm.nivel_programacion">
                                                <label class="form-check-label" for="nuloIdioma">Nulo</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_programacion" id="principianteIdioma" value="2" v-model="datosForm.nivel_programacion">
                                                <label class="form-check-label" for="principianteIdioma">Principiante</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_programacion" id="intermedioIdioma" value="3" v-model="datosForm.nivel_programacion">
                                                <label class="form-check-label" for="intermedioIdioma">Intermedio</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="nivel_programacion" id="avanzadoIdioma" value="4" v-model="datosForm.nivel_programacion">
                                                <label class="form-check-label" for="avanzadoIdioma">Avanzado</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="servicio_internet" class="form-label pt-0">12. ¿Cuentas con acceso a internet y una computadora o laptop? <span class="text-danger fst-italic">*</span></label>
                                        <br><small> Reconocemos que el acceso a Internet y a una computadora es esencial para participar en nuestro bootcamp. Sin embargo, tu respuesta a esta pregunta no afectará tu elegibilidad y estamos dispuestos a trabajar contigo para superar cualquier limitación.</small>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="servicio_internet" id="servicio_si" value="1" v-model="datosForm.servicio_internet">
                                                <label class="form-check-label" for="servicio_si">Si</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="servicio_internet" id="servicio_no" value="2" v-model="datosForm.servicio_internet">
                                                <label class="form-check-label" for="servicio_no">No</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="idioma_extrangero" class="form-label pt-0">13. ¿Cuál en tu dominio del idioma inglés? <span class="text-danger fst-italic">*</span></label>
                                        <br><small> En Hamilo, no consideramos necesario que tengas conocimientos previos en el idioma inglés para participar en nuestro bootcamp, este dato no será determinante en el proceso de postulación. La selección se basará en aptitudes, motivación y compromiso.</small>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="idioma_extranjero" id="nose" value="1" v-model="datosForm.idioma_extranjero">
                                                <label class="form-check-label" for="nose">No se inglés</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="idioma_extranjero" id="principiante" value="2" v-model="datosForm.idioma_extranjero">
                                                <label class="form-check-label" for="principiante">Principiante</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="idioma_extranjero" id="intermedio" value="3" v-model="datosForm.idioma_extranjero">
                                                <label class="form-check-label" for="intermedio">Intermedio</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="idioma_extranjero" id="avanzado" value="4" v-model="datosForm.idioma_extranjero">
                                                <label class="form-check-label" for="avanzado">Avanzado</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <fieldset class="">
                                        <label for="disposicion_tiempo" class="form-label pt-0">14. ¿Actualmente trabajas? <span class="text-danger fst-italic">*</span></label>
                                        <div class="col-sm">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="horario_trabajo" id="siocho" value="1" v-model="datosForm.horario_trabajo">
                                                <label class="form-check-label" for="siocho">Si, trabajo timpo completo (8 hrs.)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="horario_trabajo" id="sicuatro" value="2" v-model="datosForm.horario_trabajo">
                                                <label class="form-check-label" for="sicuatro">Si, trabajo medio tiempo (4 hrs.)</label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio" name="horario_trabajo" id="noestoy" value="3" v-model="datosForm.horario_trabajo">
                                                <label class="form-check-label" for="noestoy">No estoy trabajando</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col-12 col-md-6 pb-2">
                                    <label for="comentario" class="form-label">15. Déjanos una duda o comentario</label>
                                    <input type="text" class="form-control" id="comentario" placeholder="Escriba su respuesta" required v-model="datosForm.comentario">
                                </div>
                            </div>
                        </div>
                        <div class="card-footer" style="background-color: #FFCC01;">
                            <div class="col-12 text-center">
                                <h5 class="text-danger" v-if="message2">{{ message2 }}</h5>
                                <button type="button" class="btn btn-lg btn-dark pe-5 ps-5" @click="registrar()" :class="{'disabled': estadoBoton}">Enviar Postulación <i class="ms-3 fas" :class="estadoBoton? 'fa-spinner fa-spin':'fa-share'"></i></button>
                            </div>
                        </div>
                    </div>     
                </div>
            </div>  
        </div>
    </div>
</template>
<script setup>
import { convocatoriasActivos } from '@/services/ConvocatoriasService';
import { postulacionUsuario, store, storeFormWeb } from '@/services/Postulaciones';
import { storeweb } from '@/services/PostulacionForms';
import { actualizarDatosGeneralesAdmin, mostrarUsuario } from '@/services/UserService';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let idUsuario=ref(null);
let email=ref(null);
const datosUser = ref({});
const datosForm = ref({});
const datosPost = ref({});
const datosRev = ref({});
const errors2 = ref({});
const errors3 = ref({});
const idPost = ref(null);
const convocatoria = ref([]);
const estadoBoton = ref(false);
const Usuario=JSON.parse(localStorage.getItem('usuario'));
const message = ref('');
const message2 = ref('');
if (Usuario != null){
    idUsuario.value=Usuario.id;
    email.value=Usuario.email;
}

const verUsuario = async () => {
    try {
        const { data } = await mostrarUsuario(idUsuario.value);
        datosUser.value = data.datos.datos_generales;
    } catch (error) {
        console.log(error);
    }
}
async function obtenerConvocatoria() {
  try {
    const { data } = await convocatoriasActivos();
    convocatoria.value = data.datos;
  } catch (error) {
    console.log("Error fatal: " + error);
  }
}
onMounted(() => {
    verUsuario();
    obtenerConvocatoria(); 
});

const revisar = async (param) => {
    try {
        const { data }= await postulacionUsuario(idUsuario.value,param);
        datosRev.value=data.datos;
        if (datosRev.value != null) {
            message.value='Ya se encuentra registrad@ en este batch.';
            datosPost.value.batch_id='';
        } else {
            message.value='';
        }
    } catch (error) {
        console.log(error);
    }
}
const registrar = async () => {
    errors3.value = {};    
    try {
        estadoBoton.value = true;
        message2.value='';

        datosForm.value.user_id=idUsuario.value
        
        const response1 = await storeFormWeb(datosForm.value);        
        const formData = new FormData();
        formData.append('nombre', datosUser.value.nombre);
        formData.append('apellido', datosUser.value.apellido);
        formData.append('telefono', datosUser.value.telefono);
        formData.append('pais', datosUser.value.pais);
        formData.append('ciudad', datosUser.value.ciudad);
        formData.append('fecha_nacimiento', datosUser.value.fecha_nacimiento);
        formData.append('genero', datosUser.value.genero);
        formData.append('_method', "PUT");
        const response2 = await actualizarDatosGeneralesAdmin(idUsuario.value,formData);
        Swal.fire({
            title: "Registro guardado",
            text: "Postulación enviada correctamente.",
            icon: "success"
        }); 
        volver();
    } catch (error) {
        if (error.response.status == 422) {
            message2.value='Aún tiene preguntas requeridas sin contestar.';
            errors3.value = error.response.data.errors;
        } else {
            console.log(error);
        }
    }finally {
        estadoBoton.value = false;
    }
}
const volver = () => {
    router.push({path: '/'});
}
</script>
<style>
.form {
    background-color: #f8f9fa;
}
.diagonal-gradient {
  background: linear-gradient(to bottom right, rgb(253, 253, 255), rgb(245, 239, 152));
}
</style>