// Об'являємо об'єкт для зберігання значень

let data = {
    ductSize1: 0,
    airSpeed1: 0,
    airFlow2: 0,
    crossArea2: 0
};



// Функція для отримання значень і збереження їх у об'єкті
function updateData() {
    const getValue = (id) => parseFloat(document.getElementById(id).value.replace(',', '.'));

    data.ductSize1 = getValue('ductSize1');
    data.airSpeed1 = getValue('airSpeed1');
    data.airFlow2 = getValue('airFlow2');
    data.crossArea2 = getValue('crossArea2');


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
        
        // Присваєвумо результат до значення у третій таблиці
        data.airFlow2 = formattedAirExchange;
        // Вставляємо це значення як значення по замовченню
        const airFlow2Input = document.getElementById('airFlow2');
        airFlow2Input.value = formattedAirExchange;

    } else {
        resultAir.textContent = "Помилка";
    }
}

// Функція розрахування швидкості повітря
function calculateAirSpeed() {
    updateData();
    console.log(data.airFlow2);
    const speed = data.airFlow2 / (3600 * data.crossArea2);
    const resultSpeed = document.getElementById('resultSpeed'); // 
    if (!isNaN(speed) && speed >= 0 && speed <= 500) {
        const roundedSpeed = speed.toFixed(1);
        resultSpeed.textContent = `V = ${roundedSpeed} м/c`; // 
    } else {
        resultSpeed.textContent = "Помилка";
    }
}