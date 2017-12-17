'use strict';

(function () {
  var checkedEffect;
  var currentEffectName = window.vars.uploadSelectImage.querySelector('[name="effect"]:checked').id.substring(14);
  var rangeSlider = document.querySelector('.upload-effect-level');
  var DEFAULT_EFFECT_VALUE = 20;
  var checkedEffectName;

  window.initializeFilters = function (effectsBlock, callback) {
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
      checkedEffectName = checkedEffect.id.substring(14);
      callback(currentEffectName, checkedEffectName);
      currentEffectName = checkedEffectName;
      if (checkedEffectName !== 'none') {
        rangeSlider.classList.remove('hidden');
      }
      window.form.detectionEffect(DEFAULT_EFFECT_VALUE, checkedEffectName);
      window.form.setRangeSliderPosition(DEFAULT_EFFECT_VALUE);
      window.form.resetEffect();
    }
  };
})();
