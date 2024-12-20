import { ref } from "vue";
import { defineStore } from "pinia";

export const testimoniosStore = defineStore('testimonio',() => {
    const id_testimonio = ref(0);
    return {id_testimonio};
})