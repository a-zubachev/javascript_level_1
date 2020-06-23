// 1. получил объект модального окна с классом .wrap
const wrap = document.querySelector('.wrap');

// 2. получил тег span, используемый для закрытия окна
const buttonClose = document.querySelector('span');

// 3. получил кнопку, используемую для показа модального окна.
// также, получил текст этой кнопки для выполнения "else" пункта 4.
const buttonOpen = document.querySelector('button');
const buttonOpenText = buttonOpen.innerText;

// 4. назначил обработку клика на кнопку показа модального окна.
// сделал из этой кнопки переключатель, чтобы в одном положении
// она включала модальное окно, а в другом выключала
buttonOpen.addEventListener('click', function () {
    if (wrap.classList.contains('hidden')) {
        wrap.classList.remove('hidden');
        buttonOpen.innerText = 'Скрыть модальное окно';
    } else {
        wrap.classList.add('hidden');
        buttonOpen.innerText = buttonOpenText;
    };
});

// 5. назначил обработку клика на тег span
buttonClose.addEventListener('click', function () {
    wrap.classList.add('hidden');
    buttonOpen.innerText = buttonOpenText;
});