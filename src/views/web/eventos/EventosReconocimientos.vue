<template>
  <BannerPagina pagina="eventos" seccion="banner" />
  <section id="eventos-registros" class="text-white p-0 m-0 pt-2">
    <div class="row mt-5">
      <div class="col-12 px-5">
        <div class="card border border-0 rounded-0">
          <div class="card-header border border-0 text-center">
            <h2 class="card-title" style="color: #303644">Actividades</h2>
          </div>
          <div class="card-body">
            <div class="row">
              <div v-if="actividades.length == 0" class="col-12 text-center">
                <span class="monserrat-regular" style="color: #00c4d0;">No existen actividades disponibles</span>
              </div>
            </div>
            <div v-if="actividades.length > 0" class="row gx-3">
              <div class="col-12 col-sm-6 p-0 contenedor-tarjeta" v-for="actividadF in actividades"
                :key="actividadF.id">
                <!--<button type="button" class="btn p-3 w-100" @click="ver(actividadF.id)">-->
                <div class="mini-card w-95">
                  <div class="row g-3 bg-success">
                    <div class="col-12">
                      <div class="contenedor-principal">
                        <img v-if="actividadF.url_banner"
                          :src="urlBaseAsset + 'img/img_actividad/banners/' + actividadF.url_banner"
                          class="img-fluid rounded-start imagen-principal" alt="imagen principal" />
                          <h5 class="monserrat-regular-subtitulo">{{ actividadF.titulo }}</h5>
                          <div class="contenedor-texto">
                            <p class="monserrat-regular text">
                            {{ actividadF.detalle }}
                            <br>
                            <button class = "btn" @click="ver(actividadF.id)">Ver mas</button>
                            </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--</button>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" id="actividadBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-md-centered">
      <div class="modal-content p-0" style="background-color: #303644">
        <div class="modal-body p-0">
          <div class="row g-3">
            <div class="col-12">
              <div class="contenedor-modal">
                <img
                  :src="urlBaseAsset + 'img/img_actividad/banners/' + actividad.url_banner"
                  class="img-fluid rounded-start imagen-modal" alt="imagen principal" />
                <p class="monserrat-regular text-modal text-light">
                <h5 class="monserrat-regular-subtitulo text-light">{{ actividad.titulo }}</h5> {{ actividad.detalle }}</p>
              </div>
            </div>
            <div class="col-12 pt-0">
              <div v-if="actividad.imagenes?.length > 0" class="contenedor-lista">
                <ul class="list-group list-group-horizontal">
                  <li class="list-group-item" v-for="imagen in actividad.imagenes" key="imagen.id">
                    <div v-if="!imagen.is_deleted" class="resizable-div" ref="resizableDiv"
                      :data-size="actividad.imagenes.length">
                      <div class="contenedor-imagen d-flex justify-content-center">
                        <img :src="urlBaseAsset + 'img/img_actividad/imagenes/' +
                          imagen.url_imagenes" class="rounded-circle imagen-secundaria"
                          alt="imagen.url_imagenes">
                      </div>
                      <div class="contenedor-descripcion d-flex justify-content-center">
                        <small class="card-text fst-italic titulo_imagen"
                          style="color: #00c4d0;">{{ imagen.descripcion ? imagen.descripcion : '' }}</small>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer py-2 border-0 text-center">
          <button type="button" class="btn btn-danger m-0 mb-2" data-bs-dismiss="modal"><i class="fas fa-times"></i>
            Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { actividadesActivas, showWeb } from '@/services/ActividadesService';
import { urlBaseAsset } from '@/services/Http';
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import BannerPagina from '@/components/web/BannerPagina.vue';

//const reconocimientos = ref([]);
const actividades = ref([]);
const actividad = ref({});
let modal = null;
let instanciaModal = null;

const resizableDiv = ref(null);

/*const size = ref(100);
const minSize = 15;

const divStyle = computed(() => ({
  width: `${Math.max(size.value,minSize)}vh`
}));*/

onMounted(() => {
  cargarActividaddes();
  modal = document.getElementById('actividadBackdrop');
  instanciaModal = new Modal(modal);

  let size
});

const cargarActividaddes = async () => {
  try {
    const { data } = await actividadesActivas();
    actividades.value = data.datos.data;
  } catch (error) {
    console.log(error);
  }
};

const ver = async (id) => {
  try {
    const {data} = await showWeb(id);
    actividad.value=data.datos;
    instanciaModal.show();
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped>
.contenedor-tarjeta {
  padding-bottom: 20px;
  margin-bottom: 10px;
}

.mini-card {
  border: 1px solid #303644;
  border-radius: 15px;
  background-color: white;
  box-shadow: 5px 5px 10px #303644;
  width: 45vw;
  height: 50vh;
  overflow: hidden;
  transition: background-color 0.5s ease, border-color 0.5s ease;
}

.mini-card:hover {
  border-color: #f7ca17a1;
  background-color: #ffcc01a1;
}

.mini-card button {
  background-color: aliceblue;
}

.contenedor-principal {
  border-top-left-radius: 15px;
  height: 50vh;
  padding-bottom: 25px;
  /*background-color: red;*/
}

.contenedor-texto{
  overflow-y: auto;
  max-height: 45vh;
  margin-right: 5px;
  padding-bottom: 25px;
  /*background-color: green;*/
}

.text {
  text-align: justify;
  padding-right: 15px;
  padding-left: 15px;
}

.imagen-principal {
  float: left;
  margin-right: 15px;
  border-top-left-radius: 15px;
  max-width: auto;
  height: 50vh;
  image-rendering: -webkit-optimize-contrast;
  /* Mejora la nitidez en navegadores WebKit*/
  image-rendering: crisp-edges;
}

/*.mini-card:hover .imagen-principal{
  border-color: #ffcc01;
}*/

.imagen-secundaria {
  box-shadow: 5px 5px 10px #303644;
  width: 15vh;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  image-rendering: -webkit-optimize-contrast;
  /* Mejora la nitidez en navegadores WebKit*/
  image-rendering: crisp-edges;
  float: unset;
}

.contenedor-lista {
  /*max-width: 45vw;*/
  height: 20vh;
  overflow: hidden;
  overflow-x: auto;
  background-color: transparent;
  /*background-color: green;
  margin-top: 0px;
  /*min-width: ;*
  /*padding: 0px;*/
}

.contenedor-lista ul {
  min-width: 100%;
}

.contenedor-lista li {
  border: none;
  padding: 0px;
  background-color: transparent;
}

.contenedor-imagen {
  width: 18vh;
  height: 16vh;
  overflow: hidden;
  position: relative;
  background-color: transparent;
  margin: 0px;
}



/*.mini-card p{
  color:rgb(86, 85, 85);
}*/

h5 {
  /*color: #ffcc01;*/
  color: #303644;
  padding-top: 15px;
  text-align: center;
  transition: color 0.5s ease;
}

/*.modal-size{
  width: 80vw;
  max-height: 80vh;
}*/

.contenedor-modal{
  width: fit-content;
  /*max-height: 80vh;*/
}

.imagen-modal{
  width: fit-content;
  height: auto;
}
/*.mini-card:hover h5{
  color: white;
}*/

/*@media (max-width: 1330){
  .contenedor-tarjeta {
    padding-bottom: 20px;
  }

  .mini-card {
    margin-left: 0px;
    margin-right: 0px;
    width: 70dvw;
    height: 82vh;
  }

  .imagen-principal {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    max-width: 100%;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
    /* Mejora la nitidez en navegadores WebKit
    image-rendering: crisp-edges;
  }

  .text {
    padding-top: 15px;
    margin-top: 15px;
  }
}*/
@media (max-width: 1330px) {
  
/*}
 

@media (max-width: 770px) {*/

  /*.name-link{
      display: none;
      padding: 0px;
    }*/

  .contenedor-principal {
    height: 100dvh;
    width: 100%;
    overflow-y: auto;
  }

  .contenedor-tarjeta {
    padding-bottom: 20px;
  }

  .mini-card {
    margin-left: 0px;
    margin-right: 0px;
    width: 70dvw;
    height: 82vh;
  }

  .imagen-principal {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    max-width: 100%;
    height: auto;
    image-rendering: -webkit-optimize-contrast;
    /* Mejora la nitidez en navegadores WebKit*/
    image-rendering: crisp-edges;
  }

  .text {
    padding-top: 15px;
    margin-top: 15px;
  }
}
</style>