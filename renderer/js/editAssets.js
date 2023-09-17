document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-Asset');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.inName.value;
        const sn = form.inSN.value;
        const userId = form.inUserId.value;
        const dateAdded = form.inDate.value; 

        if (name === '' && sn === '' && userId === '' && dateAdded ==='') {
            // Notifying the user
            const nBody = 'All fields were empty';
            window.message.show(nBody);
            window.htmlChange.goToAssets();
        } else {
            // Call the exposed `editAssetData` method from the preload.js file
            window.editAssetData({ name, sn, userId, dateAdded }); // Include the date
            // Notifying the user
            const nBody = 'Asset was edited!';
            window.message.show(nBody);
            window.htmlChange.goToAssets();
        }
    });
});

btnCancel.addEventListener('click', () => {
    window.htmlChange.goToAssets();
});
