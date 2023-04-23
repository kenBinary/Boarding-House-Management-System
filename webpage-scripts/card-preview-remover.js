const options = document.querySelectorAll('.option');
const previewSection = document.querySelector('.preview-section');
const previewCards = document.querySelectorAll('.preview-card');
function removeCards() {
    previewCards.forEach((element)=>{
        let parentNode = element.parentElement;
        parentNode.removeChild(element);
    });
}
options.forEach(option => {
    option.addEventListener('click',removeCards);
});


