<template>
    <div class="bg-gray-100 total" :class="{ 'g-sidenav-show': viewSideBar }">
        <div class="min-height-300 position-absolute w-100" style="background-color: #FFCC01"></div>
        <aside
            class="sidenav bg-gray-700 navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 overflow-auto custom-scrollbar"
            id="sidenav-main">
            <div class="sidenav-header">
                <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                    aria-hidden="true" id="iconSidenav"></i>
                <a class="navbar-brand m-0" href="/ "
                    target="_blank">
                    <img src="/plantilla_argon/assets/img/logo.png" class="navbar-brand-img h-100" alt="main_logo" style="filter: brightness(0) invert(1);">
                </a>
            </div>
            <div class="sidenav-toggle" v-if="!viewSideBar">
                <button class="btn-circle" @click="showSideBar()">
                    <i class="fas fa-times-circle "></i>
                </button>
            </div>
            <hr class="horizontal dark mt-0">
            <div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main">
                <ul class="navbar-nav ">
                
                    <li class="nav-item">
                        <a @click="toggleDropdown('adminMenu')" class="nav-link" href="#" role="button"
                            aria-expanded="false">
                            <div
                                class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">

                                <i class="fa-solid fa-gears" style="color: #FFD43B; font-size: 1.2rem"></i>

                            </div>
                            <span
                                class="nav-link-text ms-1  text-uppercase text-xs font-weight-bolder opacity-6 text-white">Administración
                                <i
                                    :class="['fas', isDropdownOpen['adminMenu'] ? 'fa-chevron-up' : 'fa-chevron-down', 'ms-auto']"></i>
                            </span>
                        </a>
                        <div :class="{ 'collapse': !isDropdownOpen['adminMenu'], 'show': isDropdownOpen['adminMenu'] }"
                            class="collapse" id="adminMenu">
                            <ul class="nav ms-4">
                                <li class="nav-item">
                        <RouterLink to="/profileWeb" class="nav-link " :class="route.meta.breadcrumb == 'Perfil' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="ni ni-single-02" style="color: #74C0FC; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Perfil</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'empresa ver')">
                        <RouterLink to="/empresaedicion" class="nav-link " :class="route.meta.breadcrumb == 'Empresa' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-building" style="color: #FFD43B; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Empresa</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'red social ver')">
                        <RouterLink to="/redes-sociales" class="nav-link " :class="route.meta.breadcrumb == 'Redes Sociales' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-globe" style="color: #ffffff; font-size: 1.2rem" ></i>
                            
                            </div>
                            <span class="nav-link-text ms-1 text-white">Redes Sociales</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'reconocimiento ver')">
                        <RouterLink to="/reconocimientos" class="nav-link " :class="route.meta.breadcrumb == 'Reconocimientos' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-trophy" style="color: #63E6BE; font-size: 1.2rem" ></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Reconocimientos</span>
                        </RouterLink>
                    </li>
            </ul>
        </div>
    </li>
    <li class="nav-item mt-3">
                        <a @click="toggleDropdown('creadorContenidoMenu')" class="nav-link" href="#" role="button"
                            aria-expanded="false">
                            <div
                                class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-layer-group" style="color: #FFD43B; font-size: 1.2rem"></i>
                            </div>
                            <span
                                class="nav-link-text ms-1  text-uppercase text-xs font-weight-bolder opacity-6 text-white">Creador
                                de Contenido
                                <i
                                    :class="['fas', isDropdownOpen['creadorContenidoMenu'] ? 'fa-chevron-up' : 'fa-chevron-down', 'ms-auto']"></i>
                            </span>
                        </a>
                        <div :class="{ 'collapse': !isDropdownOpen['creadorContenidoMenu'], 'show': isDropdownOpen['creadorContenidoMenu'] }"
                            class="collapse" id="creadorContenidoMenu">
                            <ul class="nav ms-4">
                                <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'actividad ver')">
                        <RouterLink to="/actividades" class="nav-link" :class="route.meta.breadcrumb == 'Actividades' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-person-walking" style="color: #74C0FC; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Actividades</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'beneficio ver')">
                        <RouterLink to="/beneficios" class="nav-link" :class="route.meta.breadcrumb == 'Beneficios' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-regular fa-handshake" style="color: #FFD43B; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Beneficios</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'paso postulacion ver')">
                        <RouterLink to="/postulacion-pasos" class="nav-link" :class="route.meta.breadcrumb == 'Postulacion Pasos' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-shoe-prints" style="color: #ffffff; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white" >Pasos 
                                <br> Postulación  </span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'modelo ver')">
                        <RouterLink to="/modelos" class="nav-link" :class="route.meta.breadcrumb == 'Modelos' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-window-restore" style="color: #63E6BE; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Modelos</span>
                        </RouterLink>
                    </li>
                    
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'testimonio ver')">
                        <RouterLink to="/testimonios" class="nav-link" :class="route.meta.breadcrumb == 'Testimonios' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-comments" style="color: #74C0FC; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white" >Testimonios</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'convocatoria ver')">
                        <RouterLink to="/convocatorias" class="nav-link" :class="route.meta.breadcrumb == 'Convocatorias' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-bullhorn" style="color: #FFD43B; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Convocatorias</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'red social ver')">
                        <RouterLink to="/pagina-imagenes" class="nav-link " :class="route.meta.breadcrumb == 'Imagenes de paginas' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="ni ni-camera-compact" style="color: #ffffff; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Imagenes web</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item" v-if="permisoStore.permisosUser.some(element=> element === 'contacto ver')">
                        <RouterLink to="/contactanos" class="nav-link" :class="route.meta.breadcrumb == 'Mensajes Contacto' ? 'active' : '' ">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-envelope" style="color: #63E6BE; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1 text-white">Mensajes <br>Contacto</span>
                        </RouterLink>
                    </li>

                            </ul>
                        </div>
                    </li>

                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/usuarios">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fa-solid fa-id-card-clip" style="color: #FFD43B; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1  text-uppercase text-xs font-weight-bolder opacity-6 text-white">Gestion CRM</span>
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link " to="/login" @click="logout()">
                            <div
                                class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="fas fa-times-circle" style="color: #ffffff; font-size: 1.2rem"></i>
                            </div>
                            <span class="nav-link-text ms-1  text-uppercase text-xs font-weight-bolder opacity-6 text-white">Cerrar sesión</span>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </aside>
        <main class="main-content position-relative border-radius-lg ">
            <!-- Navbar -->
            <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
                data-scroll="false">
                <div class="container-fluid py-1 px-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                            <li class="breadcrumb-item text-sm"><span class="text-white">Pagina</span></li>

                            <li class="breadcrumb-item text-sm text-white active" aria-current="page">
                                {{ route.meta.breadcrumb }}
                            </li>
                        </ol>
                    </nav>
                    <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                        </div>
                        <ul class="navbar-nav  justify-content-end">
                            <li class="nav-item d-flex align-items-center">
                                <RouterLink class="nav-link" to="/login" @click="logout()">
                                    <span class="nav-link-text fw-bold ms-1 text-white"><i
                                            class="fa-regular fa-circle-xmark"></i> Cerrar sesión</span>
                                </RouterLink>
                            </li>
                            <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                                <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav"
                                    @click="showSideBar()">
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
                <footer class="footer pt-3  ">
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
import { onMounted, ref } from 'vue';
import { RouterView, useRoute, RouterLink } from 'vue-router'
import { usePermisoStore } from '@/stores/PermisosStore';
import { cerrarSesion } from '@/services/AuthService';
const permisoStore = usePermisoStore();
const viewSideBar = ref(true);
const sizeScreen = ref(null);
const route = useRoute();
const isDropdownOpen = ref({
        'adminMenu': true
    });
const showSideBar = () => {
    viewSideBar.value = !viewSideBar.value;
}
const toggleDropdown = (menuId) => {
        isDropdownOpen.value[menuId] = !isDropdownOpen.value[menuId];
    };
onMounted(() => {
    sizeScreen.value = window.innerWidth
    import('/public/plantilla_argon/assets/js/core/popper.min.js');
    import('/public/plantilla_argon/assets/js/core/bootstrap.min.js');
    import('/public/plantilla_argon/assets/js/plugins/perfect-scrollbar.min.js');
    import('/public/plantilla_argon/assets/js/argon-dashboard.min.js');
    permisoStore.permisos();
})
const logout = async () => {
    try {
        const { data } = await cerrarSesion();
        localStorage.clear();
    } catch (error) {
        console.log(error);
    }
}
</script>
<style>
@import '/plantilla_argon/assets/css/nucleo-icons.css';
@import '/plantilla_argon/assets/css/nucleo-svg.css';
@import '/plantilla_argon/assets/css/nucleo-svg.css';
@import '/plantilla_argon/assets/css/argon-dashboard.css';

.sidenav-toggle {
    position: absolute;
    top: 50px;
    right: -20px;
    z-index: 1000;
}

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #7e7e7ef8 #727272cb;
    border-radius:80px;
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
    overflow: visible;
}

.total {
    height: 100vh;
}

/** ESTILOS PERSOANLIZADOS */
.text-warning-personalizado {
    color: rgb(255, 195, 0);
}

.badge-success-personalizado {
    color: #1aae6e;
    background-color: #b0eed3;
}

.badge-danger-personalizado {
    color: #f80031;
    background-color: #fdd1da;
}

.table-gray-personalizado {
    background-color: #495057;
    color: white
}
</style>