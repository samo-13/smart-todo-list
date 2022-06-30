// ---------------------------------------------------------------------------------------------------------
// CREATE NEW TASK FORM MODAL
// ---------------------------------------------------------------------------------------------------------

// Returns a reference to the first object with the specified value of the ID attribute.
const modal = document.getElementById("createTaskModal");
const modalLink = document.getElementById("modalLink");

// Returns a reference to the first object with the specified value of the ID attribute.
const closeModalButton = document.getElementById("closeModalButton");

// open the modal changing the display: none to display: block css value
let displayModal = function() {
  console.log('Hello from displayModal function');
  modal.style.display = 'block';
};

// close the modal by enabling the display: none css value
let exitModal = function() {
  console.log('Hello from closeModal function');
  modal.style.display = 'none';
};

// listen for modalLink click
modalLink.addEventListener('click', displayModal);
closeModalButton.addEventListener('click', exitModal);

// ---------------------------------------------------------------------------------------------------------
// EDIT TASK FORM MODAL
// ---------------------------------------------------------------------------------------------------------

// Returns a reference to the first object with the specified value of the ID attribute.
const editModal = document.getElementById("editTaskModal");
const editModalLink = document.getElementById("editTaskModalLink");

// Returns a reference to the first object with the specified value of the ID attribute.
const closeEditModalButton = document.getElementById("closeEditModalButton");

// open the modal changing the display: none to display: block css value
let displayEditModal = function() {
  console.log('Hello from displayEditModal function');
  editTaskModal.style.display = 'block';
};

// close the modal by enabling the display: none css value
let exitEditModal = function() {
  console.log('Hello from closeEditModal function');
  editTaskModal.style.display = 'none';
};

// listen for modalLink click
editModalLink.addEventListener('click', displayEditModal);
closeEditModalButton.addEventListener('click', exitEditModal);
