import { defineStore } from "pinia";
import Swal from "sweetalert2";
import { ref } from "vue";
export const useEspecialidadStore = defineStore('especialidad', () => {
    const cardModulos = ref([]);
    const validacionModulo = ref(new Set());
    const addModulo = (param) => {
        if (!validacionModulo.value[param.id]) {
            let objeto = {
                id: param.id,
                nombre: param.nombre,
                tecnologias: []
            }
            console.log(objeto);
            cardModulos.value.push(objeto);
            validacionModulo.value[param.id] = true;
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ya seleccionaste este modulo!",
              });
        }
    }
    const addTecnologias = (param, indice) => {
        const modulo = cardModulos.value[indice];
        const tecnologiaExists = modulo.tecnologias.find((tech) => tech.id === param.id);
        if (!tecnologiaExists) {
            let objeto = {
                id: param.id,
                nombre: param.nombre
            }
            modulo.tecnologias.push(objeto);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ya agregaste esta tecnologia!",
              });
        }
    }
    const deleteTecnologias = (param, indice) => {
        const index = cardModulos.value[indice].tecnologias.findIndex((tech) => tech.id === param.id);
        if (index != -1) {
            cardModulos.value[indice].tecnologias.splice(index, 1);
        }
    }
    const deleteModulo = (param) => {
        cardModulos.value.splice(param, 1);
    }
    return {
        cardModulos,
        addModulo,
        addTecnologias,
        deleteTecnologias,
        deleteModulo
    }
});