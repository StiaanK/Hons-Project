const sender = window.send 
const btnCancel = document.getElementById('btnCancel')
const rowColNum = ''
const name =  document.getElementById('inName')



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-User');
    form.addEventListener('submit',  (event) => {
        event.preventDefault();
        
        const name = form.inName.value
        const un = form.inUN.value

        if( (name=='')&&(un=='')){
            //notifying user
            const nBody = 'All fields were empty'
            window.message.show(nBody)
            window.htmlChange.goToUsers()
        }
        else{
            // Call the exposed `insertData` method from the preload.js file
            window.editUserData({name, un});
            //notifying user
            const nBody = 'User was edited!'
            window.message.show(nBody)

            window.htmlChange.goToUsers()
        }
    });
});


btnCancel.addEventListener('click',()=>{
    window.htmlChange.goToUsers();
})





