import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('perfilUsuario', () => {
    const usuario = ref(localStorage.getItem('usuario') != null ? JSON.parse(localStorage.getItem('usuario')):{});
    const obtenerPerfil = ()=>{
        usuario.value = JSON.parse(localStorage.getItem('usuario'));
    }
    return{
        usuario,
        obtenerPerfil
    }
})