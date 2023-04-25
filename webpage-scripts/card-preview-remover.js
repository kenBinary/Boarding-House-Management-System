let optionsArray = Array.from(document.querySelectorAll('.option'));
let previewCardsArr = Array.from(document.querySelectorAll('.preview-card'));
let previousOption = optionsArray[0];

function removeCards() {
    previewCardsArr.forEach((element) => {
        let parentNode = element.parentElement;
        parentNode.removeChild(element);
    });
    previewCardsArr.length = 0;
}
optionsArray.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target != previousOption) {
            removeCards();
            previousOption = e.target;
        }
    });
});