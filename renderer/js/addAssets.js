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
        const sn = form.inSN.value

        
        // Call the exposed `insertData` method from the preload.js file
        window.sendAssetData({name, sn});
        
        // Reset the form
        form.reset();
        btnCancel.innerHTML ="Go Back"
        
        //notifying user
        const nBody = 'Asset was added!'
        window.message.show(nBody)
    });
});