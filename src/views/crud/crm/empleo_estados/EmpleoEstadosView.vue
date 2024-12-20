<template>
    <div class="row gy-3">
        <div class="col-12">
            <div class="card border border-0 shadow-lg">                
                <div class="card-body">
                    <h5 class="card-title font-weight-bolder"><i class="fas fa-calendar me-2"></i>Empleo estado</h5>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <div class="row gy-2">
                        
                        <div class="col-12 col-md-4">
                            <div class="text-center">
                                <button type="button" class="btn btn-primary" v-if="permisoStore.permisosUser.some(p=>p === 'empleo estados crear')" @click="formulario()" ><i class="fas fa-plus-circle me-2"></i> Agregar</button>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table align-items-center justify-content-center text-sm" >
                                    <thead class="table-gray-personalizado">
                                        <tr class="text-white">
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                Item</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                               Curriculum</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                URL Portafolio</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center text-center">
                                                URL LinkeIn</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center">
                                                URL Github</th>
                                            <th
                                                class="text-uppercase font-weight-bolder text-center" >
                                                Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, indice) in datos" :key="item.id">
                                            <td class="text-center">{{ indice+1 }}</td>
                                            <td>{{ item.curriculum }}</td>
                                            <td>{{ item.url_portafolio }}</td>
                                            <td>{{ item.url_linkedin }}</td>
                                            <td class="text-center">
                                                <span class="badge" :class="item.is_deleted ? 'badge-danger-personalizado' : 'badge-success-personalizado'"  >{{ item.is_deleted ? 'Inactivo' : 'Activo'}}</span>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group btn-group-sm">
                                                    <a class="btn btn-info btn-xs" :href="urlBaseAsset+'/Documentos/Curriculums/'+item.curriculum" target="_blank"><i class="fas fa-eye"></i></a>
                                                  <button class="btn btn-warning btn-xs" @click="editar(item.id)">
                                                      <i class="fas fa-pencil"></i>
                                                  </button>   
                                                  <button class="btn btn-xs" :class="item.is_deleted ? 'btn-success' : 'btn-danger' "  @click="estado(item.id)"> 
                                                      <i :class="item.is_deleted ? 'fa-check' : 'fa-trash'" class="fas"></i>  
                                                  </button></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-12">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-center">
                                            <li class="page-item" :class="{ 'disabled' : paginacion.pagina<=1}">
                                                <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()"><span
                                                        aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" :class="{'active': item == paginacion.pagina}" v-for="(item, indice) in paginacion.total" :key="indice">
                                                <button type="button" class="page-link" @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item" :class="{'disabled' : paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next" @click="paginaNext()"><span
                                                        aria-hidden="true">&raquo;</span>
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
    </div>
  </template>
  <script setup>
  import { changeStatus,  index } from '@/services/EmpleoEstadosServices';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePermisoStore } from '@/stores/PermisosStore';
  import Swal from 'sweetalert2';
  import { urlBaseAsset } from '@/services/Http';
  const router = useRouter();
  const datos = ref([]);
  const errors = ref({});
  const permisoStore = usePermisoStore();
  const estado = async param => {
      try{
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está a punto de modificar el estado!",
            icon: "warning",
            showcancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, modificar!",
            cancelButtonText: "No, cancelar!"
             }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await changeStatus(param);
                    listar();
                    Swal.fire({
                        title: "Bien!",
                        text: data.message,
                        icon: "success",
                    });
                }
             });   
      }catch(error){
        if(error.response.status === 422){
            errors.value = error.response.data.errors;
            Swal.fire({
                title: "Error!",
                text: error.response.data.message,
                icon: "error",
            })
        }else{
            console.log(error);
        }
          
      }
  }
  const paginacion = ref({
      total: null,
      pagina: 1
  })
  onMounted(() => {
      listar();
      
  })
  
  const listar = async () => {
      try{
          const { data } = await index(paginacion.value.pagina);
          datos.value = data.datos.data;
          paginacion.value.total = data.datos.last_page;
          console.log(data);
      }catch(error) {
          console.log(error);
      }
  }
  
  const formulario = () => {
        router.push('/empleo-estados-formulario');
  }
  const paginaPrev = () => {
      paginacion.value.pagina++;
      listar();
  }
  const paginaNext = () => {
      paginacion.value.pagina--;
      listar();
  }
  const paginaCambio = param => {
      paginacion.value.pagina = param;
      listar();
  }
  
  const editar = param =>{
      router.push({path:`/empleo-estados-formulario/${param}`})
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
  
  .badge-danger-personalizado {
      color: #f80031;
      background-color: #fdd1da;
  }
  
  .table-gray-personalizado {
      background-color: #495057;
      color: white
  }
  
  </style>