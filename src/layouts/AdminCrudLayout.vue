<template>
  <div class="bg-gray-100 total" :class="{ 'g-sidenav-show': viewSideBar }">
    <div class="min-height-300 position-absolute w-100" style="background-color: #ffcc01"></div>
    <aside
      class="sidenav bg-gray-700 navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 overflow-auto custom-scrollbar"
      id="sidenav-main">

      <div class="sidenav-header">
        <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true" id="iconSidenav"></i>
        <a class="navbar-brand m-0" href="/" target="_blank">
          <img src="/plantilla_argon/assets/img/logo.png" class="navbar-brand-img h-100"
            style="filter: brightness(0) invert(1);" alt="main_logo" />
        </a>
      </div>
      <div class="sidenav-toggle" v-if="!viewSideBar">
        <button class="btn-circle" @click="showSideBar()">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
      <hr class="horizontal dark mt-0" />
      <div class="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="
            permisoStore.permisosUser.some(
              (element) =>
                element === 'dashboard ver'
            )
          ">
            <RouterLink class="nav-link" to="/dashboard">
              <div
                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="fas fa-tachometer-alt" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span
                class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Dashboard</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <a @click="toggleDropdown('adminMenu')" class="nav-link" href="#" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-gears" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span
                class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Administración
                <i :class="[
                  'fas',
                  isDropdownOpen['adminMenu']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['adminMenu'],
              show: isDropdownOpen['adminMenu'],
            }" class="collapse" id="adminMenu">
              <ul class="nav ms-4">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/profile">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-user" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Perfil</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'usuario ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/usuarios">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-user-group" style="color: #ffd43b; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Usuarios</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'rol ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/roles">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-users-cog" style="color: #ffffff; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Roles</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'rol ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/permisos">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-user-lock" style="color: #63e6be; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Permisos</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item mt-3">
            <a @click="toggleDropdown('gestionRecursos')" class="nav-link" href="#" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-layer-group" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Gestión de
                Recursos
                <i :class="[
                  'fas',
                  isDropdownOpen['gestionRecursos']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['gestionRecursos'],
              show: isDropdownOpen['gestionRecursos'],
            }" class="collapse" id="gestionRecursos">
              <ul class="nav ms-4">
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'modulo ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/modulos">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-window-restore" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Módulos</span>
                  </RouterLink>
                </li>

                <li class="nav-item" v-if="permisoStore.permisosUser.some((element) => element === 'tecnologia ver')">
                  <RouterLink class="nav-link" to="/tecnologias">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-microchip" style="color: #ffd43b; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Tecnologías</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'especialidad ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/especialidad">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-file-signature" style="color: #ffffff; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Especialidades</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'batch ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/batch">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-people-group" style="color: #63e6be; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Batch</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'tipo pruebas ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/tipo-pruebas">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-list-alt" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Tipo Pruebas</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item mt-3">
            <a @click="toggleDropdown('postulacionesMenu')" class="nav-link" href="#" role="button"
              aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fas fa-chart-line" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">
                Proceso de postulación
                <i :class="[
                  'fas',
                  isDropdownOpen['postulacionesMenu']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['postulacionesMenu'],
              show: isDropdownOpen['postulacionesMenu'],
            }" class="collapse" id="postulacionesMenu">
              <ul class="nav ms-4">
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'postulacion ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/postulaciones">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-folder-open" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Postulaciones</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="permisoStore.permisosUser.some((element) => element === 'prueba ver')">
                  <a @click="toggleDropdown('pruebasMenu')" class="nav-link" href="#" role="button"
                    aria-expanded="false">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-laptop-code" style="color: #ffd43b; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">
                      Pruebas
                      <i :class="[
                        'fas',
                        isDropdownOpen['pruebasMenu']
                          ? 'fa-chevron-up'
                          : 'fa-chevron-down',
                        'ms-auto',
                      ]"></i>
                    </span>
                  </a>
                  <div :class="{
                    collapse: !isDropdownOpen['pruebasMenu'],
                    show: isDropdownOpen['pruebasMenu'],
                  }" class="collapse ms-3">
                    <ul class="nav">
                      <li class="nav-item" v-if="
                        permisoStore.permisosUser.some(
                          (element) => element === 'prueba ver'
                        )
                      ">
                        <RouterLink class="nav-link" to="/pruebas">
                          <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fas fa-folder-open" style="color: #74c0fc; font-size: 1.2rem"></i>
                          </div>
                          <span class="nav-link-text ms-1 text-white">Registro de pruebas</span>
                        </RouterLink>
                      </li>
                      <li class="nav-item">
                        <RouterLink class="nav-link" to="/pruebas-revision">
                          <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fas fa-file-signature" style="color: #63e6be; font-size: 1.2rem"></i>
                          </div>
                          <span class="nav-link-text ms-1 text-white">Resultados de pruebas</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <!--Inicio-->
                <li class="nav-item" v-if="permisoStore.permisosUser.some((element) => element === 'entrevista ver')">
                  <a @click="toggleDropdown('entrevistasMenu')" class="nav-link" href="#" role="button"
                    aria-expanded="false">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-people-arrows" style="color: white; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">
                      Entrevistas
                      <i :class="[
                        'fas',
                        isDropdownOpen['entrevistasMenu']
                          ? 'fa-chevron-up'
                          : 'fa-chevron-down',
                        'ms-auto',
                      ]"></i>
                    </span>
                  </a>
                  <div :class="{
                    collapse: !isDropdownOpen['entrevistasMenu'],
                    show: isDropdownOpen['entrevistasMenu'],
                  }" class="collapse ms-3">
                    <ul class="nav">
                      <li class="nav-item">
                        <RouterLink class="nav-link" to="/entrevistas">
                          <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fas fa-folder-open" style="color: #74c0fc; font-size: 1.2rem"></i>
                          </div>
                          <span class="nav-link-text ms-1 text-white">Registro de entrevistas</span>
                        </RouterLink>
                      </li>
                      <li class="nav-item">
                        <RouterLink class="nav-link" to="/entrevista-resultados">
                          <div
                            class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i class="fas fa-file-signature" style="color: #63e6be; font-size: 1.2rem"></i>
                          </div>
                          <span class="nav-link-text ms-1 text-white">Resultados de entrevistas</span>
                        </RouterLink>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item mt-3"
            v-if="permisoStore.permisosUser.some((element) => element === 'contrato ver' || element === 'documento ver')">
            <a @click="toggleDropdown('gestionContratosMenu')" class="nav-link" href="#" role="button"
              aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fas fa-scroll" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Gestión de
                Contratos
                <i :class="[
                  'fas',
                  isDropdownOpen['gestionContratosMenu']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['gestionContratosMenu'],
              show: isDropdownOpen['gestionContratosMenu'],
            }" class="collapse" id="gestionContratosMenu">
              <ul class="nav ms-4">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/RegistrosBatch">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-archive" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Registros</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item mt-3">
            <a @click="toggleDropdown('rendimientoMenu')" class="nav-link" href="#" role="button" aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-person-chalkboard" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span
                class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Rendimiento y
                avance
                <i :class="[
                  'fas',
                  isDropdownOpen['rendimientoMenu']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['rendimientoMenu'],
              show: isDropdownOpen['rendimientoMenu'],
            }" class="collapse" id="rendimientoMenu">
              <ul class="nav ms-4">
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'evaluacion ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/Evaluaciones-batch">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-chalkboard-teacher" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Evaluaciones</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'rol editar'
                  )
                ">
                  <RouterLink class="nav-link" to="/estudiantes">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-user-check" style="color: #ffd43b; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Lista de estudiantes</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item mt-3">
            <a @click="toggleDropdown('posicionamientoMenu')" class="nav-link" href="#" role="button"
              aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-person-walking-luggage" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span
                class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Posicionamiento
                <i :class="[
                  'fas',
                  isDropdownOpen['posicionamientoMenu']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['posicionamientoMenu'],
              show: isDropdownOpen['posicionamientoMenu'],
            }" class="collapse" id="posicionamientoMenu">
              <ul class="nav ms-4">
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'solicitud ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/solicitudes">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-people-arrows" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Solicitudes</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'solicitud ver'
                  ) &&
                  rol != 'egresado' &&
                  rol != 'postulante' &&
                  rol != 'estudiante'
                ">
                  <RouterLink class="nav-link" to="/solicitudes-admin">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-mail-bulk" style="color: #ffd43b; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Solicitudes Admin</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'empleo estados ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/empleo-estados-formulario">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-briefcase" style="color: #ffffff; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Empleo Estados</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'propuesta ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/propuestas-empleos">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fa-solid fa-person-digging" style="color: #ffffff; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Ofertas Laborales</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item mt-3">
            <a @click="toggleDropdown('recursosHumanosMenu')" class="nav-link" href="#" role="button"
              aria-expanded="false">
              <div class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-arrows-down-to-people" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Recursos
                Humanos
                <i :class="[
                  'fas',
                  isDropdownOpen['recursosHumanosMenu']
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down',
                  'ms-auto',
                ]"></i>
              </span>
            </a>
            <div :class="{
              collapse: !isDropdownOpen['recursosHumanosMenu'],
              show: isDropdownOpen['recursosHumanosMenu'],
            }" class="collapse" id="recursosHumanosMenu">
              <ul class="nav ms-4">
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'experiencia ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/experiencias">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-business-time" style="color: #74c0fc; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Experiencias</span>
                  </RouterLink>
                </li>
                <li class="nav-item" v-if="
                  permisoStore.permisosUser.some(
                    (element) => element === 'certificacion ver'
                  )
                ">
                  <RouterLink class="nav-link" to="/certificaciones">
                    <div
                      class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      <i class="fas fa-graduation-cap" style="color: #ffd43b; font-size: 1.2rem"></i>
                    </div>
                    <span class="nav-link-text ms-1 text-white">Certificaciones</span>
                  </RouterLink>
                </li>
              </ul>
            </div>
          </li>

          <li class="nav-item" v-if="permisoStore.permisosUser.some((element) => element === 'dashboard ver')">
            <RouterLink class="nav-link" to="/empresaedicion">
              <div
                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-laptop-file" style="color: #ffd43b; font-size: 1.2rem"></i>
              </div>
              <span class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Gestion
                WEB</span>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login" @click="logout()">
              <div
                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="fas fa-times-circle" style="color: #ffffff; font-size: 1.2rem"></i>
              </div>
              <span class="nav-link-text ms-1 text-uppercase text-xs font-weight-bolder opacity-6 text-white">Cerrar
                sesión</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </aside>
    <main class="main-content position-relative border-radius-lg">
      <!-- Navbar -->
      <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
        data-scroll="false">
        <div class="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li class="breadcrumb-item text-sm">
                <span class="text-white">Pagina</span>
              </li>
              <li class="breadcrumb-item text-sm fw-bold text-white active" aria-current="page">
                {{ route.meta.breadcrumb }}
              </li>
            </ol>
          </nav>
          <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
            <div class="ms-md-auto pe-md-3 d-flex align-items-center"></div>
            <ul class="navbar-nav justify-content-end">
              <li class="nav-item d-flex align-items-center">
                <RouterLink class="nav-link" to="/login" @click="logout()">
                  <span class="nav-link-text fw-bold ms-1 text-white"><i class="fa-regular fa-circle-xmark"></i> Cerrar
                    sesión</span>
                </RouterLink>
              </li>
              <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav" @click="showSideBar()">
                  <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line bg-white"></i>
                    <i class="sidenav-toggler-line bg-white"></i>
                    <i class="sidenav-toggler-line bg-white"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div class="container-fluid py-4">
        <RouterView />
        <footer class="footer pt-3">
          <div class="container-fluid">
            <div class="row align-items-center justify-content-lg-between">
              <div class="col-lg-6 mb-lg-0 mb-4">
                <div class="copyright text-center text-sm text-muted text-lg-start">
                  © 2024 HAMILO
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView, useRoute } from "vue-router";
import { usePermisoStore } from "@/stores/PermisosStore";
import { cerrarSesion } from "@/services/AuthService.js";
const permisoStore = usePermisoStore();
const route = useRoute();
const formulario = ref({});
const viewSideBar = ref(true);
const sizeScreen = ref(null);
const rol = ref("");
const isDropdownOpen = ref({
  adminMenu: false,
});
const showSideBar = () => {
  viewSideBar.value = !viewSideBar.value;
};
const toggleDropdown = (menuId) => {
  isDropdownOpen.value[menuId] = !isDropdownOpen.value[menuId];
};
const logout = async () => {
  try {
    const { data } = await cerrarSesion();
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
function getUserRol() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  rol.value = usuario.role;
}
onMounted(() => {
  sizeScreen.value = window.innerWidth;
  import("/public/plantilla_argon/assets/js/core/popper.min.js");
  import("/public/plantilla_argon/assets/js/core/bootstrap.min.js");
  import("/public/plantilla_argon/assets/js/plugins/perfect-scrollbar.min.js");
  import("/public/plantilla_argon/assets/js/argon-dashboard.min.js");
  permisoStore.permisos();
  getUserRol();
});
</script>
<style>
@import "/plantilla_argon/assets/css/nucleo-icons.css";
@import "/plantilla_argon/assets/css/nucleo-svg.css";
@import "/plantilla_argon/assets/css/nucleo-svg.css";
@import "/plantilla_argon/assets/css/argon-dashboard.css";

.sidenav-toggle {
  position: absolute;
  top: 50px;
  right: -20px;
  z-index: 1000;
}

.btn-circle {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #afa04c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-circle:hover {
  background-color: #f0a503;
}

.sidenav-open .btn-circle i {
  transform: rotate(180deg);
}

#sidenav-main {
  /* overflow: auto;
        max-height: 98vh; */
}

.total {
  height: 100vh;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #7e7e7ef8 #727272cb;
  border-radius: 80px;
}
</style>
