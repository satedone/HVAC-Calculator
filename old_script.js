
// Відслідковуємо натискання Enter
function checkEnter1(event) {
    if (event.key === "Enter") {
        calculateAirExchange();
    }
}

// Функція розрахування витрат повітря
function calculateAirExchange() {
    const getValue = (id) => parseFloat(document.getElementById(id).value);
    const ductSize = getValue('ductSize');
    const airSpeed = getValue('airSpeed');
    const area = (Math.PI * (ductSize / 1000) ** 2) / 4;
    const airExchange = area * airSpeed * 3600;
    const resultAir = document.getElementById('resultAir'); // Використовуємо resultAir
    if (airExchange >= 28 && airExchange <= 35000) {
        const roundedAirExchange = Math.round(airExchange);
        const formattedAirExchange = roundedAirExchange.toLocaleString();
        resultAir.textContent = `L = ${formattedAirExchange} м³/год`; // Використовуємо resultAir
    } else {
        resultAir.textContent = "Помилка";
    }
}

// Відслідковуємо натискання Enter
function checkEnter2(event) {
    if (event.key === "Enter") {
        calculateAirSpeed();
    }
}

// Функція розрахування витрат повітря
function calculateAirSpeed() {
    const getValue = (id) => parseFloat(document.getElementById(id).value.replace(',', '.'));
    const airFlow = getValue('airFlow');
    const crossArea = getValue('crossArea');
    const speed = airFlow / (3600 * crossArea);
    const resultSpeed = document.getElementById('resultSpeed'); // Використовуємо resultSpeed
    if (!isNaN(speed) && speed >= 0 && speed <= 500) {
        const roundedSpeed = speed.toFixed(1);
        resultSpeed.textContent = `V = ${roundedSpeed} м/c`; // Використовуємо resultSpeed
    } else {
        resultSpeed.textContent = "Помилка";
    }
}

// Відслідковуємо натискання Enter для третього вікна
function checkEnter3(event) {
    if (event.key === "Enter") {
        calculateCrossArea();
    }
}

// Функція розрахування площі поперечного перерізу
function calculateCrossArea() {
    const getValue = (id) => parseFloat(document.getElementById(id).value.replace(',', '.')); // Заміна коми на крапку
    const airFlow3 = getValue('airFlow3');
    const airSpeed3 = getValue('airSpeed3');
    const crossArea = airFlow3 / (3600 * airSpeed3);
    const resultCrossArea = document.getElementById('resultCrossArea');
    if (!isNaN(crossArea) && crossArea >= 0) {
        const roundedCrossArea = crossArea.toFixed(2);
        resultCrossArea.textContent = `F = ${roundedCrossArea} м²`;
    } else {
        resultCrossArea.textContent = "Помилка";
    }
}

// Відслідковуємо натискання Enter для четвертого вікна
function checkEnter4(event) {
    if (event.key === "Enter") {
        calculateDiametr();
    }
}

// Функція розрахування еквівалентного діаметру
function calculateDiametr() {
    const inputCrossArea = parseFloat(document.getElementById('inputCrossArea').value.replace(',', '.')); // Заміна коми на крапку
    const diametr = Math.sqrt((4 * inputCrossArea) / 3.14) * 1000;
    const resultDiametr = document.getElementById('resultDiametr');
    if (!isNaN(inputCrossArea) && inputCrossArea >= 0) {
        const roundedDiametr = diametr.toFixed(0);
        // resultDiametr.textContent = `<sub>екв</sub> = ${roundedDiametr} мм`;
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
    const rangeOfStandartDiametrs = [100, 125, 150, 160, 200, 225, 250, 315, 355, 400, 450, 500, 560, 630];
    let calculatedDiametr = rangeOfStandartDiametrs[0]; // За замовчуванням, вибрати перше значення
    let minDifference = Math.abs(calculatedDiametr - diametr);

    for (let i = 1; i < rangeOfStandartDiametrs.length; i++) {
        const currentDifference = Math.abs(rangeOfStandartDiametrs[i] - diametr);

        if (currentDifference < minDifference) {
            minDifference = currentDifference;
            calculatedDiametr = rangeOfStandartDiametrs[i];
        } else if (currentDifference === minDifference && currentDifference <= 0.19 * rangeOfStandartDiametrs[i]) {
            calculatedDiametr = rangeOfStandartDiametrs[i];
        }
    }

    return calculatedDiametr;
}






// Прийняти площу з попереднього розрахунку
function fillArea() {
    const resultCrossArea = document.getElementById('resultCrossArea');
    const inputCrossArea = document.getElementById('inputCrossArea');
    const areaText = resultCrossArea.textContent;
    const area = areaText ? parseFloat(areaText.split('=')[1].trim().replace('м²', '')) : null;
    inputCrossArea.value = area !== null ? area : '0';
}

// Прийняти площу з попереднього розрахунку 2
function fillArea2() {
    const resultCrossArea = document.getElementById('resultCrossArea');
    const inputCrossArea2 = document.getElementById('inputCrossArea2');
    const areaText = resultCrossArea.textContent;
    const area = areaText ? parseFloat(areaText.split('=')[1].trim().replace('м²', '')) : null;
    inputCrossArea2.value = area !== null ? area : '0';
}
// Відслідковуємо натискання Enter для п'ятого вікна
function checkEnter5(event) {
    if (event.key === "Enter") {
        calcWightDuct();
    }
}

function calcWightDuct() {
    const inputHightDuct = document.getElementById('inputHightDuct');
    const inputCrossArea2 = document.getElementById('inputCrossArea2');
    const inputCrossAreaValue = parseFloat(inputCrossArea2.value.replace(',', '.'));
    const resultWightDuct = inputCrossAreaValue / (parseFloat(inputHightDuct.value) / 1000) * 1000;
    const resultWightDuctText = isNaN(resultWightDuct) ? "Помилка" : `${resultWightDuct.toFixed(0)}х${inputHightDuct.value}`;

    const resultWightDuctElement = document.getElementById('resultWightDuct');
    resultWightDuctElement.textContent = resultWightDuctText;

    // Викликаємо функцію selectStandartWight та отримуємо результат
    const selectedWight = selectStandartWight(resultWightDuct);

    // Виводимо результат у відповідний <p> елемент
    const selectStandartWightElement = document.getElementById('selectStandartWight');
    selectStandartWightElement.textContent = `${selectedWight}х${inputHightDuct.value}`;
}

function selectStandartWight(calculatedWight) {
    const rangeOfStandartWight = [100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000];
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

// !!! Запрацював коректний підбір розміру прямокутного повітропроводу !!!
// Тепер треба відкорегувати, полагодити так само круглий
// А ще треба внести сюди захист від помилок


// Функція для тестування
document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо посилання на поле вводу за його ідентифікатором
    let inputElement = document.getElementById("inputHightDuct");
    let inputElement2 = document.getElementById("inputCrossArea2");
    // Встановлюємо значення 200 в поле вводу
    inputElement.value = "200";
    inputElement2.value = "0.15";
});

