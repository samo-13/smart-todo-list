// Returns a reference to the first object with the specified value of the ID attribute.
const modal = document.getElementById("createListModal")
const modalLink = document.getElementById("modalLink")

// Returns a reference to the first object with the specified value of the ID attribute.
const closeModalButton = document.getElementById("closeModalButton")

// open the modal changing the display: none to display: block css value
let displayModal = function () {
  console.log('Hello from displayModal function')
  modal.style.display = 'block';
}

// close the modal by enabling the display: none css value
let exitModal = function () {
  console.log('Hello from closeModal function')
  modal.style.display = 'none';
}

// listen for modalLink click
modalLink.addEventListener('click', displayModal);
closeModalButton.addEventListener('click', exitModal);

