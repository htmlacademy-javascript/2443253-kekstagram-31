//----------------------------------------------------------------------------------------
//Модуль со вспомогательными функциями
//----------------------------------------------------------------------------------------

//Код esc
const ESC = 27;

//Функция возвращает одно или два неповторяющихся случайных числа из заданного диапазона
//  @param {number} a - нижняя граница
//  @param {number} b - верхняя граница
//  @param {boolean} two - какое значение вернуть одно число||массив из 2-х чисел. two===true - вернуть массив.
//  @returns {number||array}
const getRandomInteger = (a, b, two = false) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return () => {
    const randomNum1 = Math.floor(Math.random() * (upper - lower + 1) + lower);
    let randomNum2 = Math.floor(Math.random() * (upper - lower + 1) + lower);
    //Если нужен массив
    if(two && (upper - lower) > 0){
      while (randomNum1 === randomNum2){
        randomNum2 = Math.floor(Math.random() * (upper - lower + 1) + lower);
      }
    }
    //вернуть одно значение или массив из 2-x значений
    return two ? [randomNum1,randomNum2] : randomNum1;
  };
};

//возвращает неповторяющиеся индексы элементов из массива @array
//возвращает -1 если количество запрашиваемых индексов превышает длину массива
const getRandomIntegerFromArray = (array) => {
  const randomIndex = getRandomInteger(0,array.length - 1);
  const randomArray = [];

  return () => {
    let newRandomIndex = randomIndex();
    if (array.length > randomArray.length){
      while(randomArray.includes(newRandomIndex)){
        newRandomIndex = randomIndex();
      }
      randomArray.push(newRandomIndex);
      return newRandomIndex;
    } else{
      return -1;
    }

  };

};

//Определим фугкцию проверки на дубль
Array.prototype.isUnique = function() {
  const uniq = [];
  const result = this.slice(0).every((item, index, arr) => {
    if (uniq.indexOf(item) > -1) {
      arr.length = 0;
      return false;
    } else {
      uniq.push(item);
      return true;
    }
  });
  return result;
};

//Удалим последний символ строки
const deleteLastSym = (str) => str.substring(0, str.length - 1);

//Клавиша ESC
const isEscapeKey = (evt) => evt.keyCode === ESC;

//Функция для события нажатия на клавишу Esc
const onDocumentKeydown = (makeThis) => (evt) =>{
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    makeThis();
  }
};

//Функция устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {getRandomInteger,isEscapeKey,deleteLastSym,onDocumentKeydown,getRandomIntegerFromArray,debounce};
