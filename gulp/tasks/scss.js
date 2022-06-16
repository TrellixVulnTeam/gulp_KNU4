import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Стискання css файла
import webpcss from 'gulp-webpcss'; // Вивід webp зображень
import autoprefixer from 'gulp-autoprefixer'; // Додавання префіксів для різних браузерів
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групування медіа запитів

const sass = gulpSass(dartSass); // Визиваєм gulpSass вказуючи dartSass як компілятор

export const scss = () => {
   return (
      app.gulp
         // Якщо ми в режимі розробника, тоді app.isDev поверне true
         .src(app.path.src.scss, { sourcemaps: app.isDev })
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'SCSS',
                  messege: 'Error: <%= error.message %>',
               })
            )
         )
         .pipe(app.plugins.replace(/@img\//g, 'img/'))
         // Компілюємо наш файл стилів:
         .pipe(
            sass({
               outputStyle: 'expanded',
            })
         )

         // Виконуємо деякі функції тільки в режимі продакшн, додаємо плагін if:
         .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
         .pipe(
            app.plugins.if(
               app.isBuild,
               webpcss({
                  webpClass: '.webp',
                  noWebpClass: '.no-webp',
               })
            )
         )
         .pipe(
            app.plugins.if(
               app.isBuild,
               autoprefixer({
                  grid: true,
                  overrideBrowsersList: ['last 3 versions'],
                  cascade: true,
               })
            )
         )

         // Вигрузить стилі до стискання, якщо треба розкоментити:
         .pipe(app.gulp.dest(app.path.build.css))
         .pipe(app.plugins.if(app.isBuild, cleanCss()))

         .pipe(
            rename({
               extname: '.min.css',
            })
         )
         .pipe(app.gulp.dest(app.path.build.css))
         .pipe(app.plugins.browsersync.stream())
   );
};
// Читаєм що до .pipe() та виконуємо що у ()
// .dest() - створює потік для запису файлової системи - створює файл :)
// browsersync.stream() - оновлення змін в браузері

// sourcemaps: true - буде видно в якому саме файлі написан стиль
// outputStyle: 'expanded' - налаштування стиснення файлів

// webpClass: '.webp' - якщо браузер підтримує, тоді додається клас, якщо не підтримує то іншій клас

// grid: true - щоб грід оброблявся автопрефіксем
// overrideBrowsersList: ['last 3 versions'] - підтримка 3х останніх версій браузера
