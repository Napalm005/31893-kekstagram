'use strict';

(function () {
  var uploadFile = window.vars.uploadSelectImage.querySelector('#upload-file');
  var uploadOverlay = window.vars.uploadSelectImage.querySelector('.upload-overlay');
  var uploadFormCancel = window.vars.uploadSelectImage.querySelector('.upload-form-cancel');

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    showFormWindowing();
  });
  uploadFormCancel.addEventListener('click', function () {
    closeFormWindowing();
  });
  uploadFormCancel.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeFormWindowing);
  });
  function showFormWindowing() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onFormWindowingEscPress);
  }
  function closeFormWindowing() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onFormWindowingEscPress);
  }
  function onFormWindowingEscPress(evt) {
    if (window.vars.uploadFormDescription !== document.activeElement) {
      window.util.isEscEvent(evt, closeFormWindowing);
    }
  }
})();
