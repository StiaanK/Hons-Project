document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const tableBody = document.querySelector('#dataTable tbody');
  const inSearch = document.querySelector('#inSearch');
  let selectedRow = null;

  // Function to populate the asset table
  function populateAssetTable(data) {
    tableBody.innerHTML = '';
    data.forEach(row => {
      const tr = document.createElement('tr');
      const dateAdded = new Date(row.dateAdded);
      const currentDate = new Date();
      const ageInYears = currentDate.getFullYear() - dateAdded.getFullYear();

      // Populate table row
      tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.assetName}</td>
          <td>${row.sn}</td>
          <td>${row.userName || 'Unbooked'}</td> <!-- Display 'Unbooked' if userName is null -->
          <td>${ageInYears}</td> <!-- Display the age of the asset in years -->
          <td>${row.dateAdded}</td>
      `;

      // Add data attributes for userId and un (not visible)
      tr.setAttribute('data-userid', row.userId);
      tr.setAttribute('data-un', row.un);

      // Event listener for row click
      tr.addEventListener('click', () => {
        var row_id = row.id;
        setRowID(row_id);
        const clickedRow = event.target.closest('tr');

        if (clickedRow && clickedRow !== selectedRow) {
          if (selectedRow) {
            selectedRow.classList.remove('is-selected');
          }
          clickedRow.classList.add('is-selected');
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
    const searchText = inSearch.value.trim(); // getting search text
    filterTable(searchText); //adding search filter
  });

  // Event listener to clear the search bar content and reset the table filter
  const clearSearchButton = document.getElementById('clearSearch');
  clearSearchButton.addEventListener('click', () => {
    const searchText = ''; // Clear the search bar content
    document.getElementById('inSearch').value = ''; // Update the search bar display
    filterTable(searchText); // Reset the table filter
  });

  // Function to show assets without a null user ID
  function showBookings() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
      const userId = row.dataset.userid;
      if (userId !== 'null') {
        row.style.display = ''; // Show the row if userID is not null
      } else {
        row.style.display = 'none'; // Hide the row if userID is null
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

  // Fetch data and populate table
  window.sqlite.queryDB('SELECT assets.id, assets.name AS assetName, assets.sn, assets.dateAdded, users.name AS userName, users.un, assets.userId FROM assets LEFT JOIN users ON assets.userId = users.un', [], data => {
    populateAssetTable(data);
  });
});

// Function to set row ID
let rowId = null;
function setRowID(e) {
  rowId = e;
}

// Event listeners for various buttons
const btnInsert = document.getElementById('btnInsert');
btnInsert.addEventListener('click', () => {
  window.htmlChange.goToAddAssets();
});


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
    window.sqlite.deleteRow('assets', rowId);
    rowId = null;
    location.reload();
  }
  confirmationModal.style.display = 'none';
});





const btnEdit = document.getElementById('btnEdit');
btnEdit.addEventListener('click', () => {
  if (rowId !== null) {
    window.sendId(rowId);
    window.htmlChange.goToEditAssets();
  } else {
    window.message.show('nothing');
  }
  rowId = null;
});
