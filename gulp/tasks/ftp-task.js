import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp'; // Відправка файлів на сервер
import util from 'gulp-util'; // Утіліти для відображення копіювання файлів на фтп сервер

export const ftpTask = () => {
   // В конфіг файл додаємо лог та присвоюємо йому плагін для виводу:
   configFTP.log = util.log;
   // В константу створюємо підключення відповідно конфіг файлу:
   const ftpConnect = vinylFTP.create(configFTP);
   return (
      app.gulp
         .src(`${app.path.buildFolder}/**/*.*`, {})
         .pipe(
            app.plugins.plumber(
               app.plugins.notify.onError({
                  title: 'FTP',
                  messege: 'Error: <%= error.message %>',
               })
            )
         )
         .pipe()
         // Вигрузка на сервер в одразу названу папку ім'ям проекту:
         .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`))
   );
};
