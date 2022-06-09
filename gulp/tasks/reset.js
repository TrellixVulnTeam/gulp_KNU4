import del from 'del'; // Імпортуємо плагін, після встановлення його: npm i -D del

export const reset = () => {
   return del(app.path.clean); // Видаляємо файли - папку з результатом
};
