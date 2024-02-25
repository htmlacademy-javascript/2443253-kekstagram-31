//ДЗ - 4

//Описание объекта - описание фото
//  {
//   id -число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
//   url - строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
//   description - cтрока — описание фотографии. Описание придумайте самостоятельно.
//   likes - число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
//   comments : [] - Массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
//                    Количество комментариев к каждой фотографии — случайное число от 0 до 30.
// };

// Набор сообщений(8)
const MESSAGE_SET = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';
// Набор имен (12)
const NAMES_SET = 'Егор, Иван, Василий, Александр, Дарья, Мария, Петр, Наталья, Дмитрий, Михаил, Ирина, Татьяна';


//Функция получения случайного числа из заданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  let previousResult = -1;
  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    //Исключения повторения значения предыдущего вызова (для комментариев)
    if(previousResult !== result){
      previousResult = result;
      return result;
    }else{
      //Просто берем следующий в наборе сообщений
      return result === upper ? lower : result + 1;
    }
  };
};

//Создание вложенного объекта Comments
const createComment = () => {
  let id = 1;
  const messageArray = MESSAGE_SET.split('. ');
  const nameArray = NAMES_SET.split(', ');
  const indexMessageArr = getRandomInteger (0, messageArray.length - 1);
  const indexNameArr = getRandomInteger (0, nameArray.length - 1);

  //Разобьем комментарии с разделителем - !
  messageArray.splice(0,1,messageArray[0].split('! ')[0],messageArray[0].split('! ')[1]);
  //возвращаемая функция
  return () =>{
    const comment = {};
    const idAvatar = getRandomInteger (1, 6);
    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar()}.svg`;
    comment.message = `${messageArray[indexMessageArr()]}. ${messageArray[indexMessageArr()]}`;
    comment.name = `${nameArray[indexNameArr()]}`;
    id++;
    return comment;
  };
};

//Функция создания объекта
const createPhoto = () =>{
  let id = 1;

  return () =>{
    const photo = {};
    //Количество комментариев
    const numComments = getRandomInteger (0, 30),
      //Количество лайков
      numLikes = getRandomInteger(15,200);

    photo.id = id;
    photo.url = `photos/${id}.jpg`;
    photo.description = `Это фотография №${id}`;
    photo.likes = numLikes();
    //Создаем список комментариев
    photo.comments = Array.from({length : numComments()},createComment());
    id++;
    return photo;
  };
};


//let newPhoto = createPhoto();

//Создадим массив описаний фото
//const photoArray = Array.from({length : 25},createPhoto());

//Выведем результат в консоль
//console.table(photoArray);
//console.table(photoArray[0].comments);
