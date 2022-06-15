// Основний модуль:
import gulp from 'gulp';
// Імпорт шляхів: це наша константа з path.js
import { path } from './gulp/config/path.js';
// Імпортуємо наш об'єкт з плагінами:
import { plugins } from './gulp/config/plugins.js';

// Створюємо глобальний об'єкт (node js) для збереження властивостей, для доступу з різних файлів:
global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins,
};

// Імпортуємо створену задачу:
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSpriteTask } from './gulp/tasks/svg-sprite.js';

// Пишемо функцію стеження (спостерігач) за змінами файлів:
function watcher() {
   // Вказуємо шлях до файлів, за якими стежити, та через кому дію, яку потрибно виконати:
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

// Визиваємо конверт іконок вручну в консолі за потребою - не пишемо в загальний сценарій
export { svgSpriteTask };

// Побудова сценарію виконання завдань: ------------------------------------------------------------------------

// Важливо щоб задачі шрифтів виконувалися послідовно:
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Спочатку виконуємо задачу шрифтів, а після паралельно інші:
const mainTasks = gulp.series(
   fonts,
   gulp.parallel(copy, html, scss, js, images)
);

// Налаштовуємо галп в двох режимах, розробника та продакшн
// Метод series() - виконання задач послідовно:
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// Виконування сценарію за замовчанням:
gulp.task('default', dev);
