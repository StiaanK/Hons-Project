const btnCancel = document.getElementById('btnCancel')
const btnAdd = document.getElementById('btnAdd')



btnCancel.addEventListener('click',()=>{
    window.htmlChange.goToUsers();
})

//when sending more info look at chatGPT
//sending data to main
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-User');
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        
        const name = form.inName.value
        const un = form.inUN.value

        
        // Call the exposed `insertData` method from the preload.js file
        window.sendUserData({name, un});
        
        // Reset the form
        form.reset();
        btnCancel.innerHTML ="Go Back"
        
        //notifying user
        const nBody = 'User was added!'
        window.message.show(nBody)
    });
});