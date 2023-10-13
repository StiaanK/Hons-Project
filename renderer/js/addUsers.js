// Get references to cancel and add buttons
const btnCancel = document.getElementById('btnCancel');
const btnAdd = document.getElementById('btnAdd');

// Event listener for cancel button
btnCancel.addEventListener('click', () => {
  window.htmlChange.goToUsers(); // Navigate to the users page
});

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-User'); // Get the user form element

  // Event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract data from the form fields
    const name = form.inName.value;
    const un = form.inUN.value;

    // Call the exposed `insertData` method from the preload.js file
    window.sendUserData({ name, un }); // Pass the data to the function

    // Reset the form
    form.reset();
    btnCancel.innerHTML = "Go Back"; // Update the cancel button text

    // Notifying the user
    const nBody = 'User was added!';
    window.message.show(nBody); // Show a message to the user
  });
});
