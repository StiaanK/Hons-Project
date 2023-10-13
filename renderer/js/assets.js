// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const tableBody = document.querySelector('#dataTable tbody'); // Reference to the table body
  const inSearch = document.querySelector('#inSearch'); // Reference to the search input field
  let selectedRow = null; // Variable to store the selected row in the table

  // Function to populate the asset table
  function populateAssetTable(data) {
    // Clear the table body
    tableBody.innerHTML = '';
    data.forEach(row => {
      // Calculate asset age in years
      const dateAdded = new Date(row.dateAdded);
      const currentDate = new Date();
      const ageInYears = currentDate.getFullYear() - dateAdded.getFullYear();

      // Create a table row and populate it with data
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.assetName}</td>
          <td>${row.sn}</td>
          <td>${row.userName || 'Unbooked'}</td>
          <td>${ageInYears}</td>
          <td>${row.dateAdded}</td>
      `;

      // Add data attributes for userId and un (not visible)
      tr.setAttribute('data-userid', row.userId);
      tr.setAttribute('data-un', row.un);

      // Event listener for row click to select the row
      tr.addEventListener('click', () => {
        var row_id = row.id;
        setRowID(row_id); // Set the selected row ID
        const clickedRow = event.target.closest('tr');

        // Handle row selection
        if (clickedRow && clickedRow !== selectedRow) {
          if (selectedRow) {
            selectedRow.classList.remove('is-selected');
          }
          clickedRow.classList.add('is-selected');
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
      const rowText = `${row.textContent.toLowerCase()} ${row.dataset.userid} ${row.dataset.un}`;
      if (rowText.includes(searchText.toLowerCase())) {
        row.style.display = ''; // Show the row
      } else {
        row.style.display = 'none'; // Hide the row
      }
    });
  }

  // Event listener for search input
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

  // Function to show assets with non-null userID
  function showBookings() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      const userId = row.dataset.userid;
      if (userId !== 'null' && userId !== undefined && userId !=='' &&  userId !==' ') {
        row.style.display = ''; // Show the row if userID is not null or undefined
      } else {
        row.style.display = 'none'; // Hide the row if userID is null or undefined
      }
    });
  }
  
  // Function to show assets older than 5 years
  function showOldAssets() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      const age = parseInt(row.querySelector('td:nth-child(5)').textContent); // Get the age from the table cell

      if (!isNaN(age) && age > 5) {
        row.style.display = ''; // Show the row if the asset is older than 5 years
      } else {
        row.style.display = 'none'; // Hide the row if the asset is not older than 5 years
      }
    });
  }

  // Event listener for button to show assets older than 5 years
  const btnShowOldAssets = document.getElementById('btnShowOldAssets');
  btnShowOldAssets.addEventListener('click', () => {
    showOldAssets(); // Call the function to show assets older than 5 years
  });

  // Event listener for button to show assets with non-null userID
  const btnBookings = document.getElementById('btnBookings');
  btnBookings.addEventListener('click', () => {
    showBookings(); // Call the function to show assets with non-null userID
  });

  // Fetch data and populate the table
  window.sqlite.queryDB('SELECT assets.id, assets.name AS assetName, assets.sn, assets.dateAdded, users.name AS userName, users.un, assets.userId FROM assets LEFT JOIN users ON assets.userId = users.un', [], data => {
    populateAssetTable(data);
  });
});

// Function to set the selected row ID
let rowId = null;
function setRowID(e) {
  rowId = e;
}

// Event listeners for various buttons
const btnInsert = document.getElementById('btnInsert');
btnInsert.addEventListener('click', () => {
  window.htmlChange.goToAddAssets(); // Navigate to the 'Add Assets' page
});

const confirmationModal = document.getElementById('confirmationModal');

const btnRemove = document.getElementById('btnRemove');
btnRemove.addEventListener('click', (event) => {
  event.preventDefault();  // Prevent default behavior
  event.stopPropagation();  // Stop event propagation

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
    window.sqlite.deleteRow('assets', rowId); // Delete the selected row from the database
    rowId = null;
    location.reload(); // Reload the page after deletion
  }
  confirmationModal.style.display = 'none'; // Close the confirmation modal
});

const btnEdit = document.getElementById('btnEdit');
btnEdit.addEventListener('click', () => {
  if (rowId !== null) {
    window.sendId(rowId); // Send the selected row ID to the editing page
    window.htmlChange.goToEditAssets(); // Navigate to the 'Edit Assets' page
  } else {
    window.message.show('nothing');
  }
  rowId = null; // Reset the selected row ID
});
