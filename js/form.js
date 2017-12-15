'use strict';
(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadResizeControls = window.vars.uploadSelectImage.querySelector('.upload-resize-controls');
  var uploadResizeControlsValue = window.vars.uploadSelectImage.querySelector('.upload-resize-controls-value');
  var uploadEffectControls = window.vars.uploadSelectImage.querySelector('.upload-effect-controls');
  var uploadSubmit = window.vars.uploadSelectImage.querySelector('#upload-submit');
  var effectImagePreview = window.vars.uploadSelectImage.querySelector('.effect-image-preview');
  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_QUANTITY = 5;
  var checkedEffect;
  var uploadFormHashtags = window.vars.uploadSelectImage.querySelector('.upload-form-hashtags');
  var currentEffectName = window.vars.uploadSelectImage.querySelector('[name="effect"]:checked').id.substring(14);
  var uploadResizeControlsValueNumber;

  // Validity check and reset form after submit
  uploadSubmit.addEventListener('click', function () {
    var invalidInputs = uploadForm.querySelectorAll('input:invalid');
    if (invalidInputs.length) {
      for (var invalidInput = 0; invalidInput < invalidInputs.length; invalidInput++) {
        invalidInputs[invalidInput].style.borderColor = 'red';
      }
    } else {
      uploadForm.submit();
      resetFilters();
    }
  });
  function resetFilters() {
    uploadForm.reset();
    uploadResizeControlsValueNumber = parseInt(uploadResizeControlsValue.value, 10);
    effectImagePreview.style.transform = 'scale(' + uploadResizeControlsValueNumber / 100 + ')';
    effectImagePreview.classList.remove('effect-' + currentEffectName);
  }


  // Hashtags validity
  uploadFormHashtags.addEventListener('input', function (evt) {
    var errorMessages = [];
    var hashtagsArray = evt.target.value.toLowerCase().split(' ');
    var isHash = 0;
    var isUniqueElements = true;
    var isHashLengthCorrect = 0;
    hashtagsArray = hashtagsArray.filter(function (hashtag) {
      return hashtag !== '';
    });
    for (var hashtag = 0; hashtag < hashtagsArray.length; hashtag++) {
      if (hashtagsArray[hashtag].charAt(0) !== '#') {
        evt.target.checkValidity = false;
        isHash++;
      }

      if (hashtagsArray[hashtag].length > MAX_HASHTAG_LENGTH) {
        isHashLengthCorrect++;
      }

      for (var j = hashtag + 1; j < hashtagsArray.length; j++) {
        if (hashtagsArray[hashtag] === hashtagsArray[j]) {
          isUniqueElements = false;
        }
      }
    }
    if (isHash !== 0) {
      errorMessages.push('Требуется # перед каждым тегом');
    }
    if (isHashLengthCorrect !== 0) {
      errorMessages.push('Максимальная длина одного хэш-тега ' + MAX_HASHTAG_LENGTH + ' символов');
    }
    if (!isUniqueElements) {
      errorMessages.push('Теги повторяются');
    }
    if (hashtagsArray.length > MAX_HASHTAGS_QUANTITY) {
      evt.target.checkValidity = false;
      errorMessages.push('Не больше ' + MAX_HASHTAGS_QUANTITY + ' тегов');
    }
    var errorMessagesString = errorMessages.join('. \n');
    evt.target.setCustomValidity(errorMessagesString);
  });


  // setEffect logic
  function setEffect(evt) {
    if (evt.target.classList.contains('upload-effect-label')) {
      checkedEffect = evt.target.previousElementSibling;
    } else if (evt.target.classList.contains('upload-effect-preview')) {
      checkedEffect = evt.target.parentNode.previousElementSibling;
    } else {
      return;
    }
    var checkedEffectName = checkedEffect.id.substring(14);
    effectImagePreview.classList.remove('effect-' + currentEffectName);
    effectImagePreview.classList.add('effect-' + checkedEffectName);
    currentEffectName = checkedEffectName;
  }
  uploadEffectControls.addEventListener('click', setEffect);
  uploadEffectControls.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setEffect);
  });


  // resize logic
  function changeResizeControlsValue(limitNumber, step) {
    uploadResizeControlsValueNumber = parseInt(uploadResizeControlsValue.value, 10);
    if (uploadResizeControlsValueNumber === limitNumber) {
      return;
    } else {
      uploadResizeControlsValue.value = uploadResizeControlsValueNumber + step + '%';
      effectImagePreview.style.transform = 'scale(' + (uploadResizeControlsValueNumber + step) / 100 + ')';
    }
  }
  uploadResizeControls.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
      changeResizeControlsValue(UPLOAD_RESIZE_MAX, UPLOAD_RESIZE_STEP);
    } else if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
      changeResizeControlsValue(UPLOAD_RESIZE_MIN, -UPLOAD_RESIZE_STEP);
    }
  });
})();
