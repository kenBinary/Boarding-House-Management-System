let optionsArray = Array.from(document.querySelectorAll('.option'));
let previewCardsArr = Array.from(document.querySelectorAll('.preview-card'));
let currentOption = optionsArray[0];
let previewSection = document.querySelector('.preview-section');
optionsArray.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target != currentOption) {
            currentOption = e.target.lastElementChild.textContent;
            removeCards();
            if (currentOption === "Room Availability") {
                requestPHP("available-room.php", currentOption);
            }
            else if (currentOption === "Assign Room") {
                requestPHP("assign-room.php", currentOption);
            }
            else if (currentOption === "Free Room") {
                requestPHP("free-room.php", currentOption);
            }
        }
    });
});
const initializeCards = (() => {
    const initialize = requestPHP("available-room.php", "Room Availability");
    return { initialize }
})();
function requestPHP(filePath, optionType) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
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
        let roomTypeClass = data[index]['room_type'] === "Single_Room" ? "single-bed" : "double-bed";
        if (optionType === "Room Availability") {
            previewSection.appendChild(availableCard(roomTypeClass, data[index]));
        }
        else if (optionType === "Assign Room") {
            previewSection.appendChild(assignCard(roomTypeClass, data[index]));
        }
        else if (optionType === "Free Room") {
            previewSection.appendChild(freeCard(roomTypeClass, data[index]));
        }
    }
}
const baseCard = (roomType) => {
    const card = document.createElement('div');
    card.classList.add('preview-card');
    const imagePreview = document.createElement('div');
    imagePreview.classList.add('preview-image', roomType);
    const previewDetailsSection = document.createElement('div');
    previewDetailsSection.classList.add('preview-details-section');
    card.appendChild(imagePreview);
    card.appendChild(previewDetailsSection);
    previewCardsArr.push(card);
    return { card, imagePreview, previewDetailsSection };
};
const availableCard = (roomTypeClass, data) => {
    const { card, previewDetailsSection } = baseCard(roomTypeClass);
    let roomNumber = data['roomNumber'];
    let roomStatus = data['roomStatus'] === "1" ? "Occupied" : "Vacant";
    let roomType = data['room_type'] === "Single_Room" ? "Single Room" : "Double Room";
    const imageSource = ["icons/roomIcons/room-number.png", "icons/roomIcons/room-info.png", "icons/roomIcons/available-room.png"];
    let pText = [roomNumber, roomStatus, roomType];
    createPreviewDetails(previewDetailsSection, imageSource, pText);
    return card;
}
const assignCard = (roomTypeClass, data) => {
    const { card, previewDetailsSection } = baseCard(roomTypeClass);
    let roomType = (data['room_type'] === "Single_Room") ? "Single Room" : "Double Room";
    let imageSource = ["icons/roomIcons/room-asign.png", "icons/roomIcons/available-room.png"];
    let pText = ["Assign", roomType];
    createPreviewDetails(previewDetailsSection, imageSource, pText);
    return card;
}
const freeCard = (roomTypeClass, data) => {
    const { card, previewDetailsSection } = baseCard(roomTypeClass);
    let roomType = data['room_type'] === "Single_Room" ? "Single Room" : "Double Room";
    let imageSource = ["icons/roomIcons/room-remove.png", "icons/roomIcons/room-occupants.png"];
    let pText = ["Remove", roomType];
    createPreviewDetails(previewDetailsSection, imageSource, pText);
    return card;
}
function createPreviewDetails(parentElement, imageSource, textContent) {
    for (let index = 0; index < imageSource.length; index++) {
        const previewDetails = document.createElement('div');
        previewDetails.classList.add('preview-details');
        const detailImage = document.createElement('img');
        detailImage.src = imageSource[index];
        const detailText = document.createElement('p');
        detailText.textContent = textContent[index];
        previewDetails.appendChild(detailImage);
        previewDetails.appendChild(detailText);
        parentElement.appendChild(previewDetails);
    }
}




