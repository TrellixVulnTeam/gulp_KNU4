import webpack from 'webpack-stream';

export const js = () => {
   return (
      app.gulp
         // Якщо ми в режимі розробника, тоді app.isDev поверне true
         .src(app.path.src.js, { sourcemaps: app.isDev })
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'JS',
                  messege: 'Error: <%= error.message %>',
               })
            )
         )
         .pipe(
            webpack({
               mode: app.isBuild ? 'production' : 'development',
               output: {
                  filename: 'app.min.js',
               },
            })
         )
         .pipe(app.gulp.dest(app.path.build.js))
         .pipe(app.plugins.browsersync.stream())
   );
};

// mode: 'development' - режим розробника
// filename: 'app.min.js' - вказуємо файл результату
