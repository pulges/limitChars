(function() {
    
    $.fn.limitChars = function() {
        var getCaretPosition = function($el) {
            var input = $el.get(0);
            if (!input) return;
            if (document.selection) { input.focus(); }
            return 'selectionStart' in input ? input.selectionStart:'' || Math.abs(document.selection.createRange().moveStart('character', -input.value.length));
        }
        
        function setCaretPosition($el, caretPos) {
            var elem = $el.get(0);

            if(elem != null) {
                if(elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.move('character', caretPos);
                    range.select();
                }
                else {
                    if(elem.selectionStart) {
                        elem.focus();
                        elem.setSelectionRange(caretPos, caretPos);
                    }
                    else
                        elem.focus();
                }
            }
        }
        
        
        var getScrollWidth = function($el) {
            if (window.navigator.userAgent.indexOf('Mozilla') > -1 || window.navigator.userAgent.indexOf('Opera') > -1) {
                var $tmp = $('<div/>').css({
                        "width": "auto",
                        "height": $el.height(),
                        "font-size": $el.css('font-size'),
                        "font-family": $el.css('font-family'),
                        "font-weight": $el.css('font-weight'),
                        "line-height": $el.css('line-height'),
                        "padding": $el.css('padding'),
                        "position": 'absolute',
                        "top": "-99999px",
                        "white-space": "pre"
                    }).html($el.val()),
                    w;
                    
                $el.before($tmp);
                w = $tmp.width();
                $tmp.remove();
                return w;
            } else {
                return $el.get(0).scrollWidth;
            }
        };
        
        var doLimiting = function() {
            var $el = $(this);
            var reduce = function() {
                var ret = false,
                    of = $el.css('overflow');
                $el.css('overflow', 'auto');
                if (getScrollWidth($el) > $el.width()) {
                    $el.val($el.val().slice(0,-1));
                    reduce();
                    ret = true;
                }
                $el.css('overflow', of);
                
                return ret;
            };
            setTimeout(function() {
                var cpos = getCaretPosition($el);
                reduce();
                if (cpos) {
                    setCaretPosition($el, cpos); }
            }, 0);
        };
        
        $(this).on({
            'keypress': doLimiting,
            'paste': doLimiting
        });
        return this;
    };
    
})(jQuery);
