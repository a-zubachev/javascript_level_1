'use strict';
// 1. получил все кнопки и сохранил в переменную

const buttons = document.querySelectorAll('button');

// 1.1 проитерировался по кнопкам и каждой из
// них добавил обработчик клика - функцию handleClick

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        handleClick(event);
    });
});


/**
 * Функция обрабатывает клик по кнопке в карточке товара и попеременно вызывает
 * функции для показа или скрытия текста о товаре.
 * @param {MouseEvent} clickedButtonEvent 
 */
function handleClick(clickedButtonEvent) {
    // 2. из объекта события получил ссылку на .product и
    // сохранил в переменную:
    const cardNode = clickedButtonEvent.target.parentNode;
    
    // 3. создал литерал объекта со следующими свойствами:
    const card = {
        wrap: cardNode, // здесь элемент с классом .product
        img: cardNode.querySelector('img'), // здесь картинка внутри .product
        productName: cardNode.querySelector('.productName'), // здесь .productName, который внутри .product
        button: cardNode.querySelector('button'), // здесь button, который внутри .product
    };

    // 4. получил текст на кнопке, которая внутри .product
    const buttonText = card.button.innerText;
    // 4.1 проверил равняется ли этот текст строке "Подробнее"
    if (buttonText == 'Подробнее') { 
    // 4.2 если да, то передаем объект card в функцию showMoreText
    showMoreText(card);
    } else { // 4.3 если текст на кнопке другой, то передаем объект card в функцию hideMoreText
    hideMoreText(card);
    }
}

/**
 * Функция скрывает текст с описанием товара.
 * @param {Object} card 
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLButtonElement} card.button
 */
function hideMoreText(card) {
    // 5. картинке внутри .product ставим стиль display: block
    card.img.style.display = 'block';
    // 5.1 внутри .product находим элемент с классом .desc и удаляем его
    card.wrap.querySelector('.desc').remove();
    // 5.2 кнопке, которая внутри .product ставим текст "Подробнее"
    card.button.innerText = 'Подробнее';
}

/**
 * Функция показывает текст с описанием товара.
 * @param {Object} card 
 * @param {HTMLDivElement} card.wrap
 * @param {HTMLImageElement} card.img
 * @param {HTMLDivElement} card.productName
 * @param {HTMLButtonElement} card.button 
 */
function showMoreText(card) {
    // 6. картинке внутри .product ставим display: none
    card.img.style.display = 'none';
    // 6.1 сохраняем произвольный текст в переменную
    const text = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet reiciendis facilis dolorum corrupti a exercitationem quo, sequi laborum. Minus, iusto.';
    // 6.2 внутри .product есть .productName, после него вставляем div.desc и текстом из переменной из п. 6.1
    card.productName.insertAdjacentHTML('afterend', `<div class="desc">${text}</div>`);
    // 6.3 внутри .product у кнопки текст ставим "Отмена"
    card.button.innerText = 'Отмена';
}