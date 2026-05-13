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

const squareInput = document.querySelector('input[name="square"]');
const lightInput = document.querySelector('input[name="light"]');
const resultSpan = document.querySelector('.calculator-sum');

function parseNumber(value) {
    if (!value || value === '') return 0;
    let cleaned = String(value).trim().replace(/,/g, '.');
    let num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
}

function calculateTotal() {
    let square = parseNumber(squareInput.value);
    let lights = parseNumber(lightInput.value);
    
    let total = 900 * square +  900 * lights;
    
    total = Math.round(total);
    
    let formattedTotal = total.toLocaleString('ru-RU');
    
    resultSpan.textContent = formattedTotal + ' Р';
}

function sanitizeAndCalculate(e) {
    let input = e.target;
    let value = input.value;
    
    let cleaned = value.replace(/[^\d.,]/g, '');
    
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
    
    cleaned = cleaned.replace(',', '.');
    
    input.value = cleaned;
    calculateTotal();
}

squareInput.addEventListener('input', sanitizeAndCalculate);
lightInput.addEventListener('input', sanitizeAndCalculate);

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

calculateTotal();


