document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#dataTable tbody');

  // Function to populate the table with data
  function populateUserTable(data) {
    let selectedRow = null;
    tableBody.innerHTML = '';
    data.forEach(row => {
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.un}</td>
      <!-- Add more columns as needed -->
      `;
      tr.addEventListener('click', () => {
        // Function to handle row selection (you can do anything with the selected data here)
        //handleRowSelection(row, index);
        var row_id=row.id  
        setRowID(row_id)
        const clickedRow= event.target.closest('tr')
        
        if (clickedRow && clickedRow !== selectedRow) {
          // Remove 'is-selected' class from the previously selected row
          if (selectedRow) {
              selectedRow.classList.remove('is-selected');
          }

          // Add 'is-selected' class to the clicked row
          clickedRow.classList.add('is-selected');

          // Update the selected row reference
          selectedRow = clickedRow;
      }
      });
      tableBody.appendChild(tr);
    });
  }
  // Query the database and populate the table
  window.sqlite.queryDB('SELECT * FROM users', [], data => {
    populateUserTable(data);
  });

  //get the id of the selected row
});

let rowId = null
function setRowID(e){
rowId = e
}

//Adding a new record
const btnInsert= document.getElementById('btnInsert')
btnInsert.addEventListener('click', ()=>{
window.htmlChange.goToAddUsers()
})

//Remove a record
const btnRemove = document.getElementById('btnRemove')
btnRemove.addEventListener('click', ()=>{


if (rowId !== null){
  window.sqlite.deleteRow('users',rowId)
  rowId = null
  const nBody = 'User was Deleted!'
  window.message.show(nBody)
  location.reload()
}
else{
  window.message.show('nothing')
}

rowId = null
}) 

//edit a record 
const btnEdit= document.getElementById('btnEdit')
btnEdit.addEventListener('click', ()=>{

if (rowId !== null){
  window.sendId(rowId)
  window.htmlChange.goToEditUsers()
}
else{
  window.message.show('nothing')
}

rowId = null

})



