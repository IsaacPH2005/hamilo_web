<template>
    <div class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Porcentajes solicitudes de empleo.</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                la grafica muestra el porcentaje de estudiantes en cada etapa.
            </p>
            <div class="calidadOfertaDetalle d-flex justify-content-center">
                <Pie :options="opcionesBarra" :data="datosTorta"></Pie>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement} from 'chart.js'
import { onMounted, ref } from 'vue';
import { getCantidadSolicitudesPorEstado } from '@/services/SolicitudesService';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const baseColors = [
    'blue', 'pink', 'orange', 'green', 'purple', 
    'red', 'cyan', 'yellow', 'brown', 'gray', 
    'violet', 'lime', 'teal', 'magenta', 'indigo'
];

const generateColors = (numData) => {
    const colors = [];
    for (let i = 0; i < numData; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
};


const opcionesBarra = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Porcentajes de los Estados de Solicitudes de los Egresados',
        },
    }
});
const datosTorta = ref({
    labels: [],
    datasets: [
        {
            label: 'Colores',
            backgroundColor: [],
            data: []
        }
    ]
});
const sumaSolicitudes = ref(0);
onMounted(()=>{
    fillDataToPie();
});
async function fillDataToPie() {
    let estados = [];
    let datosTortaAux = [];//para capturar los datos del backend
    let total = 0;
    try {
        const { data } = await getCantidadSolicitudesPorEstado();
        data.datos.forEach(element => {
            total = total + element.total_solicitudes;
        });
        sumaSolicitudes.value=total;
        data.datos.forEach(element => {
            let aux = element.total_solicitudes*(100/total);
            estados.push(element.estado+'->'+aux.toFixed(1)+'%');
            datosTortaAux.push(aux);
        });
        
        datosTorta.value = {
            labels: estados,
            datasets: [
                {
                    label: 'Colores',
                    backgroundColor: generateColors(datosTortaAux.length),
                    data: datosTortaAux
                }
            ]
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
    .colocacionesDetalle {
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>