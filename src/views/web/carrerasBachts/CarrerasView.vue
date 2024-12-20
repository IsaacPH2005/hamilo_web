<template>
  <BannerPagina pagina="carreras" seccion="banner" />
  <div id="empresaCarreras" class="mt-2 text-white">
    <div class="container">
      <div class="row d-flex justify-content-center">
      <div class="col-sm-12 col-xl-6 col-xxl-4 mb-6" v-for="(curso, index) in cursos" :key="curso.id">
        <div class="z-1 position-absolute m-4 p-0">
          <h4>
            <span class="badge" :class="curso.is_deleted ? 'bg-danger' : 'bg-success'">{{ curso.is_deleted ? "CLOSE" :
              "OPEN" }}</span>
          </h4>
        </div>
        <div class="card rounded-5 border-5 shadow position-relative h-100" style="background-color: #303644">
          <img :src="curso.imagen ||
            'https://img.freepik.com/vector-premium/servidor-no-encontrado-simbolo-icono-error-nube-ilustracion-vectorial-eps-10-imagen-archivo_756957-2264.jpg'
            " class="img rounded-top-5" alt="image" style="width: 100%; height: 250px" />
          <div class="card-body text-white pb-3">
            <div class="mt-0">
              <h5 class="fw-bold monserrat-regular text-white text-center px-5 pb-2">
                {{ curso.nombre }}
              </h5>
              <p>{{ curso.descripcion_larga}}</p>
            </div>
            <button class="button-yellow monserrat-regular-subtitulo py-3 custom-btn" type="button" @click="irCarrera(curso.id)" style="color: #303644;">
							Ver más
						</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import BannerPagina from "@/components/web/BannerPagina.vue";
import { especialidadesActivas } from "@/services/EspecialidadService";
import { useRouter } from 'vue-router';
const router = useRouter();
const search = ref("");

const cursos = ref([
  {
    id: 1,
    crm_especialidades: {
      descripcion_larga: "1",
      nombre: "vacqwewqeio",
      imagen: "../../../../public/jubilee/images/item1.jpg",
    }
  }, {
    id: 1,
    crm_especialidades: {
      descripcion_larga: "2",
      nombre: "vacio",
      imagen: "../../../../public/jubilee/images/item1.jpg",
    }
  },
  {
    id: 1,
    crm_especialidades: {
      descripcion_larga: "3",
      nombre: "vacasdfsdfio",
      imagen: "../../../../public/jubilee/images/item1.jpg",
    }
  }
]);

async function obtenerCursos() {
  try {
    const { data } = await especialidadesActivas('');
    if (data.datos.length >= 1) {
      cursos.value = data.datos; 
    }
  } catch (error) {
    console.log("Error fatal: " + error);
  }
}

onMounted(() => {
  obtenerCursos();
});
const irCarrera = (id) => {
  router.push({ path: `/carrera/${id}` });
}
</script>
<style></style>
