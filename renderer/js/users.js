// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#dataTable tbody'); // Reference to the table body
  const inSearch = document.querySelector('#inSearch'); // Reference to the search input field
  let selectedRow = null; // Variable to store the selected row in the table

  // Function to populate the table with user data
  function populateUserTable(data) {
    tableBody.innerHTML = ''; // Clear the table body
    data.forEach(row => {
      const tr = document.createElement('tr'); // Create a table row
      tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.un}</td>
      `;
      tr.addEventListener('click', () => {
        var row_id = row.id;
        setRowID(row_id);
        const clickedRow = event.target.closest('tr');

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
      tableBody.appendChild(tr); // Append the row to the table
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

  // Event listener for the search input
  inSearch.addEventListener('input', () => {
    const searchText = inSearch.value.trim(); // Get the search text
    filterTable(searchText); // Filter the table based on the search text
  });

  // Event listener to clear the search bar content and reset the table filter
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
  window.htmlChange.goToAddUsers(); // Navigate to the 'Add Users' page
});

// Remove a record
const confirmationModal = document.getElementById('confirmationModal');

const btnRemove = document.getElementById('btnRemove');
btnRemove.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop event propagation

  if (rowId !== null) {
    confirmationModal.style.display = 'block'; // Display confirmation modal for row deletion
  } else {
    window.message.show('Nothing was selected');
  }
});

document.getElementById('cancelDelete').addEventListener('click', () => {
  confirmationModal.style.display = 'none'; // Close the confirmation modal
});

document.getElementById('confirmDelete').addEventListener('click', () => {
  if (rowId !== null) {
    window.sqlite.deleteRow('users', rowId); // Delete the selected row from the database
    rowId = null;
    location.reload(); // Reload the page after deletion
  }
  confirmationModal.style.display = 'none'; // Close the confirmation modal
});

// Edit a record
const btnEdit = document.getElementById('btnEdit');
btnEdit.addEventListener('click', () => {
  if (rowId !== null) {
    window.sendId(rowId); // Send the selected row ID to the editing page
    window.htmlChange.goToEditUsers(); // Navigate to the 'Edit Users' page
  } else {
    window.message.show('Nothing was sellected'); // indicate no record was selected
  }
  rowId = null; // Reset the selected row ID
});
