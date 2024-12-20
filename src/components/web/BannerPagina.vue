<template>
  <div class="row p-0">
    <div v-if="tipo_presentacion === 'c'" class="col-12 m-0 mt-4">
      <div id="carouselExampleAutoplaying" class="carousel slide p-0" data-bs-ride="carousel">
        <div class="carousel-inner p-0">
          <div class="carousel-item text-center mt-3" v-for="(imagen, index) in banner" :key="imagen.id"
            :class="index === 0 ? 'active' : ''">
            <img :src="urlBaseAsset + 'img/img_pagina/' + imagen.url_imagen" alt="img" class="img-fluid image-banner" />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div v-if="tipo_presentacion == 'e'" class="col-12 m-0 p-0 mt-5 text-center">
      <img :src="imagen.id > 0
          ? urlBaseAsset + 'img/img_pagina/' + imagen.url_imagen
          : imagen.url_imagen
        " alt="img" class="img-fluid image-banner" />
    </div>
  </div>
</template>
<script setup>
import { showPaginaNombre } from "@/services/PaginasService";
import { ref, onMounted } from "vue";
import { urlBaseAsset } from "@/services/Http";

const pagina = ref({});
const banner = ref([]);
const tipo_presentacion = ref("e");
const imagen = ref({});
const propiedades = defineProps({
  pagina: {
    type: String,
    required: true,
  },
});
console.log(propiedades);

onMounted(() => {
  cargarBanner();
});

const cargarBanner = async () => {
  try {
    const { data } = await showPaginaNombre(propiedades.pagina);
    console.log(data);
    pagina.value = data.datos;
    let indiceBanner = -1;
    if (
      pagina.value.secciones_pagina != null &&
      pagina.value.secciones_pagina.length > 0
    ) {
      indiceBanner = pagina.value.secciones_pagina.findIndex(
        (seccion_pagina) => seccion_pagina.seccion.seccion == "banner"
      );
    }
    if (indiceBanner !== -1) {
      banner.value = pagina.value.secciones_pagina[indiceBanner].imagenes;
      tipo_presentacion.value =
        pagina.value.secciones_pagina[indiceBanner].tipo_presentacion;
      if (tipo_presentacion.value == "e") {
        let indice = obtenerNumeroRandomico(0, banner.value.length - 1);
        imagen.value = banner.value[indice];
      }
    } else {
      imagen.value = {
        id: 0,
        url_imagen: `${urlBaseAsset}img/img_default/banner_general.jpg`
      };
      //console.log(imagen.value);
    }
  } catch (error) {
    console.log(error);
  }
};
function obtenerNumeroRandomico(minimo, maximo) {
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}
</script>
<style scoped>
.image-container {
  position: relative;
  width: 100%;
  /* Ajusta según sea necesario */
  height: auto;
  /* Ajusta según sea necesario */
  overflow: hidden;
}

.fading-image {
  width: 100%;
  /* Ajusta según sea necesario */
  height: auto;
  /* Ajusta según sea necesario */
  display: block;
  position: relative;
}

.fading-image::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  /* Ajusta según el tamaño del área de disolución deseada */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgb(11, 11, 11) 100%);
  pointer-events: none;
}

.image-banner {
  image-rendering: -webkit-optimize-contrast;
  /* Mejora la nitidez en navegadores WebKit */
  image-rendering: crisp-edges;
  width: 100%;
  /* Ocupa todo el ancho */
  aspect-ratio: 5 / 1;
  /* Proporción de 4:1 */
  background-size: cover;
  background-position: center;
}

@media (max-width: 768px) {
  .image-banner {
    aspect-ratio: 4 / 1;
    /* Mantener la misma proporción en móviles */
  }
}
</style>