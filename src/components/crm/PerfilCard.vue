<template>
    <div class="card card-profile">
        <img src="/public/plantilla_argon/assets/img/bg-profile.jpg" alt="Image placeholder" class="card-img-top">
        <div class="row justify-content-center">
            <div class="col-4 col-lg-4 order-lg-2">
                <div class="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
                    <a href="javascript">
                        <img :src="datos_generales.foto_perfil != null ? urlBaseAsset+'img/img_users/'+datos_generales.foto_perfil : 'https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg'"
                            class="rounded-circle img-fluid border border-2 border-white">
                    </a>
                </div>
            </div>
        </div>
        <div class="card-body pt-0">
            <div class="text-center mt-4">
                <h5 v-if="datos_generales.nombre || datos_generales.apellido">
                    {{ (datos_generales.nombre || '') + ' ' + (datos_generales.apellido || '') }} 
                </h5>
                <div class="h6 font-weight-300" v-if="datos_generales.ciudad || datos_generales.pais">
                    {{ (datos_generales.ciudad || '') + ', ' + (datos_generales.pais || '') }}
                </div>
                <div class="h6 mt-4">
                    {{ datos_generales.especialidad }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, defineProps } from 'vue';
    import { mostrarUsuario } from "@/services/UserService.js";
    import { urlBaseAsset} from '@/services/Http.js';
    const user = ref({});
    const datos_generales = ref({});
    const props = defineProps({
        idUsuario: {
            type: Number,
            required: true
        }
    });
    const mostrarDatosUsuario = async () => {
        try {
            const { data } = await mostrarUsuario(props.idUsuario);
            user.value = data.datos;
            datos_generales.value = data.datos.datos_generales;
        } catch (error) {
            console.log(error);
        }
    }
    onMounted(() => {
        mostrarDatosUsuario();
    });
    defineExpose({
        mostrarDatosUsuario,
    });
</script>