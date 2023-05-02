let optionsArray = Array.from(document.querySelectorAll('.option'));
let previewCardsArr = Array.from(document.querySelectorAll('.preview-card'));
let currentOption = optionsArray[0];
let previewSection = document.querySelector('.preview-section');
optionsArray.forEach(option => {
    option.addEventListener('click', (e) => {
        if (e.target != currentOption) {
            currentOption = e.target.lastElementChild.textContent;
            removeCards();
        }
    });
});
function removeCards() {
    previewCardsArr.forEach((element) => {
        let parentNode = element.parentElement;
        parentNode.removeChild(element);
    });
    previewCardsArr.length = 0;
}
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