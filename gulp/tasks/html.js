import fileinclude from 'gulp-file-include'; // Плагін
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number'; // Додаємо до адреси файлів css та js поточні дату та час,
//також буде створюватись файл с цим ключем: gulp / vestion.json

export const html = () => {
   return app.gulp
      .src(app.path.src.html)
      .pipe(
         app.plugins.plumber(
            app.plugins.notify.onError({
               title: 'HTML',
               messege: 'Error: <%= error.message %>',
            })
         )
      )
      .pipe(fileinclude())
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(webpHtmlNosvg())
      .pipe(
         versionNumber({
            'value': '%DT%',
            'append': {
               'key': '_v',
               'cover': 0,
               'to': ['css', 'js'],
            },
            'output': {
               'file': 'gulp/vestion.json',
            },
         })
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream());

   // .src() - метод галп, отримує доступ к файлам по вказаному шляху
   // .pipe() - читання з одного файлу, та запис цих даних в інший файл
   // Читаєм що до .pipe() та пишемо у ()
   // .dest() - створює потік для запису файлової системи
   // browsersync.stream() - оновлення в браузері
};
