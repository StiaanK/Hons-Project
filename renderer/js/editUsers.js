// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-User'); // Get the user form element
    
    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Extract data from the form fields
        const name = form.inName.value;
        const un = form.inUN.value;

        // Check if both name and username are empty
        if (name === '' && un === '') {
            // Notify the user and navigate to users
            const nBody = 'All fields were empty';
            window.message.show(nBody);
            window.htmlChange.goToUsers();
        } else {
            // Call the exposed `editUserData` method from the preload.js file with the provided data
            window.editUserData({ name, un });
            
            // Notify the user and navigate to users
            const nBody = 'User was edited!';
            window.message.show(nBody);
            window.htmlChange.goToUsers();
        }
    });
});

// Event listener for cancel button
btnCancel.addEventListener('click', () => {
    window.htmlChange.goToUsers(); // Navigate to the users page
});
