// // Функция проверки максимальной длины строки
// function isStringLess(string,strLength){
//   if(string.length <= strLength){
//     return true;
//   }
//   return false;
// }

// // Строка короче 20 символов
// isStringLess('проверяемая строка', 20); // true
// // Длина строки ровно 18 символов
// isStringLess('проверяемая строка', 18); // true
// // Строка длиннее 10 символов
// isStringLess('проверяемая строка', 10); // false


// //Функция для проверки, является ли строка палиндромом
// function isPalindrom(string){
//   let array = [],
//     reverseArray = [];

//   string = string.toLowerCase();
//   //Удалим пробелы в конце
//   string = string.trimEnd();
//   //Преобразуем строку в массив
//   array = string.split('');
//   //Удалим все остальные пробелы
//   for(let i = 0;i < array.length;i++) {
//     if(array[i] === ' '){
//       for(let j = i;j < array.length;j++){
//         array[j] = array[j + 1];
//       }
//       array.pop();
//     }
//   }
//   // Перевернем массив
//   reverseArray = array.toReversed();
//   // Проверим на палиндром
//   for(let i = 0; i < array.length;i++){
//     if (array[i] !== reverseArray[i]){
//       return false;
//     }
//   }
//   return true;
// }


// // Строка является палиндромом
// isPalindrom('Лёша на полке клопа нашёл '); // true
// // Строка является палиндромом
// isPalindrom('топот'); // true
// // Несмотря на разный регистр, тоже палиндром
// isPalindrom('ДовОд'); // true
// // Это не палиндром
// isPalindrom('Кекс'); // false

// //Дополнительно
// //Извлечение цифр от 0 до 9 из строки
// function getNumFromStr(string){
//   //Если целое число
//   if((Number.isInteger(string))){
//     return string;
//   } else
//   //Если строка
//     if(typeof(string) === 'string') {
//       // const array = string.split('')
//       let number = '';
//       for(let i = 0;i < string.length;i++) {
//         if(string[i] >= '0' && string[i] <= '9'){
//           number += string[i];
//         }

//       }
//       return number === '' ? NaN : +number;
//     } else {
//       return 'Параметр не является целым или строкой';
//     }
// }


// getNumFromStr('-1');


