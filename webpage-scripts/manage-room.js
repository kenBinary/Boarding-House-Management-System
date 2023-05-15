let optionsArray = Array.from(document.querySelectorAll(".option"));
let previewCardsArr = Array.from(document.querySelectorAll(".preview-card"));
let currentOption = optionsArray[0];
let previewSection = document.querySelector(".preview-section");
let globalPopUp;
//code that handles cards
optionsArray.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (e.target != currentOption) {
      currentOption = e.target.lastElementChild.textContent;
      removeCards();
      if (currentOption === "Room Information") {
        requestPHP("available-room.php", currentOption);
      } else if (currentOption === "Assign Room") {
        requestPHP("free-rooms.php", currentOption);
      } else if (currentOption === "Free Room") {
        requestPHP("occupied-rooms.php", currentOption);
      }
    }
  });
});
const initializeCards = (() => {
  const initialize = requestPHP("available-room.php", "Room Information");
})();

function requestPHP(filePath, optionType) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filePath, true);
  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      createCards(optionType, data.length, data);
    } else {
      console.log("xx");
    }
  };
  xhr.send();
}
function removeCards() {
  if (globalPopUp) {
    removePopUpSection(globalPopUp);
  }
  previewCardsArr.forEach((element) => {
    let parentNode = element.parentElement;
    parentNode.removeChild(element);
  });
  previewCardsArr.length = 0;
}
const baseCard = (roomType) => {
  const card = document.createElement("div");
  card.classList.add("preview-card");
  const imagePreview = document.createElement("div");
  imagePreview.classList.add("preview-image", roomType);
  const previewDetailsSection = document.createElement("div");
  previewDetailsSection.classList.add("preview-details-section");
  card.appendChild(imagePreview);
  card.appendChild(previewDetailsSection);
  previewCardsArr.push(card);
  return { card, imagePreview, previewDetailsSection };
};
const availableCard = (roomTypeClass, data) => {
  const { card, previewDetailsSection } = baseCard(roomTypeClass);
  let roomNumber = data["roomNumber"];
  let roomStatus = data["roomStatus"] === "1" ? "Occupied" : "Vacant";
  let roomType =
    data["room_type"] === "Single_Room" ? "Single Room" : "Double Room";
  const imageSource = [
    "icons/roomIcons/room-number.png",
    "icons/roomIcons/room-info.png",
    "icons/roomIcons/available-room.png",
  ];
  let pText = [roomNumber, roomStatus, roomType];
  createPreviewDetails(previewDetailsSection, imageSource, pText);
  return card;
};
const assignCard = (roomTypeClass, data) => {
  const { card, previewDetailsSection } = baseCard(roomTypeClass);
  let roomType = data["room_type"] === "Single_Room" ? "Single Room" : "Double Room";
  let roomNumber = data["roomNumber"];

  let imageSource = [
    "icons/roomIcons/room-number.png",
    "icons/roomIcons/room-asign.png",
    "icons/roomIcons/available-room.png",
  ];
  let pText = [roomNumber, "Assign", roomType];
  createPreviewDetails(previewDetailsSection, imageSource, pText);
  return card;
};
const freeCard = (roomTypeClass, data) => {
  const { card, previewDetailsSection } = baseCard(roomTypeClass);
  let roomType = data["room_type"] === "Single_Room" ? "Single Room" : "Double Room";
  let roomNumber = data["roomNumber"];

  let imageSource = [
    "icons/roomIcons/room-number.png",
    "icons/roomIcons/room-remove.png",
    "icons/roomIcons/room-occupants.png",
  ];
  let pText = [roomNumber, "Remove", roomType];
  createPreviewDetails(previewDetailsSection, imageSource, pText);
  return card;
};

function createPreviewDetails(parentElement, imageSource, textContent) {
  for (let index = 0; index < imageSource.length; index++) {
    const previewDetails = document.createElement("div");
    previewDetails.classList.add("preview-details");
    const detailImage = document.createElement("img");
    detailImage.src = imageSource[index];
    const detailText = document.createElement("p");
    detailText.textContent = textContent[index];
    previewDetails.appendChild(detailImage);
    previewDetails.appendChild(detailText);
    if (previewDetails.textContent === "Assign") {
      previewDetails.addEventListener("click", (e) => {
        let popUp = assignPopUp(removePopUpSection, e.target);
        globalPopUp = popUp.sectionDiv.popUpSection;
        requestTenant(popUp.dataList)
      });
    } else if (previewDetails.textContent === "Remove") {
      previewDetails.addEventListener("click", (e) => {
        let roomNumber = e.target.parentElement.firstElementChild.textContent;
        removeTenant(roomNumber);
        location.reload();
      });
    }
    parentElement.appendChild(previewDetails);
  }
}
function createCards(optionType, numOfCards, data) {
  let cardSection = document.querySelector(".card-section");
  for (let index = 0; index < numOfCards; index++) {
    let roomTypeClass =
      data[index]["room_type"] === "Single_Room" ? "single-bed" : "double-bed";
    if (optionType === "Room Information") {
      cardSection.appendChild(availableCard(roomTypeClass, data[index]));
    } else if (optionType === "Assign Room") {
      cardSection.appendChild(assignCard(roomTypeClass, data[index]));
    } else if (optionType === "Free Room") {
      cardSection.appendChild(freeCard(roomTypeClass, data[index]));
    }
  }
}
//ajax for removing tenants from room
function removeTenant(roomNumber) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "remove-room.php" + "?roomNumber=" + encodeURIComponent(roomNumber), true);
  xhr.onload = function () {
    if (this.status == 200) {
      console.log("remove Success");
    } else {
      console.log("error retrieving data");
    }
  };
  xhr.send();
}

// getting tenants without room
function requestTenant(datalist) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "free-tenants.php", true);
  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      addOptions(data, datalist);
    } else {
      console.log("error retrieving data");
    }
  };
  xhr.send();
}
function addOptions(data, datalist) {
  data.forEach((element) => {
    const id = element['tenantId'];
    const name = element['firstName'] + " " + element['lastName'];
    const option = document.createElement("option");
    option.setAttribute("value", id);
    option.textContent = name;
    datalist.appendChild(option);
  });
}

//code for assign room popup
const popUpSection = (type) => {
  const parentElement = document.querySelector(".preview-section");
  parentElement.classList.add("popup-appear");
  const popUpSection = document.createElement("div");
  popUpSection.classList.add("popup-modal-section");
  const popUp = document.createElement("form");
  popUp.classList.add("pop-up", type);
  popUpSection.appendChild(popUp);
  parentElement.appendChild(popUpSection);
  return { popUpSection, popUp };
};
function removePopUpSection(popUpSection) {
  const parentElement = document.querySelector(".preview-section");
  parentElement.classList.remove("popup-appear");
  popUpSection.remove();
}

const assignPopUp = (callback, targetElement) => {
  let element = targetElement;
  let roomNumber = element.parentElement.firstElementChild.textContent;

  const sectionDiv = popUpSection("assign");
  let popUp = sectionDiv.popUp;
  popUp.setAttribute("action", "assign-room.php");
  popUp.setAttribute("method", "post");

  const title = document.createElement("div");
  title.textContent = "Assign Room";
  popUp.appendChild(title);

  const divs = [];
  for (let index = 0; index < 4; index++) {
    const newDiv = document.createElement("div");
    divs.push(newDiv);
  }

  const labels = [];
  for (let index = 0; index < 3; index++) {
    const label = document.createElement("label");
    labels.push(label);
  }

  const inputs = [];
  for (let index = 0; index < 5; index++) {
    const input = document.createElement("input");
    inputs.push(input);
  }


  //first div
  let dataList = document.createElement("select");
  dataList.setAttribute("id", "tenant-list");
  dataList.setAttribute("name", "tenant-list");
  const firstDivElements = [labels[0], dataList];
  labels[0].setAttribute("for", "tenant");
  labels[0].textContent = "Tenants";
  firstDivElements.forEach((element) => {
    divs[0].appendChild(element);
  });
  popUp.appendChild(divs[0]);

  //second div
  labels[1].setAttribute("for", "amenity-input");
  labels[1].textContent = "Amenity";
  const checkBox = document.createElement('input');
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "amenity");
  checkBox.setAttribute("name", "amenity");
  checkBox.setAttribute("value", "1");
  inputs[1].setAttribute("type", "text");
  inputs[1].setAttribute("name", "amenity-input");
  inputs[1].setAttribute("id", "amenity-input");
  inputs[1].setAttribute("value", "Internet");
  inputs[1].setAttribute("readonly", "");
  divs[1].appendChild(labels[1]);
  divs[1].appendChild(checkBox);
  divs[1].appendChild(inputs[1]);
  popUp.appendChild(divs[1]);

  //third div
  const thirdDivElements = [labels[2], inputs[2], inputs[3]];
  labels[2].setAttribute("for", "utilities");
  labels[2].textContent = "Utilities";
  inputs[2].setAttribute("type", "text");
  inputs[2].setAttribute("name", "utility-elec");
  inputs[2].setAttribute("id", "electricity");
  inputs[2].setAttribute("value", "Electricity");
  inputs[2].setAttribute("readonly", "");
  inputs[3].setAttribute("type", "text");
  inputs[3].setAttribute("name", "utility-wat");
  inputs[3].setAttribute("id", "water");
  inputs[3].setAttribute("value", "Water");
  inputs[3].setAttribute("readonly", "");
  thirdDivElements.forEach((element) => {
    divs[2].appendChild(element);
  });
  popUp.appendChild(divs[2]);

  //fourth div
  const closeDiv = document.createElement("div");
  closeDiv.textContent = "Close";
  closeDiv.addEventListener('click', (e) => {
    callback(globalPopUp)
  });
  inputs[4].setAttribute("type", "submit");
  inputs[4].setAttribute("value", "assign");
  inputs[4].setAttribute("name", "assign-tenant");
  divs[3].appendChild(closeDiv);
  divs[3].appendChild(inputs[4]);
  popUp.appendChild(divs[3]);

  //hidden input for room number
  const roomNumberInput = document.createElement("input");
  roomNumberInput.setAttribute("type", "hidden");
  roomNumberInput.setAttribute("name", "room_number");
  roomNumberInput.setAttribute("value", roomNumber);
  popUp.appendChild(roomNumberInput);

  return { sectionDiv, dataList };
}

function roomDetails() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "room-details.php", true);
  xhr.onload = function () {
    if (this.status == 200) {
      let data = JSON.parse(this.responseText);
      updateDetails(data);
    } else {
      console.log("Erro");
    }
  };
  xhr.send();
}
roomDetails();

function updateDetails(data) {
  const detailNodes = document.querySelectorAll(".detail");
  const detailArray = Array.from(detailNodes);
  detailArray.forEach((element, index, array) => {
    element.textContent = element.textContent + data[index];
  });
}