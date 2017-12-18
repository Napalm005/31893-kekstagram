'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.backend.load(successHandler, errorHandler);

  function successHandler(photos) {
    renderPictures(photos);
  };
  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function renderPictures(photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(createPicture(photos[i]));
    }
    window.vars.pictures.appendChild(fragment);
  }

  function createPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').innerText = picture.likes;
    pictureElement.querySelector('.picture-comments').innerText = picture.comments;
    return pictureElement;
  }
})();
