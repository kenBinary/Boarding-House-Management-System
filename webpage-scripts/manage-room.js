let optionsArray = Array.from(document.querySelectorAll(".option"));
let previewCardsArr = Array.from(document.querySelectorAll(".preview-card"));
let currentOption = optionsArray[0];
let previewSection = document.querySelector(".preview-section");
let globalPopUp;
optionsArray.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (e.target != currentOption) {
      currentOption = e.target.lastElementChild.textContent;
      removeCards();
      if (currentOption === "Room Information") {
        requestPHP("available-room.php", currentOption);
      } else if (currentOption === "Assign Room") {
        requestPHP("assign-room.php", currentOption);
      } else if (currentOption === "Free Room") {
        requestPHP("free-room.php", currentOption);
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
  previewCardsArr.forEach((element) => {
    let parentNode = element.parentElement;
    parentNode.removeChild(element);
  });
  previewCardsArr.length = 0;
}
function createCards(optionType, numOfCards, data) {
  for (let index = 0; index < numOfCards; index++) {
    let roomTypeClass =
      data[index]["room_type"] === "Single_Room" ? "single-bed" : "double-bed";
    if (optionType === "Room Information") {
      previewSection.appendChild(availableCard(roomTypeClass, data[index]));
    } else if (optionType === "Assign Room") {
      previewSection.appendChild(assignCard(roomTypeClass, data[index]));
    } else if (optionType === "Free Room") {
      previewSection.appendChild(freeCard(roomTypeClass, data[index]));
    }
  }
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
  let roomType =
    data["room_type"] === "Single_Room" ? "Single Room" : "Double Room";
  let imageSource = [
    "icons/roomIcons/room-asign.png",
    "icons/roomIcons/available-room.png",
  ];
  let pText = ["Assign", roomType];
  createPreviewDetails(previewDetailsSection, imageSource, pText);
  return card;
};
const freeCard = (roomTypeClass, data) => {
  const { card, previewDetailsSection } = baseCard(roomTypeClass);
  let roomType =
    data["room_type"] === "Single_Room" ? "Single Room" : "Double Room";
  let imageSource = [
    "icons/roomIcons/room-remove.png",
    "icons/roomIcons/room-occupants.png",
  ];
  let pText = ["Remove", roomType];
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
      previewDetails.addEventListener("click", () => {
        globalPopUp = createAssignPopUp();
      });
    } else if (previewDetails.textContent === "Remove") {
      previewDetails.addEventListener("click", () => {
        console.log("bruh");
      });
    }
    parentElement.appendChild(previewDetails);
  }
}
const popUpSection = () => {
  const parentElement = document.querySelector(".preview-section");
  const popUpSection = document.createElement("div");
  popUpSection.classList.add("popup-modal-section");
  const popUp = document.createElement("form");
  popUp.classList.add("pop-up");
  popUpSection.appendChild(popUp);
  parentElement.appendChild(popUpSection);
  return { popUpSection, popUp };
};
function removePopUpSection(popUpSection) {
  popUpSection.remove();
}
function createAssignPopUp() {
  const sectionDiv = popUpSection();

  let popUp = sectionDiv.popUp;
  popUp.setAttribute("action", "test.php");
  popUp.setAttribute("method", "post");

  const title = document.createElement("div");
  title.textContent = "Assign Room";

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
  let dataList = document.createElement("datalist");
  dataList.setAttribute("id", "tenant-list");
  const firstDivElements = [labels[0], inputs[0], dataList];
  labels[0].setAttribute("for", "tenant");
  labels[0].textContent = "Tenants";
  inputs[0].setAttribute("list", "tenant-list");
  inputs[0].setAttribute("name", "tenant");
  inputs[0].setAttribute("id", "tenant");
  firstDivElements.forEach((element) => {
    divs[0].appendChild(element);
  });
  popUp.appendChild(divs[0]);

  //second div
  labels[1].setAttribute("for", "amenity");
  labels[1].textContent = "Amenity";
  inputs[1].setAttribute("type", "text");
  inputs[1].setAttribute("name", "amenity");
  inputs[1].setAttribute("id", "amenity-input");
  inputs[1].setAttribute("value", "internet");
  inputs[1].setAttribute("readonly", "");
  divs[1].appendChild(labels[1]);
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
  inputs[4].setAttribute("type", "submit");
  inputs[4].setAttribute("value", "submit");
  inputs[4].setAttribute("name", "submit");
  divs[3].appendChild(closeDiv);
  divs[3].appendChild(inputs[4]);
  popUp.appendChild(divs[3]);

  return sectionDiv.popUpSection;
}
createAssignPopUp(removePopUpSection);
