th<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Postulaciones</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        <div class="col-12 col-md-7 row d-flex align-items-center "
                            :class="permisoStore.permisosUser.some(p => p === 'postulacion crear') ? 'col-md-7' : permisoStore.permisosUser.some(p => p === 'postulacion editar') ? 'col-md-12' : ''">
                            <div class="col-12">
                                <input type="text" class="form-control" v-model="searchPersona"
                                    placeholder="Nombre, Apellido, identificacion..."
                                    v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')"
                                    @change="filtrarPersona()">
                            </div> <br>
                            <div class="row col-12 d-flex justify-content-center  py-3">
                                <div class="form-check form-check-inline col-6 col-md-2 ">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="radioTodos" @change="fasescambio('')" checked>
                                    <label class="form-check-label" for="radioTodos">Todos</label>
                                </div>
                                <div class="form-check form-check-inline col-6 col-md-2">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="radioPrueba" @change="fasescambio('postulacion')">
                                    <label class="form-check-label" for="radioPrueba">Postulación</label>
                                </div>
                                <div class="form-check form-check-inline col-6 col-md-2">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="radioPrueba" @change="fasescambio('prueba')">
                                    <label class="form-check-label" for="radioPrueba">Prueba</label>
                                </div>
                                <div class="form-check form-check-inline col-6 col-md-2">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="radioReprobado" @change="fasescambio('reprobado')">
                                    <label class="form-check-label" for="radioReprobado">Reprobado</label>
                                </div>
                                <div class="form-check form-check-inline col-6 col-md-2">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="radioAprobado" @change="fasescambio('aprobado')">
                                    <label class="form-check-label" for="radioAprobado">Aprobado</label>
                                </div>
                                <div class="form-check form-check-inline col-6 col-md-2">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                        id="radioEntrevista" @change="fasescambio('entrevista')">
                                    <label class="form-check-label" for="radioEntrevista">Entrevista</label>
                                </div>
                            </div>


                        </div>
                        <div class="col-12 col-md-5 row">
                            <div class="col-3">
                                <div class="text-center">
                                    <button type="button" class="btn btn-primary" @click="postulacionesformmodal(-1)"
                                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion crear')"><i
                                            class="fas fa-plus-circle me-2"></i><br>Agregar</button>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="text-center">
                                    <button type="button" class="btn btn-danger" @click="formplus()"
                                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion crear')"><i
                                            class="fas fa-plus-circle me-2"></i><br>Formularios</button>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="text-center">
                                    <button type="button" class="btn btn-warning" @click="postulacioneshistorial()"
                                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion crear')"><i
                                            class="fas fa-plus-circle me-2"></i><br>Historial</button>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="text-center">
                                    <button type="button" class="btn btn-success" @click="modalexcelmuestra()"
                                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion crear')"><i
                                            class="fas fa-plus-circle me-2"></i><br>Excel</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center" v-if="permisoStore.permisosUser.includes('postulacion ver') &&
                            !permisoStore.permisosUser.includes('postulacion editar') &&
                            !permisoStore.permisosUser.includes('postulacion crear')">
                            <h1>{{ name }}</h1>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive"
                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion ver') || permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                <table class="table align-items-center justify-content-center text-sm ">
                                    <thead class="table-gray-personalizado ">
                                        <tr class="text-white">
                                            <th class="text-uppercase font-weight-bolder text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                Id</th>
                                            <th class="text-uppercase font-weight-bolder text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                User Id</th>
                                            <th class="text-uppercase font-weight-bolder text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                Nombre</th>
                                            <th class="text-uppercase font-weight-bolder text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                CI</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Batch</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Especialidad</th>
                                            <th class="text-uppercase font-weight-bolder text-center text-center">
                                                Fase</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Descripcion</th>
                                            <th class="text-uppercase font-weight-bolder text-center">
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="solicitudes.length === 0">
                                            <td colspan="9" class="text-center">
                                                No se encuentran datos disponibles
                                            </td>
                                        </tr>
                                        <tr v-for="(item, indice) in solicitudes" :key="indice">

                                            <td class="text-center "
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                {{ item.id }}
                                            </td>
                                            <td class="text-center "
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                {{ item.user_id }}
                                            </td>
                                            <td class="text-center "
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                <span> {{ item.users.datos_generales.nombre + `
                                                    `+ item.users.datos_generales.apellido }}</span>
                                            </td>
                                            <td class="text-center"
                                                v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar') || permisoStore.permisosUser.some(p => p === 'postulacion crear')">
                                                {{ item.users.datos_generales.ci }}
                                            </td>
                                            <td class="text-center">
                                                {{ item.batch.version }}
                                            </td>
                                            <td class="text-center">
                                                {{ item.batch.crm_especialidades.nombre }}
                                            </td>
                                            <td class="text-center">
                                                <span class="badge"
                                                    :class="item.estado == 'aprobado' ? 'badge-success-personalizado' : (item.estado == 'reprobado' ? 'badge-danger-personalizado' : 'badge-secondary-personalizado')">{{
                                                        item.estado }}</span>
                                            </td>
                                            <td class="text-center">
                                                {{ item.descripcion }}
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <i class="fas fa-eye mx-1 text-info fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="postulacionformmodal(item.id)"></i>
                                                    <i class="fas fa-pencil mx-1 text-warning-personalizado fa-lg fs-5 btn-action cursor-pointer"
                                                        @click="postulacionesformmodal(item.id)"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar')"></i>
                                                    <i class="fa-solid mx-1 fa-lg fs-5 btn-action cursor-pointer fa-arrows-rotate text-warning"
                                                        @click="abrirestados(item.id, item.estado)"
                                                        v-if="permisoStore.permisosUser.some(p => p === 'postulacion editar')"></i>
                                                </div>

                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                            <button type="button" class="page-link" aria-label="Previous"
                                                @click="paginaPrev()">
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                            v-for="(item, indice) in paginacion.total" :key="indice">
                                            <button type="button" class="page-link"
                                                :class="item === paginacion.pagina ? 'bg-gray-700 text-white' : ''"
                                                @click="paginaCambio(item)">
                                                {{ item }}
                                            </button>
                                        </li>
                                        <li class="page-item"
                                            :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                            <button type="button" class="page-link" aria-label="Next"
                                                @click="paginaNext()">
                                                <span aria-hidden="true">&raquo;</span>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal postulacionesFORM -->
    <div class="modal fade bd-example-modal-lg mx-5" id="modal_postulaciones" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header modal-header-custom">
                    <h5 class="modal-title text-white" id="modalDemoLabel">{{ nroedit == -1 ? `Agregar
                        postulación`: `Actualizar postulación` }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ">

                    <div class="row gy-3">
                        <div class="col-12 col-md-6">

                            <label for="titulo" class="form-label font-weight-bolder text-sm">Usuario<span
                                    class="text-danger fst-italic">*</span></label>

                            <select class="form-select form-select-lg mb-3" aria-label="Large select example"
                                id="titulo" v-model="postulacionesdato.user_id">
                                <option value="" disabled>Seleccione</option>
                                <option v-for="(item, indice) in userselect" :key="indice" :value="item.id">
                                    {{ item.id - 1 + " - " + item.datos_generales.apellido + ` ` +
                                        item.datos_generales.nombre
                                    }}
                                </option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulaciones.user_id"><i
                                    class="fas fa-times me-1"></i>Seleccionar Usuario</small>
                        </div>
                        <div class="col-12 col-md-6">

                            <label for="nombre" class="form-label font-weight-bolder text-sm">Batch<span
                                    class="text-danger fst-italic">*</span></label>

                            <select class="form-select form-select-lg mb-3" aria-label="Large select example"
                                id="titulo" v-model="postulacionesdato.batch_id">
                                <option value="" disabled>Seleccione</option>
                                <option v-for="(item, indice) in batchselect" :key="indice" :value="item.id">
                                    {{ item.version + " - " + item.crm_especialidades.nombre }}
                                </option>
                            </select>


                            <small class="text-danger fst-italic text-xs" v-if="errorspostulaciones.batch_id"><i
                                    class="fas fa-times me-1"></i>Seleccionar un Batch</small>
                        </div>

                        <div class="col-12 col-md-12">
                            <label for="descripcion_larga"
                                class="form-label font-weight-bolder text-sm">Descripcion<span
                                    class="text-info text-xs fst-italic">(Larga)</span></label>
                            <textarea id="descripcion_larga" class="form-control" placeholder="Escriba..."
                                v-model="postulacionesdato.descripcion"></textarea>
                        </div>

                    </div>

                </div>
                <div class=" d-flex justify-content-evenly">
                    <button type="button" class="btn btn-danger" @click="closeModalpostulaciones"><i
                            class="fas fa-reply me-2"></i>Cerrar</button>
                    <button v-if="nroedit == -1" type="button" class="btn btn-primary"
                        @click="guardarpostulaciones()">Guardar<i class="fas fa-save ms-2"></i></button>
                    <button v-if="nroedit != -1" type="button" class="btn btn-warning"
                        @click="actualizarpostulaciones()">Actualizar<i class="fas fa-save ms-2"></i></button>
                </div>



            </div>
        </div>
    </div>

    <!-- Modal Postulacion FORM-->
    <div class="modal fade mx-5" id="modal_postulacion" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header modal-header-custom ">
                    <h5 class="modal-title text-white" id="modalDemoLabel">{{ nroedit == -1 ? `Nuevo formulario de
                        postulación`: `Actualizar formulario de postulación` }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ">

                    <p class="text-uppercase font-weight-bolder "></p>
                    <div class="row d-flex align-items-center">
                        <div class="col-12" v-if="nroedit == -1">
                            <select class="form-select form-select-lg mb-3 text-center fs-5"
                                aria-label="Large select example" id="titulo" v-model="selectpostdato"
                                @click="datosextraenmodal()">
                                <option value="" disabled>Seleccione</option>
                                <option v-for="(item, indice) in usuariosid" :key="indice" :value="indice">
                                    {{ item.id + ` - ` + item.users.datos_generales.apellido + `
                                    `+ item.users.datos_generales.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-12 text-center">
                            <div class="form-group">
                                <div class="text-center mb-4">
                                    <h3>{{ postdatosgen.nombre }} {{ postdatosgen.apellido }}</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label class="form-label font-weight-bolder text-sm">Batch:</label>
                                <label class="form-label fs-4 ">{{ postverbatch }}</label>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label class="form-label font-weight-bolder text-sm">Celular:</label>
                                <label class="form-label fs-4 ">{{ postdatosgen.telefono }}</label>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="form-label font-weight-bolder text-sm">email:</label>
                                <label class="form-label fs-4 ">{{ datouser.email }}</label>
                            </div>
                        </div>
                        <div class="col-md-12 text-center">
                            <div class="form-group">
                                <div class="text-center mb-4">
                                    <h4>Formulario</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 text-center">
                            <label for="nivel_estudios" class="form-label font-weight-bolder text-sm">Nivel de
                                estudio<span class="text-danger fst-italic">*</span></label>
                            <select class="form-select form-select-lg mb-3 text-center"
                                aria-label="Large select example" id="nivel_estudios"
                                v-model="datospostulacion.nivel_estudios">
                                <option value="" disabled>Seleccione</option>
                                <option value="1">Primaria</option>
                                <option value="2">Secundaria</option>
                                <option value="3">Bachillerato - no continué con estudios</option>
                                <option value="4">Bachillerato - cursando estudios superiores</option>
                                <option value="5">Licenciatura</option>
                                <option value="6">Especialización</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulacion.nivel_estudios"><i
                                    class="fas fa-times me-1"></i>Seleccionar nivel de estudios</small>
                        </div>
                        <div class="col-12 col-md-6 text-center">
                            <label for="nivel_academico" class="form-label font-weight-bolder text-sm">Nivel
                                académico<span class="text-danger fst-italic">*</span></label>
                            <select class="form-select form-select-lg mb-3 text-center"
                                aria-label="Large select example" id="nivel_academico"
                                v-model="datospostulacion.nivel_academico">
                                <option value="" disabled>Seleccione</option>
                                <option value="1">Social y económicas (Economía, Marketing, Psicologia, etc.)</option>
                                <option value="2">Exactas (Ingenierias, Informatica, etc.)</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulacion.nivel_academico"><i
                                    class="fas fa-times me-1"></i>Seleccionar nivel académico</small>
                        </div>
                        <div class="col-12 col-md-6 text-center">
                            <label for="conocimiento_programacion"
                                class="form-label font-weight-bolder text-sm">Conocimiento de
                                Programación<span class="text-danger fst-italic">*</span></label>
                            <select class="form-select form-select-lg mb-3 text-center"
                                aria-label="Large select example" id="conocimiento_programacion"
                                v-model="datospostulacion.nivel_programacion">
                                <option value="" disabled>Seleccione</option>
                                <option value="1">Nulo</option>
                                <option value="2">Principiante</option>
                                <option value="3">Intermedio</option>
                                <option value="4">Avanzado</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulacion.nivel_programacion"><i
                                    class="fas fa-times me-1"></i>Seleccionar nivel de programación</small>
                        </div>
                        <div class="col-12 col-md-6 text-center">
                            <label for="servicio_internet" class="form-label font-weight-bolder text-sm">¿Cuenta con
                                internet y
                                computadora?<span class="text-danger fst-italic">*</span></label>
                            <select class="form-select form-select-lg mb-3 text-center"
                                aria-label="Large select example" id="servicio_internet"
                                v-model="datospostulacion.servicio_internet">
                                <option value="" disabled>Seleccione</option>
                                <option value="1">si</option>
                                <option value="2">no</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulacion.servicio_internet"><i
                                    class="fas fa-times me-1"></i>Seleccionar nivel de programación</small>
                        </div>
                        <div class="col-12 col-md-6 text-center">
                            <label for="dominio_ingles" class="form-label font-weight-bolder text-sm">Dominio Idioma
                                Inglés<span class="text-danger fst-italic">*</span></label>
                            <select class="form-select form-select-lg mb-3 text-center"
                                aria-label="Large select example" id="dominio_ingles"
                                v-model="datospostulacion.idioma_extranjero">
                                <option value="" disabled>Seleccione</option>
                                <option value="1">No sé inglés</option>
                                <option value="2">Principiante</option>
                                <option value="3">Intermedio</option>
                                <option value="4">Avanzado</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulacion.idioma_extranjero"><i
                                    class="fas fa-times me-1"></i>Seleccionar nivel de programación</small>
                        </div>
                        <div class="col-12 col-md-6 text-center">
                            <label for="horario_trabajo" class="form-label font-weight-bolder text-sm">Agregar si
                                tiene horario laboral<span class="text-danger fst-italic">*</span></label>
                            <select class="form-select form-select-lg mb-3 text-center"
                                aria-label="Large select example" id="horario_trabajo"
                                v-model="datospostulacion.horario_trabajo">
                                <option value="" disabled>Seleccione</option>
                                <option value="1">Si, trabajo tiempo completo (8 hrs.)</option>
                                <option value="2">Si, trabajo medio tiempo (4 hrs.)</option>
                                <option value="3">No estoy trabajando</option>
                            </select>
                            <small class="text-danger fst-italic text-xs" v-if="errorspostulacion.horario_trabajo"><i
                                    class="fas fa-times me-1"></i>Seleccionar nivel de programación</small>
                        </div>
                        <div class="col-md-12 text-center">
                            <div class="form-group">
                                <label class="form-label font-weight-bolder text-sm">Comentario de postulante</label>
                                <textarea class="form-control text-center " v-model="datospostulacion.comentario"
                                    :class="nroedit == -1 ? 'readonly' : ''" type="text"> </textarea>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="  d-flex justify-content-evenly ">
                    <button type="button" class="btn btn-danger" @click="closeModalpostulacion()"><i
                            class="fas fa-reply me-2"></i>Cerrar</button>
                    <button type="button" class="btn btn-primary" v-if="nroedit == -1"
                        @click="guardarpostulacion()">Guardar cambios<i class="fas fa-save ms-2"></i></button>
                    <button v-if="nroedit != -1 && permisoStore.permisosUser.some(p => p === 'postulacion editar')"
                        type="button" class="btn btn-warning" @click="actualizarpostulacionencontrar()">Actualizar<i
                            class="fas fa-save ms-2"></i></button>

                </div>
            </div>
        </div>
    </div>


    <!-- Modal estados -->
    <div class="modal fade bd-example-modal-lg mx-5" id="modal_estado" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header modal-header-custom">
                    <h5 class="modal-title text-white" id="modalDemoLabel">Cambio Estado</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center  ">
                    <h5>Seleccionar el estado</h5>
                    <div class="  d-flex justify-content-evenly ">
                        <button type="button" class="btn btn-secondary" @click="estadocambio(1)"><i
                                class="fa-solid fa-arrow-right"></i> Prueba</button>
                        <button type="button" class="btn btn-danger" @click="estadocambio(2)"> <i
                                class="fa-solid fa-xmark"></i> Reprobado</button>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-evenly ">
                    <div class="text-center "><span>Estado actual: <span class="fs-3">{{ estadoactual }}</span></span>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- Modal Excel -->
    <div class="modal fade bd-example-modal-lg mx-5" id="modal_excel" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header modal-header-custom">
                    <h5 class="modal-title text-white" id="modalDemoLabel">Agregar Excel</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center  ">
                    <h5>La siguiente opcion importará datos desde una hoja EXCEL</h5>

                    <div class="alert " style="background-color: rgba(65, 114, 221, 0.23);">
                        <p>Descargar plantilla excel <button class="btn" @click="downloadFile()"><i class="fas fa-download"></i></button></p>
                    </div>
                    <div class="alert" style="background-color: #F8D7DA; color: #58151C;" v-if="errors.length > 0">
                        <ul>
                            <li v-for="(item, index) in errors" :key="index">{{ item[0] }}</li>
                        </ul>
                    </div>
                    <input type="file" class="form-control" id="descripcion_file" accept=".xls,.xlsx"
                        placeholder="Escriba su respuesta" @change="obtenerArchivo($event)">
                    <div class="  d-flex justify-content-evenly ">
                        <button type="button" class="btn btn-danger" :class="{'disabled' : estadoBoton}" @click="importaexcel()"><i
                                class="fa-solid" :class="estadoBoton ? 'fa-spin fa-spinner': 'fa-arrow-right'"></i> Importar</button>

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

//------------------- Import Postulaciones --------------------------
import { onMounted, ref } from 'vue';
import { filtrofases, destroy, indexsearch, store, mostrarUsuarios, vernopost, show as showpostulaciones, update as updatepostulaciones, importarexcel } from '../../../../services/Postulaciones';
import { store as postulacionstore, update, show as showpost } from '../../../../services//PostulacionForms';

//------------------- Import PostulacionesForm --------------------------
import { batchActivos as indexbatch } from '@/services/BatchService';
import { Modal } from 'bootstrap';
//------------------- Import PostulacionForm --------------------------
import { show as showpostulacion } from '../../../../services/PostulacionForms';
//------------------- Import permisos --------------------------
import { usePermisoStore } from '@/stores/PermisosStore';
import Swal from 'sweetalert2';
import { useRouter, useRoute } from "vue-router";
import { urlBaseAsset } from '@/services/Http';
import { downloadExcel } from '@/services/CalendarioService';
//------------------- Import permisos --------------------------`
const permisoStore = usePermisoStore();

//------------------- Variables Postulaciones --------------------------
const verbusqueda = ref(0);
const authe = ref(0);
const solicitudes = ref([]);
const name = ref([]);
const verord = ref(15);
const orders = {
    0: ref(0),
    2: ref(2),
    4: ref(4),
    6: ref(6),
    8: ref(8),
    10: ref(10),
    12: ref(12),
    14: ref(14),
};
const archivo = ref(null);
const urlArchivo = ref(null);
const paginacion = ref({
    total: null,
    pagina: 1
})
const router = useRouter();
const searchPersona = ref('');
let errorspostulaciones = ref({})
let errorspostulacion = ref({})
//------------------- Variables PostulacionesFORM --------------------------
const modalpostulaciones = ref(null);
const instanciamodalpostulaciones = ref(null);
const postulacionesdato = ref({});
const batchselect = ref([]);
const userselect = ref([]);
//------------------- Variables PostulacionFORM --------------------------
const modalpostulacion = ref(null);
const instanciamodalpostulacion = ref(null);
const modalestado = ref(null);
const instanciamodalestado = ref(null);
const datospostulacion = ref({});
const instanciamodalexcel = ref(null);
const datosexcel = ref({});
const postdatosgen = ref([]);
const postbatch = ref([]);
const postestado = ref([]);
const postverbatch = ref([])
const selectpostdato = ref();
const usuariosid = ref([])
const nroedit = ref(0);
const errorexcel = ref(0);
const estadoBoton = ref(false);
const errors = ref([]);
const importaexcel = () => {
    Swal.fire({
        title: "Verificar la importación!",
        text: "No se puede revertir esta acción, ya que generar demasiados datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, importar!"
    }).then(async(result) => {
        if (result.isConfirmed) {
            try {
                estadoBoton.value = true;
                const formdata = new FormData();
                formdata.append('archivo', archivo.value);
                const { data } = await importarexcel(formdata);
                Swal.fire({
                    title: "Importado!",
                    text: "Se realizó la importación.",
                    icon: "success"
                });
                listar()
                instanciamodalexcel.value.hide()
            } catch (error) {
                if (error.response.status == 422) {
                    errors.value = error.response.data.errors;
                    console.log(errors.value);
                    
                    Swal.fire({
                        title: "Error!",
                        text: error.response.data.message,
                        icon: "error"
                    });                    
                }
                console.log(error);
                
            }finally{
                estadoBoton.value = false;
            }
        } else {
            instanciamodalexcel.value.hide()
        }
    });
};
const obtenerArchivo = (event) => {
    archivo.value = event.target.files[0];
    if (archivo.value != null) {
        const reader = new FileReader();
        reader.onload = (e) => urlArchivo.value = e.target.result;
        reader.readAsDataURL(archivo.value);
    }
}
const importaciondelexcelconpost = async () => {
    try {
        const formdata = new FormData();
        formdata.append('archivo', archivo.value);
        const { data } = await importarexcel(formdata);
    } catch (error) {
        if (error != null) {
            errorexcel.value = 1;
            Swal.fire({
                title: "Error!",
                text: "No se realizó la importación.",
                icon: "error"
            });
            
        }
    }
}
//------------------- onMounted --------------------------
onMounted(() => {
    modalpostulaciones.value = document.getElementById('modal_postulaciones');
    instanciamodalpostulaciones.value = new Modal(modalpostulaciones.value);
    modalpostulacion.value = document.getElementById('modal_postulacion');
    instanciamodalpostulacion.value = new Modal(modalpostulacion.value);
    modalestado.value = document.getElementById('modal_estado');
    instanciamodalestado.value = new Modal(modalestado.value);
    datosexcel.value = document.getElementById('modal_excel');
    instanciamodalexcel.value = new Modal(datosexcel.value);
    listar();
    batch();
    verusuario();

});
//------------------- Funciones Postulaciones --------------------------
//* Listar Datos en Tablas *
const estadoid = ref(0);
const estadoactual = ref('');
const abrirestados = (id, estado) => {
    estadoid.value = id;
    estadoactual.value = estado;
    instanciamodalestado.value.show();
}
const selectporfases = ref('')
const fasescambio = (a) => {
    selectporfases.value = a;
    paginacion.value.pagina = 1;
    listar()
}
const listar = async () => {
    try {

        const { data } = await filtrofases(selectporfases.value, paginacion.value.pagina);
        if (data.datos.data.length > 0) {
            paginacion.value.total = data.datos.last_page;
            authe.value = data.auth;
            solicitudes.value = data.datos.data;
            name.value = solicitudes.value[0].users.datos_generales.nombre + " " + solicitudes.value[0].users.datos_generales.apellido;
            verbusqueda.value = 0;
        } else {
            solicitudes.value = [];
        }
    } catch (error) {
        console.log(error);
    }
};
//* Abrir a formulario Postulaciones *

//* Cambio de estado. Solo existen 3: aprobado, reprobado en proceso *
const estadocambio = async (param) => {

    try {
        let dato = ''
        if (param == 1) {
            dato = 'prueba';
        } else if (param == 2) {
            dato = ' reprobado';
        }
        let estadocambio = {
            estado: dato
        };
        const { data } = await destroy(estadoid.value, estadocambio);
        sweetver('success', 'La postulación se actualizó correctamente!', '')
        instanciamodalestado.value.hide();
        listar();
    } catch (error) {
        console.log(error);
    }
}
//* Busqueda q verifica entre el nombre, apellido y el CI *
const filtrarPersona = async () => {
    try {
        const { data } = await indexsearch(searchPersona.value);
        solicitudes.value = data.datos.data;
        verbusqueda.value = 0;
    } catch (error) {
        console.log(error);
    }
}
//* Envía la orden para ordenar dependiendo la fila *
const ordenlista = async param => {
    if (orders.hasOwnProperty(param)) {
        orders[param].value += 1;
        if (orders[param].value > param + 1) {
            orders[param].value = param;
        }
        verord.value = orders[param].value;
    }
    listar();
};
//* Paginacion anterior *
const paginaPrev = () => {
    paginacion.value.pagina--;
    listar();
}
//* Paginacion siguiente *
const paginaNext = () => {
    paginacion.value.pagina++;
    listar();
}
//* Paginacion por el nro *
const paginaCambio = (x) => {
    paginacion.value.pagina = x;
    listar();
}
//------------------- Funciones PostulacionesFORM --------------------------
const batch = async () => {
    try {
        const { data } = await indexbatch();
        batchselect.value = data.datos;
    } catch (error) {
        console.log(error);
    }
};
const verusuario = async () => {
    try {
        const { data } = await mostrarUsuarios();
        userselect.value = data.datos;
    } catch (error) {
        console.log(error);
    }
};
const idpostulacioneseditar = ref(0);
const postulacionesformmodal = async (id) => {
    if (userselect.value.length == 0) {
        sweetver('error', 'No hay usuarios para seleccionar!', 'Por favor, agregar usuarios al sistema')
    } else if (batchselect.value.length == 0) {
        sweetver('error', 'No hay batch para seleccionar!', 'Por favor, agregar Batch al sistema.');
    } else {
        if (id != -1) {
            nroedit.value = id;
            postulacionesdato.value.batch_id
            try {
                const { data } = await showpostulaciones(id);
                postulacionesdato.value.user_id = data.datos[0].user_id;
                postulacionesdato.value.batch_id = data.datos[0].batch_id;
                postulacionesdato.value.estado = 'prueba';
                postulacionesdato.value.descripcion = data.datos[0].descripcion;
                idpostulacioneseditar.value = id;
            } catch (error) {
                console.log(error);
            }
            instanciamodalpostulaciones.value.show();
        } else {
            nroedit.value = -1;
            postulacionesdato.value.user_id = '';
            postulacionesdato.value.batch_id = '';
            postulacionesdato.value.estado = 'prueba';
            postulacionesdato.value.descripcion = '';
            instanciamodalpostulaciones.value.show();
        }
    }
}
const guardarpostulaciones = async () => {
    try {

        const { data } = await store(postulacionesdato.value);

        sweetver('success', 'La postulación se guardó correctamente!', '')
        closeModalpostulaciones();
        listar();
    } catch (error) {
        if (error.response.status == 422) {
            errorspostulaciones.value = error.response.data.errors
            console.log(errorspostulaciones.value);
        }
    }
}
const actualizarpostulaciones = async () => {
    try {
        let subit = {
            user_id: postulacionesdato.value.user_id,
            batch_id: postulacionesdato.value.batch_id,
            descripcion: postulacionesdato.value.descripcion,
            estado: postulacionesdato.value.estado,
        };

        const { data } = await updatepostulaciones(idpostulacioneseditar.value, subit);
        sweetver('success', 'La postulación se actualizó correctamente!', '')
        closeModalpostulaciones();
        listar();
    } catch (error) {
        console.log(error);
    }
}
function closeModalpostulaciones() {
    instanciamodalpostulaciones.value.hide();
}
function closeinstanciamodalestado() {
    instanciamodalestado.value.hide();
}
//------------------- Funciones Postulacion --------------------------
const formplus = async () => {
    errorspostulacion.value = '';
    try {
        const { data } = await vernopost();
        nroedit.value = -1;
        usuariosid.value = data.datos;
        postdatosgen.value = '';
        postestado.value = '';
        postverbatch.value = '';
        postdatosgen.value = '';
        datospostulacion.value.nivel_estudios = '';
        datospostulacion.value.nivel_academico = '';
        datospostulacion.value.nivel_programacion = '';
        datospostulacion.value.servicio_internet = '';
        datospostulacion.value.idioma_extranjero = '';
        datospostulacion.value.horario_trabajo = '';
        if (usuariosid.value.length == 0) {
            sweetver('warning', 'No hay postulaciones disponibles para generar formularios.', 'Agregar una nueva postulación primero.');
            return;
        }
        instanciamodalpostulacion.value.show();

    } catch (error) {
        console.log(error);
    }
};
const datosextraenmodal = async () => {

    if (selectpostdato.value != null) {

        postdatosgen.value = usuariosid.value[selectpostdato.value].users.datos_generales;
        postestado.value = usuariosid.value[selectpostdato.value].estado;
        postverbatch.value = usuariosid.value[selectpostdato.value].batch.version + ' - ' + usuariosid.value[selectpostdato.value].batch.crm_especialidades.nombre;
    }
}
const datouser = ref([])
const datoideactuarlizar = ref(0);
const postulacionformmodal = async param => {
    errorspostulacion.value = '';
    if (param != -1) {
        try {
            const { data } = await showpostulacion(param);
            if (data.datos.length != 0) {
                datospostulacion.value = data.datos[0];
                postdatosgen.value = data.datos[0].postulaciones.users.datos_generales;
                postbatch.value = data.datos[0].postulaciones.batch;
                postestado.value = data.datos[0].postulaciones.estado;
                datouser.value = data.datos[0].postulaciones.users;
                postverbatch.value = data.datos[0].postulaciones.batch.version + ' - ' + data.datos[0].postulaciones.batch.crm_especialidades.nombre;
                nroedit.value = param;
                instanciamodalpostulacion.value.show();
                datoideactuarlizar.value = param;
            } else {
                sweetver('error', 'La postulacion no tiene formulario!', '')
            }
        } catch (error) {
            console.log(error);
        }
    }

}
const cambioestadopostualcion = (id) => {
    const propiedades = {
        1: 'disposicion_tiempo',
        2: 'servicio_internet',
        3: 'programador',
        4: 'idioma_extranjero'
    };
    const propiedad = propiedades[id];
    if (propiedad) {
        datospostulacion.value[propiedad] = datospostulacion.value[propiedad] === 0 ? 1 : 0;
    }
}
const guardarpostulacion = async () => {
    let subit = {
        postulaciones_id: usuariosid.value[selectpostdato.value].id,
        nivel_estudios: datospostulacion.value.nivel_estudios,
        nivel_academico: datospostulacion.value.nivel_academico,
        nivel_programacion: datospostulacion.value.nivel_programacion,
        servicio_internet: datospostulacion.value.servicio_internet,
        idioma_extranjero: datospostulacion.value.idioma_extranjero,
        horario_trabajo: datospostulacion.value.horario_trabajo,
        comentario: datospostulacion.value.comentario,
    };
    try {
        const { data } = await postulacionstore(subit);
        sweetver('success', 'El formulario se guardó correctamente!', '')
        closeModalpostulacion();
    } catch (error) {
        if (error.response.status == 422) {
            errorspostulacion.value = error.response.data.errors
            console.log(errorspostulacion.value);
        }
    }
}
const datoextraid = ref(0);
const actualizarpostulacionencontrar = async () => {
    try {
        const { data } = await showpost(datoideactuarlizar.value);
        datoextraid.value = data.datos[0].id;
        actualizarpostulacion();
    } catch (error) {
        console.log(error);
    }
}
const actualizarpostulacion = async () => {
    try {
        let subit = {
            postulaciones_id: datoideactuarlizar.value,
            nivel_estudios: datospostulacion.value.nivel_estudios,
            nivel_academico: datospostulacion.value.nivel_academico,
            nivel_programacion: datospostulacion.value.nivel_programacion,
            servicio_internet: datospostulacion.value.servicio_internet,
            idioma_extranjero: datospostulacion.value.idioma_extranjero,
            horario_trabajo: datospostulacion.value.horario_trabajo,
            comentario: datospostulacion.value.comentario,
        };
        const { data } = await update(datoextraid.value, subit);
        sweetver('success', 'El formulario se actualizó correctamente!', '')

        closeModalpostulacion();
    } catch (error) {
        console.log(error);
    }
}
function closeModalpostulacion() {
    instanciamodalpostulacion.value.hide();
}
function sweetver(ic, tt, tx) {
    Swal.fire({
        icon: ic,
        title: tt,
        text: tx,
        confirmButtonText: 'Aceptar',
        showCancelButton: false,
    })
}
const postulacioneshistorial = () => {
    router.push("/postulacioneshistorial");
};

const modalexcelmuestra = () => {
    instanciamodalexcel.value.show()
};

const downloadFile = async() => {
	try {
		const {data} = await downloadExcel();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.download = 'Plantilla-Postulacion.xlsx';
        link.click();
	} catch (error) {
		console.log(error);		
	}
}




</script>

<style>
/** ESTILOS PERSOANLIZADOS */
.text-warning-personalizado {
    color: rgb(255, 195, 0);
}

.badge-success-personalizado {
    color: #1aae6e;
    background-color: #b0eed3;
}

.badge-warning-personalizado {
    color: #c79c0f;
    background-color: rgb(255, 195, 0);
}


.badge-danger-personalizado {
    color: #f80031;
    background-color: #fdd1da;
}

.badge-secondary-personalizado {
    color: #646363;
    background-color: #bdbaba;
}

.table-gray-personalizado {
    background-color: #495057;
    color: white
}



.modal-header-custom {
    background-color: rgb(255, 195, 00);
    color: white;
}
</style>
