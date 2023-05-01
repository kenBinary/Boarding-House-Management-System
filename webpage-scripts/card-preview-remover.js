let optionsArray = Array.from(document.querySelectorAll('.option'));
let previewCardsArr = Array.from(document.querySelectorAll('.preview-card'));
let previousOption = optionsArray[0];
let previewSection = document.querySelector('.preview-section');

function removeCards() {
    previewCardsArr.forEach((element) => {
        let parentNode = element.parentElement;
        parentNode.removeChild(element);
    });
    previewCardsArr.length = 0;
}
function createCards(cardType) {
    for (let index = 0; index < 5; index++) {
        previewSection.appendChild(createRoomCard("single-bed", cardType))
    }
}
optionsArray.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target != previousOption) {
            previousOption = e.target;
            removeCards();
            createCards(previousOption.lastElementChild.textContent);
        }
    });
});
function createPreviewDetails(parentElement,imageSource,textContent) {
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
function createRoomCard(roomType, optionType) {
    const card = document.createElement('div');
    card.classList.add('preview-card');
    const imagePreview = document.createElement('div');
    imagePreview.classList.add('preview-image', roomType);
    const previewDetailsSection = document.createElement('div');
    previewDetailsSection.classList.add('preview-details-section');
    if (optionType === "Room Availability") {
        let imageSource = ["icons/roomIcons/room-number.png", "icons/roomIcons/room-info.png","icons/roomIcons/available-room.png"];
        let pText = ["1", "Occupied","Single"];
        createPreviewDetails(previewDetailsSection,imageSource,pText);
    }
    else if (optionType === "Assign Room") {
        let imageSource = ["icons/roomIcons/room-asign.png", "icons/roomIcons/available-room.png"];
        let pText = ["Assign", "Type"];
        createPreviewDetails(previewDetailsSection,imageSource,pText);
    }
    else if (optionType === "Free Room") {
        let imageSource = ["icons/roomIcons/room-remove.png", "icons/roomIcons/room-occupants.png"];
        let pText = ["Remove", "Occupants"];
        createPreviewDetails(previewDetailsSection,imageSource,pText);
    }
    card.appendChild(imagePreview);
    card.appendChild(previewDetailsSection);
    previewCardsArr.push(card);
    return card;
}