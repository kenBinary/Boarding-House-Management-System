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
function retrieveRowData(tenantId, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "tenant-row-data.php" + "?tenantId=" + encodeURIComponent(tenantId),
    true
  );

  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      callback(data);
    } else {
      console.log("xx");
    }
  };
  xhr.send();
}

function updateDetails(detailData) {
  let details = Array.from(document.querySelectorAll(".details"));
  let detailText = [
    "Tenant ID: ",
    "First Name: ",
    "Last Name: ",
    " Contact Number: ",
  ];
  detailData.forEach((element, index) => {
    details[index].textContent = detailText[index] + element;
  });
}
const initializeTable = (() => {
  const tableBody = document.querySelector(".table-body");
  requestPHP("tenant-info.php", tableBody);
})();
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
    retrieveRowData(id, updateDetails);
  });
  tableBody.appendChild(tableRow);
}
const createRows = (tableBody, data) => {
  for (let index = 0; index < data.length; index++) {
    createSingleRow(tableBody, data[index]);
  }
};

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
  popUp.setAttribute("action", "add-tenant.php");
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
    input.setAttribute("required","");
    popUpElements.push(label);
    popUpElements.push(input);
  });
  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Add Tenant");
  submitButton.setAttribute("name", "add-tenant");
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
const removeTenantButton = document.querySelector(".remove-tenant");
removeTenantButton.addEventListener("click", () => {
  let tenant_id = document.querySelector("#tenant-id");
  let tenantText = tenant_id.textContent;
  var tenantId = tenantText.replace(/\D/g, "");
  removeTenant(tenantId);
  location.reload();
});
function removeTenant(tenantId) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "remove-tenant.php" + "?tenantId=" + encodeURIComponent(tenantId),
    true
  );
  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      if (data) {
        alert("Remove Tenant From Room First");
      }
    } else {
      console.log("error");
    }
  };
  xhr.send();
}


