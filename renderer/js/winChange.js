const selectAssets = document.getElementById('selectAssets')
const selectUsers = document.getElementById('selectUsers')
const selectBookings = document.getElementById('selectBookings')

//const dropdownItems = document.querySelectorAll('.dropdown-item');


selectAssets.addEventListener('click', ()=>{
    window.htmlChange.goToAssets()
})

selectUsers.addEventListener('click', ()=>{
    window.htmlChange.goToUsers()
})

selectBookings.addEventListener('click', ()=>{
    window.htmlChange.goToBookings()
})