import {getRandomInteger} from './utils.js';

//Описание объекта - описание фото
//  {
//   id -число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
//   url - строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
//   description - cтрока — описание фотографии. Описание придумайте самостоятельно.
//   likes - число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
//   comments : [] - Массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
//                    Количество комментариев к каждой фотографии — случайное число от 0 до 30.
// };

// Массив сообщений(8)
const MESSAGES = ['Всё отлично!','В целом всё неплохо','Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра',
  'В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают',
  'Как можно было поймать такой неудачный момент?!'];

// Массив имен (12)
const NAMES = ['Егор','Иван','Василий','Александр','Дарья','Мария', 'Петр', 'Наталья', 'Дмитрий', 'Михаил', 'Ирина', 'Татьяна'];

//Числовые константы для автосоздания объекта фотографии

//Максимальное количество аватарок
const AVATARS_MAX_COUNT = 6;
//Максимальное количество комментариев
const COMMENTS_MAX_COUNT = 30;
//Минимальное и максимальное количество лайков
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;


//Создание вложенного объекта Comments
//@return {object}
const createComment = () => {
  let id = 1;
  const indexNameArr = getRandomInteger (0, NAMES.length - 1);
  const indexMessageArr = getRandomInteger (0, MESSAGES.length - 1, true);
  //возвращаемая функция
  return () =>{
    const comment = {};
    const idAvatar = getRandomInteger (1, AVATARS_MAX_COUNT);
    //Формирование массива с разными случайными индексами для сообщений
    const indexesMessage = indexMessageArr();

    comment.id = id;
    comment.avatar = `img/avatar-${idAvatar()}.svg`;
    comment.message = `${MESSAGES[indexesMessage[0]]}. ${MESSAGES[indexesMessage[1]]}`;
    comment.name = `${NAMES[indexNameArr]}`;
    id++;
    return comment;
  };
};

//Функция создания объекта:  фотография с описанием
//@return {object}
const createPhoto = () =>{
  let id = 1;

  return () =>{
    const photo = {};
    //Количество комментариев
    const numComments = getRandomInteger (0, COMMENTS_MAX_COUNT),
      //Количество лайков
      numLikes = getRandomInteger(LIKES_MIN_COUNT,LIKES_MAX_COUNT);

    photo.id = id;
    photo.url = `photos/${id}.jpg`;
    photo.description = `Это фотография №${id}`;
    photo.likes = numLikes();
    //Создаем список комментариев
    photo.comments = Array.from({length : numComments()}, createComment());
    id++;
    return photo;
  };
};
export {createPhoto};
