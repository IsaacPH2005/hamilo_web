<template>
    <div class="card">
        <div class="card-body">
            <div class="row gy-3">
                <div class="col-12 text-end m-0">
                    <button type="button" class="btn btn-danger" @click="volver()">
                        <i  class="fas fa-reply me-2"></i>
                        Volver
                    </button>
                </div>
                <div class="col-12">
                    <div class='demo-app-sidebar-section'>
                        <label>
                            <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
                            toggle weekends
                        </label>
                    </div>
                </div>
                <div class="col-12">
                    <FullCalendar :options="calendarOptions" />
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row gy-4">
                        <div class="col-12 text-center">
                            <img :src="dato.postulaciones?.users.datos_generales.foto_perfil ? urlBaseAsset+'img/img_users/'+ dato.postulaciones?.users.datos_generales.foto_perfil : 'https://th.bing.com/th/id/OIP.rIsI3TvodysyTi_2VOGK3gHaHa?rs=1&pid=ImgDetMain'" class="rounded-circle" width="150px" height="150px" alt=""><br>
                        </div>
                        <div class="col-12">
                            <h5 class="card-title text-center">{{ dato.postulaciones?.users.datos_generales.nombre }} {{ dato.postulaciones?.users.datos_generales.apellido ? dato.postulaciones?.users.datos_generales.apellido : ''}}</h5>
                            <ul class="list-group rounded-3">
                                <li class="list-group-item fs-xxs"><span class="font-weight-bolder">Tipo entrevista:</span> {{ dato.tipo }}</li>
                                <li class="list-group-item fs-xxs"><span class="font-weight-bolder">Fecha:</span> {{ dato.fecha }}</li>
                                <li class="list-group-item fs-xxs"><span class="font-weight-bolder">Hora:</span> {{ dato.hora_inicio }} - {{ dato.hora_fin }}</li>
                                <li class="list-group-item fs-xxs"><span class="font-weight-bolder">Enlace:</span> <a :href="dato.enlace" target="_blank">Click aqui</a></li>
                            </ul>
                        </div>
                        <div class="col-12 text-end">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { index, view } from '@/services/CalendarioService';
import { Modal } from 'bootstrap';
import { urlBaseAsset } from "@/services/Http";
import { useRouter } from 'vue-router';
export default defineComponent({
    components: {
        FullCalendar,
    },
    setup() {
        const router = useRouter();
        const modal = ref(null);
        const instanciamodal = ref(null);
        const dato = ref({});
        onMounted(() => {
            listar();
            modal.value = document.getElementById('exampleModal');
            instanciamodal.value = new Modal(modal.value);
        })
        /*const events = ref([
            { id: 1, title: 'Evento 1', start: '2024-09-26T10:00:00', end: '2024-09-26T12:00:00' },
            { id: 2, title: 'Evento 2', start: '2024-09-27T14:00:00', end: '2024-09-27T16:00:00' },
        ])*/
        const events = ref([
        ]);
        const listar = async () => {
            try {
                const { data } = await index();
                events.value.push(...data.datos);
            } catch (error) {
                console.log(error);
            }
        }
        const handleEventClick = async(a) => {
            /*if (confirm(`Are you sure you want to delete the event '${a.event.id}'`)) {
                a.event.remove()
            }*/
           try {
                const { data } = await view(a.event.id);
                dato.value = data.datos;                
                instanciamodal.value.show();
           } catch (error) {
                console.log(error);                
           }
        }
        const calendarOptions = ref({
            plugins: [
                dayGridPlugin,
                timeGridPlugin
            ],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            initialView: 'dayGridMonth',
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            events: events.value,
            eventClick: handleEventClick,
        });

        const handleWeekendsToggle = () => {
            calendarOptions.value.weekends = !calendarOptions.value.weekends;
        };
        const volver = () => {
            router.push({ path: `/entrevistas` })
        }
        return {
            calendarOptions,
            handleWeekendsToggle,
            dato,
            urlBaseAsset,
            volver,
        };
    },
});
</script>

<style></style>
