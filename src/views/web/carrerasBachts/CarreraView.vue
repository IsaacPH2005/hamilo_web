<template >
    <section id="empresacarrera" class="padding-medium background">
        <!-- Sección de Información de la Carrera -->
        <section class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 px-5">
                        <img :src="imagen" alt="Carrera Universitaria" class="img-fluid rounded-5" style="width: 100%;">
                    </div>
                    <div class="col-md-6">
                        <h1 class="mb-4 monserrat-bold-titulo" style="color: #303644;" >{{ cursos.nombre }}</h1>
                        <p class="mb-4 monserrat-regular-subtitulo">{{ cursos.descripcion_larga }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección de Convocatorias Abiertas -->
        <section class="convocatorias">
            <div class="container">
                <h5 style="color: #303644;" class="monserrat-bold-titulo">{{ ifBatch>0 ? 'Convocatorias Abiertas':'No hay convocatorias abiertas'}}</h5>
                <div class="row">
                    <div class="col-md-4" v-for="(item2,index) in batch" :key="item2.id">
                        <div class="card convocatoria-card h-100" v-if="item2.is_deleted==1">
                            <div class="card-header">
                                <h5 class="card-title monserrat-regular-subtitulo">VERSIÓN: {{ item2.version}}</h5>
                            </div>
                            <img :src="item2.imagen" height="100vw"/>
                            <div class="card-body">
                                <p class="monserrat-regular">{{ item2.descripcion}}</p>
                                <p class="monserrat-regular" v-if="item2.requisitos">REQUISITOS: {{ item2.requisitos }}</p>
                                
                            </div>
                            <div class="card-footer ">
                                <p class="monserrat-regular mb-0"><b>Inicio de clases :{{ item2.fecha_inicio}}</b></p>
                                <RouterLink to="/postular" type="button" class="button-yellow monserrat-regular-subtitulo px-4 py-3">Postúlate aquí</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Sección de Materias -->
        <section class="py-5 bg-white mb-0">
            <div class="container">
                <h2 class="mb-4 monserrat-bold-titulo"><i class="fas fa-book materia-icon"></i>Curricula</h2>
                <ul class="list-group text-dark">
                    <li class="list-group-item mb-4 monserrat-regular" v-for="(item,index) in curricula" :key="item.id"><i class="fas fa-book-open materia-icon"></i>{{ item.nombre }}
                        <ul>
                            <li class="list-group-item" v-for="item2 in curricula[index].tecnologias" :key="item2.id"><i class="fas fa-laptop-code materia-icon"></i>{{ item2.nombre }}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>
<script setup>
import { batchEspecialidad } from '@/services/BatchService';
import { convocatoriasActivos } from '@/services/ConvocatoriasService';
import { especialidadActiva } from '@/services/EspecialidadService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const cursos = ref([]);
const convocatoria = ref([]);
const batch = ref([]);
const ifBatch = ref([]);
const imagen = ref('');
const curricula = ref([{
    id: 0,
    nombre: '',
    tecnologias: []
}]);
const idCarrera = router.currentRoute.value.params.idCarrera; 
async function obtenerCursos() {
  try {
    const { data } = await especialidadActiva(idCarrera);
      cursos.value = data.dato;
      imagen.value = data.imagen;
      curricula.value = data.curriculas;   
  } catch (error) {
    console.log("Error fatal: " + error);
  }
}
async function obtenerConvocatoria() {
  try {
    const { data } = await convocatoriasActivos();
    convocatoria.value = data.datos;
    obtenerBatch();
      
  } catch (error) {
    console.log("Error fatal: " + error);
  }
}
async function obtenerBatch() {
    ifBatch.value = 0;
    try {
        const { data } = await batchEspecialidad(idCarrera);
        batch.value = data.datos; 
    } catch (error) {
        console.log("Error fatal: " + error);
    }    
    let estado,nbatch = 0;
    batch.value.forEach((element,index)=>{
        estado = 0;
        nbatch = element.id;
        convocatoria.value.forEach((element2)=>{
            if (parseInt(element2.batch_id) === parseInt(nbatch)) {
                estado++;
                ifBatch.value++;
            }          
        }); 
        if (estado === 0){
            batch.value[index].is_deleted = 0;        
        }else{
            batch.value[index].is_deleted = 1;
        }
    });
}
onMounted(() => {
  obtenerCursos();
  obtenerConvocatoria();
});
</script>
<style >
.convocatorias {
            background-color: white;
            padding: 40px 20px;
            text-align: center;
        }

        .materia-icon {
            font-size: 24px;
            margin-right: 10px;
        }

        .convocatoria-card {
            margin-top: 20px;
        }
</style>