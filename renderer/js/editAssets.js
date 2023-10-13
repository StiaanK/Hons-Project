// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get a reference to the asset form
    const form = document.getElementById('form-Asset');
    
    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Extract data from the form fields
        const name = form.inName.value;
        const sn = form.inSN.value;
        const userId = form.inUserId.value;
        const dateAdded = form.inDate.value; 

        // Check if all fields are empty
        if (name === '' && sn === '' && userId === '' && dateAdded ==='') {
            // Notify the user and navigate to assets
            const nBody = 'All fields were empty';
            window.message.show(nBody);
            window.htmlChange.goToAssets();
        } else {
            // Call the exposed `editAssetData` method from the preload.js file with the provided data
            window.editAssetData({ name, sn, userId, dateAdded });
            
            // Notify the user and navigate to assets
            const nBody = 'Asset was edited!';
            window.message.show(nBody);
            window.htmlChange.goToAssets();
        }
    });
});

// Event listener for cancel button
btnCancel.addEventListener('click', () => {
    window.htmlChange.goToAssets(); // Navigate to the assets page
});
