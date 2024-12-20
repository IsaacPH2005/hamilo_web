<template>
	<div class="row gy-3">
		<div class="col-12">
			<div class="card border border-0 shadow-lg">
				<div class="card-body">
					<h5 class="card-title font-weight-bolder">
						<i class="fas fa-pencil me-2"></i>Nuevo Registro
					</h5>
				</div>
			</div>
		</div>
		<div class="col-12">
			<div class="card shadow-lg">
				<div class="card-body">
					<div class="row gy-3">
						<div class="col-12 col-md-6">
							<label
								for="titulo"
								class="form-label font-weight-bolder text-sm"
								>Titulo<span class="text-danger fst-italic"
									>*</span
								></label
							>
							<input
								type="text"
								class="form-control border-danger"
								placeholder="Escriba..."
								id="titulo"
							/>
							<small class="text-danger fst-italic text-xs"
								><i class="fas fa-times me-1"></i>Este campo es
								requerido</small
							>
						</div>
						<div class="col-12 col-md-6">
							<label
								for="nombre"
								class="form-label font-weight-bolder text-sm"
								>Nombre<span class="text-danger fst-italic"
									>*</span
								></label
							>
							<input
								type="text"
								class="form-control"
								placeholder="Escriba..."
								id="nombre"
							/>
						</div>
						<div class="col-12 col-md-6">
							<label
								for="descripcion_corta"
								class="form-label font-weight-bolder text-sm"
								>Descripcion<span
									class="text-info text-xs fst-italic"
									>(Corta)</span
								></label
							>
							<input
								type="text"
								class="form-control"
								placeholder="Escriba..."
								id="descripcion_corta"
							/>
						</div>
						<div class="col-12 col-md-6">
							<label
								for="descripcion_larga"
								class="form-label font-weight-bolder text-sm"
								>Descripcion<span
									class="text-info text-xs fst-italic"
									>(Larga)</span
								></label
							>
							<textarea
								id="descripcion_larga"
								class="form-control"
								placeholder="Escriba..."
							></textarea>
						</div>
						<div class="col-12 text-center">
							<button
								type="button"
								class="btn btn-danger me-2"
								@click="volver()"
							>
								<i class="fas fa-reply me-2"></i>Volver
							</button>
							<button type="button" class="btn btn-primary ms-2">
								Guardar<i class="fas fa-save ms-2"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const volver = () => {
	router.push("/tabla-plantilla");
};
</script>
<style></style>
