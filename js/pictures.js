'use strict';

var photos = [];
var photosQuantity = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var galleryOverlay = document.querySelector('.gallery-overlay');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var galleryCloseTrigger = document.querySelector('.gallery-overlay-close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');
var uploadSelectImage = document.querySelector('#upload-select-image');
var uploadFile = uploadSelectImage.querySelector('#upload-file');
var uploadOverlay = uploadSelectImage.querySelector('.upload-overlay');
var uploadForm = document.querySelector('#upload-select-image');
var uploadFormCancel = uploadSelectImage.querySelector('.upload-form-cancel');
var uploadFormDescription = uploadSelectImage.querySelector('.upload-form-description');
var uploadResizeControls = uploadSelectImage.querySelector('.upload-resize-controls');
var uploadResizeControlsValue = uploadSelectImage.querySelector('.upload-resize-controls-value');
var uploadEffectControls = uploadSelectImage.querySelector('.upload-effect-controls');
var uploadSubmit = uploadSelectImage.querySelector('#upload-submit');
var effectImagePreview = uploadSelectImage.querySelector('.effect-image-preview');
var UPLOAD_RESIZE_STEP = 25;
var UPLOAD_RESIZE_MIN = 25;
var UPLOAD_RESIZE_MAX = 100;
var checkedEffect;
var uploadFormHashtags = uploadSelectImage.querySelector('.upload-form-hashtags');

// Validity check
uploadSubmit.addEventListener('click', function () {
  var invalidInputs = uploadForm.querySelectorAll('input:invalid');
  for (var invalidInput = 0; invalidInput < invalidInputs.length; invalidInput++) {
    invalidInputs[invalidInput].style.borderColor = 'red';
  }
});


// reset form after submit
uploadForm.addEventListener('submit', function () {
  uploadForm.reset();
  var uploadResizeControlsValueNumber = parseInt(uploadResizeControlsValue.value, 10);
  effectImagePreview.style.transform = 'scale(' + uploadResizeControlsValueNumber / 100 + ')';
  effectImagePreview.className = 'effect-image-preview';
});


// Hashtags validity
uploadFormHashtags.addEventListener('input', function (evt) {
  var errorMessages = [];
  var hashtagsArray = evt.target.value.toLowerCase().split(' ');
  var isHash = 0;
  var isUniqueElements = true;
  var isHashLengthCorrect = 0;
  hashtagsArray = hashtagsArray.filter(function (hashtag) {
    return hashtag !== '';
  });
  for (var hashtag = 0; hashtag < hashtagsArray.length; hashtag++) {
    if (hashtagsArray[hashtag].charAt(0) !== '#') {
      evt.target.checkValidity = false;
      isHash++;
    }

    if (hashtagsArray[hashtag].length > 20) {
      isHashLengthCorrect++;
    }

    for (var j = hashtag + 1; j < hashtagsArray.length; j++) {
      if (hashtagsArray[hashtag] === hashtagsArray[j]) {
        isUniqueElements = false;
      }
    }
  }
  if (isHash !== 0) {
    errorMessages.push('Требуется # перед каждым тегом');
  }
  if (isHashLengthCorrect !== 0) {
    errorMessages.push('Максимальная длина одного хэш-тега 20 символов');
  }
  if (!isUniqueElements) {
    errorMessages.push('Теги повторяются');
  }
  if (hashtagsArray.length > 5) {
    evt.target.checkValidity = false;
    errorMessages.push('Не больше 5 тегов');
  }
  var errorMessagesString = errorMessages.join('. \n');
  evt.target.setCustomValidity(errorMessagesString);
});


// setEffect logic
function setEffect(evt) {
  if (evt.target.classList.contains('upload-effect-label')) {
    checkedEffect = evt.target.previousElementSibling;
  } else if (evt.target.classList.contains('upload-effect-preview')) {
    checkedEffect = evt.target.parentNode.previousElementSibling;
  }
  var checkedEffectName = checkedEffect.id.substring(14);
  effectImagePreview.className = 'effect-image-preview effect-' + checkedEffectName;
}
uploadEffectControls.addEventListener('click', setEffect);
uploadEffectControls.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setEffect(evt);
  }
});
function changeResizeControlsValue(limitNumber, step) {
  var uploadResizeControlsValueNumber = parseInt(uploadResizeControlsValue.value, 10);
  if (uploadResizeControlsValueNumber === limitNumber) {
    return;
  } else {
    uploadResizeControlsValue.value = uploadResizeControlsValueNumber + step + '%';
    effectImagePreview.style.transform = 'scale(' + (uploadResizeControlsValueNumber + step) / 100 + ')';
  }
}
uploadResizeControls.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
    changeResizeControlsValue(UPLOAD_RESIZE_MAX, UPLOAD_RESIZE_STEP);
  } else if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
    changeResizeControlsValue(UPLOAD_RESIZE_MIN, -UPLOAD_RESIZE_STEP);
  }
});


// Comments validity
uploadFormDescription.addEventListener('invalid', function () {
  if (uploadFormDescription.validity.tooLong) {
    uploadFormDescription.setCustomValidity('Максимальная длина комментария 140 символов');
  }
});
// for edge
uploadFormDescription.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length > 140) {
    target.setCustomValidity('Максимальная длина комментария 140 символов');
  }
});


uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  showFormWindowing();
});
uploadFormCancel.addEventListener('click', function () {
  closeFormWindowing();
});
uploadFormCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeFormWindowing();
  }
});
function showFormWindowing() {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onFormWindowingEscPress);
}
function closeFormWindowing() {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onFormWindowingEscPress);
}
function onFormWindowingEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && uploadFormDescription !== document.activeElement) {
    closeFormWindowing();
  }
}


createPhotosArray();
function createPhotosArray() {
  for (var photo = 1; photo <= photosQuantity; photo++) {
    photos.push({'url': 'photos/' + photo + '.jpg', 'likes': getRandomArbitary(15, 200), 'comments': [comments[getRandomArbitary(0, comments.length)]]});
  }
}

function renderPicture(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').innerText = picture.likes;
  pictureElement.querySelector('.picture-comments').innerText = picture.comments;
  return pictureElement;
}

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}
pictures.appendChild(fragment);

function fillGalleryOverlay(photo) {
  galleryOverlayImage.src = photo.querySelector('img').src;
  likesCount.innerText = photo.querySelector('.picture-likes').innerText;
  commentsCount.innerText = photo.querySelectorAll('.picture-comments').length;
}

pictures.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (evt.target.className === 'picture') {
    fillGalleryOverlay(evt.target);
  } else {
    fillGalleryOverlay(evt.target.parentElement);
  }
  showGallery();
});

galleryCloseTrigger.addEventListener('click', function () {
  closeGallery();
});
galleryCloseTrigger.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGallery();
  }
});

function onGalleryEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeGallery();
  }
}
function showGallery() {
  galleryOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onGalleryEscPress);
}
function closeGallery() {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onGalleryEscPress);
}

function getRandomArbitary(min, max) {
  return parseInt(Math.random() * (max - min) + min, 10);
}

