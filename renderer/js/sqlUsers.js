document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#dataTable tbody');
  
    // Function to populate the table with data
    function populateAssetTable(data) {
      tableBody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.uname}</td>
          <!-- Add more columns as needed -->
        `;
        tableBody.appendChild(tr);
      });
    }
  
    // Query the database and populate the table
    window.sqlite.queryDB('SELECT * FROM users', [], data => {
      populateAssetTable(data);
    });
});
