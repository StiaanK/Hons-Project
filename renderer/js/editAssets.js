const sender = window.send 
const btnCancel = document.getElementById('btnCancel')





document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-Asset');
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        
        const name = form.inName.value
        const sn = form.inSN.value


        if( (name=='')&&(sn=='')){
            //notifying user
            const nBody = 'All fields were empty'
            window.message.show(nBody)
            window.htmlChange.goToAssets()
        }
        else{
            // Call the exposed `insertData` method from the preload.js file
            window.editAssetData({name, sn});
            //notifying user
            const nBody = 'Asset was edited!'
            window.message.show(nBody)

            window.htmlChange.goToAssets()
        }
    });
});


btnCancel.addEventListener('click',()=>{
    window.htmlChange.goToAssets();
})





