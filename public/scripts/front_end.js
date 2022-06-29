// Returns a reference to the first object with the specified value of the ID attribute.
const modal = document.getElementById("createListModal")
const modalLink = document.getElementById("modalLink")

// Returns a reference to the first object with the specified value of the ID attribute.
const closeModalButton = document.getElementsByClassName("close-modal-button")

// open the modal by blocking the display: none css value
let displayModal = function () {
  console.log('Hello from displayModal function')
  modal.style.display = 'block';
}

// listen for modalLink click
modalLink.addEventListener('click', displayModal)

