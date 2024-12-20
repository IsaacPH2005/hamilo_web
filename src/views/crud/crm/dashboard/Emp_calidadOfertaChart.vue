<template>
    <div class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Match: Número de solicitudes de empleo.</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                Cantidad de solicitudes recibidas por cada oferta de empleo.
            </p>
            <div class="calidadOfertaDetalle">
                <Doughnut :data="data" :options="options" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { Doughnut } from 'vue-chartjs'
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

    // Registrar los componentes de Chart.js necesarios
    ChartJS.register(ArcElement, Tooltip, Legend)

    // Datos del gráfico
    const data = ref({
        labels: ['Postulación a Empleos', 'Oferta de Empleos'],
        datasets: [
            {
                data: [53, 62],
                backgroundColor: ['#d7fcb3', '#da804a'],
                label: 'Match de empleos'
            }
        ]
    });

    // Opciones del gráfico
    const options = ref({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    });
</script>

<style>
    .calidadOfertaDetalle {
        /* Limitar la altura máxima */
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>