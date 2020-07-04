'use strict'

document.head.insertAdjacentHTML("afterbegin", '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">');

let slider = document.querySelector('.slider');
let animationTime = 1000;

// Создаем иконку загрузки
let loadIcon = document.createElement('i');
loadIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
slider.insertAdjacentElement("afterbegin", loadIcon);

// Создаем левую стрелку
let leftArrow = document.createElement('i');
leftArrow.classList.add('fas', 'fa-chevron-circle-left', 'slider-leftArrow');
slider.insertAdjacentElement("beforeend", leftArrow);

// Создаем правую стрелку
let rightArrow = document.createElement('i');
rightArrow.classList.add('fas', 'fa-chevron-circle-right', 'slider-rightArrow');
slider.insertAdjacentElement("beforeend", rightArrow);

// Ждем когда весь контент целиком загрузится
window.addEventListener('load', function () {
    leftArrow.addEventListener('click', function () {
        images.setNextLeftImage();
    });

    rightArrow.addEventListener('click', function () {
        images.setNextRightImage();
    });

    // Инициализация слайдера
    images.init();
    // Скрываем иконку загрузки
    hideLoadIcon(loadIcon);
});

/**
 * Функция скрывает иконку загрузки
 * @param {HTMLElement} loadIcon 
 */
function hideLoadIcon(loadIcon) {
    loadIcon.style.display = "none";
}

/**
 * Функция берет у элемента слайдера его data-атрибуты размеров,
 * и если они определены, то самому слайдеру меняет размеры.
 * @param {HTMLDivElement} slider 
 */
function setSizes(slider) {
    let width = slider.getAttribute("data-width");
    let height = slider.getAttribute("data-height");
    if (width !== null && width !== "") {
        slider.style.width = width;
    }
    if (height !== null && height !== "") {
        slider.style.height = height;
    }
}
setSizes(slider);

// Объект слайдера
let images = {
    /* {int} Номер текущего изображения */
    currentIdx: 0,

    /* {HTMLDivElement[]} slides элементы слайдов */
    slides: [],
    
    /** Получаем все слайды и показываем первый слайд. Присваиваем всем слайдам стиль animation-duration
        со значением из переменной animationTime в миллисекундах */
    init() {
        this.slides = document.querySelectorAll('.slider-item');
        this.showImageWithCurrentIdx();
        this.slides.forEach(function(item) {
            item.style.animationDuration = animationTime + 'ms';
        });
    },

    /** Берем слайд с текущим индексом и убираем у него класс
     * hidden-slide. */
    showImageWithCurrentIdx() {
        this.slides[this.currentIdx].classList.remove('hidden-slide');
    },

    /** Всем слайдам добавляем класс hidden-slide. */
    hideVisibleImages() {
        this.slides.forEach(function (slide) {
            slide.classList.add('hidden-slide');
        });
    },

    /** Переключиться на предыдущее изображение. */
    setNextLeftImage() {
        this.hideVisibleImages();
        if (this.currentIdx == 0) {
            this.currentIdx = this.slides.length - 1;
        } else {
            this.currentIdx--;
        }
        let currentSlide = this.slides[this.currentIdx];
        let rightSlide;
        if (this.currentIdx == this.slides.length - 1) {
            rightSlide = this.slides[0];
        } else {
            rightSlide = this.slides[this.currentIdx + 1];
        };
        currentSlide.classList.add('slider-leftToCenter');
        rightSlide.classList.add('slider-centerToRight');
        currentSlide.classList.remove('hidden-slide');
        rightSlide.classList.remove('hidden-slide');
        setTimeout(function() {
            currentSlide.classList.remove('slider-leftToCenter');
        }, animationTime);
        setTimeout(function() {
            rightSlide.classList.add('hidden-slide');
        }, animationTime - 50);
        setTimeout(function() {
            rightSlide.classList.remove('slider-centerToRight');
        }, animationTime);
    },

    /** Переключиться на следующее изображение. */
    setNextRightImage() {
        this.hideVisibleImages();
        if (this.currentIdx == this.slides.length - 1) {
            this.currentIdx = 0;
        } else {
            this.currentIdx++;
        }
        let currentSlide = this.slides[this.currentIdx];
        let leftSlide;
        if (this.currentIdx == 0) {
            leftSlide = this.slides[this.slides.length - 1];
        } else {
            leftSlide = this.slides[this.currentIdx - 1];
        };
        currentSlide.classList.add('slider-rightToCenter');
        leftSlide.classList.add('slider-centerToLeft');
        currentSlide.classList.remove('hidden-slide');
        leftSlide.classList.remove('hidden-slide');
        setTimeout(function() {
            currentSlide.classList.remove('slider-rightToCenter');
        }, animationTime);
        setTimeout(function() {
            leftSlide.classList.add('hidden-slide');
        }, animationTime - 50);
        setTimeout(function() {
            leftSlide.classList.remove('slider-centerToLeft');
        }, animationTime);
    },
}
