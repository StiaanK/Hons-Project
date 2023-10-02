document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#dataTable tbody');
  const inSearch = document.querySelector('#inSearch'); // Assuming this is the input field for search.
  let selectedRow = null;

  // Function to populate the table with data
    function populateUserTable(data) {
      tableBody.innerHTML = '';
      data.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${row.id}</td>
              <td>${row.name}</td>
              <td>${row.un}</td>
          `;
          tr.addEventListener('click', () => {
              var row_id = row.id
              setRowID(row_id)
              const clickedRow = event.target.closest('tr')

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

  // Function to filter the table based on search text
  function filterTable(searchText) {
      const rows = tableBody.querySelectorAll('tr');

      rows.forEach(row => {
          const rowText = row.textContent.toLowerCase();
          if (rowText.includes(searchText.toLowerCase())) {
              row.style.display = ''; // Show the row
          } else {
              row.style.display = 'none'; // Hide the row
          }
      });
    }   
  // Add an event listener to the search input field
  inSearch.addEventListener('input', () => {
      const searchText = inSearch.value.trim();
      filterTable(searchText);
  });

  // Add an event listener to clear the search bar content and reset the table filter
  const clearSearchButton = document.getElementById('clearSearch');
  clearSearchButton.addEventListener('click', () => {
    const searchText = ''; // Clear the search bar content
    document.getElementById('inSearch').value = ''; // Update the search bar display
    filterTable(searchText); // Reset the table filter
  });

  // Query the database and populate the table
  window.sqlite.queryDB('SELECT * FROM users', [], data => {
      populateUserTable(data);
  });
});

let rowId = null;

function setRowID(e) {
  rowId = e;
}

// Adding a new record
const btnInsert = document.getElementById('btnInsert');
btnInsert.addEventListener('click', () => {
  window.htmlChange.goToAddUsers();
});

// Remove a record
const confirmationModal = document.getElementById('confirmationModal');

const btnRemove = document.getElementById('btnRemove');
btnRemove.addEventListener('click', (event) => {
  event.preventDefault();  // Prevent default behavior
  event.stopPropagation();  // Stop event propagation

  if (rowId !== null) {
    confirmationModal.style.display = 'block';
  } else {
    window.message.show('Nothing was selected');
  }
});

document.getElementById('cancelDelete').addEventListener('click', () => {
  confirmationModal.style.display = 'none';
});

document.getElementById('confirmDelete').addEventListener('click', () => {
  if (rowId !== null) {
    window.sqlite.deleteRow('users', rowId);
    rowId = null;
    location.reload();
  }
  confirmationModal.style.display = 'none';
});

// Edit a record
const btnEdit = document.getElementById('btnEdit');
btnEdit.addEventListener('click', () => {
  if (rowId !== null) {
      window.sendId(rowId);
      window.htmlChange.goToEditUsers();
  } else {
      window.message.show('nothing');
  }
  rowId = null;
});
