jQuery(document).ready(function () {

    jQuery( '.nav-toggle' ).on( 'click', function ( event ) {
        event.preventDefault();
        event.stopPropagation();
        jQuery( 'body' ).toggleClass( 'menu-open' );
    });
    
    /*jQuery(window).scroll(function () {
        var sticky = jQuery('.site-header'),
            scroll = jQuery(window).scrollTop();

        (scroll >= 70) ? sticky.addClass('fixed') : sticky.removeClass('fixed');
    });*/

    
});