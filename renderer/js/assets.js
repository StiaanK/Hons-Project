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
        tableBody.appendChild(tr);
      });
    }
  
    // Query the database and populate the table
    window.sqlite.queryDB('SELECT * FROM assets', [], data => {
      populateAssetTable(data);
    });
});

//Adding a new record
const btnInsert= document.getElementById('btnInsert')
btnInsert.addEventListener('click', ()=>{
  window.htmlChange.goToAddAssets()
})






