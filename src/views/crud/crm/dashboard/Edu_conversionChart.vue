<template>
    <section class="card shadow-lg">
        <header class="card-header">
            <h5 class="card-title fs-3">Tasa de Conversiones</h5>
        </header>
        <div class="card-body p-0">
            <p class="alert alert-light m-3" role="alert">
                Porcentaje de postulantes que completan proceso de inscripción.
            </p>
            <div class="row">
                <div class="col-12 offset-lg-3 col-lg-6 px-5">
                    <label for="batch-select">Selecciona un batch:</label>
                    <select v-model="batchSelecionado" class="form-select" id="batch-select" name="batch-select"
                        v-on:change="actualizarDatosChart()">
                        <option value="todos" v-on:change="getData()">Todos</option>
                        <option v-for="(batch, key) in batches" :key="key" :value="batch.batch_id"
                            v-on:change="getData()">
                            {{ batch.batch_version }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="conversionesDetalle">
                <Pie :data="datos" :options="opciones" />
            </div>
        </div>
        <footer class="card-footer">
            <div class="text-end">
                <button type="button" class="btn btn-sm my-0 mx-5 btn-secondary" @click="exportacionExcel()">Exportar
                    datos</button>
            </div>
        </footer>
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { Pie } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
    import { totalPostulantesService, totalEstudiantesService, obtenerBatchesService, postulantesPorBatchService, estudiantesPorBatchService } from '@/services/DashboardService';
    import { ExportExcelPostulaciones } from '@/services/PruebasService';

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

    const error = ref(null);
    const loading = ref(true);

    const totalPostulantes = ref(0);
    const totalEstudiantes = ref(0);
    const batches = ref([]);
    const postulantesPorBatch = ref([]);
    const estudiantesPorBatch = ref([]);
    const batchSelecionado = ref('todos'); //= ref(1);
    const datos = ref({
        labels: ['est', 'pos'],
        datasets: [
            {
                data: [0, 0],
                backgroundColor: ['#a3ffe0', '#fc9886']
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
            // title: {
            //     display: true,
            //     text: 'Detalle de Colocaciones'
            // }
        },
    });

    const getData = async () => {
        error.value = null;
        loading.value = true;
        try {
            let responsePostulantes = ref();
            let responseEstudiantes = ref();
            let responseBatches = ref();
            let responsePostulantesPorBatch = ref();
            let responseEstudiantesPorBatch = ref();

            responsePostulantes = await totalPostulantesService();
            totalPostulantes.value = responsePostulantes.data.total_postulantes;
            // console.log(totalPostulantes.value);

            responseEstudiantes = await totalEstudiantesService();
            totalEstudiantes.value = responseEstudiantes.data.total_estudiantes;
            // console.log(totalEstudiantes.value);

            responseBatches = await obtenerBatchesService();
            batches.value = responseBatches.data.batches;
            // console.log(responseBatches.data.batches);

            responsePostulantesPorBatch = await postulantesPorBatchService();
            postulantesPorBatch.value = responsePostulantesPorBatch.data.postulantesPorBatch;
            // console.log(responsePostulantesPorBatch.data.postulantesPorBatch);

            responseEstudiantesPorBatch = await estudiantesPorBatchService();
            estudiantesPorBatch.value = responseEstudiantesPorBatch.data.estudiantesPorBatch;
            // console.log(responseEstudiantesPorBatch.data.estudiantesPorBatch);

            actualizarDatosChart();
        } catch (e) {
            error.value = e.response ? e.response.data : e.mensaje;
            // console.log(e);
        } finally {
            loading.value = false;
        }
    };

    const actualizarDatosChart = () => {
        if (batchSelecionado.value == 'todos') {
            datos.value = {
                labels: [`(${totalEstudiantes.value} = ${(totalEstudiantes.value / totalPostulantes.value * 100).toFixed(1)}%) Estudiantes Activos`,
                `(${(totalPostulantes.value - totalEstudiantes.value)} = ${(((totalPostulantes.value - totalEstudiantes.value) / totalPostulantes.value) * 100).toFixed(1)}%) Postulantes`],
                datasets: [
                    {
                        data: [totalEstudiantes.value, (totalPostulantes.value - totalEstudiantes.value)],
                        backgroundColor: ['#a3ffe0', '#fc9886']
                    }
                ]
            }
        } else {
            let postulantes = 0;
            let estudiantes = 0;
            postulantes = postulantesPorBatch.value[batchSelecionado.value];
            estudiantes = estudiantesPorBatch.value[batchSelecionado.value];
            if (postulantes == undefined) {
                postulantes = 0;
            }
            if (estudiantes == undefined) {
                estudiantes = 0;
            }
            datos.value = {
                labels: [
                    `(${estudiantes} = ${(estudiantes / postulantes * 100).toFixed(1)}%) Estudiantes Activos`,
                    `(${(postulantes - estudiantes)} = ${(((postulantes - estudiantes) / postulantes) * 100).toFixed(1)}%) Postulantes`],
                datasets: [
                    {
                        data: [estudiantes, (postulantes - estudiantes)],
                        backgroundColor: ['#a3ffe0', '#fc9886']
                    }
                ]
            }
        }
        // console.log(batchSelecionado.value);
        // console.log(typeof (batchSelecionado.value));
    }
    const exportacionExcel = async () => {
        try {
            // Llamada a la API para obtener los datos del archivo Excel
            if (batchSelecionado.value == 'todos') {
                batchSelecionado.value = 0;
            }
            const response = await ExportExcelPostulaciones(batchSelecionado.value);
            // Crear un enlace para descargar el archivo
            const link = document.createElement('a');
            const urlBlob = URL.createObjectURL(response.data);
            link.href = urlBlob;
            link.download = 'file.xlsx'; // Cambia el nombre del archivo según sea necesario
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // Libera el objeto URL creado
            URL.revokeObjectURL(urlBlob);
        } catch (error) {
            console.log(error);
        }
        if (batchSelecionado.value == 0) {
            batchSelecionado.value = 'todos';
        }
    };

    onMounted(() => {
        getData();
    });
</script>

<style>
    .conversionesDetalle {
        max-width: 100%;
        height: 350px;
        margin: 13px;
    }
</style>