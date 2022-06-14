import fs from 'fs'; // node плагін для роботи з файловою системою, він предустановлен вже
import fonter from 'gulp-fonter-fix'; // Перетворити шрифти otf в формати ttf/woff
import ttf2woff2 from 'gulp-ttf2woff2'; // Отримати два файли woff та woff2 - потрібні формати оптімізовані

export const otfToTtf = () => {
   // Шукаємо файли шрифтів .otf
   return (
      app.gulp
         .src(`${app.path.srcFolder}/fonts/*.otf`, {})
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'FONTS',
                  messege: 'Error: <%= error.message %>',
               })
            )
         )
         // Конвертуємо в .ttf
         .pipe(
            fonter({
               formats: ['ttf'],
            })
         )
         // Виванатажуємо туди само в вихідну папку
         .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
   );
};

export const ttfToWoff = () => {
   // Шукаємо файли шрифтів .ttf
   return (
      app.gulp
         .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'FONTS',
                  message: 'Error: <%= error.message %>',
               })
            )
         )
         // Конвертируем в .woff
         .pipe(
            fonter({
               formats: ['woff'],
            })
         )
         // Выгружаем в папку с результатом
         .pipe(app.gulp.dest(`${app.path.build.fonts}`))

         // Шукаємо файли шрифтів .ttf
         .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
         // Конвертуємо в woff2
         .pipe(ttf2woff2())
         // Виванатажуємо в папку з результатом
         .pipe(app.gulp.dest(`${app.path.build.fonts}`))
   );
};

// Задача запису шрифтів в файл стилів:
export const fontsStyle = () => {
   // Отримуємо файл стилів:
   let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

   // Перевіряєм чи існують файли шрифтів:

   // .readdir - Метод читает содержимое директории в память, а когда чтение завершено,
   // то вызывает коллбек с двумя параметрами.
   // Если произошла какая-то ошибка, тогда первый параметр будет содержать информацию об этом.
   // Если все прошло хорошо, тогда второй параметр будет содержать массив со всеми найденными в директории элементами.
   fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
      // fontsFiles - масив з знайденими елементами по шляху в .readdir
      if (fontsFiles) {
         // Перевірка чи існує файл стилів для шрифтів:
         if (!fs.existsSync(fontsFile)) {
            // Якщо файлу нема, то створюємо його: схоже що створюється пустий файл '', а що таке cb не ясно
            fs.writeFile(fontsFile, '', cb);

            let newFileOnly;
            // Перебираємо наші файли шрифтів в нашому масиві
            for (var i = 0; i < fontsFiles.length; i++) {
               // Записуємо підключення файлів шрифтів в файл стилів:
               // Як я зрозумів - записуємо назву файлу до крапки
               let fontFileName = fontsFiles[i].split('.')[0];

               // Перевірка на унікальність імені, тому що однакові шрифти з різними форматами
               if (newFileOnly !== fontFileName) {
                  // Витягуємо частини з імені в змінні, якщо вони є
                  let fontName = fontFileName.split('-')[0]
                     ? fontFileName.split('-')[0]
                     : fontFileName;
                  let fontWeight = fontFileName.split('-')[1]
                     ? fontFileName.split('-')[1]
                     : fontFileName;

                  if (fontWeight.toLowerCase() === 'thin') {
                     fontWeight = 100;
                  } else if (fontWeight.toLowerCase() === 'extralight') {
                     fontWeight = 200;
                  } else if (fontWeight.toLowerCase() === 'light') {
                     fontWeight = 300;
                  } else if (fontWeight.toLowerCase() === 'medium') {
                     fontWeight = 500;
                  } else if (fontWeight.toLowerCase() === 'semibold') {
                     fontWeight = 600;
                  } else if (fontWeight.toLowerCase() === 'bold') {
                     fontWeight = 700;
                  } else if (
                     fontWeight.toLowerCase() === 'extrabold' ||
                     fontWeight.toLowerCase() === 'heavy'
                  ) {
                     fontWeight = 800;
                  } else if (fontWeight.toLowerCase() === 'black') {
                     fontWeight = 900;
                  } else {
                     fontWeight = 400;
                  }

                  // Далі формуємо код і пишемо його в файл:
                  // fs.appendFile - дописує в файл, не перезаписує
                  fs.appendFile(
                     fontsFile,
                     `@font-face {
                           font-family: ${fontName};
                           font-display: swap;
                           src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
                           font-weight: ${fontWeight};
                           font-style: normal;
                        }\r\n`,
                     cb
                  );
                  //
                  newFileOnly = fontFileName;
               }
            }
         } else {
            // Якщо файл існує, то виводимо повідомлення в консоль:
            console.log(
               'Файл scss/fonts.scss вже існує. Для оновлення файла його треба видалити!'
            );
         }
      }
   });

   return app.gulp.src(`${app.path.srcFolder}`);
   function cb() {}
};
