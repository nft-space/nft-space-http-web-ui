let carouselMethods = {
    init:function(){
        // SLick start 
        // FOR TRENDING
        $('.trending-carousel').slick({
            slidesToScroll: 1,
            lazyLoad: 'ondemand',
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            variableWidth: true,

        });
        // FOR TRENDING
        $('.hot-carousel').slick({
            slidesToScroll: 1,
            lazyLoad: 'ondemand',
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            variableWidth: true,
        });
    },
}