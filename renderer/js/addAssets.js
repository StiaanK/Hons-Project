// Get references to cancel and add buttons
const btnCancel = document.getElementById('btnCancel');
const btnAdd = document.getElementById('btnAdd');

// Set the default date to the current system date
const today = new Date().toISOString().split('T')[0];
inDate.value = today;

// Event listener for cancel button
btnCancel.addEventListener('click', () => {
  window.htmlChange.goToAssets(); // Navigate to the assets page
});

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-Asset'); // Get the asset form element

  // Event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract and trim data from the form fields
    const name = form.inName.value.trim() || null;
    const sn = form.inSN.value.trim() || null;
    const userId = form.inUserId.value.trim() || null;
    const dateAdded = form.inDate.value || null; // Get the date value

    // Call the exposed `insertData` method from the preload.js file
    window.sendAssetData({ name, sn, userId, dateAdded }); // Pass the data to the function

    // Reset the form
    form.reset();
    btnCancel.innerHTML = "Go Back"; // Update the cancel button text

    // Notifying the user
    const nBody = 'Asset was added!';
    window.message.show(nBody); // Show a message to the user
  });
});
