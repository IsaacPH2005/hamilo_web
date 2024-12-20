<template>
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
          <div class="row g-3">
            <div class="col-12 col-md-4">
              <div class="row gy-3">
                <div class="col-12">
                  <div class="form-floating">
                    <select
                      class="form-select" :class="errors.pagina?'border-danger':''"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      v-model="seccionPagina.pagina_id"
                      @change="registro()" :disabled="editar"
                    >
                      <option value="0" class="text-secondary" selected>
                        Seleccionar...
                      </option>
                      <option
                        v-for="pagina in paginas"
                        :key="pagina.id"
                        :value="pagina.id"
                      >
                        {{ pagina.pagina }}
                      </option>
                    </select>
                    <label for="floatingSelect">Página<span class="text-danger fst-italic"
                    >*</span></label>
                  </div>
                  <div><small v-if="errors.pagina" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>Este campo es
                  requerido</small></div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <select
                      class="form-select" :class="errors.seccion?'border-danger':''"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      v-model="seccionPagina.seccion_id"
                      @change="registro()" :disabled="editar"
                    >
                      <option value="0" class="text-secondary">
                        Seleccionar...
                      </option>
                      <option
                        v-for="seccion in secciones"
                        :key="seccion.id"
                        :value="seccion.id"
                      >
                        {{ seccion.seccion }}
                      </option>
                    </select>
                    <label for="floatingSelect">Sección<span class="text-danger fst-italic">*</span></label>
                  </div>
                  <div><small v-if="errors.seccion" class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>Este campo es
                    requerido</small></div>
                </div>
                <div class="col-12">
                  <div>
                    <label for="" class="form-label"
                      >Tipo de presentación de imágenes</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      v-model="seccionPagina.tipo_presentacion"
                      value="c"
                    />
                    <label class="form-check-label" for="inlineRadio1"
                      >Carrusel</label
                    >
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      v-model="seccionPagina.tipo_presentacion"
                      value="e"
                    />
                    <label class="form-check-label" for="inlineRadio2"
                      >Estático</label
                    >
                  </div>
                </div>
                <div class="col-12"><small class="text-secondary fst-italic">/*Al seleccionar la opción de carrusel se mostrará las imagenes de manera rotativa, y al seleccionar la opción estático, si tiene mas de una imagen registrada, mostrará de manera aleatoria las imagenes cada vez que cargue la página*/</small></div>
              </div>
            </div>
            <div class="col-12 col-md-8">
              <div class="card">
                <div class="card-header text-center py-2">
                  <h4 class="card-title">Imagenes<span class="text-danger fst-italic"
                    >*</span></h4>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div v-if="errors.imagenes" class="col-12"><small class="text-danger fst-italic text-xs"><i class="fas fa-times me-1"></i>Este campo es
                      requerido</small></div>
                    <div class="col-12">
                      <input
                        type="file"
                        class="form-control"
                        placeholder="..." accept=".jpeg, .png, .jpg"
                        @change="obtenerImagen($event)"
                      />
                    </div>
                    <div v-if="urlImagen != ''" class="col-12">
                      <div class="row g-3 mt-3">
                        <div class="col-4">
                          <img
                            :src="urlImagen"
                            class="img-fluid rounded"
                            height="100"
                          />
                        </div>
                        <div class="col-8">
                          <label
                            for="descripcion"
                            class="form-label font-weight-bolder text-sm"
                            >Detalle</label
                          >
                          <textarea
                            class="form-control"
                            id="descripcion"
                            placeholder="Escriba..."
                            v-model="detalle"
                          ></textarea>
                        </div>
                      </div>
                      <div class="row mt-2">
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
                      <ul class="list-group" :class="errors.imagenes?'border-danger':''">
                        <li v-if="seccionPagina.imagenes?.length>0" class="list-group-item text-danger">
                          <h6>Imagenes registradas</h6>
                        </li>
                        <li
                          class="list-group-item"
                          v-for="(imagen, index) in seccionPagina.imagenes"
                          :key="index"
                        >
                          <div class="row">
                            <div class="col-6 d-flex align-items-center">
                              {{
                                imagen.detalle
                                  ? imagen.detalle
                                  : "Imagen" + (index + 1)
                              }}
                            </div>
                            <div class="col-4">
                              <img
                                :src="
                                  urlBaseAsset +
                                  'img/img_pagina/' +
                                  imagen.url_imagen
                                "
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
                                  v-if="imagen.is_deleted"
                                  class="btn btn-danger rounded-circle p-0 mb-0"
                                  @click="eliminarImagen(index)"
                                  data-bs-toggle="tooltip" data-bs-placement="bottom" title="Eliminar imagen registrada" 
                                  ref="tooltipElements"
                                >
                                  <i class="fas fa-minus-circle fs-2"></i>
                                </button>
                                <button
                                  class="btn rounded-circle p-0 mb-0"
                                  :class="
                                    imagen.is_deleted
                                      ? 'btn-success'
                                      : 'btn-secondary'
                                  "
                                  @click="
                                    imagen.is_deleted = !imagen.is_deleted
                                  "
                                  data-bs-toggle="tooltip" data-bs-placement="bottom" :title="imagen.is_deleted?'Activar imagen registrada':'Desactivar imagen registrada'" 
                                  ref="tooltipElements"
                                >
                                  <i
                                    class="fas fs-2"
                                    :class="
                                      imagen.is_deleted
                                        ? 'fa-check-circle'
                                        : 'fa-times-circle'
                                    "
                                  ></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li v-if="imagenesNuevas.length>0" class="list-group-item text-danger">
                          <h6>Imagenes nuevas</h6>
                        </li>
                        <li
                          class="list-group-item"
                          v-for="(imagenN, index) in imagenesNuevas"
                          :key="index"
                        >
                          <div class="row">
                            <div class="col-6 d-flex align-items-center">
                              {{
                                imagenN.detalle
                                  ? imagenN.detalle
                                  : "Imagen" + (index + 1)
                              }}
                            </div>
                            <div class="col-4">
                              <img
                                :src="imagenN.imagen"
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
        <div class="card-footer">
          <div class="col-12 text-center">
            <button type="button" class="btn btn-danger me-2" @click="volver()">
              <i class="fas fa-reply me-2"></i>Volver
            </button>
            <button
              type="button"
              class="btn ms-2"
              :class="editar ? 'btn-warning' : 'btn-primary'"
              @click="guardar()"
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
</template>
<script setup>
import { urlBaseAsset } from "@/services/Http";
import { onMounted, ref } from "vue";
import { indexPaginas, storePagina } from "@/services/PaginasService";
import { indexSecciones, storeSeccion } from "@/services/SeccionesService";
import { useRouter } from "vue-router";
import {
  show,
  showPaginaSeccion,
  storePaginaSeccion,
  updatePaginaSeccion,
} from "@/services/PaginaSeccionService";
import {
  changeStatusImagen,
  deleteImagen,
  showImagenesPaginaSeccion,
  storeImagePaginaSeccion,
} from "@/services/PaginaImagenesService";
import Swal from "sweetalert2";
import { usePaginaSeccionStore } from "@/stores/PaginaSeccionStore";


const errors = ref({});
const router = useRouter();
const useStore = usePaginaSeccionStore();
const paginas = ref([]);
const secciones = ref([]);
const imagen = ref(null);
const detalle = ref("");
const urlImagen = ref("");
const imagenesNuevas = ref([]);
const existeRegistro = ref(false);
const editar = ref(false);
const seccionPagina = ref({
  id:0,
  pagina_id:0,
  seccion_id:0,
  tipo_presentacion:'e',
  imagenes: []
});

onMounted(() => {
  cargarPaginas();
  cargarSecciones();
  if(useStore.id_pagina_seccion > 0){
    editar.value = true;
    cargarDatos();
  }
});

const cargarDatos = async () => {
  try {
    const {data} = await show(useStore.id_pagina_seccion);
    seccionPagina.value = data.datos;
  } catch (error) {
    console.log(error);
  }
}

const cargarPaginas = async () => {
  const { data } = await indexPaginas();
  paginas.value = data.datos;
};

const cargarSecciones = async () => {
  const { data } = await indexSecciones();
  secciones.value = data.datos;
};

//Boton para volver a la lista de actividades existentes
function volver() {
  router.push({ path: "/pagina-imagenes" });
}

////Imagenes nuevas
//////Obetener imagen para agragar a la lista
const obtenerImagen = (event) => {
  imagen.value = event.target.files[0];
  if (imagen.value != null) {
    const reader = new FileReader();
    reader.onload = (e) => (urlImagen.value = e.target.result);
    reader.readAsDataURL(imagen.value);
  }
};
//////Agregar a la lista de imagenes
const agregarImagen = () => {
  let objeto = {
    imagen: urlImagen.value,
    url_imagen: imagen.value,
    detalle: detalle.value,
  };
  urlImagen.value = "";
  detalle.value = "";
  imagenesNuevas.value.push(objeto);
};
//////Eliminar un elemento de la lista de imagenes nuevas
function eliminarImagenNueva(index) {
  imagenesNuevas.value.splice(index, 1);
}

const eliminarImagen = (index) => {

  seccionPagina.value.imagenes.splice(index, 1);
};

//Verificar si existe ya el registro
const registro = async () => {
  try {
    if (seccionPagina.value.pagina_id > 0 && seccionPagina.value.seccion_id > 0) {
      let objeto = {
        pagina: seccionPagina.value.pagina_id,
        seccion: seccionPagina.value.seccion_id,
      };
      const { data } = await showPaginaSeccion(objeto);
      if(data.datos != null){
        seccionPagina.value = data.datos;
        //imagenes.value = data.datos.imagenes;
        if (seccionPagina.value.imagenes.length > 0) {
          existeRegistro.value = true;
        } else {
          existeRegistro.value = false;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//Guardar o modificar la pagina y seccion
const guardar = () => {
  try {
    if (seccionPagina.value.imagenes.length > 0 || imagenesNuevas.value.length) {
      if(seccionPagina.value.pagina_id >0 && seccionPagina.value.seccion_id > 0){
       if(!editar.value){
        console.log(existeRegistro.value);
          if (!existeRegistro.value) {
            guardarPaginaSeccion();
          }
          else{
            //algo falta
            useStore.id_pagina_seccion = seccionPagina.value.id;
            editarPaginaSeccion();
          }
        }
        else{
            editarPaginaSeccion();
        }
      }
      else{
        Swal.fire({
          title: "Error de registro!",
          text: "Se debe seleccionar una página y una sección para poder registrar una nueva imagen para una sección en una página.",
          icon: "error",
        });
      }
    }
    else {
      errors.value.imagenes = "Es necesario tener por lo menos una imagen registrada";
      Swal.fire({
        title: "Error de registro!",
        text: errors.value.imagenes,
        icon: "error",
      });
    } 
  } catch (error) {
    console.log(error);  
  }
};

//Guardara una pagina y sección seleccionada
const guardarPaginaSeccion = async () => {
  try {
    let objeto = {
      pagina: seccionPagina.value.pagina_id,
      seccion: seccionPagina.value.seccion_id,
      tipo_presentacion: seccionPagina.value.tipo_presentacion,
    };
    const { data } = await storePaginaSeccion(objeto);
    seccionPagina.value = data.datos;
    if(imagenesNuevas.value.length > 0){
      registrarImagenes();
    }
    Swal.fire({
    title: "Bien!",
    text: "Imagenes registradas en la página y sección seleccionadas",
    icon: "success",
    });
    volver();

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

const editarPaginaSeccion = async () => {
  try {
    let objeto = {
      tipo_presentacion:seccionPagina.value.tipo_presentacion 
    }
    const { data } = await updatePaginaSeccion(useStore.id_pagina_seccion,objeto);
    //Editar imagenes existentes        
    modificarImagenesExistentes();
    //Guarddar imagenes nuevas
    if(imagenesNuevas.value.length > 0){
      registrarImagenes();
    }
    Swal.fire({
    title: "Bien!",
    text: "Imagenes editadas en la página y sección seleccionadas",
    icon: "success",
    });
    volver();
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

const registrarImagenes = () => {
  for (let i = 0; i < imagenesNuevas.value.length; i++) {
    let imagenFormulario = new FormData();
    imagenFormulario.append("imagen", imagenesNuevas.value[i].url_imagen);
    imagenFormulario.append("detalle", imagenesNuevas.value[i].detalle);
    imagenFormulario.append("indice", i);
    guardarImagen(seccionPagina.value.id, imagenFormulario);
  }
}

//Guardar una imagen nueva en una actividad
const guardarImagen = async (idPaginaSeccion, formulario) => {
  try {
    const { data } = await storeImagePaginaSeccion(idPaginaSeccion, formulario);
  } catch (error) {
    console.log(error);
  }
};

////Modificar o eliminar las imagenes existentes en la actividad
const modificarImagenesExistentes = async () => {
  try {
    const { data } = await showImagenesPaginaSeccion(seccionPagina.value.id);
    data.datos.forEach(elemento => {
      const indice = seccionPagina.value.imagenes.findIndex(imagenPS => imagenPS.id === elemento.id);
      if (indice === -1) {
        eliminarImagenPaginaSeccion(elemento.id);
      } else {
        //verificar si se elimino de manera lógica una imagen
        if (elemento.is_deleted != seccionPagina.value.imagenes[indice].is_deleted) {
          cambiarEstadoImagenPaginaSeccion(elemento.id);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
//Elimina una imagen de una actividad
const eliminarImagenPaginaSeccion = async (idImagen) => {
  try {
    const { data } = await deleteImagen(idImagen);
  } catch (error) {
    console.log(error);
  }
};

//Cambia el estado actual de la imgen
const cambiarEstadoImagenPaginaSeccion = async (idImagen) => {
  try {
    const { data } = await changeStatusImagen(idImagen);
  } catch (error) {
    console.log(error);
  }
};
</script>
