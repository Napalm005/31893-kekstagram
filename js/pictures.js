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
  document.querySelector('.gallery-overlay-image').src = photo.src;
  document.querySelector('.likes-count').innerText = photo.parentElement.querySelector('.picture-likes').innerText;
  document.querySelector('.comments-count').innerText = photo.parentElement.querySelectorAll('.picture-comments').length;
}

pictures.addEventListener('click', function (evt) {
  if (evt.target.parentElement.className === 'picture') {
    evt.preventDefault();
    fillGalleryOverlay(evt.target);
    showGallery();
  }
});
pictures.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ENTER_KEYCODE) {
    showGallery();
  }
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

