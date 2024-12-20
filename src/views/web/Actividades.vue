<template>
	<div class="row gy-3">
		<div class="col-12">
			<div class="card border border-0 shadow-lg">
				<div class="card-body">
					<h5 class="card-title font-weight-bolder">
						<i class="fas fa-calendar me-2"></i>Actividades
					</h5>
				</div>
			</div>
		</div>
		<div class="col-12">
			<div class="card shadow-lg">
				<div class="card-body">
					<div class="row gy-2">
						<div class="col-12 col-md-8">
							<input
								type="search"
								class="form-control"
								placeholder="Buscar..."
							/>
						</div>
						<div class="col-12 col-md-4">
							<div class="text-center">
								<button
									type="button"
									class="btn btn-primary"
									@click="formulario()"
								>
									<i class="fas fa-plus-circle me-2"></i>
									Agregar
								</button>
							</div>
						</div>
						<div class="col-12">
							<div class="table-responsive">
								<table
									class="table align-items-center justify-content-center text-sm"
								>
									<thead class="table-gray-personalizado">
										<tr class="text-white">
											<th
												class="text-uppercase font-weight-bolder text-center"
											>
												Item
											</th>
											<th
												class="text-uppercase font-weight-bolder text-center"
											>
												Titulo
											</th>
											<th
												class="text-uppercase font-weight-bolder text-center text-center"
											>
												Usuario
											</th>
											<th
												class="text-uppercase font-weight-bolder text-center"
											>
												Estado
											</th>
											<th
												class="text-uppercase font-weight-bolder text-center"
											>
												Acciones
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td class="text-center">1</td>
											<td>Actividad 1 - Hamilo day 4</td>
											<td>Administrador</td>
											<td class="text-center">
												<span
													class="badge badge-success-personalizado"
													>Activo</span
												>
											</td>
											<td class="text-center">
												<div class="dropdown">
													<button
														class="btn btn-white dropdown-toggle btn-xs"
														type="button"
														data-bs-toggle="dropdown"
														id="navbarDropdownMenuLink2"
													>
														<i
															class="fas fa-list"
														></i>
													</button>
													<ul
														class="dropdown-menu"
														aria-labelledby="navbarDropdownMenuLink2"
													>
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-eye me-2 text-info"
																></i>
																Ver
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
																@click="
																	formulario()
																"
															>
																<i
																	class="fas fa-pencil me-2 text-warning-personalizado"
																></i>
																Editar
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-trash me-2 text-danger"
																></i>
																Estado
															</button>
														</li>
													</ul>
												</div>
											</td>
										</tr>
										<tr>
											<td class="text-center">1</td>
											<td>Actividad 1 - Hamilo day 4</td>
											<td>Administrador</td>
											<td class="text-center">
												<span
													class="badge badge-success-personalizado"
													>Activo</span
												>
											</td>
											<td class="text-center">
												<div class="dropdown">
													<button
														class="btn btn-white dropdown-toggle btn-xs"
														type="button"
														data-bs-toggle="dropdown"
														id="navbarDropdownMenuLink2"
													>
														<i
															class="fas fa-list"
														></i>
													</button>
													<ul
														class="dropdown-menu"
														aria-labelledby="navbarDropdownMenuLink2"
													>
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-eye me-2 text-info"
																></i>
																Ver
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
																@click="
																	formulario()
																"
															>
																<i
																	class="fas fa-pencil me-2 text-warning-personalizado"
																></i>
																Editar
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-trash me-2 text-danger"
																></i>
																Estado
															</button>
														</li>
													</ul>
												</div>
											</td>
										</tr>
										<tr>
											<td class="text-center">1</td>
											<td>Actividad 1 - Hamilo day 4</td>
											<td>Administrador</td>
											<td class="text-center">
												<span
													class="badge badge-danger-personalizado"
													>Inactivo</span
												>
											</td>
											<td class="text-center">
												<div class="dropdown">
													<button
														class="btn btn-white dropdown-toggle btn-xs"
														type="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i
															class="fas fa-list"
														></i>
													</button>
													<ul class="dropdown-menu">
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-eye me-2 text-info"
																></i>
																Ver
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
																@click="
																	formulario()
																"
															>
																<i
																	class="fas fa-pencil me-2 text-warning-personalizado"
																></i>
																Editar
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-check me-2 text-success"
																></i>
																Estado
															</button>
														</li>
													</ul>
												</div>
											</td>
										</tr>
										<tr>
											<td class="text-center">1</td>
											<td>Actividad 1 - Hamilo day 4</td>
											<td>Administrador</td>
											<td class="text-center">
												<span
													class="badge badge-success-personalizado"
													>Activo</span
												>
											</td>
											<td class="text-center">
												<div class="dropdown">
													<button
														class="btn btn-white dropdown-toggle btn-xs"
														type="button"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i
															class="fas fa-list"
														></i>
													</button>
													<ul class="dropdown-menu">
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-eye me-2 text-info"
																></i>
																Ver
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
																@click="
																	formulario()
																"
															>
																<i
																	class="fas fa-pencil me-2 text-warning-personalizado"
																></i>
																Editar
															</button>
														</li>
														<li>
															<button
																type="button"
																class="dropdown-item"
															>
																<i
																	class="fas fa-trash me-2 text-danger"
																></i>
																Estado
															</button>
														</li>
													</ul>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								<div class="col-12">
									<nav aria-label="Page navigation example">
										<ul
											class="pagination justify-content-center"
										>
											<li class="page-item">
												<button
													type="button"
													class="page-link"
													aria-label="Previous"
												>
													<span aria-hidden="true"
														>&laquo;</span
													>
												</button>
											</li>
											<li class="page-item">
												<button
													type="button"
													class="page-link"
												>
													1
												</button>
											</li>
											<li class="page-item">
												<button
													type="button"
													class="page-link bg-gray-700 text-white"
												>
													2
												</button>
											</li>
											<li class="page-item">
												<button
													type="button"
													class="page-link"
												>
													3
												</button>
											</li>
											<li class="page-item">
												<button
													type="button"
													class="page-link"
													aria-label="Next"
												>
													<span aria-hidden="true"
														>&raquo;</span
													>
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
import { useRouter } from "vue-router";

const router = useRouter();
const formulario = () => {
	router.push("/formulario-plantilla");
};
</script>
