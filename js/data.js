'use strict';

(function () {
  window.data = {
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'position: fixed;top: 50%; left: 50%;transform: translate3d(-50%,-50%,0); z-index: 100; text-align: center; background-color: #fff; border: 3px solid red;border-radius: 5px;font-size: 25px;color: black;padding: 50px;';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      setTimeout(function () {
        node.classList.add('hidden');
      }, 3000);
    }
  };

  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.backend.load(successHandler, window.data.errorHandler);

  function successHandler(photos) {
    renderPictures(photos);
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
