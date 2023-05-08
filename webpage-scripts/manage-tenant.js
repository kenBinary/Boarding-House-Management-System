let previewSection = document.querySelector(".preview-section");
function requestPHP(filePath, tableBody) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);
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
function retrieveRowData(filePath,tenantId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath +'?tenantId=' + encodeURIComponent(tenantId), true);
  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data)
    } else {
      console.log("xx");
    }
  };
  xhr.send();
}

const tablePreview = () => {
  const tableHeadings = [
    "TenantID",
    "First Name",
    "Last Name",
    "Contact Number",
  ];
  const table = document.createElement("table");
  table.classList.add("table-preview");
  const tableHead = document.createElement("thead");
  const headingRow = document.createElement("tr");
  tableHeadings.forEach((element) => {
    const th = document.createElement("th");
    th.textContent = element;
    headingRow.appendChild(th);
  });
  tableHead.appendChild(headingRow);
  const tableBody = document.createElement("tbody");
  tableBody.classList.add("table-body");
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  return { table, tableBody };
};
function createSingleRow(tableBody, dataObject) {
  const data = Object.values(dataObject);
  const tableRow = document.createElement("tr");
  data.forEach((element) => {
    const tableData = document.createElement("td");
    tableData.textContent = element;
    tableRow.appendChild(tableData);
  });
  let y;
  tableRow.addEventListener("click", (e) => {
    let id = e.target.firstElementChild.textContent;
    retrieveRowData("tenant-row-data.php",id);

  });
  tableBody.appendChild(tableRow);
}
const createRows = (tableBody, data) => {
  for (let index = 0; index < data.length; index++) {
    createSingleRow(tableBody, data[index]);
  }
};
const initializeTable = (() => {
  let table = tablePreview();
  previewSection.appendChild(table.table);
  requestPHP("tenant-info.php", table.tableBody);
})();

function popUpAppear() {
  const parentElement = document.querySelector(".preview-section");
  parentElement.classList.add("popup-appear");
  return parentElement;
}
function createPopUpSection() {
  const parentElement = popUpAppear();
  const popUpSection = document.createElement("div");
  popUpSection.classList.add("popup-modal-section");
  const popUp = document.createElement("form");
  popUp.classList.add("pop-up", "add-tenant-form");
  popUp.setAttribute("action", "tenant-management-webpage.php");
  popUp.setAttribute("method", "post");
  popUpSection.appendChild(popUp);
  parentElement.appendChild(popUpSection);
  return popUp;
}

const popUp = createPopUpSection();

const addTenantPopUp = ((popUp) => {
  let popUpElements = [];
  const labels = ["First Name", "Last Name", "Contact Number"];
  const inputTypes = ["text", "text", "number"];
  const inputNames = ["first-name", "last-name", "contact"];
  const inputID = ["first-name", "last-name", "contact"];
  const popUpName = document.createElement("p");
  popUpName.textContent = "Add Tenant";
  popUpElements.push(popUpName);
  labels.forEach((element, index) => {
    const label = document.createElement("label");
    label.textContent = element;
    label.setAttribute("for", inputID[index]);
    const input = document.createElement("input");
    input.setAttribute("type", inputTypes[index]);
    input.setAttribute("name", inputNames[index]);
    input.setAttribute("id", inputID[index]);
    popUpElements.push(label);
    popUpElements.push(input);
  });
  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Add Tenant");
  submitButton.setAttribute("name", "submit");
  const closeButton = document.createElement("div");
  closeButton.textContent = "close";
  popUpElements.push(closeButton);
  popUpElements.push(submitButton);
  popUpElements.forEach((element) => {
    popUp.appendChild(element);
  });
  return { closeButton };
})(popUp);

const addTenant = document.querySelector(".add-tenant");
addTenant.addEventListener("click", () => {
  popUp.parentElement.classList.remove("hide-popUp");
  popUp.parentElement.classList.add("show-popUp");
});
addTenantPopUp.closeButton.addEventListener("click", () => {
  popUp.parentElement.classList.remove("show-popUp");
  popUp.parentElement.classList.add("hide-popUp");
});
