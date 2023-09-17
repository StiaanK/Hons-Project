document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#dataTable tbody');
    const inSearch = document.querySelector('#inSearch');
    let selectedRow = null;
  
    function populateAssetTable(data) {
      tableBody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.id}</td>
            <td>${row.assetName}</td>
            <td>${row.sn}</td>
            <td>${row.userName}</td>
            <td>${row.dateAdded}</td>
        `;
        tr.addEventListener('click', () => {
          var row_id = row.id;
          setRowID(row_id);
          const clickedRow = event.target.closest('tr')
  
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
  
    function filterTable(searchText) {
      const rows = tableBody.querySelectorAll('tr');
  
      rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchText.toLowerCase())) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }
  
    inSearch.addEventListener('input', () => {
      const searchText = inSearch.value.trim();
      filterTable(searchText);
    });
  
    window.sqlite.queryDB('SELECT assets.id, assets.name AS assetName, assets.sn, assets.dateAdded, users.name AS userName FROM assets LEFT JOIN users ON assets.userId = users.un', [], data => {
      populateAssetTable(data);
    });
  });
  
  let rowId = null;
  
  function setRowID(e) {
    rowId = e;
  }
  
  const btnInsert = document.getElementById('btnInsert');
  btnInsert.addEventListener('click', () => {
    window.htmlChange.goToAddAssets();
  });
  
  const btnRemove = document.getElementById('btnRemove');
  btnRemove.addEventListener('click', () => {
    if (rowId !== null) {
      window.sqlite.deleteRow('assets', rowId);
      rowId = null;
      const nBody = 'Asset was Deleted!';
      window.message.show(nBody);
      location.reload();
    } else {
      window.message.show('nothing');
    }
    rowId = null;
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
  