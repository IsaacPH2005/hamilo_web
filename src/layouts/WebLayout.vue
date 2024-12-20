<template>
    <div class="monserrat-regular">
        <!---------- ICONOS SVG  ---------->
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <defs>
                <symbol id="facebook" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02" />
                </symbol>
                <symbol id="youtube" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73" />
                </symbol>
                <symbol id="instagram" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                </symbol>
                <symbol id="twitter" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23" />
                </symbol>
                <symbol id="linkedin" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                </symbol>
            </defs>
        </svg>
        <!---------- MENU   ---------->
        <div class="monserrat-bold">
            <div class="row">
                <div class="col-12">
                    <nav class="main-menu d-flex navbar navbar-expand-lg p-2 py-3 p-lg-4 py-lg-4 fixed-top"
                        style="background-color: #FFCC01;">
                        <div class="container-fluid">
                            <div class="main-logo d-lg-none p-0">
                                <RouterLink to="/" class="nav-link mx-2">
                                    <img src="../../public/jubilee/images/logo_gris.png" alt="logo" class="img-fluid"
                                        style="width: 150px; ">
                                </RouterLink>
                            </div>

                            <button class="navbar-toggler shadow-none" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <img src="../../public/jubilee/images/menu_black.png" alt="" width="30px">
                            </button>

                            <div class="offcanvas offcanvas-end"  id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel">

                                <div class="offcanvas-header mt-3">
                                    <button type="button" class="btn-close shadow-none bg-dark" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                                </div>

                                <div class="offcanvas-body justify-content-between">
                                    <div class="main-logo">
                                        <RouterLink to="/" class="nav-link">
                                            <img src="../../public/jubilee/images/logo_gris.png" alt="logo"
                                                class="img-fluid"
                                                style="display: block; max-height: 65px; border: none;">
                                        </RouterLink>
                                    </div>

                                    <ul class="navbar-nav menu-list list-unstyled align-items-lg-center d-flex gap-md-3 mb-0">
                                        <li class="nav-item" id="home-pagina">
                                            <a class="nav-link mx-1 txtMenu cursor-pointer" @click="cambiarMenu('/')" data-bs-dismiss="offcanvas"
                                            aria-label="Close">Home</a>
                                        </li>
                                        <li class="nav-item" id="contrata-talento">
                                            <div class="dropdown">
                                                <div class="nav-link mx-1 txtMenu cursor-pointer">Contrata talento<i
                                                        class="fa-solid fa-angle-down ms-1"></i></div>
                                                <div class="dropdown-content">
                                                    <a @click="cambiarMenu('/talentos')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Perfiles</a>
                                                    <a @click="cambiarMenu('/carreras')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Carreras</a>
                                                    <a @click="cambiarMenu('/ofertas-laborales')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Ofertas Laborales</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="nav-item" id="contrata-talento">
                                            <div class="dropdown">
                                                <div class="nav-link mx-1 txtMenu cursor-pointer">Estudiantes<i
                                                        class="fa-solid fa-angle-down ms-1"></i></div>
                                                <div class="dropdown-content">
                                                    <a @click="cambiarMenu('/login')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Iniciar Sesión</a>
                                                    <a @click="cambiarMenu('/postular')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Postúlate</a>
                                                    <a @click="cambiarMenu('/blogs')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Blog</a>
                                                    <a @click="cambiarMenu('/events')" class="txtMenu" data-bs-dismiss="offcanvas" aria-label="Close">Eventos</a>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="nav-item" id="contacto-pagina">
                                            <a @click="cambiarMenu('/contacto')" class="nav-link mx-1 txtMenu cursor-pointer" data-bs-dismiss="offcanvas" aria-label="Close">Contacto</a>
                                        </li>
                                    </ul>
                                    <ul class="navbar-nav sm-icons mr-0 align-items-lg-center d-flex">
                                        <li class="nav-item" v-for="item2 in redes" :key="item2.id"><a class="nav-link"
                                                :href="item2.url" target="_blank"><h5><i :class="item2.logo_img" style="font-size: 30px;"></i></h5></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <RouterView />
        </div>
        <footer id="footer" class="" style="background-color: #303644;">
            <div class="container ">
                <div class="row">
                    <div class="col-sm-6 col-lg-3 col-12 mt-6 mb-0">
                        <div class="footer-menu">
                            <RouterLink to="/">
                                <img src="../../public/jubilee/images/hamilo2.png" alt="logo" class="img-fluid"
                                    width="250px">
                            </RouterLink>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3 my-6 text-white mb-0">
                        <div class="footer-menu ">
                            <h5 class="fw-bold mb-4 text-white">Quick Links</h5>
                            <ul class="menu-list list-unstyled">
                                <li class="menu-item mb-2">
                                    <RouterLink to="/talentos" class="footer-link">Perfiles</RouterLink>
                                </li>
                                <li class="menu-item mb-2">
                                    <RouterLink to="/carreras" class="footer-link">Carreras</RouterLink>
                                </li>
                                <li class="menu-item mb-2">
                                    <RouterLink to="/events" class="footer-link">Eventos</RouterLink>
                                </li>
                                <li class="menu-item mb-2">
                                    <RouterLink to="/blogs" class="footer-link">Blog</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3 my-6 text-white mb-0" >
                        <div class="footer-menu ">
                            <h5 class="text-white fw-bold mb-4">Redes Sociales</h5>
                            <div class="redes">
                                <a v-for="item in redes" :key="item.id" class="footer-link me-3" :href="item.url"
                                    target="_blank"><h5><i :class="item.logo_img" class="text-white" style="font-size: 30px;"></i></h5></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-3 my-6 text-white mb-0">
                        <div class="footer-menu">
                            <h5 class="text-white fw-bold mb-4">Usuario</h5>
                            <ul class="menu-list list-unstyled">
                                <li class="menu-item mb-2">
                                    <RouterLink to="/login" class="footer-link"><i
                                            class="fas fa-sign-in-alt me-2"></i>Iniciar Sesion</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer-bottom" style="background-color: #303644;">
                <hr class="text-white">
                <div class="container mt-0">
                    <div class="row py-1 text-center">
                        <div class="col-12 copyright text-white">
                            <p>© 2024 Hamilo. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    </div>
</template>
<script setup>
import { RedesSocialesActivo } from '@/services/RedesSocialesService';
import { onMounted, ref } from 'vue';
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { indexPaginas, indexPaginasActivas, storePagina } from '@/services/PaginasService';
import { idsValidos } from '@/services/ids';

const router = useRouter()
// constante de paginas
const paginasActuales = ref([]);
//const paginaNuevas = ref([]);

const redes = ref([
    {
        id: "1",
        nombre: "vacio",
        logo_url: "vacio",
        url: "/public/jubilee/images/1post.png",
    },
]);

async function obtenerRedes() {
    try {
        const { data } = await RedesSocialesActivo();
        if (data.datos.length >= 1) {
            redes.value = data.datos;
        }
    } catch (error) {
        console.log(error);
    }
}
onMounted(() => {
    import('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js');
    //import('@/../public/jubilee/js/plugins.js');
    import('https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js');
    import('https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js');
    obtenerRedes();
    //llamar a cargar paginas
    cargarPaginas();
});

//paginas
const cargarPaginas = async () => {
    try {
        const { data } = await indexPaginasActivas();
        paginasActuales.value = data.mensaje;
        const allElements = document.querySelectorAll('*[id]');
        const ids = Array.from(allElements).map(element => element.id);
        const idsvalidos = idsValidos(ids, "-pagina");
        idsvalidos.forEach(element => {
            if (!paginasActuales.value.some(pagina => pagina.pagina === element)) {
                let objeto = {
                    pagina: element
                }
                registrarNuevaPagina(objeto);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
const cambiarMenu = param => {
      router.push({path: param});
    }
const registrarNuevaPagina = async (objeto) => {
    try {
        const { data } = await storePagina(objeto);
    } catch (error) {
        console.log(error);
    }
};
</script>
<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css';
@import '/public/jubilee/icomoon/icomoon.css';
@import '/public/jubilee/css/vendor.css';
@import '/public/jubilee/style.css';
@import 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap';
.monserrat-bold-titulo{
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  text-transform: none; 
}
.monserrat-regular-subtitulo {
 font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 25px;
  text-transform: none; 
}
.monserrat-regular {
font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  text-transform: none; 
}
.monserrat-regular-italic {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-style: italic;
  font-size: 18px;
  text-transform: none; 
}
.monserrat-bold-italic {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-style: italic;
  font-size: 18px;
  text-transform: none; 
}
.background {
    background-color: white;
}
.titulo{
	color: #303644;
}

.sm-icons {
    flex-direction: row;
}

.redes {
    display: flex;
}

.redes>p {
    margin: 0;
}

@media only screen and (max-width: 960px) {
    .sm-icons .nav-item {
        padding-right: 1em;
    }
}

@keyframes show {
    from {
        opacity: 0;
        scale: 25%;
    }

    to {
        opacity: 1;
        scale: 100%;
    }
}

section {
    view-timeline-name: --image;
    view-timeline-axis: block;
    animation-timeline: --image;
    animation-name: show;
    animation-range: entry 25% cover 30%;
    animation-fill-mode: both;
}

.button2 {
    border-bottom: 1px solid hsla(0, 0%, 1%, 0.2);
    text-shadow: 0 1px 0 hsla(0, 0%, 0%, 0.2);
    text-decoration: none !important;
    text-transform: uppercase;
    color: #fff !important;
    font-weight: bold;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 0 3px;
    position: relative;
    display: inline-block;
    -webkit-transition: all 0.1s;
    -moz-transition: all 0.1s;
    -o-transition: all 0.1s;
    transition: all 0.1s;
}

.button2:active {
    -webkit-transform: translateY(7px);
    -moz-transform: translateY(7px);
    -o-transform: translateY(7px);
    transform: translateY(7px);
}

.button-orange {
    background: #303644;
    box-shadow: 0 10px 0 #57617a,
        0 11px 5px hsla(0, 0%, 0%, 0.5);
}

.button-orange:active {
    box-shadow: 0 3px 0 #cc7000,
        0 4px 6px hsla(0, 0%, 0%, 0.7);
}

.footer-link {
    color: white;
    text-decoration: none;
}

.button-yellow {
    background: #ffcc01;
    border-radius: 5px;
    border: none;
}

.button-yellow:hover {
    background: #fcd127;
    opacity: 1;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    /* Ocultar el contenido por defecto */
    position: absolute;
    background-color: #ffcc01;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
    display: block;
    /* Mostrar el contenido al pasar el cursor */
}
.txtMenu {
    font-size: 18px !important; /* Forzar el tamaño */
    font-weight: bold !important;
    color:#303644 !important;
}
.menu-logo img {
    height: 100% !important;/* La imagen toma toda la altura del navbar */
    width: auto !important;/* Mantiene la proporción de la imagen */
}
</style>
