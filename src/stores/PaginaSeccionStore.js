import { ref } from "vue";
import { defineStore } from "pinia";

export const usePaginaSeccionStore = defineStore('pagina_seccion',() => {
    const id_pagina_seccion = ref(0);
    return {id_pagina_seccion}
})