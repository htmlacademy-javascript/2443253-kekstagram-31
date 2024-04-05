import {onDocumentKeydown,deleteLastSym,removeLastZero} from './utils.js';
import {showPostResult} from './user-message.js';
import {createPristine,clearPristine} from './validate.js';
import {sendData} from './api.js';

//Константы для наложения эффектов на изображения (CSS стили)
const NONE = '';
const GRAYSCALE = 'grayscale';
const SEPIA = 'sepia';
const INVERT = 'invert';
const BLUR = 'blur';
const BRIGHTNESS = 'brightness';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const CHROME_NUM = 0,
  SEPIA_NUM = 1,
  MARVIN_NUM = 2,
  PHOBOS_NUM = 3,
  HEAT_NUM = 4;


//Форма
const formEdit = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
//Кнопка отправки
const submitButton = document.querySelector('.img-upload__submit');

//Переменная для валидации
const pristine = createPristine(formEdit);

//Объект с формой
const newImageLoad = document.querySelector('.img-upload__input');
//Поле выбора изображения
const fileUploadField = document.querySelector('#upload-file');


//Кнопка закрытия нового изображения
const newPictureClose = document.querySelector('.img-upload__cancel');


//Превью изображения
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

// --------------------------------------------------------------Переменные для масштаба------------------------------------------------
const buttonImgSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const buttonImgBigger = document.querySelector('.scale__control--bigger');


// --------------------------------------------------------------Переменные для наложения эффектов------------------------------------------------
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectParameters = [
  { lowChrome: 0, chrome: 1, hiChrome: 1, stepChrome: 0.1},
  { lowSepia: 0, sepia: 1, hiSepia: 1, stepSepia: 0.1},
  { lowMarvin: 0, marvin: 100, hiMarvin: 100, stepMarvin : 1},
  { lowPhobos: 0, phobos: 3, hiPhobos: 3, stepPhobos: 0.1},
  { lowHeat: 0, heat: 3, hiHeat : 3, stepHeat: 0.1}
];
let selectedCSSEffect = '';
//Радиокнопки эффектов
const effects = document.querySelectorAll('input[name="effect"]');
//Превью эффектов
const effectPrewiews = document.querySelectorAll('.effects__preview');

let currentEffectElement = document.querySelector('#effect-none');


const formHandler = onDocumentKeydown(closeNewPicture);

const initSliderData = () => {
  effectParameters[CHROME_NUM].chrome = effectParameters[CHROME_NUM].hiChrome;
  effectParameters[SEPIA_NUM].sepia = effectParameters[SEPIA_NUM].hiSepia;
  effectParameters[MARVIN_NUM].marvin = effectParameters[MARVIN_NUM].hiMarvin;
  effectParameters[PHOBOS_NUM].phobos = effectParameters[PHOBOS_NUM].hiPhobos;
  effectParameters[HEAT_NUM].heat = effectParameters[HEAT_NUM].hiHeat;
};

//Привести все данные формы в исходное состояние
const initFormData = (open = true) =>{
  initSliderData();
  selectedCSSEffect = NONE;
  //масштаб картики
  scaleValue.value = '100%';
  refreshPreview(100);
  //имя картинки
  if (!open){
    newImageLoad.value = '';
  }
  effects[0].checked = true;
  switchEffect(effects[0]);
  clearPristine();
  pristine.validate();
};

//инициализации события при выборе файла изображения
const loadNewImg = () =>{

  //Событие файл с изображением выбран - покажем форму редактирования
  newImageLoad.addEventListener('change',()=>{
    const file = fileUploadField.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imgPreview.src = URL.createObjectURL(file);
      effectPrewiews.forEach((preview) =>{
        preview.style.backgroundImage = `url(${imgPreview.src}`;
      });

    }
    openNewPicture(newImageLoad.value);
  });

};
//Событие по клику на закрытие
newPictureClose.addEventListener('click',()=>{
  closeNewPicture(false);
});


//Функция - что делаем при открытии нового изображения
//@imageLoaded - изображение выбрано
function openNewPicture(imageLoaded = true) {
  if(imageLoaded) {
    initFormData(true);


    //Изначально слайдер невидим
    effectLevelSlider.classList.add('hidden');
    //Покажем форму
    formOverlay.classList.remove('hidden');

    //Сразу навесим закрытие по Esc
    document.addEventListener('keydown', formHandler);
    //заблокируем скролл контейнера
    document.querySelector('body').classList.add('modal-open');
  }

}

//Функция - что делаем при закрытии большого изображения
//post - true изображение отправлено
function closeNewPicture(post = false) {
  //Скроем форму
  formOverlay.classList.add('hidden');
  //Очистим события по документу
  document.removeEventListener('keydown',formHandler);
  //Вернем скролл контейнера
  document.querySelector('body').classList.remove('modal-open');
  //Очистим данные формы
  if (post){
    //Покажем сообщение об успешной отправке
    showPostResult('success');
  }
  initFormData(false);

}

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Масштаб
// -------------------------------------------------------------------------------------------------------------------------------------------------

//Обновить масштаб и текущий эффект
function refreshPreview (currentValue) {
  scaleValue.value = `${currentValue}%`;
  imgPreview.style.cssText = `transform: scale(${currentValue / 100})`;
  switchEffect(currentEffectElement);
}

buttonImgSmaller.addEventListener('click',()=>{
  let currentValue = +deleteLastSym(scaleValue.value);
  currentValue = currentValue >= 50 ? currentValue - 25 : currentValue;
  refreshPreview(currentValue);


});

buttonImgBigger.addEventListener('click',()=>{
  let currentValue = +deleteLastSym(scaleValue.value);
  currentValue = currentValue <= 75 ? currentValue + 25 : currentValue;
  refreshPreview(currentValue);
});

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Наложения эффектов
// -------------------------------------------------------------------------------------------------------------------------------------------------
//Создадим слайдер с параметрами по умолчанию
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step:0.1,
  connect: 'lower'
});


//Обновить значение и эффект картинки при смене слайдера
const updateLevelValueImgStyle = (value,effect,unit = '') =>{
  effectLevelSlider.classList.remove('hidden');
  sliderContainer.classList.remove('hidden');
  effectLevelValue.value = value;
  effectLevelValue.value = removeLastZero(effectLevelValue.value);
  effectLevelSlider.noUiSlider.set(value);
  imgPreview.style.filter = `${effect}(${effectLevelValue.value}${unit})`;
};

//Обновить параметры слайдера
const updateSlider = (value = 0,minValue = 0,maxValue = 1,stepValue = 0.1) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: value,
    step:stepValue,
    connect: 'lower'
  });
};


// выберем эффект, переключим slider и наложим эффект c текущим значением соотв. слайдера
function switchEffect (effect){

  switch (effect.id){
    case 'effect-none':
      effectLevelSlider.classList.add('hidden');
      sliderContainer.classList.add('hidden');
      selectedCSSEffect = NONE;
      imgPreview.style.filter = 'none';
      break;
    case 'effect-chrome':
      selectedCSSEffect = GRAYSCALE;
      updateSlider(effectParameters[CHROME_NUM].chrome,effectParameters[CHROME_NUM].lowChrome,
        effectParameters[CHROME_NUM].hiChrome,effectParameters[CHROME_NUM].stepChrome);
      updateLevelValueImgStyle(effectParameters[CHROME_NUM].chrome,selectedCSSEffect);
      break;
    case 'effect-sepia':
      selectedCSSEffect = SEPIA;
      updateSlider(effectParameters[SEPIA_NUM].sepia,effectParameters[SEPIA_NUM].lowSepia,
        effectParameters[SEPIA_NUM].hiSepia,effectParameters[SEPIA_NUM].stepSepia);
      updateLevelValueImgStyle(effectParameters[SEPIA_NUM].sepia,selectedCSSEffect);
      break;
    case 'effect-marvin':
      selectedCSSEffect = INVERT;
      updateSlider(effectParameters[MARVIN_NUM].marvin,effectParameters[MARVIN_NUM].lowMarvin,
        effectParameters[MARVIN_NUM].hiMarvin,effectParameters[MARVIN_NUM].stepMarvin);
      updateLevelValueImgStyle(effectParameters[MARVIN_NUM].marvin,selectedCSSEffect,'%');
      break;
    case 'effect-phobos':
      selectedCSSEffect = BLUR;
      updateSlider(effectParameters[PHOBOS_NUM].phobos,effectParameters[PHOBOS_NUM].lowPhobos,
        effectParameters[PHOBOS_NUM].hiPhobos,effectParameters[PHOBOS_NUM].stepPhobos);
      updateLevelValueImgStyle(effectParameters[PHOBOS_NUM].phobos,selectedCSSEffect,'px');
      break;
    case 'effect-heat':
      selectedCSSEffect = BRIGHTNESS;
      updateSlider(effectParameters[HEAT_NUM].heat,effectParameters[HEAT_NUM].lowHeat,
        effectParameters[HEAT_NUM].hiHeat,effectParameters[HEAT_NUM].stepHeat);
      updateLevelValueImgStyle(effectParameters[HEAT_NUM].heat,selectedCSSEffect);
      break;
  }
}
//Слушатели на радиокнопки эффектов
effects.forEach((effect) => {
  effect.addEventListener('click', () => {
    if (effect.checked){
      // выберем эффект, переключим slider и наложим эффект c текущим значением соотв. слайдера
      initSliderData();
      switchEffect(effect);
      currentEffectElement = effect;


    }
  });
});

//Событие на изменение положения слайдера
effectLevelSlider.noUiSlider.on('update', () => {
  let unit = '';
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = removeLastZero(effectLevelValue.value);

  //обновим текущее значение фильтра
  switch (selectedCSSEffect){
    case GRAYSCALE: effectParameters[CHROME_NUM].chrome = +effectLevelValue.value;break;
    case SEPIA: effectParameters[SEPIA_NUM].sepia = +effectLevelValue.value;break;
    case INVERT: effectParameters[MARVIN_NUM].marvin = +effectLevelValue.value; unit = '%';break;
    case BLUR: effectParameters[PHOBOS_NUM].phobos = +effectLevelValue.value; unit = 'px';break;
    case BRIGHTNESS: effectParameters[HEAT_NUM].heat = +effectLevelValue.value;break;
    default: break;
  }
  //отрисуем
  imgPreview.style.filter = `${selectedCSSEffect}(${effectLevelValue.value}${unit})`;
});

//Блокируем кнопку отправить
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

//Разблокируем кнопку отправить
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};
//Проверка и отправка формы-----------------------------------------------------------------------------------------------------------------------
const setUserFormSubmit = () => {
  formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();


    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      //   Собрать данные и отправить форму
      const formData = new FormData(evt.target);
      sendData(formData)
        .then((state) => {
          if (state.ok){
            closeNewPicture(true);
          } else{
            throw new Error('Неверные данные');
          }
        }
        )
        .catch(() => showPostResult('error'))
        .finally(unblockSubmitButton);
    }
  });
};


export {loadNewImg,setUserFormSubmit,closeNewPicture};
