// Перевірка підтримки webp, додавання класа .webp або .no-webp для тега html
export function isWebp() {
   //Перевірка підтримки webp
   function testWebP(callback) {
      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
   }

   // Додавання класу .webp або .no-webp для тега html:
   // Бачу, що визиваємо функцію вкладаючі іншу в аргумент, а де берется вкладений аргумент support не ясно
   // support вкладається зверху при визові callback(webP.height == 2)
   testWebP(function (support) {
      if (support == true) {
         // document.querySelector('body').classList.add('webp');
         document.documentElement.classList.add('webp');
      } else {
         // document.querySelector('body').classList.add('no-webp');
         document.documentElement.classList.add('no-webp');
      }
   });
}
