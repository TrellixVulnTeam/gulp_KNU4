export const copy = () => {
   return app.gulp
      .src(app.path.src.files)
      .pipe(app.gulp.dest(app.path.build.files));
   // .src() - метод галп, отримує доступ к файлам по вказаному шляху
   // .pipe() - читання з одного файлу, та запис цих даних в інший файл
   // .dest() - створює потік для запису файлової системи
};
