import del from 'del';
import GulpZip from 'gulp-zip';

export const zip = () => {
   // Видаляємо архів, якщо він є:
   del(`./${app.path.rootFolder}.zip`);
   return (
      app.gulp

         .src(`${app.path.buildFolder}/**/*.*`, {})
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'ZIP',
                  messege: 'Error: <%= error.message %>',
               })
            )
         )
         .pipe(GulpZip(`${app.path.rootFolder}.zip`))
         // Вигрузка в корінь проекта:
         .pipe(app.gulp.dest('./'))
   );
};
