<template>
    <div class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Detalle de Colocaciones</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                Más detalle sobre el <b>proceso</b> de colocaciones.
            </p>
            <div class="colocacionesDetalle">
                <Pie :options="opciones" :data="datos" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { Pie } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
    const datos = ref({
        labels: ['Postulación', 'Entrevista', 'Rechazado', 'Contratado'],
        datasets: [
            {
                data: [268, 206, 701, 125],
                backgroundColor: ['#FFCE56', '#f28b39', '#d03337', '#5ec7b0']
            }
        ]
    });
    const opciones = ref({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
        }
    });
</script>

<style>
    .colocacionesDetalle {
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>