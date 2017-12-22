'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  function createPicture(picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  }

  window.render = {
    renderPictures: function (photosArray) {
      window.vars.pictures.innerHTML = '';
      var fragment = document.createDocumentFragment();
      photosArray.forEach(function (photo) {
        fragment.appendChild(createPicture(photo));
      });
      window.vars.pictures.appendChild(fragment);
    }
  };
})();
