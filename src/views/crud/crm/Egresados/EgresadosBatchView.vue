<template>
  <div class="row gy-3">
    <div class="col-12">
      <div class="card border border-0 shadow-lg mb-3">
        <div class="card-body">
          <h5 class="card-title font-weight-bolder text-center">
            <i class="fa-solid fa-school me-2"></i>Batchs activos
          </h5>
        </div>
      </div>
    </div>
    <div class="col-12" >
      <div class="card border border-0 shadow-lg">
        <div class="card-body">
          <div class="container">
            <div class="row">
              <div class="d-flex flex-wrap justify-content-center">
                <div  class="card-container me-3 mb-3" v-for="batch in paginatedBatches" :key="batch.id">
                  <div class="card cards text-center" >
                    <img v-if="batch.imagen!=null" :src="batch.imagen" class="card-img-top" alt="Imagen del Batch">
                    <img v-else-if="batch.crm_especialidades.imagen!=null" :src="batch.crm_especialidades.imagen"  alt="Imagen del Batch" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">{{ batch.crm_especialidades.nombre }}</h5>
                      <p class="card-text">Version {{ batch.version }}</p>
                      <a @click.prevent="goToBatchUsers(batch.id)" href="#" class="btn btn-primary">Ver Estudiantes</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mt-3">
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === 1 }"
                >
                  <button
                    type="button"
                    class="page-link"
                    aria-label="Previous"
                    @click="changePage(currentPage - 1)"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li class="page-item">
                  <button type="button" class="page-link">
                    {{ currentPage }}
                  </button>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage >= totalPages }"
                >
                  <button
                    type="button"
                    class="page-link"
                    aria-label="Next"
                    @click="changePage(currentPage + 1)"
                  >
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useBatchStore } from '@/stores/BatchStore';
import { index } from '@/services/EvaluacionesService';

const batches = ref([]);
const currentPage = ref(1);
const itemsPerPage = 3;
const router = useRouter();
const batchStore = useBatchStore();

const fetchBatches = async () => {
  try {
    let filtrado=[];
    const { data } = await index();
    batches.value = data.datos.data;
    batches.value.forEach(element => {
      if (element.is_deleted!=1) {
        filtrado.push(element);
      }
    });
    batches.value=filtrado;
  } catch (error) {
    console.error('Error al obtener los batches:', error);
  }
};

const goToBatchUsers = (batchId) => {
  batchStore.setBatchId(batchId);
  router.push(`/estudiantesBatch/${batchId}`);
};

const paginatedBatches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return batches.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(batches.value.length / itemsPerPage));

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(() => {
  fetchBatches();
});
</script>



<style scoped>
.card-container {
  width: 18rem;
}

.cards {
  width: 100%;
  max-width: 18rem;
  border: 2px solid #000000;
  border-radius: 0.375rem;
}

.card-img-top {
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.text-center {
  text-align: center;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
