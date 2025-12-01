/*
    Simplified main.js
    Removes modal overlay behavior from HTML5 UP Dimension template
    Converts navigation into normal scroll-based navigation
*/

(function($) {

    var $window = $(window),
        $body = $('body'),
        $nav = $('#header nav'),
        $articles = $('#main article');

    // Breakpoints
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Remove preload class after load
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Smooth scrolling for menu links
    $nav.find('a').on('click', function(event) {
        var href = $(this).attr('href');
        if (href.startsWith('#')) {
            event.preventDefault();
            var target = $(href);
            if (target.length > 0) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 60  // offset for fixed header
                }, 600);
            }
        }
    });

})(jQuery);
