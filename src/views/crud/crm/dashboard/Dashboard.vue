<template>
    <main class="card border border-0 shadow-lg">
        <header class="row">
            <div class="col-12">
                <article class="card-header">
                    <h5 class="card-title font-weight-bolder fs-3 m-0 mt-3">
                        <i class="fas fa-tachometer-alt"></i>
                        Dashboard
                    </h5>
                </article>
            </div>
        </header>
        <section class="row">
            <div class="col-12">
                <div class="card-body">
                    <!-- * * * * * * * *        SECCIÓN DE CARDS        * * * * * * * * *  -->
                    <section id="metricas" class="row">
                        <div class="col-12 col-lg-4 mb-4">
                            <div class="card bg-hamilo">
                                <h5 class="card-title mt-3 ms-3">KPIs - Educación</h5>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('inscritosDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': inscritos_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 p-2 text-center">{{ cantidadEstudiantes }}</p>
                                        <h6 class="m-0 p-0 text-center">Estudiantes inscritos</h6>
                                    </div>
                                    <div class="card-footer m-0 p-0 text-center">
                                        <small class="text-secondary" v-if="inscritos_toggle == false">(Click para más
                                            detalles)</small>
                                        <small v-else>
                                            <i class="fas fa-arrow-down"></i> Desliza para ver la(s) gráfica(s).
                                        </small>
                                    </div>
                                </article>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('conversionesDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': conversiones_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 p-2 text-center">{{ tasaConversion.toFixed(1) }} %</p>
                                        <h6 class="m-0 p-0 text-center">Tasa de Conversión</h6>
                                    </div>
                                    <div class="card-footer m-0 p-0 text-center">
                                        <!-- <small>Total: (<span class="text-info">estudiantes</span> / visitantes) * 100</small> -->
                                        <small class="text-secondary" v-if="conversiones_toggle == false">
                                            (Click para más detalles)</small>
                                        <small v-else>
                                            <i class="fas fa-arrow-down"></i> Desliza para ver la(s) gráfica(s).
                                        </small>
                                    </div>
                                </article>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('leadsDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': leads_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 px-4 pt-2 d-flex justify-content-between">
                                            <span>152</span>
                                            <span></span>
                                            <span>358</span>
                                            <span></span>
                                            <span>891</span>
                                        </p>
                                        <h6 class="m-0 px-4 d-flex justify-content-between">
                                            <span class="">Hot Leads</span>
                                            <span class="">Warm Leads</span>
                                            <span class="">Cold Leads</span>
                                        </h6>
                                    </div>
                                    <p class="card-footer m-0 p-0 text-center">
                                        <small class="text-secondary">
                                            Segmentación de Leads según fase de postulación.
                                        </small>
                                    </p>
                                </article>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4 mb-4">
                            <div class="card bg-hamilo">
                                <h5 class="card-title mt-3 ms-3">KPIs - Empleabilidad</h5>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('colocacionesDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': colocaciones_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 p-2 text-center">{{ nroSolicitudes }}</p>
                                        <h6 class="m-0 p-0 text-center">Solicitudes</h6>
                                        <div class="card-footer m-0 p-0 text-center">
                                            <small class="text-secondary" v-if="colocaciones_toggle == false">(Click
                                                para detallar etapas)
                                                <!-- Total users-rol: ocupados/trabajando -->
                                            </small>
                                            <small v-else>
                                                <i class="fas fa-arrow-down"></i> Desliza para ver la(s) gráfica(s).
                                            </small>
                                        </div>
                                    </div>
                                </article>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('satisfacionDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': satisfacion_toggle == true }">
                                    <div class="card-body m-2 p-0">
                                        <p class="fs-5 my-2 p-0 text-center">
                                            <i class="text-warning fa-solid fa-star"></i>
                                            <i class="text-warning fa-solid fa-star"></i>
                                            <i class="text-warning fa-solid fa-star"></i>
                                            <i class="text-warning fa-solid fa-star-half-stroke"></i>
                                            <i class="text-warning fa-regular fa-star"></i>
                                            (3.5)
                                        </p>
                                        <h6 class="m-0 p-0 text-center">Satisfacción de las Empresas</h6>
                                    </div>
                                    <div class="card-footer m-0 p-0 text-center text-secondary">
                                        <!-- Promedio: puntuación user-egresado (por user-Empresa) / Total puntuaciones -->
                                        <small>Promedio de puntuación a graduados trabajando.</small><br>
                                        <small class="text-warning">(Preparado para una siguiente fase de
                                            desarrollo)</small>
                                    </div>
                                </article>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('calidadOfertaDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': calidadOferta_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 p-2 text-center">23.3</p>
                                        <h6 class="m-0 p-0 text-center">Postulaciones por Empleo Ofertado</h6>
                                    </div>
                                    <div class="card-footer m-0 p-0 text-center text-warning">
                                        <small>
                                            (Preparado para una siguiente fase de desarrollo)
                                            <!-- Total postulaciones a empleos / total ofertas laborales -->
                                        </small>
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4 mb-4">
                            <div class="card bg-hamilo">
                                <h5 class="card-title mt-3 ms-3">KPIs - Rendimiento
                                    <span class="text-lowercase">de la</span> Web
                                </h5>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('rebotesDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': rebotes_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 p-2 text-center">30 %</p>
                                        <h6 class="m-0 p-0 text-center">Tasa de Rebote</h6>
                                    </div>
                                    <div class="card-footer m-0 p-0 text-center text-warning"><small>
                                            <!-- =abandonos tras 1 página / Total visitantes -->
                                            (Preparado para una siguiente fase de desarrollo)
                                        </small></div>
                                </article>
                                <article class="card shadow-lg m-2 cursor-pointer kpi-card"
                                    v-on:click="showChart('tiempoDetalle')"
                                    v-bind:class="{ 'bg-warning-subtle': tiempo_toggle == true }">
                                    <div class="card-body m-0 p-0">
                                        <p class="display-6 m-0 p-2 text-center">7.21 min</p>
                                        <h6 class="m-0 p-0 text-center">Tiempo en el sitio</h6>
                                    </div>
                                    <div class="card-footer m-0 p-0 text-center text-warning">
                                        <small>
                                            <!-- promedio: duración visitas / total visitantes -->
                                            (Preparado para una siguiente fase de desarrollo)
                                        </small>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                    <!-- * * * * * * * *        SECCIÓN CHARTS        * * * * * * * * *  -->
                    <section id="graficas" class="row d-flex justify-content-around">
                        <article v-if="inscritos_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Edu_inscritosChart />
                        </article>
                        <article v-if="conversiones_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Edu_conversionChart />
                        </article>
                        <article v-if="leads_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Edu_leadsChart />
                        </article>
                        <article v-if="colocaciones_toggle == true" class="col-12 col-lg-6 mb-4">
                            <!--<Emp_colocacionesChart></Emp_colocacionesChart>-->
                            <PieChart></PieChart>
                        </article>
                        <article v-if="satisfacion_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Emp_satisfacionChart />
                        </article>
                        <article v-if="calidadOferta_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Emp_calidadOfertaChart />
                        </article>
                        <article v-if="rebotes_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Web_rebotesChart />
                        </article>
                        <article v-if="tiempo_toggle == true" class="col-12 col-lg-6 mb-4">
                            <Web_tiempoChart />
                        </article>
                    </section>
                </div>
            </div>
        </section>
        <footer class="row">
            <div class="col-12">
                <section></section>
            </div>
        </footer>
    </main>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    //Chart KPIs Educación
    import Edu_inscritosChart from './Edu_inscritosChart.vue';
    import Edu_conversionChart from './Edu_conversionChart.vue';
    import Edu_leadsChart from './Edu_leadsChart.vue';
    //Chart KPIs Colocación laboral
    import Emp_colocacionesChart from './Emp_colocacionesChart.vue';
    import Emp_satisfacionChart from './Emp_satisfacionChart.vue';
    import Emp_calidadOfertaChart from './Emp_calidadOfertaChart.vue';
    //Chart KPIs Rendimiento del sitio Web
    import Web_rebotesChart from './Web_rebotesChart.vue';
    import Web_tiempoChart from './Web_tiempoChart.vue';
    import PieChart from './PieChart.vue';
    // DATA:
    import { getCantidadEstudiantes, getNroSolicitudes } from '@/services/DashboardService';
    import { totalPostulantesService, totalEstudiantesService } from '@/services/DashboardService';

    // Toggles Educación
    const inscritos_toggle = ref(false);
    const conversiones_toggle = ref(false);
    const leads_toggle = ref(false);
    // Toggles Colocación laboral
    const colocaciones_toggle = ref(false);
    const satisfacion_toggle = ref(false);
    const calidadOferta_toggle = ref(false);
    // Toggles Rendimiento del sitio Web
    const rebotes_toggle = ref(false);
    const tiempo_toggle = ref(false);

    const showChart = (kpi) => {
        kpi == 'inscritosDetalle' ? inscritos_toggle.value = !inscritos_toggle.value : null;
        kpi == 'conversionesDetalle' ? conversiones_toggle.value = !conversiones_toggle.value : null;
        kpi == 'leadsDetalle' ? leads_toggle.value = !leads_toggle.value : null;
        kpi == 'colocacionesDetalle' ? colocaciones_toggle.value = !colocaciones_toggle.value : null;
        kpi == 'satisfacionDetalle' ? satisfacion_toggle.value = !satisfacion_toggle.value : null;
        kpi == 'calidadOfertaDetalle' ? calidadOferta_toggle.value = !calidadOferta_toggle.value : null;
        kpi == 'rebotesDetalle' ? rebotes_toggle.value = !rebotes_toggle.value : null;
        kpi == 'tiempoDetalle' ? tiempo_toggle.value = !tiempo_toggle.value : null;
    };

    const error = ref();
    const loading = ref();

    // KPI's Educación: Tasa de Conversión
    const totalPostulantes = ref(0);
    const totalEstudiantes = ref(0);
    const tasaConversion = ref(0);
    const getDataConversion = async () => {
        error.value = null;
        loading.value = true;
        try {
            let responsePostulantes = ref();
            let responseEstudiantes = ref();
            responsePostulantes = await totalPostulantesService();
            totalPostulantes.value = responsePostulantes.data.total_postulantes;
            // console.log(totalPostulantes.value);
            responseEstudiantes = await totalEstudiantesService();
            totalEstudiantes.value = responseEstudiantes.data.total_estudiantes;
            // console.log(totalEstudiantes.value);
            tasaConversion.value = (totalEstudiantes.value / totalPostulantes.value) * 100;
        } catch (e) {
            error.value = e.response ? e.response.data : e.mensaje;
        } finally {
            loading.value = false;
        }
    };

    //Kpi-empleabilidad: Solicitudes
    const cantidadEstudiantes = ref(0);
    const nroSolicitudes = ref(0);
    async function getNroEstudiantes() {
        try {
            const { data } = await getCantidadEstudiantes();
            cantidadEstudiantes.value = data.total_estudiantes;
        } catch (error) {
            console.log(error);
        }
    }
    async function getNroSoli() {
        try {
            const { data } = await getNroSolicitudes();
            nroSolicitudes.value = data.nroSolicitudes;
        } catch (error) {
            console.log(error);
        }
    }
    onMounted(() => {
        //KPIs Educación: Tasa de Conversión
        getDataConversion();

        //KPIs Empleabilidad: Solicitudes
        getNroEstudiantes();
        getNroSoli();

        //KPIs Rendimeinto Web
    });
</script>

<style>
    .bg-hamilo {
        background-color: #FFD43B;
    }

    .kpi-card {
        transition: transform 0.2s ease-in-out;
    }

    .kpi-card:hover {
        transform: scale(0.944);
        background-color: #fef3d0;
    }
</style>