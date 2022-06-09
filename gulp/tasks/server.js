export const server = (done) => {
   app.plugins.browsersync.init({
      server: {
         baseDir: `${app.path.build.html}`,
      },
      notify: false,
      port: 3000,
   });
};

// .init - запускаємо його
// baseDir: - звідки треба запустити файли, наша папка з результатом, беремо хтмл файл
// notify: false - прибираємо повідомлення в браузері
