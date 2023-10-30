// Об'являємо об'єкт для зберігання значень

let data = {
    ductSize1: 0,
    airSpeed1: 0,
    airFlow2: 0,
    crossArea2: 0,
    airFlow3: 0,
    airSpeed3: 0,
    crossArea4: 0,
    crossArea5: 0,
    heightDuct5: 0,
    crossArea6: 0,
    heightDuct6: 0
};



// Функція для отримання значень і збереження їх у об'єкті
function updateData() {
    const getValue = (id) => parseFloat(document.getElementById(id).value.replace(',', '.'));

    data.ductSize1 = getValue('ductSize1');
    data.airSpeed1 = getValue('airSpeed1');
    data.airFlow2 = getValue('airFlow2');
    data.crossArea2 = getValue('crossArea2');
    data.airFlow3 = getValue('airFlow3');
    data.airSpeed3 = getValue('airSpeed3');
    data.crossArea4 = getValue('crossArea4');
    data.crossArea5 = getValue('crossArea5');
    data.heightDuct5 = getValue('heightDuct5');
    data.crossArea6 = getValue('crossArea6');
    data.heightDuct6 = getValue('heightDuct6');
}

// Функція розрахунку витрат повітря
function calculateAirExchange() {
    updateData();
    const area = (Math.PI * (data.ductSize1 / 1000) ** 2) / 4;
    const airExchange = area * data.airSpeed1 * 3600;
    const resultAir = document.getElementById('resultAir');
    if (airExchange >= 28 && airExchange <= 35000) {
        const roundedAirExchange = Math.round(airExchange);
        const formattedAirExchange = roundedAirExchange.toLocaleString();
        resultAir.textContent = `L = ${formattedAirExchange} м³/год`;

        // // Присваєвумо результат до значення у другій таблиці
        // data.airFlow2 = formattedAirExchange;
        // // Вставляємо це значення як значення по замовченню
        // const airFlow2Input = document.getElementById('airFlow2');
        // airFlow2Input.value = formattedAirExchange;

        // // Дублюємо значення швидкості у третій стовбець
        // data.airFlow3 = formattedAirExchange;
        // // Вставляємо це значення як значення по замовченню
        // const airFlow3Input = document.getElementById('airFlow3');
        // airFlow3Input.value = formattedAirExchange;


    } else {
        resultAir.textContent = "Помилка";
    }
}

// Функція розрахунку швидкості повітря
function calculateAirSpeed() {
    updateData();
    const speed = data.airFlow2 / (3600 * data.crossArea2);
    const resultSpeed = document.getElementById('resultSpeed'); // 
    if (!isNaN(speed) && speed >= 0 && speed <= 500) {
        const roundedSpeed = speed.toFixed(1);
        resultSpeed.textContent = `V = ${roundedSpeed} м/c`; // 
    } else {
        resultSpeed.textContent = "Помилка";
    }
}

// Функція розрахунку площі поперечного перерізу
function calculateCrossArea() {
    updateData();

    const crossArea = data.airFlow3 / (3600 * data.airSpeed3);
    const resultCrossArea = document.getElementById('resultCrossArea');
    if (!isNaN(crossArea) && crossArea >= 0) {
        const roundedCrossArea = crossArea.toFixed(2);
        resultCrossArea.textContent = `F = ${roundedCrossArea} м²`;
    } else {
        resultCrossArea.textContent = "Помилка";
    }
}

////////////  Відслідковуємо натискання Enter ////////////
function checkEnter1(event) {
    if (event.key === "Enter") {
        calculateAirExchange();
    }
}
function checkEnter2(event) {
    if (event.key === "Enter") {
        calculateAirSpeed();
    }
}
function checkEnter3(event) {
    if (event.key === "Enter") {
        calculateCrossArea();
    }
}
function checkEnter4(event) {
    if (event.key === "Enter") {
        calculateDiametr();
    }
}
function checkEnter5(event) {
    if (event.key === "Enter") {
        calcWightDuct();
    }
}
function checkEnter6(event) {
    if (event.key === "Enter") {
        calcOvalDuct();
    }
}
/////////////////////////////////////////

//////////// Кнопка "Заповнити данні"  ////////////

function filling() {

    document.getElementById("ductSize1").value = 250;
    document.getElementById("airSpeed1").value = 4;
    document.getElementById("airFlow2").value = 707;
    document.getElementById("crossArea2").value = 0.05;
    document.getElementById("airFlow3").value = 3600;
    document.getElementById("airSpeed3").value = 5;
    document.getElementById("crossArea4").value = 0.2;
    document.getElementById("crossArea5").value = 0.2;
    document.getElementById("heightDuct5").value = 300;
    document.getElementById("crossArea6").value = 0.2;
    document.getElementById("heightDuct6").value = 250;
    calculateAirExchange();
    calculateAirSpeed();
    calculateCrossArea();
    calculateDiametr();
    calcWightDuct();
    calcOvalDuct();
}
/////////////////////////////////////////

// Функція розрахунку ширини прямокутного повітропровіду 
function calcWightDuct() {
    updateData();
    const resultWightDuct = data.crossArea5 / (parseFloat(data.heightDuct5) / 1000) * 1000;
    const resultWightDuctText = isNaN(resultWightDuct) ? "Помилка" : `${resultWightDuct.toFixed(0)} х ${data.heightDuct5}`;

    const resultWightDuctElement = document.getElementById('resultWightDuct');
    resultWightDuctElement.textContent = resultWightDuctText;

    // Викликаємо функцію selectStandartWight та отримуємо результат
    const selectedWight = selectStandartWight(resultWightDuct);

    // Виводимо результат у відповідний <p> елемент
    const selectStandartWightElement = document.getElementById('selectStandartWight');
    selectStandartWightElement.textContent = `${selectedWight} х ${data.heightDuct5}`;
}

// Функція підбору стандартного прямокутного повітропровіду 
function selectStandartWight(calculatedWight) {
    const rangeOfStandartWight = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 2000];
    let selectedWight = rangeOfStandartWight[0]; // За замовчуванням вибираємо перший стандартний розмір

    for (let i = 1; i < rangeOfStandartWight.length; i++) {
        const currentWight = rangeOfStandartWight[i];
        const prevWight = rangeOfStandartWight[i - 1];

        const delta = currentWight - prevWight;
        const threshold = delta * 0.19; // 19% від різниці

        if (calculatedWight >= prevWight && calculatedWight <= currentWight) {
            if (calculatedWight - prevWight > threshold) {
                selectedWight = currentWight;
            } else {
                selectedWight = prevWight;
            }
            break;
        }
    }

    return selectedWight;
}


// Функція розрахування еквівалентного діаметру
function calculateDiametr() {
    updateData();
    const diametr = Math.sqrt((4 * data.crossArea4) / 3.14) * 1000;
    const resultDiametr = document.getElementById('resultDiametr');
    if (!isNaN(data.crossArea4) && data.crossArea4 >= 0) {
        const roundedDiametr = diametr.toFixed(0);
        resultDiametr.innerHTML = `D<sub>екв</sub> = ${roundedDiametr} мм`;

        // Виклик функції для підбору стандартного діаметру на основі обчисленого значення
        const standardDiametr = selectStandartDiametr(diametr);

        // Отримуємо елемент для виводу рекомендованого стандартного діаметру
        const standartDiametrElement = document.getElementById('standartDiametr');
        // Змінюємо вміст елемента на рекомендований стандартний діаметр
        standartDiametrElement.textContent = `D = ${standardDiametr} мм`;
    } else {
        resultDiametr.textContent = "Помилка";
    }
}


// Функція підбору рекомендованого стандартного діаметру
function selectStandartDiametr(diametr) {
    const rangeOfStandartDiametrs = [100, 125, 150, 160, 200, 225, 250, 315, 355, 400, 450, 500, 560, 630, 700, 800, 900, 1000];
    let calculatedDiametr = rangeOfStandartDiametrs[0]; // За замовчуванням, вибрати перше значення

    for (let i = 1; i < rangeOfStandartDiametrs.length; i++) {
        const currentDiametr = rangeOfStandartDiametrs[i];
        const prevDiametr = rangeOfStandartDiametrs[i - 1];

        const delta = currentDiametr - prevDiametr;
        const threshold = delta * 0.19; // 19% від різниці

        if (diametr >= prevDiametr && diametr <= currentDiametr) {
            if (diametr - prevDiametr > threshold) {
                calculatedDiametr = currentDiametr;
            } else {
                calculatedDiametr = prevDiametr;
            }
            break;
        }
    }

    return calculatedDiametr;
}

// Функція приняття площі F з 3 до 4 вікна 
function fillArea4() {
    const resultCrossAreaValue = parseFloat(document.getElementById('resultCrossArea').textContent.split('=')[1].trim().split(' ')[0]);
    data.crossArea4 = resultCrossAreaValue;
    document.getElementById('crossArea4').value = resultCrossAreaValue;
}
function fillArea5() {
    const resultCrossAreaValue = parseFloat(document.getElementById('resultCrossArea').textContent.split('=')[1].trim().split(' ')[0]);
    data.crossArea4 = resultCrossAreaValue;
    document.getElementById('crossArea5').value = resultCrossAreaValue;
}
function fillArea6() {
    const resultCrossAreaValue = parseFloat(document.getElementById('resultCrossArea').textContent.split('=')[1].trim().split(' ')[0]);
    data.crossArea4 = resultCrossAreaValue;
    document.getElementById('crossArea6').value = resultCrossAreaValue;
}




// Розрахунок плоскоовала
function calcOvalDuct() {
    updateData();

    const allowedHeights = [150, 200, 250, 300, 350, 400, 450, 500];


    const resultOvalWightDuct = (((data.crossArea6 - ((3.14 * (parseFloat(data.heightDuct6) / 1000) * (parseFloat(data.heightDuct6) / 1000)) / 4)) / (parseFloat(data.heightDuct6) / 1000)) + (parseFloat(data.heightDuct6) / 1000)) * 1000;

    const resultOvalWightDuctText = (isNaN(resultOvalWightDuct) || !allowedHeights.includes(data.heightDuct6))
        ? "Помилка"
        : `${resultOvalWightDuct.toFixed(0)} х ${data.heightDuct6}`;

    const resultOvalWightDuctElement = document.getElementById('resultOvalWightDuct');
    resultOvalWightDuctElement.textContent = resultOvalWightDuctText;

    // Викликаємо функцію підбора стандарту
    const selectedOvalWight = selectStandarOvaltWight(resultOvalWightDuct);

    // Виводимо результат у відповідний <p> елемент
    const selectStandartOvalWightElement = document.getElementById('selectStandartOvalWight');
    selectStandartOvalWightElement.textContent = `${selectedOvalWight} х ${data.heightDuct6}`;
}

// Функція підбору стандартного овального повітропровіду 
function selectStandarOvaltWight(calculatedOvalWight) {
    let selectedOvalWight = 0; // Значення за замовчуванням

    if (data.heightDuct6 === 150) {
        const rangeOfStandartOvalWight150 = [420, 480, 555, 630, 710, 805, 915, 1045];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight150);
    } else if (data.heightDuct6 === 200) {
        const rangeOfStandartOvalWight200 = [455, 525, 605, 685, 780, 890, 1015];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight200);
    } else if (data.heightDuct6 === 250) {
        const rangeOfStandartOvalWight250 = [495, 575, 655, 750, 860, 985];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight250);
    } else if (data.heightDuct6 === 300) {
        const rangeOfStandartOvalWight300 = [465, 545, 625, 720, 830, 960];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight300);
    } else if (data.heightDuct6 === 350) {
        const rangeOfStandartOvalWight350 = [520, 595, 690, 805, 930];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight350);
    } else if (data.heightDuct6 === 400) {
        const rangeOfStandartOvalWight400 = [570, 665, 775, 900];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight400);
    } else if (data.heightDuct6 === 450) {
        const rangeOfStandartOvalWight450 = [635, 745, 870];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight450);
    } else if (data.heightDuct6 === 500) {
        const rangeOfStandartOvalWight500 = [715, 840];
        selectedOvalWight = getSelectedOvalWight(calculatedOvalWight, rangeOfStandartOvalWight500);
    }

    return selectedOvalWight;
}

function getSelectedOvalWight(calculatedOvalWight, range) {
    let selectedOvalWight = range[0]; // За замовчуванням вибираємо перше значення списку

    for (let i = 1; i < range.length; i++) {
        const currentOvalWight = range[i];
        const prevOvalWight = range[i - 1];

        const deltaOval = currentOvalWight - prevOvalWight;
        const thresholdOval = deltaOval * 0.19; // 19% від різниці

        if (calculatedOvalWight >= prevOvalWight && calculatedOvalWight <= currentOvalWight) {
            if (calculatedOvalWight - prevOvalWight > thresholdOval) {
                selectedOvalWight = currentOvalWight;
            } else {
                selectedOvalWight = prevOvalWight;
            }
            break;
        }
    }

    return selectedOvalWight;
}





document.getElementById('sendToTelegramButton').addEventListener('click', function () {
    // Зчитайте дані з полів форми
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;

    // Створіть об'єкт з даними, які ви хочете відправити
    var formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);

    // Виконайте AJAX-запит і передайте дані форми
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './send.php', true);
    xhr.send(formData);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Отримали успішну відповідь від сервера (HTTP статус 200)
            var response = xhr.responseText;
            // Можливо, додайте код для обробки відповіді тут, якщо потрібно
            console.log(response);
        } else if (xhr.readyState === 4) {
            // Виникла помилка під час виконання запиту
            console.error('Помилка при виконанні запиту до сервера');
        }
    };
});