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
    heightDuct5: 0
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

// Функція розрахування швидкості повітря
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


// Функція розрахування площі поперечного перерізу
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
/////////////////////////////////////////

//////////// Кнопка "Заповнити данні"  ////////////

function filling() {
    document.getElementById("ductSize1").value = 250;
    document.getElementById("airSpeed1").value = 4;
    document.getElementById("airFlow2").value = 707;
    document.getElementById("crossArea2").value = 0.05;
    document.getElementById("airFlow3").value = 707;
    document.getElementById("airSpeed3").value = 4;
    document.getElementById("crossArea4").value = 0.05;
    document.getElementById("crossArea5").value = 0.05;
    document.getElementById("heightDuct5").value = 300;
}
/////////////////////////////////////////

// Функція розрахунку ширини прямокутного повітропровіду 

function calcWightDuct() {
    updateData();

    const resultWightDuct = data.crossArea5 / (parseFloat(data.heightDuct5) / 1000) * 1000;
    const resultWightDuctText = isNaN(resultWightDuct) ? "Помилка" : `${resultWightDuct.toFixed(0)}х${data.heightDuct5}`;

    const resultWightDuctElement = document.getElementById('resultWightDuct');
    resultWightDuctElement.textContent = resultWightDuctText;

    // Викликаємо функцію selectStandartWight та отримуємо результат
    const selectedWight = selectStandartWight(resultWightDuct);

    // Виводимо результат у відповідний <p> елемент
    const selectStandartWightElement = document.getElementById('selectStandartWight');
    selectStandartWightElement.textContent = `${selectedWight}х${data.heightDuct5}`;
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