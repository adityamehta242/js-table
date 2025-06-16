export default function renderTable(tableInstance) {
    
  const { table, options, data } = tableInstance;

  if (!table || !options?.columns || !Array.isArray(data)) {
    console.error('Invalid tableInstance structure');
    return;
  }

  table.innerHTML = '';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  options.columns.forEach(col => {
    const colName = typeof col === 'string' ? col : col.accessor;
    const headerLabel = typeof col === 'string' ? col : col.header;
    
    const th = document.createElement('th');
    th.textContent = headerLabel;
    th.setAttribute('scope', 'col');
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  data.forEach(rowData => {
    const row = document.createElement('tr');
    options.columns.forEach(col => {
      const colName = typeof col === 'string' ? col : col.accessor;
      const td = document.createElement('td');
      td.textContent = rowData[colName] ?? '';
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
}
