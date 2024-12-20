import { ref } from "vue";
import { defineStore } from "pinia";

export const useActividadStore = defineStore('actividad',() => {
    const id_actividad = ref(0);
    return {id_actividad}
})