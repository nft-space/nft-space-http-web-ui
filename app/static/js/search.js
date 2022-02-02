let searchMethods = {
    init:function(){
        // SLick start 
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true,
            lazyLoad: 'ondemand',
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,

        });
    },
}