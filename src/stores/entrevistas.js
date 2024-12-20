import { ref } from 'vue'
import { defineStore } from 'pinia'
import Swal from "sweetalert2";
export const useEntrevistaStore = defineStore('entrevistaMovimiento', () => {
  const entrevistapostulante = ref([])
  const entrevistaadmin = ref([])
  const mostrarpostulante = param => {

    let objeto = {
      id: param.id,
      apellido: param.users.datos_generales.apellido,
      nombre: param.users.datos_generales.nombre,
      ci: param.users.datos_generales.ci,
      email: param.users.email,
      pais: param.users.datos_generales.pais,
      ciudad: param.users.datos_generales.ciudad,
      telefono: param.users.datos_generales.telefono,
      direccion: param.users.datos_generales.direccion,
      foto_perfil: param.users.datos_generales.foto_perfil,
    };
    entrevistapostulante.value.splice(0, entrevistapostulante.value.length, objeto);
  }
  const mostraradmin = param => {
    let objeto = {
      id: param.id,
      apellido: param.datos_generales.apellido,
      nombre: param.datos_generales.nombre,
    };
    const existe = entrevistaadmin.value.some(item => item.id === objeto.id);
    if (!existe) {
      entrevistaadmin.value.push(objeto);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya seleccionaste este entrevistador!",
      });
    }
  }
  const eliminarAdmin = id => {
    const index = entrevistaadmin.value.findIndex(item => item.id === id);
    if (index !== -1) {
      entrevistaadmin.value.splice(index, 1);
    }
  };


  return { entrevistapostulante, entrevistaadmin, mostrarpostulante, mostraradmin, eliminarAdmin }
})
