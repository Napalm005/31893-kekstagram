'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var effectImagePreview = window.vars.uploadSelectImage.querySelector('.effect-image-preview');

  effectImagePreview.style.maxWidth = '585px';

  window.photoUpload = function () {
    var file = window.preview.uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        effectImagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);

      window.preview.showFormWindowing();
    } else {
      window.data.errorHandler('Допускаются только изображения форматов \'gif\', \'jpg\', \'jpeg\', \'png\'');
    }
  };
})();
