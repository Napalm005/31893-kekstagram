'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var photos = [];
  var filters = document.querySelector('.filters');

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

  window.backend.load(successHandler, window.data.errorHandler);

  function successHandler(data) {
    photos = data;
    window.render.renderPictures(photos);
    filters.classList.remove('filters-inactive');
  }

  filters.addEventListener('click', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'input' && evt.target.id !== 'filter-recommend') {
      window.util.debounce(updatePictures, DEBOUNCE_INTERVAL, evt.target.id);
    } else if (evt.target.id === 'filter-recommend') {
      window.util.debounce(window.render.renderPictures, DEBOUNCE_INTERVAL, photos);
    }
  });

  function updatePictures(sortName) {
    var diff;
    window.render.renderPictures(photos.slice().
        sort(function (left, right) {
          switch (sortName) {
            case 'filter-popular':
              diff = left.likes - right.likes;
              break;
            case 'filter-discussed':
              diff = left.comments.length - right.comments.length;
              break;
            case 'filter-random':
              diff = window.util.getRandomArbitary(-10, 10);
              break;
            default:
              break;
          }
          return diff;
        }));
  }
})();
