'use strict';

(function () {
  var uploadResizeControlsValue = window.vars.uploadSelectImage.querySelector('.upload-resize-controls-value');
  var UPLOAD_RESIZE_STEP = 25;
  var UPLOAD_RESIZE_MIN = 25;
  var UPLOAD_RESIZE_MAX = 100;
  var uploadResizeControlsValueNumber;


  window.initializeScale = function (scaleElement, callback) {
    scaleElement.addEventListener('click', onScaleBtnClick);

    function changeResizeControlsValue(limitNumber, stepScale) {
      uploadResizeControlsValueNumber = parseInt(uploadResizeControlsValue.value, 10);
      if (uploadResizeControlsValueNumber === limitNumber) {
        return;
      } else {
        uploadResizeControlsValue.value = uploadResizeControlsValueNumber + stepScale + '%';
        callback(stepScale, uploadResizeControlsValueNumber);
      }
    }
    function onScaleBtnClick(evt) {
      if (evt.target.classList.contains('upload-resize-controls-button-inc')) {
        changeResizeControlsValue(UPLOAD_RESIZE_MAX, UPLOAD_RESIZE_STEP);
      } else if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
        changeResizeControlsValue(UPLOAD_RESIZE_MIN, -UPLOAD_RESIZE_STEP);
      }
    }
  };
})();
