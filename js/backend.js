'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/kekstagram';
  var SERVER_TIMEOUT = 10000;
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          onError(xhr.status + ': Неверный запрос' + xhr.statusText);
          break;
        case StatusCode.UNAUTHORIZED:
          onError(xhr.status + ': ' + xhr.statusText);
          break;
        case StatusCode.NOT_FOUND:
          onError(xhr.status + ': ' + xhr.statusText);
          break;
        default:
          onError('Ваще непонятно');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT; // 10s

    return xhr;
  };

  window.backend = {
    save: function (data, onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onSuccess, onError) {
      var xhr = setup(onSuccess, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
