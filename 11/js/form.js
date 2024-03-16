import {isEscapeKey} from './utils.js';

//Форма для валидации
const formEdit = document.querySelector('.img-upload__overlay');
//Строка с хэштэгами
const textHashtags = document.querySelector('.text__hashtags');


//Регулярное выражение хэштега
const heshTegReg = /^#[a-zа-яё0-9]{1,19}$/i;


//Overlay с формой редактирования
const overlayFormEdit = document.querySelector('.img-upload__overlay');
//Объект с формой
const newImageLoad = document.querySelector('.img-upload__input');

//Кнопка закрытия нового изображения
const newPictureClose = overlayFormEdit.querySelector('.img-upload__cancel');


const pristine = new Pristine(formEdit,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Проверяем хеш тегш по регулярке
function validateHeshTeg (value) {
  let check = false;

  if (value !== '') {
    const arrayHeshTags = value.split(' ');
    check = arrayHeshTags.some((heshtag) => !heshTegReg.test(heshtag));
  }

  return !check;
}

const getHeshTegErrorMessage = () =>'Хэш тег не соответствует';

//Вылидатор на хэшТэг
pristine.addValidator(textHashtags,validateHeshTeg,getHeshTegErrorMessage);

//Валидация формы
formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  //const isValid = pristine.validate();

  // if (isValid) {
  //   document.alert('Можно отправлять');
  // } else {
  //   document.alert('Форма невалидна');
  // }
});

// Ошибки выводятся внутри блока .img-upload__field-wrapper соответствующего поля.
// Также, если поле заполнено неверно, блоку, в котором выводится текст ошибки,
// добавляется класс .img-upload__field-wrapper--error.

//Функция для события нажатия на клавишу Esc
const onDocumentKeydown2 = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNewPicture();
  }
};


//Событие файл с изображением выбран - покажем форму редактирования
newImageLoad.addEventListener('change',()=>{
  openNewPicture();
});

//Событие по клику на закрытие
newPictureClose.addEventListener('click',()=>{
  closeNewPicture();
});


//Функция - что делаем при открытии большого изображения
function openNewPicture() {
  //Покажем форму
  overlayFormEdit.classList.remove('hidden');

  //Сразу навесим закрытие по Esc
  document.addEventListener('keydown', onDocumentKeydown2);

  //заблокируем скролл контейнера
  document.querySelector('body').classList.add('modal-open');
  //Очистим значение выбранного файла изображения
  newImageLoad.value = '';


}

//Функция - что делаем при закрытии большого изображения
function closeNewPicture() {
  //Скроем форму
  overlayFormEdit.classList.add('hidden');
  //Очистим события по документу
  document.removeEventListener('keydown',onDocumentKeydown2);
  //Вернем скролл контейнера
  document.querySelector('body').classList.remove('modal-open');

}
