<template>
    <div class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Tasa de rebote</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                Porcentaje de visitantes que abandonan después de ver solo una página de la web.
            </p>
            <div class="rebotesDetalle">
                <Line :data="data" :options="options" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { Line } from 'vue-chartjs'
    import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'

    // Registrar componentes de Chart.js
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    // Definir los datos del gráfico
    const data = ref({
        labels: ['abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre'],
        datasets: [
            {
                label: 'Tiempo medio en el sitio',
                backgroundColor: '#f87979',
                data: [58, 59, 38, 28, 36, 27, 32]
                // data: [6.5, 5.9, 8.0, 8.1, 6.6, 7.5, 10.0]

            }
        ]
    })

    // Definir las opciones del gráfico
    const options = ref({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            // title: {
            //     display: false,
            //     text: 'Promedio duración de visitas'
            // }
        }
    })
</script>

<style>
    .rebotesDetalle {
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>
