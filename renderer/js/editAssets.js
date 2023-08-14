const sender = window.send 
const btnCancel = document.getElementById('btnCancel')
const rowId = ''
const name =  document.getElementById('inName')



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-Asset');
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        
        const name = form.inName.value


        // Call the exposed `insertData` method from the preload.js file
        window.editAssetData(name);
        
        //notifying user
        const nBody = 'Asset was edited!'
        window.message.show(nBody)

        window.htmlChange.goToAssets()
    });
});


btnCancel.addEventListener('click',()=>{
    window.htmlChange.goToAssets();
})





