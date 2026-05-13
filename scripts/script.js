// Инициализация Swiper
const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    },
});

// Получаем элементы полей ввода и результат
const squareInput = document.querySelector('input[name="square"]');
const lightInput = document.querySelector('input[name="light"]');
const resultSpan = document.querySelector('.calculator-sum');

// Функция для безопасного парсинга числа (замена запятой на точку, обработка пустых значений)
function parseNumber(value) {
    if (!value || value === '') return 0;
    let cleaned = String(value).trim().replace(/,/g, '.');
    let num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}

// Основная функция расчета: 900 * площадь * количество точек
function calculateTotal() {
    let square = parseNumber(squareInput.value);
    let lights = parseNumber(lightInput.value);
    
    let total = 900 * square * lights;
    
    // Округляем до целого числа
    total = Math.round(total);
    
    // Форматируем с пробелами для тысяч (например, 10 180 Р)
    let formattedTotal = total.toLocaleString('ru-RU');
    
    resultSpan.textContent = formattedTotal + ' Р';
}

// Функция очистки ввода от лишних символов (разрешаем только цифры, точку и запятую)
function sanitizeAndCalculate(e) {
    let input = e.target;
    let value = input.value;
    
    // Оставляем только цифры, точку и запятую
    let cleaned = value.replace(/[^\d.,]/g, '');
    
    // Убираем лишние точки и запятые (оставляем только одну)
    let dotCount = (cleaned.match(/\./g) || []).length;
    let commaCount = (cleaned.match(/,/g) || []).length;
    
    if (dotCount > 1) {
        let firstDot = cleaned.indexOf('.');
        cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
    }
    if (commaCount > 1) {
        let firstComma = cleaned.indexOf(',');
        cleaned = cleaned.slice(0, firstComma + 1) + cleaned.slice(firstComma + 1).replace(/,/g, '');
    }
    
    // Заменяем запятую на точку
    cleaned = cleaned.replace(',', '.');
    
    input.value = cleaned;
    calculateTotal();
}

// Вешаем обработчики событий
squareInput.addEventListener('input', sanitizeAndCalculate);
lightInput.addEventListener('input', sanitizeAndCalculate);

// Дополнительная обработка при потере фокуса (чтобы не оставалось пустых полей или одинокой точки)
function handleBlur(e) {
    let input = e.target;
    let value = input.value;
    
    if (value === '' || value === '.' || value === ',') {
        input.value = '0';
    } else if (value.endsWith('.')) {
        input.value = value.slice(0, -1);
    }
    calculateTotal();
}

squareInput.addEventListener('blur', handleBlur);
lightInput.addEventListener('blur', handleBlur);

// Запускаем расчет при загрузке страницы (для отображения начальной суммы)
calculateTotal();


