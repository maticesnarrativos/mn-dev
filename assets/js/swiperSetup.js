document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: true,
        grabCursor: true,
        allowTouchMove: true,
        autoplay: {
            delay: 5000,
        },
        //card size = 395 px
        /* breakpoints: {
            // when window width is >= 830px
            800: {
                slidesPerView: 2,
            },
            // when window width is >= 1225px
            1140: {
                slidesPerView: 3,
            },
            // when window width is >= 1620px
            1900: {
                slidesPerView: 5,
            },
        }, */
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        lazy: {
            enabled: true,
            loadOnTransitionStart: true,
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
      
        // And if we need scrollbar
        /* scrollbar: {
          el: '.swiper-scrollbar',
        }, */
      });
});

