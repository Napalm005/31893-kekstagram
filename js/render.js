'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  function createPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').innerHTML = picture.likes;
    pictureElement.querySelector('.picture-comments').innerHTML = picture.comments;
    return pictureElement;
  }

  window.render = {
    renderPictures: function (photosArray) {
      window.vars.pictures.innerHTML = '';
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photosArray.length; i++) {
        fragment.appendChild(createPicture(photosArray[i]));
      }
      window.vars.pictures.appendChild(fragment);
    }
  };
})();
