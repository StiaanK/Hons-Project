document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#dataTable tbody');
  
    // Function to populate the table with data
    function populateAssetTable(data) {
      tableBody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.name}</td>
        `;
        tr.addEventListener('click', () => {
          // Function to handle row selection (you can do anything with the selected data here)
          //handleRowSelection(row, index);
          var row_id=row.id  
          setRowID(row_id)
        });
        tableBody.appendChild(tr);
      });
    }
    // Query the database and populate the table
    window.sqlite.queryDB('SELECT * FROM assets', [], data => {
      populateAssetTable(data);
    });

    //get the id of the selected row
});

let rowId
function setRowID(e){
  rowId = e
}

//Adding a new record
const btnInsert= document.getElementById('btnInsert')
btnInsert.addEventListener('click', ()=>{
  window.htmlChange.goToAddAssets()
})

//Remove a recored
const btnRemove = document.getElementById('btnRemove')
btnRemove.addEventListener('click', ()=>{
  window.sqlite.deleteRow('assets',rowId)
  rowId = null
  const nBody = 'Asset was Deleted!'
  window.message.show(nBody)
  location.reload()
}) 





