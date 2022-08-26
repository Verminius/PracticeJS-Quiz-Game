let instrucciones = document.getElementById("instrucciones");
let modalContainer = document.querySelector(".instrucciones-container");
let modal = document.querySelector(".modal-contenedor");
let closeModal = document.getElementById("closeModal");

instrucciones.addEventListener("click", function showModal() {
  modalContainer.classList.add("mostrar");
  modal.classList.add("show-instrucciones");
});

closeModal.addEventListener("click", function closingModal() {
  modalContainer.classList.remove("mostrar");
  modal.classList.remove("show-instrucciones");
});
