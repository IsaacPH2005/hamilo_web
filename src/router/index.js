import { createRouter, createWebHistory } from 'vue-router';
//Layouts  
import AdminCrudLayout from "@/layouts/AdminCrudLayout.vue";
import AdminWebLayout from "@/layouts/AdminWebLayout.vue";
import WebLayout from "@/layouts/WebLayout.vue";
// Autenticación y generales  
import LoginView from "../views/auth/LoginView.vue";
import RegistroView from "../views/auth/RegistroView.vue";
// CRM  
import TipoPruebas from "@/views/crud/crm/tipo_pruebas/TipoPruebasView.vue";
import TipoPruebasForm from "@/views/crud/crm/tipo_pruebas/TipoPruebasFormView.vue";
import PruebasView from "@/views/crud/crm/Pruebas/PruebasView.vue";
import PruebasFormView from "@/views/crud/crm/Pruebas/PruebasFormView.vue";
import PruebasRevisionView from '@/views/crud/crm/Pruebas/PruebasRevisionView.vue';
import PerfilView from "@/views/perfil/PerfilView.vue";
import PermisosView from "@/views/crud/crm/permisos/PermisosView.vue";
import RolesView from "@/views/crud/crm/roles/RolesView.vue";
import RolesFormView from "@/views/crud/crm/roles/RolesFormView.vue";
import ModulosIndex from "@/views/crud/crm/modulos/ModulosIndex.vue";
import ModulosCreate from "@/views/crud/crm/modulos/ModulosCreate.vue";
import ModulosShow from "@/views/crud/crm/modulos/ModulosShow.vue";
import ModulosEdit from "@/views/crud/crm/modulos/ModulosEdit.vue";
import TecnologiasIndex from "@/views/crud/crm/tecnologias/TecnologiasIndex.vue";
import TecnologiasCreate from "@/views/crud/crm/tecnologias/TecnologiasCreate.vue";
import TecnologiasShow from "@/views/crud/crm/tecnologias/TecnologiasShow.vue";
import TecnologiasEdit from "@/views/crud/crm/tecnologias/TecnologiasEdit.vue";
import SolicitudesView from "@/views/crud/crm/solicitudes/SolicitudesView.vue";
import SolicitudFormView from "@/views/crud/crm/solicitudes/SolicitudFormView.vue";
import Evaluaciones from "@/views/crud/crm/evaluaciones/Evaluaciones.vue";
import EvaluacionesForm from "@/views/crud/crm/evaluaciones/EvaluacionesForm.vue";
import UsuarioList from "@/views/crud/crm/evaluaciones/UsuarioList.vue";
import PostulacionesView from "@/views/crud/crm/postulaciones/Postulaciones.vue";
import PostulacioneshistorialformView from "@/views/crud/crm/postulaciones/PostulacionesHistorial.vue";
import EntrevistasView from "@/views/crud/crm/entrevistas/EntrevistasView.vue";
import Nuevaentrevista from "@/views/crud/crm/entrevistas/NuevaEntrevistaView.vue";
import ExperienciasView from "@/views/crud/crm/experiencias/ExperienciasView.vue";
import ExperienciasForm from "@/views/crud/crm/experiencias/ExperienciasForm.vue";
import CertificacionesView from "@/views/crud/crm/certificaciones/CertificacionesView.vue";
import CertificacionesForm from "@/views/crud/crm/certificaciones/certificacionesForm.vue";
import Dashboard from '@/views/crud/crm/dashboard/Dashboard.vue';
import UsuariosView from "@/views/crud/crm/usuarios/UsuariosView.vue";
import PropuestasEmpleosFormView from '@/views/web/PropuestasEmpleoFormView.vue';
import PropuestasEmpleosView from '@/views/crud/crm/propuestas_empleos/PropuestasEmpleosView.vue';
// Crm_Especialidad 
import Especiliadad from "@/views/crud/crm/especialidades/Especiliadad.vue";
import EspecialidadNueva from "@/views/crud/crm/especialidades/EspecialidadNueva.vue";
import EspecialidadDetalle from "@/views/crud/crm/especialidades/EspecialidadDetalle.vue";
// Crm_Batchs 
import BatchNuevo from "@/views/crud/crm/batchs/BatchNuevo.vue";
import Batch from "@/views/crud/crm/batchs/Batch.vue";
import BatchDetalle from "@/views/crud/crm/batchs/BatchDetalle.vue";
// Crm_Curriculas
import Curricula from "@/views/crud/crm/curriculas/Curricula.vue";
import CurriculaNueva from "@/views/crud/crm/curriculas/CurriculaNueva.vue";
// Crm Empleo Estados
import EmpleoEstadosView from '@/views/crud/crm/empleo_estados/EmpleoEstadosView.vue';
import EmpleoEstadosFormView from '@/views/crud/crm/empleo_estados/EmpleoEstadosFormView.vue';
// Crm Registros
import RegistrosBatch from '@/views/crud/crm/registros/RegistrosBatchView.vue';
import RegistrosBatchView from '@/views/crud/crm/registros/RegistrosView.vue';
// web  
import RedesSociales from "@/views/crud/web/RedesSociales/RedesSocialesView.vue";
import RedesSocialesForm from "@/views/crud/web/RedesSociales/RedesSocialesFormView.vue";
import Reconocimientos from "@/views/crud/web/Reconocimientos/ReconocimientosView.vue"
import ReconocimientosForm from "@/views/crud/web/Reconocimientos/ReconocimientosFormView.vue"
import PostulacionPasos from '@/views/crud/web/postulacion-pasos/PostulacionPasosView.vue';
import PostulacionPasosForm from '@/views/crud/web/postulacion-pasos/PostulacionPasosForm.vue';
import PostulacionPasosDeta from '@/views/crud/web/postulacion-pasos/PostulacionPasosDetalle.vue';
import Actividades from "@/views/crud/web/actividades/ActividadesView.vue";
import ActividadForm from "@/views/crud/web/actividades/ActividadFormView.vue";
import PaginaImagenes from "@/views/crud/web/paginas-imagenes/PaginaImagenesView.vue";
import PaginaImagenesForm from "@/views/crud/web/paginas-imagenes/PaginaImagenesFormView.vue";
import EmpresaEdit from "@/views/crud/web/empresa/EmpresaEdit.vue";
import TestimoniosView from "@/views/crud/web/testimonios/TestimoniosView.vue";
import TestimoniosFormularioView from "@/views/crud/web/testimonios/TestimoniosFormularioView.vue";
import Convocatorias from '@/views/crud/web/Convocatorias/ConvocatoriasView.vue';
import ConvocatoriasForm from '@/views/crud/web/Convocatorias/ConvocatoriasFormView.vue';
import ContactanosView from "@/views/crud/web/Contactos/ContactanosView.vue";
// Págiina Web 
import BlogView from "@/views/web/blog/BlogView.vue";
import HomeView from '@/views/web/home/HomeView.vue';
import EditarEvaluacion from '@/views/crud/crm/evaluaciones/EditarEvaluacion.vue';
import AgregarEvaluacion from '@/views/crud/crm/evaluaciones/AgregarEvaluacion.vue';
import BlogForm from '@/views/web/blog/BlogForm.vue';
import EventosReconocimientos from '@/views/web/eventos/EventosReconocimientos.vue';
import Talentos from '@/views/web/contratame/Talentos.vue';
import ContactoView from "@/views/web/contacto/ContactoView.vue";
// Solicitudes Admin
import SolicitudesAdmin from '@/views/crud/crm/solicitudes/SolicitudesAdminView.vue';
//modelos
import ModelosView from "@/views/crud/web/modelos/ModelosView.vue";
import ModelosFormView from "@/views/crud/web/modelos/ModelosFormView.vue";
import EmpresaAboutView from '@/views/web/acercaDe/EmpresaAboutView.vue';
import PostulacionView from '@/views/web/PostulacionView.vue';
import CarrerasView from '@/views/web/carrerasBachts/CarrerasView.vue';
import BeneficiosView from '@/views/crud/web/beneficios/BeneficiosView.vue';
import BeneficiosFormView from '@/views/crud/web/beneficios/BeneficiosFormView.vue';
import CarreraView from '@/views/web/carrerasBachts/CarreraView.vue';
import Page404 from '@/views/Page404.vue';
//Egresados
import EgresadosBatchView from '@/views/crud/crm/Egresados/EgresadosBatchView.vue';
import EstudiantesList from '@/views/crud/crm/Egresados/EstudiantesList.vue';
import EgresadosList from '@/views/crud/crm/Egresados/EgresadosList.vue';
import SolicitudesEstadosView from '@/views/crud/crm/solicitudes/SolicitudesEstadosView.vue';
import EditarEntrevista from '@/views/crud/crm/entrevistas/EditarEntrevista.vue';
import PostularView from '@/views/web/home/PostularView.vue';
import CalendarioView from "@/views/crud/crm/entrevistas/CalendarioView.vue";
import EntrevistaResultado from "@/views/crud/crm/entrevistas/EntrevistaResultadoView.vue";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/admin-web",
			component: AdminWebLayout,
			children: [
				//rutas web
				{
					path: "/redes-sociales",
					name: "RedesSociales",
					component: RedesSociales,
					meta: { breadcrumb: "Redes Sociales" },
				},
				{
					path: "/redes-sociales-form/:idRedesSociales?",
					name: "RedesSocialesForm",
					component: RedesSocialesForm,
					meta: { breadcrumb: "Redes Sociales" },
				},
				{
					path: "/reconocimientos",
					name: "reconocimientos",
					component: Reconocimientos,
					meta: { breadcrumb: "Reconocimientos" },
				},
				{
					path: "/reconocimientos-form/:idReconocimiento?",
					name: "reconocimientos-form",
					component: ReconocimientosForm,
					meta: { breadcrumb: "Reconocimientos" },
				},
				{
					path: '/postulacion-pasos',
					name: "PostulacionPasos",
					component: PostulacionPasos,
					meta: { breadcrumb: "Postulacion Pasos" },
				},
				{
					path: '/postulacion-pasos-formulario/:idPostulacionPasos?',
					name: "PostulacionPasosFormulario",
					component: PostulacionPasosForm,
					meta: { breadcrumb: "Postulacion Pasos" },
				},
				{
					path: '/postulacion-pasos-detalle/:idPostulacionPasosDet?',
					name: "PostulacionPasosDetalle",
					component: PostulacionPasosDeta,
					meta: { breadcrumb: "Postulacion Pasos" },
				},
				{
					path: '/testimonios',
					name: 'Testimonios',
					component: TestimoniosView,
					meta: { breadcrumb: "Testimonios" },
				},
				{
					path: '/testimonios-nuevo/:idTestimonio?',
					name: 'Nuevo_Testimonio',
					component: TestimoniosFormularioView,
					meta: { breadcrumb: "Testimonios" }
				},

				{
					path: "/empresaedicion",
					component: EmpresaEdit,
					name: 'Web_Empresa',
					meta: { breadcrumb: "Empresa" }
				},

				{
					path: "/actividades",
					name: 'actividades',
					component: Actividades,
					meta: { breadcrumb: "Actividades" },
				},

				{
					path: "/actividad-form",
					name: 'Nueva actividad',
					component: ActividadForm,
					meta: { breadcrumb: "Actividades" },
				},

				{
					path: "/pagina-imagenes",
					name: 'Imagenes pagina',
					component: PaginaImagenes,
					meta: { breadcrumb: "Imagenes de paginas" },
				},

				{
					path: "/pagina-imagenes-form",
					name: 'Nueva imagen pagina',
					component: PaginaImagenesForm,
					meta: { breadcrumb: "Imagenes de paginas" },
				},


				{
					path: '/convocatorias',
					name: 'Convocatorias',
					component: Convocatorias,
					meta: { breadcrumb: 'Convocatorias' }
				},
				{
					path: '/convocatorias-formulario/:idConvocatoria?',
					name: 'Convocatoria Formulario',
					component: ConvocatoriasForm,
					meta: { breadcrumb: 'Convocatorias' }
				},
				{
					path: "/modelos",
					name: "modelos",
					component: ModelosView,
					meta: { breadcrumb: "Modelos" },
				},
				{
					path: "/modelos-form/:idModelo?",
					name: "modelosFormulario",
					component: ModelosFormView,
					meta: { breadcrumb: "Modelos" },
				},
				{
					path: "/beneficios",
					name: "Beneficios",
					component: BeneficiosView,
					meta: { breadcrumb: "Beneficios" },
				},
				{
					path: "/beneficios-form/:idBeneficio?",
					name: "BeneficiosForm",
					component: BeneficiosFormView,
					meta: { breadcrumb: "Beneficios" },
				},
				{
					path: "/contactanos",
					name: "Contactos",
					component: ContactanosView,
					meta: { breadcrumb: "Mensajes Contacto" },
				},
				{
					path: "/profileWeb",
					name: "profileWeb",
					component: PerfilView,
					meta: { breadcrumb: "Perfil" },
				}
			],
		},
		{
			path: "/admin-crud",
			component: AdminCrudLayout,
			children: [
				//rutas crm   
				{
					path: "/especialidad",
					name: 'especialidad',
					component: Especiliadad,
					meta: { breadcrumb: "Especialidades listar" },
				},
				{
					path: "/especialidad-nueva/:idEspecialidad?",
					name: 'especialidadNueva',
					component: EspecialidadNueva,
					meta: { breadcrumb: "Especialidades formulario" },
				},
				{
					path: "/especialidad-detalle/:idDetalle?",
					name: "especialidadDetalle",
					component: EspecialidadDetalle,
					meta: { breadcrumb: "Especialidades detalle" },
				},
				{
					path: "/batch",
					name: 'batch',
					component: Batch,
					meta: { breadcrumb: "Batchs listar" },
				},
				{
					path: "/batch-nueva/:idBatch?",
					name: 'batch-nuevo',
					component: BatchNuevo,
					meta: { breadcrumb: "Batchs formulario" },
				},
				{
					path: "/batch-detalle/:idDetalle?",
					name: 'batch-detalle',
					component: BatchDetalle,
					meta: { breadcrumb: "Batchs detalle" },
				},
				{
					path: "/curricula",
					name: 'curricula',
					component: Curricula,
					meta: { breadcrumb: "Curriculas listar" },
				},
				{
					path: "/curricula-nueva/:idCurricula?",
					name: 'curricula-nueva',
					component: CurriculaNueva,
					meta: { breadcrumb: "Curriculas formulario" },
				},
				{
					path: "/permisos",
					name: "permisos",
					component: PermisosView,
					meta: { breadcrumb: "Permisos" },
				},
				{
					path: "/roles",
					name: "roles",
					component: RolesView,
					meta: { breadcrumb: "Roles" },
				},
				{
					path: "/roles-form",
					name: "roles-form",
					component: RolesFormView,
					meta: { breadcrumb: "Roles" },
				},
				{
					path: "/profile",
					name: "profile",
					component: PerfilView,
					meta: { breadcrumb: "Perfil" },
				},
				{
					path: "/solicitudes",
					name: "solicitudes",
					component: SolicitudesView,
					meta: { breadcrumb: "solicitudes" }
				},
				{
					path: "/solicitudes-form/:idSolicitud?",
					name: "solicitudes formulario",
					component: SolicitudFormView,
					meta: { breadcrumb: "solicitudes formulario" }
				},
				{
					path: "/tipo-pruebas",
					name: "tipo pruebas",
					component: TipoPruebas,
					meta: { breadcrumb: "Tipo Pruebas" },
				},
				{
					path: "/tipo-pruebas-form/:idTipoPruebas?",
					name: "tipo pruebas form",
					component: TipoPruebasForm,
					meta: { breadcrumb: "Tipo pruebas formulario" },
				},
				{
					path: "/pruebas",
					name: "pruebas",
					component: PruebasView,
					meta: { breadcrumb: "Pruebas" },
				},
				{
					path: "/pruebas-form/:idPruebas?",
					name: "pruebas form",
					component: PruebasFormView,
					meta: { breadcrumb: "Pruebas Formulario" },
				},
				{
					path: "/pruebas-revision",
					name: "pruebas revision",
					component: PruebasRevisionView,
					meta: { breadcrumb: "Pruebas Revision" },
				},
				{
					path: "/Evaluaciones-batch",
					component: EvaluacionesForm,
					meta: { breadcrumb: "Evaluaciones Batch" },
				},
				{
					path: '/batch/:batchId',
					name: 'UsuarioList',
					component: UsuarioList,
					props: true,
				},
				{
					path: '/evaluaciones/:registroId',
					name: 'evaluaciones',
					component: Evaluaciones,
					props: true
				},
				{
					path: "/modulos",
					name: "modulos",
					component: ModulosIndex,
					meta: { breadcrumb: "Lista módulos" },
				},
				{
					path: "/modulos/crear",
					name: "moduloNew",
					component: ModulosCreate,
					meta: { breadcrumb: "Nuevo módulo" },
				},
				{
					path: "/modulos/:id",
					name: "moduloShow",
					component: ModulosShow,
					meta: { breadcrumb: "Detalle módulo" },
				},
				{
					path: "/modulos/:id/edit",
					name: "moduloEdit",
					component: ModulosEdit,
					meta: { breadcrumb: "Editar módulo" },
				},
				{
					path: '/tecnologias',
					name: "tecnologias",
					component: TecnologiasIndex,
					meta: { breadcrumb: "Lista tecnologías" }
				},
				{
					path: '/tecnologias/crear',
					name: "tecnologiaNew",
					component: TecnologiasCreate,
					meta: { breadcrumb: "Nueva tecnología" }
				},
				{
					path: '/tecnologias/:id',
					name: "tecnologiaShow",
					component: TecnologiasShow,
					meta: { breadcrumb: "Detalle tecnología" }
				},
				{
					path: '/tecnologias/:id/edit',
					name: "tecnologiaEdit",
					component: TecnologiasEdit,
					meta: { breadcrumb: "Editar tecnología" }
				},
				{
					path: '/postulaciones',
					component: PostulacionesView,
					meta: { breadcrumb: "Postulaciones listar" },
				},
				{
					path: '/postulacioneshistorial',
					component: PostulacioneshistorialformView,
					meta: { breadcrumb: "PostulacionesHistorial listar" },
				},
				{
					path: "/entrevistas",
					component: EntrevistasView,
					meta: { breadcrumb: "Modelos formulario" },
				},
				{
					path: "/nuevaentrevista",
					component: Nuevaentrevista,
					meta: { breadcrumb: "Modelos formulario" },
				},
				{
					path: "/editar-entrevista/:idEntrevista?",
					component: EditarEntrevista,
                    meta: { breadcrumb: "Modelos formulario" },
				},
				{
					path: "/experiencias",
					component: ExperienciasView,
					meta: { breadcrumb: "Experiencias" },
				},
				{
					path: "/experiencias-form/:id?",
					component: ExperienciasForm,
					meta: { breadcrumb: "Experiencias formulario" },
				},
				/*{
					path: "/experiencias/:id",
					component: ExperienciasForm,
					meta: { breadcrumb: "Experiencias formulario" },
				},*/
				{
					path: "/certificaciones",
					component: CertificacionesView,
					meta: { breadcrumb: "Certificaciones" },
				},
				{
					path: "/certificaciones-form/:id?",
					component: CertificacionesForm,
					meta: { breadcrumb: "Certificaciones formulario" },
				},
				{
					path: '/empleo-estados',
					component: EmpleoEstadosView,
					meta: { breadcrumb: 'Empleo Estados' }
				},
				{
					path: '/empleo-estados-formulario',
					component: EmpleoEstadosFormView,
					meta: { breadcrumb: 'Empleo Estados Formulario' }
				},
				{
					path: '/batch_registros/:id',
					component: RegistrosBatch,
					meta: { breadcrumb: 'RegistrosBatch' }
				},
				{
					path: '/RegistrosBatch',
					component: RegistrosBatchView,
					meta: { breadcrumb: 'RegistrosView' }
				},
				{
					path: '/agregar-evaluacion/:registroId',
					name: 'agregar-evaluacion',
					component: AgregarEvaluacion,
					props: true
				},
				{
					path: '/evaluaciones/editar/:id',
					name: 'editar-evaluacion',
					component: EditarEvaluacion
				},
				{
					path: "/solicitudes-admin",
					name: "solicitudes admin",
					component: SolicitudesAdmin,
					meta: { breadcrumb: "solicitudes admin" }
				},
				{
					path: "/dashboard",
					name: "CRM Dashboard",
					component: Dashboard,
					meta: { breadcrumb: "Redes Sociales" },
				},
				{
					path: "/usuarios",
					name: "usuarios",
					component: UsuariosView,
					meta: { breadcrumb: "Usuarios" }
				},
				{
					path: "/estudiantes",
					component: EgresadosBatchView,
					meta: { breadcrumb: "Batch Activos" },
				},
				{
					path: '/estudiantesBatch/:batchId',
					component: EstudiantesList,
					meta: { breadcrumb: "Estudiantes por batch" },
				},
				{
					path: "/solicitudes-estados",
					name: "solicitudes estados",
					component: SolicitudesEstadosView,
					meta: { breadcrumb: "solicitudes estados" }
				},
				{
					path: "/entrevista-calendario",
					name: "Entrevista calendario",
					component: CalendarioView,
					meta: { breadcrumb: "Calendario entrevista" }
				},
				{
					path: "/propuestas-empleos",
					name: "Ofertas laborales",
					component: PropuestasEmpleosView,
					meta: { breadcrumb: "Ofertas laborales" }
				},
				{
					path: "/entrevista-resultados",
					name: "Entrevista Resultados",
					component: EntrevistaResultado,
					meta: { breadcrumb: "Entrevista Resultado" }
				}

			]
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/register",
			name: "register",
			component: RegistroView,
		},
		{
			path: "/",
			component: WebLayout,
			children: [
				{
					path: "/",
					component: HomeView,
				},
				{
					path: "/blogs",
					component: BlogView,
				},
				{
					path: "/blogs-form/:id?",
					component: BlogForm,
				},
				{
					path: "/about",
					component: EmpresaAboutView
				},
				{
					path: "/events",
					component: EventosReconocimientos
				},
				{
					path: "/form-postulacion",
					component: PostulacionView
				},
				{
					path: "/carreras",
					component: CarrerasView
				},
				{
					path: "/contacto",
					component: ContactoView
				},
				{
					path: "/talentos",
					component: Talentos
				},
				{
					path: "/carrera/:idCarrera?",
					component: CarreraView,
				},
				{
					path: "/postular",
					component: PostularView,
				},
				{
					path: "/ofertas-laborales",
					component: PropuestasEmpleosFormView,
				}
			],
		},

		{
			path: '/:catchAll(.*)',
			component: Page404
		}
	],
});

export default router;