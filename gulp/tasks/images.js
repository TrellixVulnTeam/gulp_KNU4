import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
   return (
      app.gulp
         .src(app.path.src.images)
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'IMAGES',
                  messege: 'Error: <%= error.message %>',
               })
            )
         )
         // Перевіряєм картинки в папці з результатом: обробляти тільки ті, які змінилися, або яких немає:
         .pipe(app.plugins.newer(app.path.build.images))

         // функції нижче виконуємо тільки в режимі продакшн, додавая умови if

         // Створюємо формат webp:
         .pipe(app.plugins.if(app.isBuild, webp()))
         // Вигружаємо webp в папку з результатом, але потім продовжуємо:
         .pipe(
            app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images))
         )

         // Знов звертаємось до вихидних файлів, та перевіряємо на оновлення:
         .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
         .pipe(
            app.plugins.if(
               app.isBuild,
               app.plugins.newer(app.path.build.images)
            )
         )

         // Стискаємо зображення:
         .pipe(
            app.plugins.if(
               app.isBuild,
               imagemin({
                  progressive: true,
                  svgoPlugins: [{ removeViewBox: false }],
                  interlaced: true,
                  optimizationLevel: 3, // 0 to 7
               })
            )
         )

         // Вигружаємо:
         .pipe(app.gulp.dest(app.path.build.images))

         // Беремо svg:
         .pipe(app.gulp.src(app.path.src.svg))
         // Та просто копіюєм їх в результат:
         .pipe(app.gulp.dest(app.path.build.images))

         .pipe(app.plugins.browsersync.stream())
   );
};
