let optionsArray = Array.from(document.querySelectorAll('.option'));
let previewCardsArr = Array.from(document.querySelectorAll('.preview-card'));
let currentOption = optionsArray[0];
let previewSection = document.querySelector('.preview-section');
function retrieveTenants() {
    var xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "payment-tenants.php",
        true
    );

    xhr.onload = function () {
        if (this.status == 200) {
            let data = JSON.parse(this.responseText);
            let formattedData = formatData(data);
            createRecords(formattedData);
            // console.log(formattedData);
        } else {
            console.log("error retrieving tenants");
        }
    };
    xhr.send();
}
retrieveTenants();
function formatData(data) {
    let finalArr = [];
    for (let x = 0; x < data.length; x += 2) {
        let newArr = []
        data[x].forEach((element, index, array) => {
            if (index === 5) {
                let water = data[x + 1][5];
                newArr.push(water);
            }
            newArr.push(element);
        });
        finalArr.push(newArr);
    }
    finalArr.forEach((element, index, array) => {
        element.forEach((element, index, array) => {
            if (index === 1) {
                array[index] = element + " " + array[index + 1];
                array.splice(2, 1);
            }
        });

    });
    return finalArr;
}
function createRecord(data) {
    const tableBody = document.querySelector(".table-body");
    let row = document.createElement('tr');
    data.forEach((element, index, array) => {
        const cell = document.createElement('td');
        const inputID = ['room', 'amenity'];
        const amenityID = ['Electricity', 'Water'];
        let amenityIndex = 0;
        if (index === 2) {
            const input = document.createElement('input');
            input.setAttribute("id", inputID[0]);
            input.setAttribute("type", "submit");
            input.setAttribute("name", inputID[0]);
            input.setAttribute("value", array[6] === 'Single_Room' ? 'Single Room' : 'Double Room');
            input.setAttribute("class", element == 1 ? 'paid' : 'unpaid');
            cell.appendChild(input);
        }
        else if (index === 3) {
            const input = document.createElement('input');
            input.setAttribute("id", inputID[1]);
            input.setAttribute("name", inputID[1]);
            input.setAttribute("type", "submit");
            input.setAttribute("value", "internet");
            input.setAttribute("class", element == 1 ? 'paid' : 'unpaid');
            cell.appendChild(input);
        }
        else if (index === 4) {
            const electricityInput = document.createElement('input');
            electricityInput.setAttribute("id", amenityID[amenityIndex]);
            electricityInput.setAttribute("name", amenityID[amenityIndex]);
            electricityInput.setAttribute("type", "submit");
            electricityInput.setAttribute("value", amenityID[amenityIndex]);
            electricityInput.setAttribute("class", element == 1 ? 'paid' : 'unpaid');
            cell.appendChild(electricityInput);
            amenityIndex++;

            const waterINput = document.createElement('input');
            waterINput.setAttribute("id", amenityID[amenityIndex]);
            waterINput.setAttribute("name", amenityID[amenityIndex]);
            waterINput.setAttribute("type", "submit");
            waterINput.setAttribute("value", amenityID[amenityIndex]);
            waterINput.setAttribute("class", array[index + 1] == 1 ? 'paid' : 'unpaid');
            cell.appendChild(waterINput);
        }
        else if (index === 5 || index === 6) {
            return false;
        }
        else {
            cell.textContent = element;
        }
        row.appendChild(cell);
    });
    tableBody.appendChild(row);
}
function createRecords(dataList) {
    dataList.forEach((element) => {
        createRecord(element);
    });
}