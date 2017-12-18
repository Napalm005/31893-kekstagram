'use strict';

(function () {
  window.initializeScale = function (scaleElement, resizeStep, resizeMin, resizeMax, callback) {

    var uploadResizeControlsValue = scaleElement.querySelector('.upload-resize-controls-value');
    var uploadResizeControlsValueNumber;

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
        changeResizeControlsValue(resizeMax, resizeStep);
      } else if (evt.target.classList.contains('upload-resize-controls-button-dec')) {
        changeResizeControlsValue(resizeMin, -resizeStep);
      }
    }
  };
})();
