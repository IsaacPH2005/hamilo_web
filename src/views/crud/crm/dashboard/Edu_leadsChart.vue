<template>
    <div class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Gráfico Leads</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                Segmentación de los leads: <br>
                <span> <b class="fw-bold ms-4">Hot Leads:</b>
                    Listos para firmar contrato.
                </span><br>
                <span> <b class="fw-bold ms-4">Warm Leads:</b>
                    Interesados pero No listos
                    para iniciar Batch de inmediato.</span><br>
                <span> <b class="fw-bold ms-4">Cold Leads:</b>
                    Poco o ningún interés actual.
                </span>
            </p>
            <div class="leadsDetalles">
                <Bar :data="datos" :options="opciones" />
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
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const datos = ref({
        labels: ['Hot Leads', 'Warm Leads', 'Cold Leads'],
        datasets: [
            {
                // label: 'label a eliminar u ocultar/NO MOSTRAR, no renderizar',
                data: [152, 358, 891],
                backgroundColor: ['#5ec7b0', '#FFCE56', '#87ceeb']
            }
        ]
    });

    const opciones = ref({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Oculta la leyenda general por completo
            }
        }
    });
</script>

<style>
    .leadsDetalles {
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>