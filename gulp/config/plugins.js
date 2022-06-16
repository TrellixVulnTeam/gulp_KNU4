import replace from 'gulp-replace'; // Плагін - пошук та заміна
import plumber from 'gulp-plumber'; // Обробник помилок
import notify from 'gulp-notify'; // Повідомлення/підказки
import browsersync from 'browser-sync'; // Локальний сервер
import newer from 'gulp-newer'; // Перевірка оновлень файлу, оновлює те, що змінилося...
import gulpIf from 'gulp-if'; // Умовне розгалуження

export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
   if: gulpIf,
};
