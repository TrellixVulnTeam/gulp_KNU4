import replace from 'gulp-replace'; // Плагін - пошук та заміна
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import newer from 'gulp-newer'; // Перевірка оновлень файлу, оновлює те, що змінилося...

export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
};
