<template>
    <div class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Satisfacción de las empresas</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                Promedio de puntuación a graduados trabajando. <br>
                Índice de calidad de los graduados.
            </p>
            <div class="satisfacionDetalle">
                <Bar :data="data" :options="options" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Bar } from 'vue-chartjs'
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from 'chart.js'

    ChartJS.register(
        CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
    )

    const data = ref({
        labels: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
        datasets: [
            {
                label: 'Tiempo medio en el sitio',
                backgroundColor: '#f87979',
                data: [17, 26, 44, 53, 35]

            }
        ]
    });
    const options = ref({
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
    .satisfacionDetalle {
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>
