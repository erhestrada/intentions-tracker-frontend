import { addIntention } from "./addIntention.js";
import { displaySquares } from "./displaySquares.js";

const form = document.getElementById('myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addIntention();
  });

// Deletion Logic
const deleteButton = document.getElementById('delete-intentions-button');
deleteButton.clicked = false;

document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('intention') && deleteButton.clicked) {
        const intention = event.target.textContent.split(':')[0].trim(); // Extract the key from the text
        let requiredRepetitionsPerIntention = JSON.parse(localStorage.getItem('requiredRepetitionsPerIntention')) || {};
        const { [intention]: _, ...updatedRequiredRepetitionsPerIntention } = requiredRepetitionsPerIntention;
        localStorage.setItem('requiredRepetitionsPerIntention', JSON.stringify(updatedRequiredRepetitionsPerIntention));

        event.target.remove();
    }
});

deleteButton.addEventListener('click', () => {
    deleteButton.clicked = !deleteButton.clicked;
    const intentions = document.querySelectorAll('.intention');
    intentions.forEach((intention) => {
        intention.classList.toggle('clickable'); // You might want to style this class in CSS
    });
});

const requiredRepetitionsPerIntention = JSON.parse(localStorage.getItem('requiredRepetitionsPerIntention')) || {};
displaySquares(requiredRepetitionsPerIntention);
