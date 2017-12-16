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
  var rangeSlider = document.querySelector('.upload-effect-level');
  var rangeSliderPin = rangeSlider.querySelector('.upload-effect-level-pin');
  var rangeSliderInput = rangeSlider.querySelector('.upload-effect-level-value');
  var rangeSliderLevel = rangeSlider.querySelector('.upload-effect-level-val');
  var SLIDER_LINE_LENGTH = 455;
  var step = SLIDER_LINE_LENGTH / 100;
  var DEFAULT_EFFECT_VALUE = 20;
  var checkedEffectName;


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
    rangeSliderPositionReset();
    resetEffect();
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
    checkedEffectName = checkedEffect.id.substring(14);
    effectImagePreview.classList.remove('effect-' + currentEffectName);
    effectImagePreview.classList.add('effect-' + checkedEffectName);
    currentEffectName = checkedEffectName;
    if (checkedEffectName !== 'none') {
      rangeSlider.classList.remove('hidden');
    }
    detectionEffect(DEFAULT_EFFECT_VALUE, checkedEffectName);
    rangeSliderPositionSet(DEFAULT_EFFECT_VALUE);
    resetEffect();
  }
  uploadEffectControls.addEventListener('click', setEffect);
  uploadEffectControls.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, setEffect);
  });
  function resetEffect() {
    rangeSliderInput.value = DEFAULT_EFFECT_VALUE;
    rangeSliderPin.style.left = DEFAULT_EFFECT_VALUE + '%';
  }


  // resize logic
  function changeResizeControlsValue(limitNumber, stepScale) {
    uploadResizeControlsValueNumber = parseInt(uploadResizeControlsValue.value, 10);
    if (uploadResizeControlsValueNumber === limitNumber) {
      return;
    } else {
      uploadResizeControlsValue.value = uploadResizeControlsValueNumber + stepScale + '%';
      effectImagePreview.style.transform = 'scale(' + (uploadResizeControlsValueNumber + stepScale) / 100 + ')';
    }
  }
  uploadResizeControls.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
      changeResizeControlsValue(UPLOAD_RESIZE_MAX, UPLOAD_RESIZE_STEP);
    } else if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
      changeResizeControlsValue(UPLOAD_RESIZE_MIN, -UPLOAD_RESIZE_STEP);
    }
  });


  // drag and drop
  rangeSliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var shift = 0;
    var left = parseInt(evt.target.style.left, 10);
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      shift = startCoordX - moveEvt.clientX;
      var newValue = left - Math.floor(shift / step);
      if (newValue < 0) {
        rangeSliderPositionSet(0);
        return;
      } else if (newValue > 100) {
        rangeSliderPositionSet(100);
        return;
      } else {
        rangeSliderPositionSet(newValue);
      }
      detectionEffect(newValue, checkedEffectName);
    }
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function detectionEffect(value, effectName) {
    switch (effectName) {
      case 'chrome':
        effectImagePreview.style.filter = 'grayscale(' + value / 100 + ')';
        break;
      case 'sepia':
        effectImagePreview.style.filter = 'sepia(' + value / 100 + ')';
        break;
      case 'marvin':
        effectImagePreview.style.filter = 'invert(' + value + '%)';
        break;
      case 'phobos':
        effectImagePreview.style.filter = 'blur(' + value * 3 / 100 + 'px)';
        break;
      case 'heat':
        effectImagePreview.style.filter = 'brightness(' + value * 3 / 100 + ')';
        break;
      case 'none':
        rangeSliderPositionReset();
        rangeSlider.classList.add('hidden');
        break;
      default:

    }
  }

  function rangeSliderPositionSet(val) {
    rangeSliderInput.value = val;
    rangeSliderPin.style.left = val + '%';
    rangeSliderLevel.style.width = val + '%';
  }
  function rangeSliderPositionReset() {
    rangeSliderInput.value = DEFAULT_EFFECT_VALUE;
    rangeSliderPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    rangeSliderLevel.style.width = DEFAULT_EFFECT_VALUE + '%';
    effectImagePreview.style.filter = null;
  }

})();
