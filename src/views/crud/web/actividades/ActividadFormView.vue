<template lang="">
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg">                
        <div class="card-body">
          <h5 class="card-title font-weight-bolder"><i class="fas me-2" :class="editar? 'fa-pencil': 'fa-save'"></i>{{ editar?'Editar Registro':'Nuevo Registro' }}</h5>
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="card">
                <div class="card-header text-center">
                  <h6 class="card-title">Actividad</h6>
                </div>
                <div class="card-body">
                  <div class="row gy-3">
                    <div class="col-12">
                      <label
                        for="titulo"
                        class="form-label font-weight-bolder text-sm"
                        >Titulo<span class="text-danger fst-italic"
                          >*</span
                        ></label
                      >
                      <input
                        type="text"
                        class="form-control" :class="errors.titulo?'border-danger':''"
                        placeholder="Escriba..."
                        id="titulo"
                        v-model="actividad.titulo"
                      />
                      <small v-if="errors.titulo" class="text-danger fst-italic text-xs"
                        ><i class="fas fa-times me-1"></i>Este campo es
                        requerido</small
                      >
                    </div>
                    <div class="col-12">
                      <label
                        for="fecha"
                        class="form-label font-weight-bolder text-sm"
                        >Fecha</label
                      >
                      <input
                        type="date"
                        class="form-control"
                        id="fecha"
                        v-model="fechaActividad"
                      />
                    </div>
                    <div class="col-12">
                      <label
                        for="detalle"
                        class="form-label font-weight-bolder text-sm"
                        >Detalle<span class="text-danger fst-italic"
                          >*</span
                        ></label
                      >
                      <textarea
                        class="form-control" :class="errors.detalle?'border-danger':''"
                        id="detalle"
                        placeholder="Escriba..."
                        v-model="actividad.detalle"
                      ></textarea>
                      <small v-if="errors.detalle" class="text-danger fst-italic text-xs"
                        ><i class="fas fa-times me-1"></i>Este campo es
                        requerido</small
                      >
                    </div>
                    <div class="col-12">
                      <label
                        for="banner"
                        class="form-label font-weight-bolder text-sm"
                        >Imagen<span class="text-info text-xs fst-italic"
                          >(Principal)</span
                        ></label
                      >
                      <input
                        type="file"
                        class="form-control"
                        id="banner" accept=".jpeg, .png, .jpg"
                        @change="obtenerBanner($event)"
                      />
                    </div>
                  </div>
                  <div v-if="actividad.url_banner!=null" class="col-12 mt-3 round">
                    <img
                      :src="actividad.url_banner"
                      class="img-fluid rounded"
                      alt="Banner de actividad"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="row gy-3 gx-3">
                <div v-if="editar" class="col-6 col-md-12">
                  <div class="card">
                    <div class="card-header text-center">
                      <h6 class="card-title">Imagenes registradas</h6>
                    </div>
                    <div class="card-body">
                      <div class="row mb-3 gy-3">
                        <div class="col-12">
                          <ul class="list-group">
                            <li class="list-group-item"
                              v-for="(imagen, index) in images"
                              key="imagen.id">
                              <div class="row">
                                <div class="col-10 d-flex align-items-center">
                                  <button class="btn" @click="editarImagen(imagen.id)" data-bs-toggle="tooltip" data-bs-placement="top" title="Modificar imagen registrada" 
                                  ref="tooltipElements">
                                    <div class="row">
                                      <div class="col-7 d-flex align-items-center">
                                        <p>{{ imagen.descripcion?imagen.descripcion:"Imagen "+ (index+1) }}
                                        </p>
                                      </div>
                                      <div class="col-5">
                                        <img :src="
                                        urlBaseAsset +
                                        'img/img_actividad/imagenes/' +
                                        imagen.url_imagenes"
                                        class="rounded img-fluid"
                                        :alt="index"
                                        height="100"/>
                                      </div>
                                    </div>
                                  </button>
                                </div>
                                <div class="col-2 d-flex align-items-center">
                                  <div class="d-flex justify-content-between w-100 py-0">
                                  <button
                                    v-if="imagen.is_deleted"
                                    class="btn btn-danger rounded-circle p-0 mb-0"
                                    @click="eliminarImagen(index)"
                                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Eliminar imagen registrada" 
                                  ref="tooltipElements">
                                    <i class="fas fa-minus-circle fs-2"></i>
                                  </button>
                                  <button
                                    class="btn rounded-circle p-0 mb-0"
                                    :class="imagen.is_deleted
                                    ? 'btn-success': 'btn-secondary'"
                                    @click="imagen.is_deleted = !imagen.is_deleted"
                                    data-bs-toggle="tooltip" data-bs-placement="bottom" :title="imagen.is_deleted
                                    ?'Activar imagen registrada':'Desactivar imagen registrada'" 
                                    ref="tooltipElements">
                                    <i class="fas fs-2"
                                    :class="imagen.is_deleted
                                    ? 'fa-check-circle': 'fa-times-circle'"></i>
                                  </button>
                                </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-12">
                  <div class="card">
                    <div class="card-header text-center">
                      <h6 class="card-title">
                        {{
                          editar? "Nuevas imagenes"
                            : "Imagenes complementarias"
                        }}
                      </h6>
                    </div>
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-12">
                          <input
                            type="file"
                            class="form-control"
                            id="otraImagen"
                            placeholder="..." accept=".jpeg, .png, .jpg"
                            @change="obtenerImage($event)"
                          />
                        </div>
                        <div v-if="urlImage != ''" class="col-12">
                          <div class="row gx-3">
                            <div class="col-4">
                              <img
                                :src="urlImage"
                                class="img-fluid rounded"
                                :alt="index"
                                height="100"
                              />
                            </div>
                            <div class="col-8">
                              <label
                                for="descripcion"
                                class="form-label font-weight-bolder text-sm"
                                >Descripción</label
                              >
                              <textarea
                                class="form-control"
                                id="descripcion"
                                placeholder="Escriba..."
                                v-model="descripcion"
                              ></textarea>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-12 d-flex justify-content-center">
                              <button
                                class="btn btn-info p-0 rounded-circle"
                                @click="agregarImagen()"
                                data-bs-toggle="tooltip" data-bs-placement="top" title="Registrar nueva imagen en la lista" 
                                  ref="tooltipElements"
                                >
                                <i class="fas fa-plus-circle fs-2"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3 gy-3">
                        <div class="col-12">
                          <ul class="list-group">
                            <li
                              class="list-group-item"
                              v-for="(imagen, index) in imagesNuevas"
                              key="index"
                            >
                              <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                  {{ imagen.descripcion?imagen.descripcion:"Imagen "+index }}
                                </div>
                                <div class="col-4">
                                  <img
                                    :src="imagen.imagen"
                                    class="rounded img-fluid"
                                    :alt="index"
                                    height="100"
                                  />
                                </div>
                                <div class="col-2 d-flex align-items-center">
                                  <div
                                    class="d-flex justify-content-between w-100 py-0"
                                  >
                                    <button
                                      class="btn btn-danger rounded-circle p-0 mb-0"
                                      @click="eliminarImagenNueva(index)"
                                      data-bs-toggle="tooltip" data-bs-placement="bottom" title="Eliminar imagen de la lista" 
                                      ref="tooltipElements"
                                    >
                                      <i class="fas fa-minus-circle fs-2"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="col-12 text-center">
            <button type="button" class="btn btn-danger me-2" @click="volver()">
              <i class="fas fa-reply me-2"></i>Volver
            </button>
            <button
              type="button"
              class="btn ms-2"
              :class="editar ? 'btn-warning' : 'btn-primary'"
              @click="guardarActividad()"
            >
              {{ editar ? "Editar" : "Guardar"
              }}<i
                class="fas ms-2"
                :class="editar ? 'fa-pen-to-square' : 'fa-save'"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary-subtle">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Detalle imagen</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <label for="imagenModal"                      class="form-label font-weight-bolder text-sm">
                Cambiar de imagen
              </label>
              <input type="file" class="form-control" id="imagenModal"
              placeholder="..." @change="obtenerImageModal($event)"/>
            </div>
          </div>
          <div class="row gx-3 mt-3">
            <div class="col-4">
              <img :src="dato.url_imagenes" class="img-fluid rounded"
              :alt="indice" height="100"/>
            </div>
            <div class="col-8">
              <label for="descripcion"                      class="form-label font-weight-bolder text-sm">
                Descripción
              </label>
              <textarea class="form-control" id="descripcion"
              placeholder="Escriba..." v-model="dato.descripcion">
              </textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click ="editarImagenActividad()">Guardar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { urlBaseAsset } from "@/services/Http";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useActividadStore } from "@/stores/ActividadStore";
import { show, store,update } from "@/services/ActividadesService";
import { changeStatusImage, storeImageActividad, indexImagenes, deleteImage, showImage, updateImage } from "@/services/ImagenesService";
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Swal from "sweetalert2";

const errors = ref({});
const useStore = useActividadStore();
const router = useRouter();
const actividad = ref({});
const editar = ref(false);
const bannerEditado = ref(false);
const imagenEditada = ref(false);
const fechaActividad = ref();
const images = ref([]);
const imagesNuevas = ref([]);
const archivo = ref("");
const image = ref(null);
const banner = ref(null);
const urlImage = ref("");
const descripcion = ref("");
const dato = ref({});
const tooltipElements = ref([]);
let modal = null;
let instanciaModal = null;

//Cargar pantalla
onMounted(() => {
  //console.log(tooltipTriggerList);
  //console.log(tooltipList);
  if (useStore.id_actividad > 0) {
    editar.value = true;
    cargarDatos();
  }
  modal = document.getElementById('staticBackdrop');
  instanciaModal = new Modal(modal);
  tooltipElements.value.forEach(element => {
    new bootstrap.Tooltip(element);
  })
});

////Cargar datos de una actividad
const cargarDatos = async () => {
  try {
    const { data } = await show(useStore.id_actividad);
    actividad.value = data.datos;
    if (actividad.value.fecha != null) {
      fechaActividad.value = actividad.value.fecha;
    }
    images.value = actividad.value.imagenes;
    if(actividad.value.url_banner){
      let url = actividad.value.url_banner;
      actividad.value.url_banner = urlBaseAsset + 'img/img_actividad/banners/' + url;
    }
  } catch (error) {
    console.log(error);
  }
};

////Manjar el banner
const obtenerBanner = (event) => {
  if(editar.value && !bannerEditado.value
  ){
    bannerEditado.value=true;
  }
  actividad.value.banner = event.target.files[0];
  if (actividad.value.banner != null) {
    const reader = new FileReader();
    reader.onload = (e) => (actividad.value.url_banner = e.target.result);
    reader.readAsDataURL(actividad.value.banner);
  }
};

//Seccion de imagenes de apoyo
////Imagenes registradas
//////Eliminar un elemento de la lista de imagenes registradas
function eliminarImagen(index) {
  Swal.fire({
      title: "¿Esta seguro?",
      text: "Esta a punto de eliminar una imagen de apoyo de la actividad!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        images.value.splice(index, 1);
        Swal.fire({
          title: "Bien!",
          text: "La imagen fue eliminada de la actividad",
          icon: "success",
        });
      }
    });
}
////Imagenes nuevas
//////Obetener imagen para agragar a la lista
const obtenerImage = (event) => {
  image.value = event.target.files[0];
  if (image.value != null) {
    const reader = new FileReader();
    reader.onload = (e) => (urlImage.value = e.target.result);
    reader.readAsDataURL(image.value);
  }
};
//////Agregar a la lista de imagenes
const agregarImagen = () => {
  let objeto = {
    imagen: urlImage.value,
    url_imagenes: image.value,
    descripcion: descripcion.value,
  };
  urlImage.value = "";
  descripcion.value = "";
  imagesNuevas.value.push(objeto);
};
//////Eliminar un elemento de la lista de imagenes nuevas
function eliminarImagenNueva(index) {
  imagesNuevas.value.splice(index, 1);
}

//Modal para editar imagenes de apoyo
////Abrir modal
const editarImagen = async param => {
  try {
    const { data } = await showImage(param);
    dato.value = data.datos;
    let url = dato.value.url_imagenes;
    dato.value.url_imagenes = urlBaseAsset+ 'img/img_actividad/imagenes/' + url;
    instanciaModal.show();
  } catch (error) {
    console.log(error);
  }
};
////Cambiar la imagen de la imagen seleccionada
const obtenerImageModal = (event) => {
  if(!imagenEditada.value){
    imagenEditada.value = true;
  }
  let imagenAux = event.target.files[0]; 
  if(imagenAux != null){
    dato.value.imagen = imagenAux;
    const reader = new FileReader();
    reader.onload = (e) => (dato.value.url_imagenes = e.target.result);
    reader.readAsDataURL(dato.value.imagen);
  }
};

////Modificar o eliminar las imagenes existentes en la actividad
const modificarImagenesExistentes = async () => {
  try {
    const {data} = await indexImagenes(actividad.value.id);
   data.datos.forEach(elemento => {
   const indice = images.value.findIndex(imagenA => imagenA.id === elemento.id); 
   if(indice === -1){
    eliminarImagenActividad(elemento.id);
   }
   else{
    //verificar si se elimino de manera lógica una imagen
    if(elemento.is_deleted != images.value[indice].is_deleted){
      cambiarEstadoImagenActividad(elemento.id);
    }
   }
  }); 
  } catch (error) {
    console.log(error);
  }
};

//Boton para volver a la lista de actividades existentes
function volver() {
  router.push({ path: "/actividades" });
}
//Boton para guardar datos de una nueva actividad o actualizar los datos de la actividad seleccionada
const guardarActividad = async () => {
  try {
    let formulario = new FormData();
    if(actividad.value.titulo){
      formulario.append("titulo", actividad.value.titulo);
    }
    if(actividad.value.detalle){
      formulario.append("detalle", actividad.value.detalle);
    }
    if(fechaActividad.value){
      formulario.append("fecha", fechaActividad.value);
    }
    
    if(!editar.value){
      if(actividad.value.banner){
      formulario.append("banner", actividad.value.banner);
      }
      const { data } = await store(formulario);
      if (imagesNuevas.value.length > 0) {
        for (let i = 0; i < imagesNuevas.value.length; i++) {
          let imagenFormulario = new FormData();
          imagenFormulario.append("imagen", imagesNuevas.value[i].url_imagenes);
          imagenFormulario.append(
            "descripcion",
            imagesNuevas.value[i].descripcion
          );
          imagenFormulario.append("indice",i);
          guardarImagen(data.datos.id, imagenFormulario);
        }
      }
      Swal.fire({
            title: "Registro exitos!",
            text: data.mensaje,
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Nuevo",
            cancelButtonText: "Salir"
        }).then(async (result) => {
            if (result.isConfirmed) {
                //Registrar una nueva actividad
                window.location.reload(true);
            }
            else{
              //Volver a la lista de actividades
              volver();
            }
        });
    }
    else{      
      if(bannerEditado.value){
        formulario.append("banner", actividad.value.banner);
      }
      formulario.append("_method", "PUT");
      const { data } = await update(actividad.value.id,formulario);
      guardarImagenes();
      Swal.fire({
        title: "Bien!",
        text: data.mensaje,
        icon: "success"
      });
      volver();
    }
  } catch (error) {
    if(error.response.status == 422){
      errors.value = error.response.data.errors;
      Swal.fire({
      title: 'Error!',
      text: error.response.data.message,
      icon: 'error'
      })
    }
    else{
      console.log(error);
    }
  }
};
//Boton para guardar las modificación hechas a las imagenes de apoyo de la actividad
const guardarImagenes = () => {

  if (imagesNuevas.value.length > 0) {
    for (let i = 0; i < imagesNuevas.value.length; i++) {
      let imagenFormulario = new FormData();
      imagenFormulario.append("imagen", imagesNuevas.value[i].url_imagenes);
      imagenFormulario.append("descripcion", imagesNuevas.value[i].descripcion);
      imagenFormulario.append("indice",i);
      guardarImagen(actividad.value.id, imagenFormulario);
    }
  }
  modificarImagenesExistentes();
};
//Guardar una imagen nueva en una actividad
const guardarImagen = async (idActividad, formulario) => {
  try {
    const { data } = await storeImageActividad(idActividad, formulario);
  } catch (error) {
    console.log(error);
  }
};

//Cambia el estado actual de la imgen
const cambiarEstadoImagenActividad = async (idImagen) => {
  try {
    const { data } = await changeStatusImage(idImagen);
  } catch (error) {
    console.log(error);
  }
};
//Elimina una imagen de una actividad
const eliminarImagenActividad = async (idImagen) => {
  try {
    const { data } = await deleteImage(idImagen);
  } catch (error) {
    console.log(error);
  }
};
//Modifica los datos de una imagen registrada previamente seleccionada
const editarImagenActividad = async () => {
  try {
    let formulario = new FormData();
    formulario.append("descripcion", dato.value.descripcion);
    if(imagenEditada.value){
      formulario.append("imagen", dato.value.imagen);
    }
    formulario.append('_method',"PUT")
    const { data } = await updateImage(dato.value.id, formulario);
    cargarDatos();
    instanciaModal.hide();
  } catch (error) {
    console.log(error);
  }
};

//Limpiar los datos existentes
function limpiarDatos() {
  actividad.value = {};
  imagesNuevas.value = [];
};
</script>
