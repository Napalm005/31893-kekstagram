'use strict';

var photos = [];
var photosQuantity = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];


createPhotosArray();
function createPhotosArray() {
  for (var photo = 1; photo <= photosQuantity; photo++) {
    photos.push({'url': 'photos/' + photo + '.jpg', 'likes': getRandomArbitary(15, 200), 'comments': [comments[getRandomArbitary(0, comments.length)]]});
  }
}

// console.log(photos);

var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
function renderPicture(picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-likes').innerText = picture.likes;
  pictureElement.querySelector('.picture-comments').innerText = picture.comments;
  return pictureElement;
}

var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}
pictures.appendChild(fragment);

fillGalleryOverlay(photos[0]);
function fillGalleryOverlay(photo) {
  document.querySelector('.gallery-overlay-image').src = photo.url;
  document.querySelector('.likes-count').innerText = photo.likes;
  document.querySelector('.comments-count').innerText = photo.comments.length;
}

showGallery();
function showGallery() {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('hidden');
}

function getRandomArbitary(min, max) {
  return parseInt(Math.random() * (max - min) + min, 10);
}

