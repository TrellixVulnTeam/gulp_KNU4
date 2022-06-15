import * as nodePath from 'path'; // імпортуємо модуль path (для цього ми включали тип модуль в package.json)
const rootFolder = nodePath.basename(nodePath.resolve()); // Отримуємо ім'я папки проекта в константу
// console.log(rootFolder);

// resolve() - принимает составные части пути и возвращает абсолютный путь полученного в результате обработки переданных сегментов пути.
// basename() - возвращает конечную часть пути

const buildFolder = `./dist`; // шлях до папки з результатом (можно використовувати rootFolder)
//- ця папка створиться автоматично

const srcFolder = `./src`; // папка з вихідниками

// Створюємо загальний об'єкт path, в якому буде вся інформація про шлях до файла чи папки:
// Також налаштовуємо копіювання файлів з src в результат:
export const path = {
   build: {
      js: `${buildFolder}/js`,
      css: `${buildFolder}/css`,
      html: `${buildFolder}/`,
      images: `${buildFolder}/img/`,
      fonts: `${buildFolder}/fonts/`,
      files: `${buildFolder}/files/`,
   },
   src: {
      js: `${srcFolder}/js/app.js`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
      svg: `${srcFolder}/img/**/*.svg`,
      scss: `${srcFolder}/scss/style.scss`,
      html: `${srcFolder}/*.html`,
      files: `${srcFolder}/files/**/*`,
      svgicons: `${srcFolder}/svgicons/*.svg`,
   },
   watch: {
      js: `${srcFolder}/js/**/*.js`,
      html: `${srcFolder}/**/*`,
      scss: `${srcFolder}/scss/**/*.scss`,
      html: `${srcFolder}/**/*`,
      images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
      files: `${srcFolder}/files/**/*`,
   },
   clean: buildFolder,
   buildFolder: buildFolder,
   srcFolder: srcFolder,
   rootFolder: rootFolder,
   ftp: ``,
};
