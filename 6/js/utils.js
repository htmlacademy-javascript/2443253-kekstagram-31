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

export {getRandomInteger};
