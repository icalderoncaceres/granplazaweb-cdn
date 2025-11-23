/**
 * Passive Events Polyfill
 * Convierte automáticamente touch/wheel events a pasivos para mejorar scroll performance
 * Version: 1.0
 */
(function() {
    // Detectar si el navegador soporta passive listeners
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}

    // Si soporta passive, interceptar addEventListener
    if (supportsPassive) {
        var originalAddEventListener = EventTarget.prototype.addEventListener;
        
        EventTarget.prototype.addEventListener = function(type, listener, options) {
            var shouldBePassive = type === 'touchstart' || 
                                  type === 'touchmove' || 
                                  type === 'wheel' || 
                                  type === 'mousewheel';
            
            if (shouldBePassive) {
                if (typeof options === 'object') {
                    // Si ya tiene passive definido, respetarlo
                    if (options.passive === undefined) {
                        options.passive = true;
                    }
                } else if (typeof options === 'boolean') {
                    // Si options es boolean (useCapture), convertir a objeto
                    options = {
                        capture: options,
                        passive: true
                    };
                } else {
                    // Si no hay options, crear con passive
                    options = { passive: true };
                }
            }
            
            return originalAddEventListener.call(this, type, listener, options);
        };
    }
})();
