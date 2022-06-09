// Імпортуємо усі функції які є в файлі, та присваюємо їм ім'я flsFunction:
import * as flsFunction from './modules/functions.js';

// Визиваємо звідти функцію:
flsFunction.isWebp();

// Підключаємо плагін для слайдеров: npm i -D swiper
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
const swiper = new Swiper();
