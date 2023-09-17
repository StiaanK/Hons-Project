const btnCancel = document.getElementById('btnCancel')
const btnAdd = document.getElementById('btnAdd')

 // Set the default date to the current system date
 const today = new Date().toISOString().split('T')[0];
 inDate.value = today;


btnCancel.addEventListener('click',()=>{
    window.htmlChange.goToAssets();
})


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-Asset');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.inName.value;
        const sn = form.inSN.value;
        const dateAdded = form.inDate.value; // Get the date value

        // Call the exposed `insertData` method from the preload.js file
        window.sendAssetData({ name, sn, dateAdded }); // Pass the date to the function

        // Reset the form
        form.reset();
        btnCancel.innerHTML = "Go Back";

        // Notifying the user
        const nBody = 'Asset was added!';
        window.message.show(nBody);
    });
});