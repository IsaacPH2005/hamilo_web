<template>
  <BannerPagina pagina="contratame" seccion="banner" />
  <section id="eventos-registros" class="padding-medium text-white pt-2">
    <div class="container">
      <div class="row">
        <div class="col-12 px-5">
          <div class="text-center">
            <h2 style="color: #303644">Nuestros talentos</h2>
          </div>
          <div class="card-body">
            <div class="row" v-if="talentos.length == 0">
              <div class="col-12 text-center">
                <span class="text-danger">No existen talentos disponibles</span>
              </div>
            </div>
            <div class="row p-0 gx-2" v-if="talentos.length > 0">
              <div
                class="col-12 col-md-6 p-0 my-2 d-flex justify-content-center"
                v-for="talentoCard in talentos"
                :key="talentoCard.user_id"
              >
                <div class="mini-card mx-3 py-2">
                  <div class="row gx-0">
                    <div
                      class="col-5 col-md-3 text-center p-3 m-2 d-flex align-content-center justify-content-center"
                    >
                      <div class="contenedor-imagen rounded-circle">
                        <img
                          :src="
                            talentoCard.foto_perfil
                              ? urlBaseAsset +
                                'img/img_users/' +
                                talentoCard.foto_perfil
                              : 'https://ui-avatars.com/api/?name=' +
                                talentoCard.nombre +
                                '+' +
                                talentoCard.apellido +
                                '&font-size=0.5&bold=true&background=303644&color=ffcc01&rounded=true&format=png'
                          "
                          class="rounded-circle w-100"
                        />
                      </div>
                    </div>
                    <div class="col-6 col-md-5 mt-3">
                      <h3 class="card-title">
                        {{ talentoCard.nombre }} {{ talentoCard.apellido }}
                      </h3>
                      <h5>{{ talentoCard.especialidad }}</h5>
                      <h6 v-if="talentoCard.pais || talentoCard.ciudad">
                        <i class="fa-solid fa-location-dot"></i
                        >{{ talentoCard.pais ? talentoCard.pais : "" }} -
                        {{ talentoCard.ciudad ? talentoCard.ciudad : "" }}
                      </h6>
                    </div>
                    <div
                      class="col-12 col-md-3 d-flex justify-content-center align-content-center px-3 mx-0"
                    >
                      <!--<button class="btn">Contactame</button>-->
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-11 d-flex justify-content-evenly px-3 mx-2">
                      <a
                        v-if="talentoCard.url_portafolio"
                        :href="talentoCard.url_portafolio"
                        class="btn"
                        target="_blank"
                        ><i class="fa-solid fa-briefcase"></i
                        ><span class="name-link">Portafolio</span></a
                      >
                      <a
                        v-if="talentoCard.curriculum"
                        :href="
                          urlBaseAsset +
                          'Documentos/Curriculums/' +
                          talentoCard.curriculum
                        "
                        class="btn"
                        target="_blank"
                        ><i class="fa-regular fa-file-pdf"></i
                        ><span class="name-link">Curriculum</span></a
                      >
                      <a
                        v-if="talentoCard.url_linkedin"
                        :href="talentoCard.url_linkedin"
                        class="btn"
                        target="_blank"
                        ><i class="fa-brands fa-linkedin"></i
                        ><span class="name-link">LinkedIn</span></a
                      >
                      <a
                        v-if="talentoCard.url_github"
                        :href="talentoCard.url_github"
                        class="btn"
                        target="_blank"
                        ><i class="fa-brands fa-github"></i
                        ><span class="name-link">Github</span></a
                      >
                    </div>
                    <!--<div class="col-12">
                      <div class="contenedor-presentacion">
                        <div class="content" :class="{collapsed: !isExpanded, expanded: isExpanded}">
                          <p v-if="talentoCard.presentacion" class="card-text">
                            <span>Presentación:</span
                            >{{ talentoCard.presentacion }}
                          </p>
                        </div>
                        <span v-if="talentoCard.presentacion" @click="toggleContent" class="toggle-button">
                        {{ expanded ? "Show less" : "Show more" }}
                      </span>
                      <a href="#" id="toggleLink" @click.prevent="toggleContent">{{ toggleText}}</a>                      
                      </div>
                    </div>-->
                  </div>
                  <div class="row">
                      <!--<div class="col-11 col-md-7 px-3 mx-3">
                        <p v-if="talentoCard.presentacion" class="card-text"><span>Presentación:</span>{{ talentoCard.presentacion }}
                        </p>
                      </div>
                      <div class="col-11 col-md-4 p-3 m-3">
                        Skills
                      </div>-->
                    <div v-if="talentoCard.presentacion" class="col-11 px-3 mx-3 contenedor-presentacion">
                      <div :class="['content', {expanded}]">
                        <p class="card-text"><span>Presentación:</span>{{ talentoCard.presentacion }}
                        </p>
                      </div>
                      <span @click="toggleContent" class="toggle-button">
                          {{ expanded ? 'Show less' : 'Show more' }}
                      </span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
    class="modal fade modal-xlg"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-md-centered">
      <div class="modal-content p-0">
        <div class="modal-body p-0"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import BannerPagina from "@/components/web/BannerPagina.vue";
import { onMounted, ref, computed } from "vue";
import { urlBaseAsset } from "@/services/Http";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import { talentosDisponibles } from "@/services/EmpleoEstadosServices";
import { verifestado } from "@/services/Postulaciones";

const expanded = ref(false);
const talentos = ref([]);
const talento = ref({});
const paginacion = ref({
  total: null,
  pagina: 1,
});
let modal = null;
let instanciaModal = null;

const toggleContent = () => {
  expanded.value = !expanded.value;
};

onMounted(() => {
  window.addEventListener("scroll", aumentarRegistros);
  cargarTalentos();
  modal = document.getElementById("staticBackdrop");
  instanciaModal = new Modal(modal);
});

const cargarTalentos = async () => {
  try {
    const { data } = await talentosDisponibles(paginacion.value.pagina);
    talentos.value.push(...data.datos.data);
    //talentos.value = data.datos.data;
    talento.value = talentos.value[0];
    if (paginacion.value.total == null) {
      if (data.datos.total > 0) {
        paginacion.value.total = Math.ceil(
          data.datos.total / data.datos.per_page
        );
      } else {
        paginacion.value.total = 1;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const aumentarRegistros = () => {
  if (paginacion.value.total > paginacion.value.pagina) {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight
    ) {
      paginacion.value.pagina++;
      cargarTalentos();
    }
  }
};

//desplegar el detalle de los reconocimientos
const ver = (id) => {
  //try {
  //const {data} = await show(id);
  //reconocimiento.value=data.datos;
  instanciaModal.show();
  //} catch (error) {
  //console.log(error);
  //}
};
</script>
<style scoped>
/*.mini-card img{
    box-shadow: inset 5px 5px 10px white;
  }*/
.content {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: max-height 0.5s ease;
  max-height: 7em;
}

.content.expanded {
  display: block;
  -webkit-line-clamp: unset;
  max-height: none;
}

.toggle-button {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

.contenedor-presentacion {
  max-height: 25dvh;
  overflow-y: auto;
  /*padding-left: 15px;
  padding-right: 15px;*/
}

.mini-card {
  border: 1px solid #303644;
  border-radius: 15px;
  background-color: white;
  box-shadow: 5px 5px 10px #303644;
  /*margin-left: 5px;
    margin-right: 5px;*/
  width: 50vw;
  height: auto;
  transition: background-color 0.5s ease, border-color 0.5s ease;
}

.mini-card:hover {
  border-color: #ffcc01;
  background-color: #ffcc01;
}

.mini-card h3 {
  color: #ffcc01;
  transition: color 0.5s ease;
}

.mini-card h5 {
  color: #303644;
}

.mini-card h6 {
  color: gray;
}

.mini-card:hover h3 {
  color: white;
}

.mini-card a {
  color: #ffcc01;
  transition: color 0.5s ease;
}

.mini-card:hover a {
  color: white;
}

.mini-card a i {
  color: #ffcc01;
  font-size: x-large;
  transition: color 0.5s ease;
}

.mini-card:hover a i {
  color: white;
}

.mini-card button {
  background-color: #ffcc01;
  color: white;
  height: fit-content;
  transition: color 0.5s ease, background-color 0.5s ease;
}

.mini-card:hover button {
  color: #ffcc01;
  background-color: white;
}

/*.card-body{
  padding-left: 15px;
  padding-right: 15px;
}*/

.card-body p span {
  font-weight: bold;
  color: rgb(86, 85, 85);
}

.card-body p {
  color: rgb(86, 85, 85);
  text-align: justify;
}

.name-link {
  display: block;
}

.contenedor-imagen {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;

  /*background-color: red;*/
}

.contenedor-imagen img {
  width: 80%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  image-rendering: -webkit-optimize-contrast; /* Mejora la nitidez en navegadores WebKit */
  image-rendering: crisp-edges;
}

@media (max-width: 770px) {
  .name-link {
    display: none;
    padding: 0px;
  }

  .mini-card {
    margin-left: 0px;
    margin-right: 0px;
    min-width: 70dvw;
    max-height: 82vh;
  }
}
</style>
