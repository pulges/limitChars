(function() {
    
    $.fn.limitChars = function() {
        var getScrollWidth = function($el) {
            if (window.navigator.userAgent.indexOf('Mozilla') > -1) {
                var $tmp = $('<div/>').css({
                        "width": "auto",
                        "height": $el.height(),
                        "font-size": $el.css('font-size'),
                        "font-family": $el.css('font-family'),
                        "font-weight": $el.css('font-weight'),
                        "line-height": $el.css('line-height'),
                        "padding": $el.css('padding'),
                        "position": 'absolute',
                        "top": "-99999px"
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
                console.log(getScrollWidth($el));
                if (getScrollWidth($el) > $el.width()) {
                    $el.val($el.val().slice(0,-1));
                    reduce();
                    ret = true;
                }
                $el.css('overflow', of);
                
                return ret;
            };
            setTimeout(function() {
                reduce();
            }, 0);
        };
        
        $(this).on({
            'keypress': doLimiting,
            'paste': doLimiting
        });
        return this;
    };
    
})(jQuery);