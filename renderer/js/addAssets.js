const btnCancel = document.getElementById('btnCancel')
const btnAdd = document.getElementById('btnAdd')



btnCancel.addEventListener('click',()=>{
    window.htmlChange.goToAssets();
})

//when sending more info look at chatGPT
//sending data to main
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-Asset');
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        
        const name = form.inName.value


        // Call the exposed `insertData` method from the preload.js file
        window.sendAssetData(name);
        
        // Reset the form
        form.reset();
        btnCancel.innerHTML ="Go Back"
        //TODO: notify user
    });
});