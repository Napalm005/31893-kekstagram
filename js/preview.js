'use strict';

(function () {
  var uploadFile = window.vars.uploadSelectImage.querySelector('#upload-file');
  var uploadOverlay = window.vars.uploadSelectImage.querySelector('.upload-overlay');
  var uploadFormCancel = window.vars.uploadSelectImage.querySelector('.upload-form-cancel');

  uploadFormCancel.style.fontSize = '0';

  uploadFile.addEventListener('change', onUploadInputChange);
  function onUploadInputChange(evt) {
    evt.preventDefault();
    window.photoUpload();
  }
  uploadFormCancel.addEventListener('click', function () {
    closeFormWindowing();
  });
  uploadFormCancel.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeFormWindowing);
  });
  function closeFormWindowing() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onFormWindowingEscPress);
  }
  function onFormWindowingEscPress(evt) {
    if (window.vars.uploadFormDescription !== document.activeElement) {
      window.util.isEscEvent(evt, closeFormWindowing);
    }
  }

  window.preview = {
    uploadOverlay: uploadOverlay,
    uploadFile: window.vars.uploadSelectImage.querySelector('#upload-file'),
    showFormWindowing: function () {
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onFormWindowingEscPress);
    }
  };
})();
