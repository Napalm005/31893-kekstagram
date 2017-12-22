'use strict';

(function () {
  var MAX_COMMENT_SIGNS = 140;
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryCloseTrigger = document.querySelector('.gallery-overlay-close');
  var galleryOverlayImage = document.querySelector('.gallery-overlay-image');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');

  // Comments validity
  window.vars.uploadFormDescription.addEventListener('invalid', function () {
    if (window.vars.uploadFormDescription.validity.tooLong) {
      window.vars.uploadFormDescription.setCustomValidity('Максимальная длина комментария ' + MAX_COMMENT_SIGNS + ' символов');
    }
  });
  // for edge
  window.vars.uploadFormDescription.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length > MAX_COMMENT_SIGNS) {
      target.setCustomValidity('Максимальная длина комментария ' + MAX_COMMENT_SIGNS + ' символов');
    }
  });

  window.vars.pictures.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (evt.target.className === 'picture') {
      fillGalleryOverlay(evt.target);
    } else if (evt.target.tagName.toLowerCase() === 'img') {
      fillGalleryOverlay(evt.target.parentElement);
    } else {
      return;
    }
    showGallery();
  });
  function fillGalleryOverlay(photo) {
    galleryOverlayImage.src = photo.querySelector('img').src;
    likesCount.innerText = photo.querySelector('.picture-likes').innerText;
    commentsCount.innerText = photo.querySelectorAll('.picture-comments').length;
  }

  galleryCloseTrigger.addEventListener('click', function () {
    closeGallery();
  });
  galleryCloseTrigger.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeGallery);
  });

  function onGalleryEscPress(evt) {
    window.util.isEscEvent(evt, closeGallery);
  }
  function showGallery() {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onGalleryEscPress);
  }
  function closeGallery() {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onGalleryEscPress);
  }
})();
