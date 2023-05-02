let previewSection = document.querySelector('.preview-section');
function requestPHP(filePath, tableBody) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = function () {
        if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            createRows(tableBody, data);
        } else {
            console.log("xx");
        }
    };
    xhr.send();
}

const tablePreview = () => {
    const tableHeadings = ["TenantID", "First Name", "Last Name", "Contact Number"];
    const table = document.createElement("table");
    table.classList.add("table-preview");
    const tableHead = document.createElement("thead");
    const headingRow = document.createElement("tr");
    tableHeadings.forEach(element => {
        const th = document.createElement("th");
        th.textContent = element;
        headingRow.appendChild(th)
    });
    tableHead.appendChild(headingRow);
    const tableBody = document.createElement("tbody");
    tableBody.classList.add("table-body");
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    return { table, tableBody };
}
function createSingleRow(tableBody, dataObject) {
    const data = Object.values(dataObject);
    const tableRow = document.createElement("tr");
    data.forEach(element => {
        const tableData = document.createElement("td");
        tableData.textContent = element;
        tableRow.appendChild(tableData);
    });
    tableBody.appendChild(tableRow);
}
const createRows = (tableBody, data) => {
    for (let index = 0; index < data.length; index++) {
        createSingleRow(tableBody, data[index]);
    }
}
const initializeTable = (() => {
    let table = tablePreview();
    previewSection.appendChild(table.table);
    requestPHP("tenant-info.php", table.tableBody);
})();