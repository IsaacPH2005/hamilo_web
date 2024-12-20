<template>
  <BannerPagina pagina="nosotros" seccion="banner"/>
  <section id="empresaabout" class="padding-medium text-white" style="background-color: #303644">
    <div class="container my-5">
      <div class="row">
        <!-- Misión -->
        <div class="content-horizontal">
          <img src="../../../../public/jubilee/images/mision.png" alt="Misión" style="width: 20%;">
          <div class="card card-hover bg-dark text-white">
            <div class="card-body p-4">
              <p class="card-text">{{ empresa.mision }}</p>
            </div>
          </div>
        </div>
        <!-- Visión -->
        <div class="content-horizontal">
          <img src="../../../../public/jubilee/images/vision.png" alt="Visión" style="width: 20%;">
          <div class="card card-hover bg-dark text-white">
            <div class="card-body p-4">
              <p class="card-text">{{ empresa.vision }}</p>
            </div>
          </div>
        </div>
        <!-- Historia -->
        <div class="content-horizontal">
          <img src="../../../../public/jubilee/images/historia.png" alt="Historia" style="width: 20%;">
          <div class="card card-hover bg-dark text-white cardr">
            <div class="card-body p-4">
              <h5 class="card-title">Historia</h5>
              <p class="card-text">Desde nuestros humildes comienzos en 1990, hemos crecido para convertirnos en una
                empresa global.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="pb-4" style="background-color: #303644">
    <h3 class="text-center text-white">Reconocimientos</h3>
    <div class="col-12 px-5">
      <div class="row d-flex justify-content-center mt-5">
        <div class="col-12 col-md-6 col-lg-4 mt-5" v-for="reconocimiento in reconocimientos" :key="reconocimiento.id">
          <div class="card text-center rounded-4 shadow mt-5 border border-secondary-subtle cardm">
            <div class="">
              <img class="position-absolute start-50 translate-middle rounded-4 p-1 text-light bg-dark"
                :src="reconocimiento.url_imagen ? reconocimiento.url_imagen : '../../public/jubilee/images/medalla.png'"
                alt="Premio" style="width: 140px; height: 140px;" />

            </div>
            <div class="card-body mt-5 ">
              <h5 class="card-title fw-bold">
                {{ reconocimiento.titulo }}
              </h5>
              <button type="button" class="btn btn-dark" @click="verReconocimiento(reconocimiento.id)">Ver mas..</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-md-centered">
      <div class="modal-content p-0">
        <div class="modal-body p-0">
          <div class="card text-bg-dark">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="reconocimiento.url_imagen" class="img-fluid rounded-start w-100 h-100" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title" style="color: #ffcc09;">{{reconocimiento.titulo}}</h5>
                  <p class="card-text">{{ reconocimiento.detalle }}</p>
                </div>
              
                <div class="card-footer p-0 border-0 text-center">
                  <button type="button" class="btn btn-info m-0 mb-2" data-bs-dismiss="modal">Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { datosEmpresaLibre } from '@/services/EmpresaService';
import { indexActivos, show } from '@/services/ReconocimientosService';
import { ref, onMounted } from 'vue';
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import BannerPagina from '@/components/web/BannerPagina.vue';

const empresa = ref({});
const reconocimientos = ref({});
const reconocimiento = ref({});
let modal = null;
let instanciaModal = null; 


async function mostrarDatosEmpresa() {
  try {
    const { data } = await datosEmpresaLibre();
    empresa.value = data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
const cargarReconocimientos = async () => {
  try {
    const { data } = await indexActivos();
    //console.log(data);
    reconocimientos.value = data.datos.data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  mostrarDatosEmpresa();
  cargarReconocimientos();
  modal = document.getElementById('staticBackdrop');
  instanciaModal = new Modal(modal);
});
//desplegar el detalle de los reconocimientos
const verReconocimiento = async (id) => {
  try {
    const {data} = await show(id);
    reconocimiento.value=data.datos;
    instanciaModal.show();
  } catch (error) {
    console.log(error);
  }
};
</script>
<style>
.card-hover:hover {
  transform: scale(1.05);
  background-color: #f8f9fa;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.content-horizontal {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.content-horizontal:nth-child(even) {
  flex-direction: row-reverse;
}

.content-horizontal img {
  width: 50%;
  height: auto;
  object-fit: cover;
}

.cardr .icon {
  font-size: 3rem;
  color: lightseagreen;
}

.cardr-text {
  color: gray;
}

.cardr {
  transition: all 0.5s;
}

.cardr:hover {
  background-color: lightseagreen;
  color: #fff;
}

.cardr:hover .icon,
.cardr:hover .cardr-text {
  color: #fff;
}
</style>