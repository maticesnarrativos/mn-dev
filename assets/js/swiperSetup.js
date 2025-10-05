document.addEventListener("DOMContentLoaded", async function () {
  const wrapper = document.getElementById("banner-swiper-wrapper");

  try {
    const response = await fetch("assets/json/home-banners.json"); // adjust path if needed
    const banners = await response.json();

    // Generate slides
    banners.forEach(banner => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.innerHTML = `
        <div class="swiper-slide--card">
          <button onclick="window.location.href='${banner.link}';">
            <img src="${banner.image}" class="banner" alt="${banner.alt}">
          </button>
        </div>
      `;
      wrapper.appendChild(slide);
    });

    // Initialize Swiper only after slides are created
    const swiper = new Swiper('.swiper', {
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
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
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
    });

  } catch (error) {
    console.error("Error loading banner.json:", error);
  }
});
