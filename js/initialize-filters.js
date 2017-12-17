'use strict';

(function () {
  window.initializeFilters = function (effectsBlock, callback) {
    var checkedEffect;
    effectsBlock.addEventListener('click', onSetEffectItemCheck);
    effectsBlock.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, onSetEffectItemCheck);
    });

    function onSetEffectItemCheck(evt) {
      if (evt.target.classList.contains('upload-effect-label')) {
        checkedEffect = evt.target.previousElementSibling;
      } else if (evt.target.classList.contains('upload-effect-preview')) {
        checkedEffect = evt.target.parentNode.previousElementSibling;
      } else {
        return;
      }
      callback(checkedEffect);
    }
  };
})();
