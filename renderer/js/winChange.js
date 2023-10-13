// Get references to the selectAssets and selectUsers elements
const selectAssets = document.getElementById('selectAssets');
const selectUsers = document.getElementById('selectUsers');

// Event listener for when selectAssets is clicked
selectAssets.addEventListener('click', () => {
    window.htmlChange.goToAssets(); // Navigate to the 'Assets' page
});

// Event listener for when selectUsers is clicked
selectUsers.addEventListener('click', () => {
    window.htmlChange.goToUsers(); // Navigate to the 'Users' page
});
